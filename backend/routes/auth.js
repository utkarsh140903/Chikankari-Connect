const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Mock users storage (in production, use a proper database)
let users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 98765 43210',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    avatar: '/api/placeholder/40/40',
    createdAt: new Date('2024-01-15').toISOString(),
    emailVerified: true,
    phoneVerified: true,
    preferences: {
      newsletter: true,
      smsNotifications: false,
      emailNotifications: true
    }
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+91 87654 32109',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    avatar: '/api/placeholder/40/40',
    createdAt: new Date('2024-02-20').toISOString(),
    emailVerified: true,
    phoneVerified: false,
    preferences: {
      newsletter: false,
      smsNotifications: true,
      emailNotifications: true
    }
  }
];

// Mock active sessions
let activeSessions = [];

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '7d'
  });
};

// Verify JWT token middleware
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate token
    const token = generateToken(user.id);
    
    // Add to active sessions
    const session = {
      id: Date.now().toString(),
      userId: user.id,
      device: req.headers['user-agent'] || 'Unknown Device',
      lastActive: new Date().toISOString(),
      ipAddress: req.ip
    };
    activeSessions.push(session);
    
    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      user: userWithoutPassword,
      token,
      sessionId: session.id
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = {
      id: (users.length + 1).toString(),
      name,
      email,
      phone: phone || '',
      password: hashedPassword,
      avatar: '/api/placeholder/40/40',
      createdAt: new Date().toISOString(),
      emailVerified: false,
      phoneVerified: false,
      preferences: {
        newsletter: true,
        smsNotifications: false,
        emailNotifications: true
      }
    };
    
    users.push(newUser);
    
    // Generate token
    const token = generateToken(newUser.id);
    
    // Return user data without password
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.status(201).json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get current user profile
router.get('/profile', verifyToken, (req, res) => {
  try {
    const user = users.find(u => u.id === req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
router.put('/profile', verifyToken, (req, res) => {
  try {
    const userIndex = users.findIndex(u => u.id === req.userId);
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const { name, phone, preferences } = req.body;
    
    // Update user data
    users[userIndex] = {
      ...users[userIndex],
      name: name || users[userIndex].name,
      phone: phone || users[userIndex].phone,
      preferences: preferences || users[userIndex].preferences
    };
    
    const { password: _, ...userWithoutPassword } = users[userIndex];
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get active sessions
router.get('/sessions', verifyToken, (req, res) => {
  try {
    const userSessions = activeSessions.filter(s => s.userId === req.userId);
    res.json(userSessions);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Logout (remove session)
router.post('/logout', verifyToken, (req, res) => {
  try {
    const { sessionId } = req.body;
    
    if (sessionId) {
      activeSessions = activeSessions.filter(s => s.id !== sessionId);
    } else {
      // Logout from all sessions
      activeSessions = activeSessions.filter(s => s.userId !== req.userId);
    }
    
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Change password
router.post('/change-password', verifyToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const userIndex = users.findIndex(u => u.id === req.userId);
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, users[userIndex].password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }
    
    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    users[userIndex].password = hashedNewPassword;
    
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

