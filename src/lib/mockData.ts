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
      'https://i.etsystatic.com/16387285/r/il/0dfa61/2532111172/il_fullxfull.2532111172_hl3g.jpg',
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
      'https://i.pinimg.com/originals/5a/84/73/5a84735805fd42d409e212dd213b7c7d.jpg'
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
      'https://img2.exportersindia.com/product_images/bc-full/2021/1/6393585/rayon-chikan-designer-palazzo-pant-1611413964-5700458.jpeg'
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
      'https://www.dress365days.com/cdn/shop/products/powder-blue-chikankari-anarkali-suit-966_1445x.jpg?v=1626543406',
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
      'https://5.imimg.com/data5/SELLER/Default/2023/12/371266183/GT/FB/JN/200513343/ok-4-500x500.jpg'
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
  },
  {
    id: '6',
    name: 'Black Georgette Kurta Set',
    nameHi: 'काला जॉर्जेट कुर्ता सेट',
    description: 'Sophisticated black georgette kurta with silver chikan embroidery. Elegant choice for evening occasions.',
    descriptionHi: 'चांदी की चिकन कढ़ाई के साथ परिष्कृत काला जॉर्जेट कुर्ता। शाम के अवसरों के लिए सुंदर विकल्प।',
    price: 3800,
    images: [
      'https://5.imimg.com/data5/SELLER/Default/2023/8/335735419/EZ/AK/KF/194846391/georgette-chikan-lucknowi-kurti-inner-set-1000x1000.jpg'
    ],
    category: 'Kurtas',
    categoryHi: 'कुर्ते',
    artisanId: 'art3',
    artisanName: 'Mohan Lal',
    artisanNameHi: 'मोहन लाल',
    rating: 4.7,
    reviews: 32,
    inStock: true,
    tags: ['Black', 'Georgette', 'Silver', 'Evening'],
    tagsHi: ['काला', 'जॉर्जेट', 'चांदी', 'शाम'],
    createdAt: '2024-02-08'
  },
  {
    id: '7',
    name: 'Mint Green Cotton Sharara',
    nameHi: 'मिंट ग्रीन कॉटन शरारा',
    description: 'Fresh mint green cotton sharara set with delicate white chikan work. Perfect for summer festivities.',
    descriptionHi: 'नाजुक सफेद चिकन काम के साथ ताज़ा मिंट ग्रीन कॉटन शरारा सेट। गर्मियों के त्योहारों के लिए आदर्श।',
    price: 4200,
    images: [
      'https://www.suratwholesaleshop.com/images/650/data/2021y/December/28255/Traditional-Wear-Dark-Green-Chikan-Work-Cotton-Sharara-VPC53-7.jpg'
    ],
    category: 'Sets',
    categoryHi: 'सेट्स',
    artisanId: 'art2',
    artisanName: 'Sunita Devi',
    artisanNameHi: 'सुनीता देवी',
    rating: 4.6,
    reviews: 28,
    inStock: true,
    tags: ['Mint Green', 'Cotton', 'Summer', 'Sharara'],
    tagsHi: ['मिंट ग्रीन', 'कॉटन', 'गर्मी', 'शरारा'],
    createdAt: '2024-02-10'
  },
  {
    id: '8',
    name: 'Lavender Silk Anarkali',
    nameHi: 'लैवेंडर सिल्क अनारकली',
    description: 'Graceful lavender silk anarkali with intricate chikan embroidery. Perfect for formal events and celebrations.',
    descriptionHi: 'जटिल चिकन कढ़ाई के साथ सुंदर लैवेंडर सिल्क अनारकली। औपचारिक कार्यक्रमों और उत्सवों के लिए आदर्श।',
    price: 6800,
    images: [
      'https://chikankaricloset.com/wp-content/uploads/2022/12/Lavender_Anarkali1.jpg'
    ],
    category: 'Suits',
    categoryHi: 'सूट्स',
    artisanId: 'art1',
    artisanName: 'Ram Kumar',
    artisanNameHi: 'राम कुमार',
    rating: 4.8,
    reviews: 22,
    inStock: true,
    tags: ['Lavender', 'Silk', 'Formal', 'Celebration'],
    tagsHi: ['लैवेंडर', 'सिल्क', 'औपचारिक', 'उत्सव'],
    createdAt: '2024-02-12'
  },
  {
    id: '9',
    name: 'Coral Cotton Kurti',
    nameHi: 'कोरल कॉटन कुर्ती',
    description: 'Vibrant coral cotton kurti with traditional chikan patterns. Comfortable for daily wear and casual outings.',
    descriptionHi: 'पारंपरिक चिकन पैटर्न के साथ जीवंत कोरल कॉटन कुर्ती। दैनिक पहनने और आकस्मिक बाहर जाने के लिए आरामदायक।',
    price: 1850,
    images: [
      'https://tse4.mm.bing.net/th?id=OIP.XEMPs_onr7nq5w_fh2cpFwHaJD&pid=Api&P=0&h=180'
    ],
    category: 'Kurtas',
    categoryHi: 'कुर्ते',
    artisanId: 'art3',
    artisanName: 'Mohan Lal',
    artisanNameHi: 'मोहन लाल',
    rating: 4.5,
    reviews: 35,
    inStock: true,
    tags: ['Coral', 'Cotton', 'Daily Wear', 'Casual'],
    tagsHi: ['कोरल', 'कॉटन', 'दैनिक पहनावा', 'आकस्मिक'],
    createdAt: '2024-02-15'
  },
  {
    id: '10',
    name: 'Peach Georgette Lehenga',
    nameHi: 'पीच जॉर्जेट लहंगा',
    description: 'Stunning peach georgette lehenga with heavy chikan embroidery. Perfect for weddings and grand celebrations.',
    descriptionHi: 'भारी चिकन कढ़ाई के साथ आश्चर्यजनक पीच जॉर्जेट लहंगा। शादियों और भव्य उत्सवों के लिए आदर्श।',
    price: 12500,
    images: [
      'https://images.cbazaar.com/images/salmon-peach-georgette-sequins-embroidery-umbrella-lehenga-ghsli13287702-l.jpg'
    ],
    category: 'Lehengas',
    categoryHi: 'लहंगे',
    artisanId: 'art2',
    artisanName: 'Sunita Devi',
    artisanNameHi: 'सुनीता देवी',
    rating: 4.9,
    reviews: 15,
    inStock: true,
    tags: ['Peach', 'Georgette', 'Wedding', 'Heavy Work'],
    tagsHi: ['पीच', 'जॉर्जेट', 'शादी', 'भारी काम'],
    createdAt: '2024-02-18'
  },
  {
    id: '11',
    name: 'Mustard Yellow Palazzo Set',
    nameHi: 'सरसों पीला पलाज़ो सेट',
    description: 'Bright mustard yellow palazzo set with contemporary chikan designs. Modern twist on traditional embroidery.',
    descriptionHi: 'समकालीन चिकन डिज़ाइन के साथ चमकीला सरसों पीला पलाज़ो सेट। पारंपरिक कढ़ाई पर आधुनिक मोड़।',
    price: 3500,
    images: [
      'https://pictures.kartmax.in/inside/live/1600x1200/quality=6/sites/9s145MyZrWdIAwpU0JYS/product-images/mustard_yellow_palazzo_suit_in_silk_1709095138as2911092_2.jpg'
    ],
    category: 'Sets',
    categoryHi: 'सेट्स',
    artisanId: 'art3',
    artisanName: 'Mohan Lal',
    artisanNameHi: 'मोहन लाल',
    rating: 4.4,
    reviews: 19,
    inStock: true,
    tags: ['Mustard', 'Yellow', 'Contemporary', 'Modern'],
    tagsHi: ['सरसों', 'पीला', 'समकालीन', 'आधुनिक'],
    createdAt: '2024-02-20'
  },
  {
    id: '12',
    name: 'Ivory Wedding Saree',
    nameHi: 'हाथी दांत शादी साड़ी',
    description: 'Exquisite ivory silk saree with golden chikan embroidery. Premium choice for bridal occasions.',
    descriptionHi: 'सुनहरी चिकन कढ़ाई के साथ उत्कृष्ट हाथी दांत रंग की सिल्क साड़ी। दुल्हन के अवसरों के लिए प्रीमियम विकल्प।',
    price: 15000,
    images: [
      'https://i.pinimg.com/originals/f2/f5/c2/f2f5c21cbd3f5223252908b35ad978e9.jpg'
    ],
    category: 'Sarees',
    categoryHi: 'साड़ियां',
    artisanId: 'art1',
    artisanName: 'Ram Kumar',
    artisanNameHi: 'राम कुमार',
    rating: 5.0,
    reviews: 8,
    inStock: true,
    tags: ['Ivory', 'Wedding', 'Bridal', 'Premium'],
    tagsHi: ['हाथी दांत', 'शादी', 'दुल्हन', 'प्रीमियम'],
    createdAt: '2024-02-22'
  },
  {
    id: '13',
    name: 'Turquoise Cotton Kurta',
    nameHi: 'फिरोज़ा कॉटन कुर्ता',
    description: 'Beautiful turquoise cotton kurta with white chikan embroidery. Perfect for summer festivals and casual wear.',
    descriptionHi: 'सफेद चिकन कढ़ाई के साथ सुंदर फिरोज़ा कॉटन कुर्ता। गर्मियों के त्योहारों और आकस्मिक पहनने के लिए आदर्श।',
    price: 2200,
    images: [
      'https://www.dollsofindia.com/images/p/mobile-2x-large_thumbnails/ladies-kurtas/turquoise-blue-kurti-with-lucknow-chikan-embroidery-KA57.jpg'
    ],
    category: 'Kurtas',
    categoryHi: 'कुर्ते',
    artisanId: 'art2',
    artisanName: 'Sunita Devi',
    artisanNameHi: 'सुनीता देवी',
    rating: 4.6,
    reviews: 41,
    inStock: true,
    tags: ['Turquoise', 'Cotton', 'Summer', 'Festival'],
    tagsHi: ['फिरोज़ा', 'कॉटन', 'गर्मी', 'त्योहार'],
    createdAt: '2024-02-25'
  },
  {
    id: '14',
    name: 'Burgundy Velvet Jacket',
    nameHi: 'बरगंडी वेलवेट जैकेट',
    description: 'Luxurious burgundy velvet jacket with gold chikan embroidery. Perfect for winter festivities and formal events.',
    descriptionHi: 'सुनहरी चिकन कढ़ाई के साथ शानदार बरगंडी वेलवेट जैकेट। सर्दियों के त्योहारों और औपचारिक कार्यक्रमों के लिए आदर्श।',
    price: 5800,
    images: [
      'http://fledglingwings.com/cdn/shop/products/blue-chikankari-jacket-11648026BL-2.jpeg?v=1674481867'
    ],
    category: 'Accessories',
    categoryHi: 'एक्सेसरीज',
    artisanId: 'art3',
    artisanName: 'Mohan Lal',
    artisanNameHi: 'मोहन लाल',
    rating: 4.7,
    reviews: 16,
    inStock: true,
    tags: ['Burgundy', 'Velvet', 'Winter', 'Formal'],
    tagsHi: ['बरगंडी', 'वेलवेट', 'सर्दी', 'औपचारिक'],
    createdAt: '2024-02-28'
  },
  {
    id: '15',
    name: 'Rose Gold Tissue Saree',
    nameHi: 'रोज़ गोल्ड टिश्यू साड़ी',
    description: 'Elegant rose gold tissue saree with delicate chikan work. Perfect for cocktail parties and evening events.',
    descriptionHi: 'नाजुक चिकन काम के साथ सुंदर रोज़ गोल्ड टिश्यू साड़ी। कॉकटेल पार्टियों और शाम के कार्यक्रमों के लिए आदर्श।',
    price: 9500,
    images: [
      'https://static.wixstatic.com/media/a4bd5c_6208bda49c884b0d80d1e2328f82ec75~mv2.jpg/v1/fill/w_602,h_962,al_c,q_85,enc_auto/a4bd5c_6208bda49c884b0d80d1e2328f82ec75~mv2.jpg'
    ],
    category: 'Sarees',
    categoryHi: 'साड़ियां',
    artisanId: 'art1',
    artisanName: 'Ram Kumar',
    artisanNameHi: 'राम कुमार',
    rating: 4.8,
    reviews: 25,
    inStock: true,
    tags: ['Rose Gold', 'Tissue', 'Cocktail', 'Evening'],
    tagsHi: ['रोज़ गोल्ड', 'टिश्यू', 'कॉकटेल', 'शाम'],
    createdAt: '2024-03-02'
  },
  {
    id: '16',
    name: 'Olive Green Straight Suit',
    nameHi: 'ऑलिव ग्रीन स्ट्रेट सूट',
    description: 'Contemporary olive green straight suit with modern chikan patterns. Perfect for office wear and formal meetings.',
    descriptionHi: 'आधुनिक चिकन पैटर्न के साथ समकालीन ऑलिव ग्रीन स्ट्रेट सूट। ऑफिस वियर और औपचारिक बैठकों के लिए आदर्श।',
    price: 4100,
    images: [
      'https://www.exoticindiaart.com/images/products/original/salwarkameez/light_olive_green_lukhnavi_chikan_suit_with_allover_kq67.webp'
    ],
    category: 'Suits',
    categoryHi: 'सूट्स',
    artisanId: 'art2',
    artisanName: 'Sunita Devi',
    artisanNameHi: 'सुनीता देवी',
    rating: 4.5,
    reviews: 33,
    inStock: true,
    tags: ['Olive Green', 'Office Wear', 'Contemporary', 'Formal'],
    tagsHi: ['ऑलिव ग्रीन', 'ऑफिस वियर', 'समकालीन', 'औपचारिक'],
    createdAt: '2024-03-05'
  },
  {
    id: '17',
    name: 'Powder Blue Gharara Set',
    nameHi: 'पाउडर ब्लू गरारा सेट',
    description: 'Graceful powder blue gharara set with traditional chikan embroidery. Perfect for ethnic celebrations and festivals.',
    descriptionHi: 'पारंपरिक चिकन कढ़ाई के साथ सुंदर पाउडर ब्लू गरारा सेट। जातीय उत्सवों और त्योहारों के लिए आदर्श।',
    price: 4800,
    images: [
     'https://5.imimg.com/data5/ECOM/Default/2023/10/349835609/SW/MC/JI/199616435/20230415060244-img-0379-01-1200x-20399917-5169-4f32-8ea1-789912bb5155-500x500.jpg'
    ],
    category: 'Sets',
    categoryHi: 'सेट्स',
    artisanId: 'art3',
    artisanName: 'Mohan Lal',
    artisanNameHi: 'मोहन लाल',
    rating: 4.6,
    reviews: 27,
    inStock: true,
    tags: ['Powder Blue', 'Gharara', 'Traditional', 'Festival'],
    tagsHi: ['पाउडर ब्लू', 'गरारा', 'पारंपरिक', 'त्योहार'],
    createdAt: '2024-03-08'
  },
  {
    id: '18',
    name: 'Maroon Silk Dupatta',
    nameHi: 'मैरून सिल्क दुपट्टा',
    description: 'Rich maroon silk dupatta with gold chikan embroidery. Adds elegance to any traditional outfit.',
    descriptionHi: 'सुनहरी चिकन कढ़ाई के साथ समृद्ध मैरून सिल्क दुपट्टा। किसी भी पारंपरिक पोशाक में सुंदरता जोड़ता है।',
    price: 2800,
    images: [
      'https://i.pinimg.com/originals/37/e4/b9/37e4b91b729fd74227432ecaa426c1e9.jpg'
    ],
    category: 'Accessories',
    categoryHi: 'एक्सेसरीज',
    artisanId: 'art1',
    artisanName: 'Ram Kumar',
    artisanNameHi: 'राम कुमार',
    rating: 4.7,
    reviews: 38,
    inStock: true,
    tags: ['Maroon', 'Silk', 'Gold Work', 'Traditional'],
    tagsHi: ['मैरून', 'सिल्क', 'सोने का काम', 'पारंपरिक'],
    createdAt: '2024-03-10'
  },
  {
    id: '19',
    name: 'Champagne Net Anarkali',
    nameHi: 'शैम्पेन नेट अनारकली',
    description: 'Luxurious champagne net anarkali with pearl and chikan work. Perfect for engagement ceremonies and receptions.',
    descriptionHi: 'मोती और चिकन काम के साथ शानदार शैम्पेन नेट अनारकली। सगाई समारोह और रिसेप्शन के लिए आदर्श।',
    price: 8500,
    images: [
      'https://5.imimg.com/data5/SELLER/Default/2022/11/LX/BE/TC/99699643/yog-anarkali-1000x1000.jpg'
    ],
    category: 'Suits',
    categoryHi: 'सूट्स',
    artisanId: 'art2',
    artisanName: 'Sunita Devi',
    artisanNameHi: 'सुनीता देवी',
    rating: 4.9,
    reviews: 14,
    inStock: true,
    tags: ['Champagne', 'Net', 'Pearl Work', 'Reception'],
    tagsHi: ['शैम्पेन', 'नेट', 'मोती का काम', 'रिसेप्शन'],
    createdAt: '2024-03-12'
  },
  {
    id: '20',
    name: 'Electric Blue Cotton Kurti',
    nameHi: 'इलेक्ट्रिक ब्लू कॉटन कुर्ती',
    description: 'Vibrant electric blue cotton kurti with silver chikan embroidery. Modern design perfect for young professionals.',
    descriptionHi: 'चांदी की चिकन कढ़ाई के साथ जीवंत इलेक्ट्रिक ब्लू कॉटन कुर्ती। युवा पेशेवरों के लिए आदर्श आधुनिक डिज़ाइन।',
    price: 2400,
    images: [
      'https://5.imimg.com/data5/SELLER/Default/2024/2/388509980/IJ/PP/EO/30209956/ladies-skyblue-chikan-kurti-500x500.jpg'
    ],
    category: 'Kurtas',
    categoryHi: 'कुर्ते',
    artisanId: 'art3',
    artisanName: 'Mohan Lal',
    artisanNameHi: 'मोहन लाल',
    rating: 4.4,
    reviews: 45,
    inStock: true,
    tags: ['Electric Blue', 'Cotton', 'Modern', 'Professional'],
    tagsHi: ['इलेक्ट्रिक ब्लू', 'कॉटन', 'आधुनिक', 'पेशेवर'],
    createdAt: '2024-03-15'
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

