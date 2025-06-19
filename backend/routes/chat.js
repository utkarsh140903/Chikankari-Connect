const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const Message = require('../models/Message');
const User = require('../models/User');
const Artisan = require('../models/Artisan');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// Get all conversations for authenticated user
router.get('/conversations', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const chats = await Chat.find({
      participants: req.user.id
    })
    .populate({
      path: 'participants',
      select: 'name email profileImage role',
      match: { _id: { $ne: req.user.id } }
    })
    .populate({
      path: 'lastMessage',
      select: 'content messageType createdAt sender isRead'
    })
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit);

    // Get unread count for each conversation
    const chatsWithUnreadCount = await Promise.all(
      chats.map(async (chat) => {
        const unreadCount = await Message.countDocuments({
          chat: chat._id,
          sender: { $ne: req.user.id },
          isRead: false
        });
        return {
          ...chat.toObject(),
          unreadCount
        };
      })
    );

    const total = await Chat.countDocuments({ participants: req.user.id });

    res.json({
      conversations: chatsWithUnreadCount,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start or get existing conversation with artisan
router.post('/start', [
  auth,
  body('artisanId').notEmpty().withMessage('Artisan ID is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { artisanId } = req.body;

    // Check if artisan exists
    const artisan = await Artisan.findById(artisanId);
    if (!artisan) {
      return res.status(404).json({ message: 'Artisan not found' });
    }

    // Check if conversation already exists
    let chat = await Chat.findOne({
      participants: { $all: [req.user.id, artisanId] }
    }).populate({
      path: 'participants',
      select: 'name email profileImage role'
    });

    if (!chat) {
      // Create new conversation
      chat = new Chat({
        participants: [req.user.id, artisanId],
        chatType: 'customer_artisan'
      });
      await chat.save();
      
      await chat.populate({
        path: 'participants',
        select: 'name email profileImage role'
      });
    }

    res.json({ conversation: chat });
  } catch (error) {
    console.error('Start chat error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get messages in a conversation
router.get('/:chatId/messages', auth, async (req, res) => {
  try {
    const { chatId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    // Check if user is participant in this chat
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    if (!chat.participants.includes(req.user.id)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const messages = await Message.find({ chat: chatId })
      .populate({
        path: 'sender',
        select: 'name profileImage role'
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Message.countDocuments({ chat: chatId });

    // Mark messages as read
    await Message.updateMany(
      {
        chat: chatId,
        sender: { $ne: req.user.id },
        isRead: false
      },
      { isRead: true }
    );

    res.json({
      messages: messages.reverse(), // Return in chronological order
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Send message
router.post('/:chatId/messages', [
  auth,
  body('content').trim().isLength({ min: 1 }).withMessage('Message content is required'),
  body('messageType').optional().isIn(['text', 'image', 'product_inquiry', 'order_update'])
    .withMessage('Invalid message type')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { chatId } = req.params;
    const { content, messageType = 'text', metadata } = req.body;

    // Check if user is participant in this chat
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    if (!chat.participants.includes(req.user.id)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Create message
    const message = new Message({
      chat: chatId,
      sender: req.user.id,
      content,
      messageType,
      metadata
    });

    await message.save();

    // Update chat's last message and timestamp
    chat.lastMessage = message._id;
    chat.updatedAt = new Date();
    await chat.save();

    // Populate message for response
    await message.populate({
      path: 'sender',
      select: 'name profileImage role'
    });

    res.status(201).json({ message });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark messages as read
router.put('/:chatId/read', auth, async (req, res) => {
  try {
    const { chatId } = req.params;

    // Check if user is participant in this chat
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    if (!chat.participants.includes(req.user.id)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Mark all messages from other participants as read
    await Message.updateMany(
      {
        chat: chatId,
        sender: { $ne: req.user.id },
        isRead: false
      },
      { isRead: true }
    );

    res.json({ message: 'Messages marked as read' });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete conversation
router.delete('/:chatId', auth, async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    if (!chat.participants.includes(req.user.id)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Delete all messages in the conversation
    await Message.deleteMany({ chat: chatId });

    // Delete the conversation
    await Chat.findByIdAndDelete(chatId);

    res.json({ message: 'Conversation deleted' });
  } catch (error) {
    console.error('Delete conversation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get unread message count
router.get('/unread/count', auth, async (req, res) => {
  try {
    const userChats = await Chat.find({ participants: req.user.id }).select('_id');
    const chatIds = userChats.map(chat => chat._id);

    const unreadCount = await Message.countDocuments({
      chat: { $in: chatIds },
      sender: { $ne: req.user.id },
      isRead: false
    });

    res.json({ unreadCount });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search conversations
router.get('/search', auth, async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim().length < 2) {
      return res.status(400).json({ message: 'Search query must be at least 2 characters' });
    }

    const searchRegex = new RegExp(q.trim(), 'i');

    // Find chats where participant names match search query
    const chats = await Chat.find({
      participants: req.user.id
    })
    .populate({
      path: 'participants',
      select: 'name email profileImage role',
      match: {
        _id: { $ne: req.user.id },
        name: searchRegex
      }
    })
    .populate({
      path: 'lastMessage',
      select: 'content messageType createdAt sender'
    })
    .sort({ updatedAt: -1 })
    .limit(20);

    // Filter out chats where no participants matched
    const filteredChats = chats.filter(chat => 
      chat.participants.some(participant => participant)
    );

    res.json({ conversations: filteredChats });
  } catch (error) {
    console.error('Search conversations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

