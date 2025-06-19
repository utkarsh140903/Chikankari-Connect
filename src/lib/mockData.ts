// Mock Database for Chikankari Connect Craft

export interface Product {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  price: number;
  images: string[];
  category: string;
  categoryHi: string;
  artisanId: string;
  artisanName: string;
  artisanNameHi: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  tags: string[];
  tagsHi: string[];
  createdAt: string;
}

export interface Artisan {
  id: string;
  name: string;
  nameHi: string;
  bio: string;
  bioHi: string;
  location: string;
  locationHi: string;
  experience: number;
  specializations: string[];
  specializationsHi: string[];
  rating: number;
  totalProducts: number;
  totalSales: number;
  avatar: string;
  coverImage: string;
  verified: boolean;
  joinedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'artisan' | 'designer';
  avatar: string;
  location?: string;
  preferences?: string[];
  createdAt: string;
}

export interface Order {
  id: string;
  customerId: string;
  artisanId: string;
  productId: string;
  quantity: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  expectedDelivery: string;
  shippingAddress: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  messageHi: string;
  timestamp: string;
  read: boolean;
}

// Mock Products Data
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Traditional White Chikan Kurta',
    nameHi: 'पारंपरिक सफेद चिकन कुर्ता',
    description: 'Handcrafted white cotton kurta with intricate chikan embroidery. Perfect for festive occasions.',
    descriptionHi: 'हाथ से बना सफेद कॉटन कुर्ता जटिल चिकन कढ़ाई के साथ। त्योहारी अवसरों के लिए आदर्श।',
    price: 2500,
    images: [
      'https://images.unsplash.com/photo-1583391733956-6c78c2018580?w=500&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583391733956-6c78c2018580?w=500&h=600&fit=crop&q=80'
    ],
    category: 'Kurtas',
    categoryHi: 'कुर्ते',
    artisanId: 'art1',
    artisanName: 'Ram Kumar',
    artisanNameHi: 'राम कुमार',
    rating: 4.8,
    reviews: 24,
    inStock: true,
    tags: ['Traditional', 'Cotton', 'Festive', 'White'],
    tagsHi: ['पारंपरिक', 'कॉटन', 'त्योहारी', 'सफेद'],
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Elegant Pink Chikan Saree',
    nameHi: 'सुंदर गुलाबी चिकन साड़ी',
    description: 'Beautiful pink georgette saree with delicate chikan work. Perfect for weddings and special occasions.',
    descriptionHi: 'सुंदर गुलाबी जॉर्जेट साड़ी नाजुक चिकन काम के साथ। शादियों और विशेष अवसरों के लिए आदर्श।',
    price: 8000,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=600&fit=crop&q=80'
    ],
    category: 'Sarees',
    categoryHi: 'साड़ियां',
    artisanId: 'art2',
    artisanName: 'Sunita Devi',
    artisanNameHi: 'सुनीता देवी',
    rating: 4.9,
    reviews: 18,
    inStock: true,
    tags: ['Elegant', 'Pink', 'Wedding', 'Georgette'],
    tagsHi: ['सुंदर', 'गुलाबी', 'शादी', 'जॉर्जेट'],
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    name: 'Designer Palazzo Set',
    nameHi: 'डिज़ाइनर पलाज़ो सेट',
    description: 'Stylish palazzo set with chikan embroidery. Comfortable and fashionable for daily wear.',
    descriptionHi: 'चिकन कढ़ाई के साथ स्टाइलिश पलाज़ो सेट। दैनिक पहनने के लिए आरामदायक और फैशनेबल।',
    price: 3200,
    images: [
      'https://images.unsplash.com/photo-1583391733975-b72f1ac82257?w=500&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583391733975-b72f1ac82257?w=500&h=600&fit=crop&q=80'
    ],
    category: 'Sets',
    categoryHi: 'सेट्स',
    artisanId: 'art3',
    artisanName: 'Mohan Lal',
    artisanNameHi: 'मोहन लाल',
    rating: 4.7,
    reviews: 15,
    inStock: true,
    tags: ['Designer', 'Comfortable', 'Daily Wear'],
    tagsHi: ['डिज़ाइनर', 'आरामदायक', 'दैनिक पहनावा'],
    createdAt: '2024-01-25'
  },
  {
    id: '4',
    name: 'Royal Blue Anarkali Suit',
    nameHi: 'रॉयल ब्लू अनारकली सूट',
    description: 'Stunning royal blue anarkali with golden chikan embroidery. Perfect for grand occasions.',
    descriptionHi: 'सुनहरी चिकन कढ़ाई के साथ आश्चर्यजनक रॉयल ब्लू अनारकली। भव्य अवसरों के लिए आदर्श।',
    price: 5500,
    images: [
      'https://images.unsplash.com/photo-1583391733956-6c78c2018580?w=500&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583391733956-6c78c2018580?w=500&h=600&fit=crop&q=80'
    ],
    category: 'Suits',
    categoryHi: 'सूट्स',
    artisanId: 'art1',
    artisanName: 'Ram Kumar',
    artisanNameHi: 'राम कुमार',
    rating: 4.6,
    reviews: 12,
    inStock: true,
    tags: ['Royal', 'Blue', 'Golden', 'Grand'],
    tagsHi: ['शाही', 'नीला', 'सुनहरा', 'भव्य'],
    createdAt: '2024-02-01'
  },
  {
    id: '5',
    name: 'Cream Silk Dupatta',
    nameHi: 'क्रीम सिल्क दुपट्टा',
    description: 'Delicate cream silk dupatta with fine chikan embroidery. Adds elegance to any outfit.',
    descriptionHi: 'बारीक चिकन कढ़ाई के साथ नाजुक क्रीम सिल्क दुपट्टा। किसी भी पोशाक में सुंदरता जोड़ता है।',
    price: 1800,
    images: [
      'https://images.unsplash.com/photo-1583391733975-b72f1ac82257?w=500&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583391733975-b72f1ac82257?w=500&h=600&fit=crop&q=80'
    ],
    category: 'Accessories',
    categoryHi: 'एक्सेसरीज',
    artisanId: 'art2',
    artisanName: 'Sunita Devi',
    artisanNameHi: 'सुनीता देवी',
    rating: 4.5,
    reviews: 8,
    inStock: true,
    tags: ['Silk', 'Cream', 'Delicate', 'Elegant'],
    tagsHi: ['सिल्क', 'क्रीम', 'नाजुक', 'सुंदर'],
    createdAt: '2024-02-05'
  }
];

