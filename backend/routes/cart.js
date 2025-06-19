const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// Get user's cart
router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
      .populate({
        path: 'items.product',
        select: 'name price images stock isActive',
        populate: {
          path: 'artisan',
          select: 'name'
        }
      });

    if (!cart) {
      return res.json({ items: [], totalAmount: 0, totalItems: 0 });
    }

    // Filter out inactive products or out of stock items
    cart.items = cart.items.filter(item => 
      item.product && 
      item.product.isActive && 
      item.product.stock > 0
    );

    // Recalculate totals
    cart.totalAmount = cart.items.reduce((total, item) => 
      total + (item.product.price * item.quantity), 0
    );
    cart.totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);

    // Save updated cart
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add item to cart
router.post('/add', [
  auth,
  body('productId').notEmpty().withMessage('Product ID is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { productId, quantity } = req.body;

    // Check if product exists and is active
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (!product.isActive) {
      return res.status(400).json({ message: 'Product is not available' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ 
        message: `Only ${product.stock} items available in stock` 
      });
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;
      if (newQuantity > product.stock) {
        return res.status(400).json({ 
          message: `Only ${product.stock} items available in stock` 
        });
      }
      cart.items[existingItemIndex].quantity = newQuantity;
    } else {
      // Add new item
      cart.items.push({ product: productId, quantity });
    }

    // Recalculate totals
    await cart.populate({
      path: 'items.product',
      select: 'price'
    });

    cart.totalAmount = cart.items.reduce((total, item) => 
      total + (item.product.price * item.quantity), 0
    );
    cart.totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);

    await cart.save();

    // Populate full cart data for response
    await cart.populate({
      path: 'items.product',
      select: 'name price images stock isActive',
      populate: {
        path: 'artisan',
        select: 'name'
      }
    });

    res.json({ message: 'Item added to cart', cart });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update item quantity in cart
router.put('/update/:productId', [
  auth,
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { productId } = req.params;
    const { quantity } = req.body;

    // Check product availability
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ 
        message: `Only ${product.stock} items available in stock` 
      });
    }

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart.items[itemIndex].quantity = quantity;

    // Recalculate totals
    await cart.populate({ path: 'items.product', select: 'price' });
    cart.totalAmount = cart.items.reduce((total, item) => 
      total + (item.product.price * item.quantity), 0
    );
    cart.totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);

    await cart.save();

    // Populate full cart data for response
    await cart.populate({
      path: 'items.product',
      select: 'name price images stock isActive',
      populate: {
        path: 'artisan',
        select: 'name'
      }
    });

    res.json({ message: 'Cart updated', cart });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove item from cart
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );

    // Recalculate totals
    if (cart.items.length > 0) {
      await cart.populate({ path: 'items.product', select: 'price' });
      cart.totalAmount = cart.items.reduce((total, item) => 
        total + (item.product.price * item.quantity), 0
      );
      cart.totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
    } else {
      cart.totalAmount = 0;
      cart.totalItems = 0;
    }

    await cart.save();

    res.json({ message: 'Item removed from cart', cart });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Clear entire cart
router.delete('/clear', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    cart.totalAmount = 0;
    cart.totalItems = 0;

    await cart.save();

    res.json({ message: 'Cart cleared', cart });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get cart item count
router.get('/count', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    res.json({ count: cart ? cart.totalItems : 0 });
  } catch (error) {
    console.error('Get cart count error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

