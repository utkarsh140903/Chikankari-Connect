// Mock API for Chikankari Connect Craft
// Simulates backend functionality with localStorage persistence

import { 
  Product, 
  Artisan, 
  User, 
  Order, 
  ChatMessage,
  mockProducts, 
  mockArtisans, 
  mockUsers, 
  mockOrders, 
  mockChatMessages 
} from './mockData';

// Local Storage Keys
const STORAGE_KEYS = {
  PRODUCTS: 'chikankari_products',
  ARTISANS: 'chikankari_artisans',
  USERS: 'chikankari_users',
  ORDERS: 'chikankari_orders',
  MESSAGES: 'chikankari_messages',
  CURRENT_USER: 'chikankari_current_user',
  CART: 'chikankari_cart'
};

// Helper function to simulate API delay
const delay = (ms: number = 1000) => new Promise(resolve => setTimeout(resolve, ms));

// Initialize data if not exists
const initializeData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(mockProducts));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ARTISANS)) {
    localStorage.setItem(STORAGE_KEYS.ARTISANS, JSON.stringify(mockArtisans));
  }
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mockUsers));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(mockOrders));
  }
  if (!localStorage.getItem(STORAGE_KEYS.MESSAGES)) {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(mockChatMessages));
  }
};

// Force refresh data with latest mock data
const refreshData = () => {
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(mockProducts));
    localStorage.setItem(STORAGE_KEYS.ARTISANS, JSON.stringify(mockArtisans));
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mockUsers));
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(mockOrders));
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(mockChatMessages));
    console.log(`Data refreshed successfully! Now have ${mockProducts.length} products.`);
  } catch (error) {
    console.error('Failed to refresh data:', error);
  }
};

// Initialize data on load
initializeData();

// Import the new OTP service
import { sendOTP as sendRealOTP, verifyOTP as verifyRealOTP } from './otpService';

// Authentication API
export const authApi = {
  // Send OTP using real service
  sendOTP: async (phoneNumber: string): Promise<{ success: boolean; message: string; sessionId?: string }> => {
    await delay(500); // Small delay for UX
    
    try {
      const result = await sendRealOTP(phoneNumber);
      return {
        success: result.success,
        message: result.message,
        sessionId: result.sessionId
      };
    } catch (error) {
      console.error('Auth API - Send OTP Error:', error);
      return {
        success: false,
        message: 'Failed to send OTP. Please try again.'
      };
    }
  },

  // Verify OTP using real service
  verifyOTP: async (phoneNumber: string, otp: string, sessionId?: string): Promise<{ success: boolean; user?: User; isNewUser?: boolean }> => {
    await delay(500); // Small delay for UX
    
    try {
      const verifyResult = await verifyRealOTP(phoneNumber, otp, sessionId);
      
      if (verifyResult.success && verifyResult.isValid) {
        const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]') as User[];
        const existingUser = users.find(u => u.phone === phoneNumber);
        
        if (existingUser) {
          localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(existingUser));
          return { success: true, user: existingUser, isNewUser: false };
        } else {
          return { success: true, isNewUser: true };
        }
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error('Auth API - Verify OTP Error:', error);
      return { success: false };
    }
  },

  // Create new user profile
  createProfile: async (userData: Partial<User>): Promise<{ success: boolean; user?: User }> => {
    await delay(1500);
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]') as User[];
    
    const newUser: User = {
      id: `user_${Date.now()}`,
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      role: userData.role || 'customer',
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b75bd3f2?w=150&h=150&fit=crop&q=80',
      location: userData.location,
      preferences: userData.preferences,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));
    
    return { success: true, user: newUser };
  },

  // Get current user
  getCurrentUser: (): User | null => {
    const userString = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return userString ? JSON.parse(userString) : null;
  },

  // Logout
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};

// Products API
export const productsApi = {
  // Get all products
  getProducts: async (filters?: { category?: string; search?: string; artisanId?: string }): Promise<Product[]> => {
    await delay(800);
    let products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]') as Product[];
    
    if (filters?.category) {
      products = products.filter(p => p.category.toLowerCase() === filters.category?.toLowerCase());
    }
    
    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.nameHi.includes(searchTerm) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    if (filters?.artisanId) {
      products = products.filter(p => p.artisanId === filters.artisanId);
    }
    
    return products;
  },

  // Get product by ID
  getProductById: async (id: string): Promise<Product | null> => {
    await delay(500);
    const products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]') as Product[];
    return products.find(p => p.id === id) || null;
  },

  // Add new product (for artisans)
  addProduct: async (productData: Omit<Product, 'id' | 'createdAt' | 'rating' | 'reviews'>): Promise<{ success: boolean; product?: Product }> => {
    await delay(1500);
    const products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]') as Product[];
    
    const newProduct: Product = {
      ...productData,
      id: `prod_${Date.now()}`,
      rating: 0,
      reviews: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    products.push(newProduct);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    
    return { success: true, product: newProduct };
  },

  // Update product
  updateProduct: async (id: string, updates: Partial<Product>): Promise<{ success: boolean; product?: Product }> => {
    await delay(1000);
    const products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]') as Product[];
    const index = products.findIndex(p => p.id === id);
    
    if (index !== -1) {
      products[index] = { ...products[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
      return { success: true, product: products[index] };
    }
    
    return { success: false };
  }
};