// Mock Artisans Data
export const mockArtisans: Artisan[] = [
  {
    id: 'art1',
    name: 'Ram Kumar',
    nameHi: 'राम कुमार',
    bio: 'Master craftsman with 25 years of experience in traditional Chikan embroidery. Specializes in intricate patterns.',
    bioHi: '25 साल के अनुभव के साथ पारंपरिक चिकन कढ़ाई के मास्टर कारीगर। जटिल पैटर्न में विशेषज्ञ।',
    location: 'Lucknow, Uttar Pradesh',
    locationHi: 'लखनऊ, उत्तर प्रदेश',
    experience: 25,
    specializations: ['Traditional Kurtas', 'Formal Wear', 'Wedding Collection'],
    specializationsHi: ['पारंपरिक कुर्ते', 'फॉर्मल वियर', 'शादी संग्रह'],
    rating: 4.8,
    totalProducts: 45,
    totalSales: 1250,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1583391733956-6c78c2018580?w=800&h=400&fit=crop&q=80',
    verified: true,
    joinedAt: '2023-01-15'
  },
  {
    id: 'art2',
    name: 'Sunita Devi',
    nameHi: 'सुनीता देवी',
    bio: 'Expert in delicate chikan work on sarees and formal wear. Known for precision and beautiful finishing.',
    bioHi: 'साड़ियों और फॉर्मल वियर पर नाजुक चिकन काम की विशेषज्ञ। सटीकता और सुंदर फिनिशिंग के लिए प्रसिद्ध।',
    location: 'Lucknow, Uttar Pradesh',
    locationHi: 'लखनऊ, उत्तर प्रदेश',
    experience: 18,
    specializations: ['Sarees', 'Designer Suits', 'Accessories'],
    specializationsHi: ['साड़ियां', 'डिज़ाइनर सूट्स', 'एक्सेसरीज'],
    rating: 4.9,
    totalProducts: 32,
    totalSales: 980,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b75bd3f2?w=150&h=150&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=400&fit=crop&q=80',
    verified: true,
    joinedAt: '2023-03-20'
  },
  {
    id: 'art3',
    name: 'Mohan Lal',
    nameHi: 'मोहन लाल',
    bio: 'Creative artisan specializing in modern designs with traditional techniques. Perfect blend of old and new.',
    bioHi: 'पारंपरिक तकनीकों के साथ आधुनिक डिज़ाइन में विशेषज्ञ रचनात्मक कारीगर। पुराने और नए का सही मिश्रण।',
    location: 'Lucknow, Uttar Pradesh',
    locationHi: 'लखनऊ, उत्तर प्रदेश',
    experience: 15,
    specializations: ['Contemporary Designs', 'Casual Wear', 'Youth Fashion'],
    specializationsHi: ['समकालीन डिज़ाइन', 'कैजुअल वियर', 'युवा फैशन'],
    rating: 4.7,
    totalProducts: 28,
    totalSales: 750,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1583391733975-b72f1ac82257?w=800&h=400&fit=crop&q=80',
    verified: true,
    joinedAt: '2023-06-10'
  }
];

