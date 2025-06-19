
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Heart, 
  Share, 
  Star, 
  MessageCircle, 
  ShoppingCart,
  User,
  MapPin,
  Award
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { LanguageToggle } from "@/components/LanguageToggle";
import { cn } from "@/lib/utils";

const ProductDetails = () => {
  const { id } = useParams();
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [isFavorite, setIsFavorite] = useState(false);

  const content = {
    en: {
      backToMarket: "Back to Market",
      addToCart: "Add to Cart",
      buyNow: "Buy Now",
      sendMessage: "Send Message",
      description: "Description",
      artisanInfo: "Artisan Information",
      experience: "years experience",
      location: "Lucknow, Uttar Pradesh",
      rating: "4.8 (124 reviews)",
      verified: "Verified Artisan",
      relatedProducts: "Related Products",
      specifications: "Specifications",
      material: "Material",
      size: "Size",
      care: "Care Instructions"
    },
    hi: {
      backToMarket: "बाज़ार में वापस जाएं",
      addToCart: "कार्ट में जोड़ें",
      buyNow: "अभी खरीदें",
      sendMessage: "संदेश भेजें",
      description: "विवरण",
      artisanInfo: "कारीगर की जानकारी",
      experience: "साल का अनुभव",
      location: "लखनऊ, उत्तर प्रदेश",
      rating: "4.8 (124 समीक्षाएं)",
      verified: "सत्यापित कारीगर",
      relatedProducts: "संबंधित उत्पाद",
      specifications: "विनिर्देश",
      material: "सामग्री",
      size: "साइज़",
      care: "देखभाल निर्देश"
    }
  };

  // Mock product data
  const product = {
    id: 1,
    name: "Traditional White Kurta",
    nameHi: "पारंपरिक सफेद कुर्ता",
    price: "₹2,500",
    originalPrice: "₹3,000",
    images: [
      "https://i.etsystatic.com/16387285/r/il/0dfa61/2532111172/il_fullxfull.2532111172_hl3g.jpg",
      "https://5.imimg.com/data5/SELLER/Default/2022/12/DH/ND/LH/60400022/chikankari-white-kurta-500x500.jpg",
      "https://cdn.shopify.com/s/files/1/0578/7162/7685/products/IMG_0425_1024x1024.jpg?v=1640264092"
    ],
    description: "Beautiful hand-embroidered white kurta with traditional chikankari work. Perfect for festivals and special occasions.",
    descriptionHi: "पारंपरिक चिकनकारी काम के साथ सुंदर हाथ से कढ़ाई किया गया सफेद कुर्ता। त्योहारों और विशेष अवसरों के लिए बिल्कुल सही।",
    artisan: {
      name: "राम कुमार",
      experience: 15,
      rating: 4.8,
      reviews: 124,
      verified: true
    },
    specifications: {
      material: "Pure Cotton",
      materialHi: "शुद्ध कपास",
      size: "M, L, XL",
      care: "Hand wash only",
      careHi: "केवल हाथ से धोएं"
    }
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4 sticky top-0 z-10 dark:bg-gray-900/80 dark:border-gray-700">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <Link to="/marketplace" className="p-2 hover:bg-white/50 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6 text-indigo-600" />
          </Link>
          <div className="flex items-center gap-2">
            <LanguageToggle language={language} onLanguageChange={setLanguage} />
            <Button variant="ghost" size="icon">
              <Share className="w-5 h-5 text-indigo-600" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={cn(
                "w-5 h-5",
                isFavorite ? "fill-rose-500 text-rose-500" : "text-indigo-600"
              )} />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Product Images */}
        <div className="relative lg:sticky lg:top-20">
          <img 
            src={product.images[currentImageIndex]} 
            alt={product.name}
            className="w-full h-80 md:h-96 lg:h-[500px] object-cover rounded-lg"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={cn(
                  "w-3 h-3 md:w-4 md:h-4 rounded-full transition-colors",
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                )}
              />
            ))}
          </div>
          
          {/* Thumbnail images for desktop */}
          <div className="hidden lg:flex mt-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={cn(
                  "w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors",
                  index === currentImageIndex ? "border-indigo-600" : "border-gray-200"
                )}
              >
                <img 
                  src={image} 
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 md:p-6 lg:p-8 space-y-6">
          {/* Product Info */}
          <div>
            <h1 className={cn(
              "text-2xl font-bold text-indigo-900 dark:text-indigo-100 mb-2",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {language === 'hi' ? product.nameHi : product.name}
            </h1>
            
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-bold text-indigo-600">{product.price}</span>
              <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                17% OFF
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.artisan.rating} ({product.artisan.reviews} reviews)</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Mobile buttons */}
            <div className="lg:hidden grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className={cn(
                  "flex items-center gap-2",
                  language === 'hi' ? 'hindi-text' : ''
                )}
              >
                <MessageCircle className="w-4 h-4" />
                {content[language].sendMessage}
              </Button>
              <Button className={cn(
                "bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                <ShoppingCart className="w-4 h-4" />
                {content[language].addToCart}
              </Button>
            </div>
            
            {/* Desktop buttons */}
            <div className="hidden lg:flex gap-4">
              <Button 
                variant="outline" 
                size="lg"
                className={cn(
                  "flex-1 flex items-center gap-2",
                  language === 'hi' ? 'hindi-text' : ''
                )}
              >
                <MessageCircle className="w-5 h-5" />
                {content[language].sendMessage}
              </Button>
              <Button 
                size="lg"
                className={cn(
                  "flex-1 bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2",
                  language === 'hi' ? 'hindi-text' : ''
                )}
              >
                <ShoppingCart className="w-5 h-5" />
                {content[language].addToCart}
              </Button>
              <Button 
                size="lg"
                className={cn(
                  "flex-1 bg-rose-600 hover:bg-rose-700 text-white",
                  language === 'hi' ? 'hindi-text' : ''
                )}
              >
                {content[language].buyNow}
              </Button>
            </div>
          </div>

          {/* Description */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/80 dark:border-gray-700">
            <CardContent className="p-4">
              <h3 className={cn(
                "font-semibold text-indigo-900 dark:text-indigo-100 mb-3",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {content[language].description}
              </h3>
              <p className={cn(
                "text-gray-700 dark:text-gray-300 leading-relaxed",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {language === 'hi' ? product.descriptionHi : product.description}
              </p>
            </CardContent>
          </Card>

          {/* Specifications */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/80 dark:border-gray-700">
            <CardContent className="p-4">
              <h3 className={cn(
                "font-semibold text-indigo-900 mb-3",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {content[language].specifications}
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className={cn(
                    "text-gray-600",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].material}:
                  </span>
                  <span className={cn(
                    "font-medium",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {language === 'hi' ? product.specifications.materialHi : product.specifications.material}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={cn(
                    "text-gray-600",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].size}:
                  </span>
                  <span className="font-medium">{product.specifications.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className={cn(
                    "text-gray-600",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].care}:
                  </span>
                  <span className={cn(
                    "font-medium",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {language === 'hi' ? product.specifications.careHi : product.specifications.care}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Artisan Info */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/80 dark:border-gray-700">
            <CardContent className="p-4">
              <h3 className={cn(
                "font-semibold text-indigo-900 mb-3",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {content[language].artisanInfo}
              </h3>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-rose-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-indigo-600" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={cn(
                      "font-semibold text-indigo-900",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      {product.artisan.name}
                    </h4>
                    {product.artisan.verified && (
                      <Award className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{content[language].location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{product.artisan.experience} {content[language].experience}</span>
                      <span>•</span>
                      <span>{content[language].rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Action Bar - Only show on mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t p-4 dark:bg-gray-900/90 dark:border-gray-700">
        <div className="max-w-md mx-auto">
          <Button className={cn(
            "w-full bg-indigo-600 hover:bg-indigo-700 text-lg py-3",
            language === 'hi' ? 'hindi-text' : ''
          )}>
            {content[language].buyNow}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