// Artisans API
export const artisansApi = {
  // Get all artisans
  getArtisans: async (): Promise<Artisan[]> => {
    await delay(600);
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ARTISANS) || '[]') as Artisan[];
  },

  // Get artisan by ID
  getArtisanById: async (id: string): Promise<Artisan | null> => {
    await delay(400);
    const artisans = JSON.parse(localStorage.getItem(STORAGE_KEYS.ARTISANS) || '[]') as Artisan[];
    return artisans.find(a => a.id === id) || null;
  }
};

// Orders API
export const ordersApi = {
  // Get orders by user
  getOrdersByUser: async (userId: string): Promise<Order[]> => {
    await delay(700);
    const orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]') as Order[];
    return orders.filter(o => o.customerId === userId || o.artisanId === userId);
  },

  // Create new order
  createOrder: async (orderData: Omit<Order, 'id' | 'orderDate'>): Promise<{ success: boolean; order?: Order }> => {
    await delay(1200);
    const orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]') as Order[];
    
    const newOrder: Order = {
      ...orderData,
      id: `ord_${Date.now()}`,
      orderDate: new Date().toISOString().split('T')[0]
    };
    
    orders.push(newOrder);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    
    return { success: true, order: newOrder };
  },

  // Update order status
  updateOrderStatus: async (orderId: string, status: Order['status']): Promise<{ success: boolean }> => {
    await delay(800);
    const orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]') as Order[];
    const index = orders.findIndex(o => o.id === orderId);
    
    if (index !== -1) {
      orders[index].status = status;
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
      return { success: true };
    }
    
    return { success: false };
  }
};

// Chat API
export const chatApi = {
  // Get conversations for user
  getConversations: async (userId: string): Promise<{ id: string; name: string; lastMessage: string; lastMessageHi: string; time: string; unread: number; avatar: string }[]> => {
    await delay(600);
    const messages = JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES) || '[]') as ChatMessage[];
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]') as User[];
    const artisans = JSON.parse(localStorage.getItem(STORAGE_KEYS.ARTISANS) || '[]') as Artisan[];
    
    const userMessages = messages.filter(m => m.senderId === userId || m.receiverId === userId);
    const conversations = new Map();
    
    userMessages.forEach(msg => {
      const otherUserId = msg.senderId === userId ? msg.receiverId : msg.senderId;
      if (!conversations.has(otherUserId) || new Date(msg.timestamp) > new Date(conversations.get(otherUserId).timestamp)) {
        const otherUser = users.find(u => u.id === otherUserId) || artisans.find(a => a.id === otherUserId);
        if (otherUser) {
          conversations.set(otherUserId, {
            id: otherUserId,
            name: otherUser.name,
            lastMessage: msg.message,
            lastMessageHi: msg.messageHi,
            time: '2m ago', // Simplified
            unread: msg.receiverId === userId && !msg.read ? 1 : 0,
            avatar: otherUser.avatar,
            timestamp: msg.timestamp
          });
        }
      }
    });
    
    return Array.from(conversations.values()).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  },

  // Get messages between two users
  getMessages: async (userId1: string, userId2: string): Promise<ChatMessage[]> => {
    await delay(400);
    const messages = JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES) || '[]') as ChatMessage[];
    return messages.filter(m => 
      (m.senderId === userId1 && m.receiverId === userId2) ||
      (m.senderId === userId2 && m.receiverId === userId1)
    ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  },

  // Send message
  sendMessage: async (senderId: string, receiverId: string, message: string, messageHi: string): Promise<{ success: boolean; message?: ChatMessage }> => {
    await delay(300);
    const messages = JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES) || '[]') as ChatMessage[];
    
    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId,
      receiverId,
      message,
      messageHi,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    messages.push(newMessage);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    
    return { success: true, message: newMessage };
  }
};

// Cart API
export const cartApi = {
  // Get cart items
  getCart: (): { productId: string; quantity: number }[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CART) || '[]');
  },

  // Add to cart
  addToCart: (productId: string, quantity: number = 1) => {
    const cart = cartApi.getCart();
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }
    
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  },

  // Remove from cart
  removeFromCart: (productId: string) => {
    const cart = cartApi.getCart().filter(item => item.productId !== productId);
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  },

  // Update cart item quantity
  updateCartItem: (productId: string, quantity: number) => {
    const cart = cartApi.getCart();
    const item = cart.find(item => item.productId === productId);
    
    if (item) {
      item.quantity = quantity;
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    }
  },

  // Clear cart
  clearCart: () => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
  }
};

// Admin/Utility API
export const utilApi = {
  // Refresh all data with latest mock data
  refreshData: () => {
    refreshData();
  },
  
  // Check if data needs refresh (you can call this to see if products count matches)
  checkDataVersion: () => {
    const currentProducts = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]') as Product[];
    return {
      currentCount: currentProducts.length,
      expectedCount: mockProducts.length,
      needsRefresh: currentProducts.length !== mockProducts.length
    };
  }
};

// Export all APIs
export const api = {
  auth: authApi,
  products: productsApi,
  artisans: artisansApi,
  orders: ordersApi,
  chat: chatApi,
  cart: cartApi,
  util: utilApi
};

export default api;