// Mock Users Data
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 9876543210',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b75bd3f2?w=150&h=150&fit=crop&q=80',
    location: 'Delhi, India',
    preferences: ['Traditional Kurtas', 'Designer Suits', 'Festive Wear'],
    createdAt: '2024-01-10'
  },
  {
    id: 'user2',
    name: 'Anita Gupta',
    email: 'anita.gupta@example.com',
    phone: '+91 9876543211',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&q=80',
    location: 'Mumbai, India',
    preferences: ['Sarees', 'Wedding Collection', 'Accessories'],
    createdAt: '2024-01-15'
  }
];

// Mock Orders Data
export const mockOrders: Order[] = [
  {
    id: 'ord1',
    customerId: 'user1',
    artisanId: 'art1',
    productId: '1',
    quantity: 1,
    totalAmount: 2500,
    status: 'confirmed',
    orderDate: '2024-02-10',
    expectedDelivery: '2024-02-20',
    shippingAddress: '123 Main Street, Delhi, India'
  },
  {
    id: 'ord2',
    customerId: 'user2',
    artisanId: 'art2',
    productId: '2',
    quantity: 1,
    totalAmount: 8000,
    status: 'shipped',
    orderDate: '2024-02-12',
    expectedDelivery: '2024-02-22',
    shippingAddress: '456 Oak Avenue, Mumbai, India'
  }
];

// Mock Chat Messages
export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg1',
    senderId: 'user1',
    receiverId: 'art1',
    message: 'Hello! I\'m interested in your white kurta. Is it available in size M?',
    messageHi: 'नमस्ते! मुझे आपके सफेद कुर्ते में दिलचस्पी है। क्या यह M साइज़ में उपलब्ध है?',
    timestamp: '2024-02-15T10:30:00Z',
    read: true
  },
  {
    id: 'msg2',
    senderId: 'art1',
    receiverId: 'user1',
    message: 'Thank you for your interest! Yes, it\'s available in size M. Would you like to place an order?',
    messageHi: 'आपकी रुचि के लिए धन्यवाद! हां, यह M साइज़ में उपलब्ध है। क्या आप ऑर्डर देना चाहेंगे?',
    timestamp: '2024-02-15T10:32:00Z',
    read: true
  }
];

