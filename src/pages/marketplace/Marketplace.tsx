import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Star, Heart, MapPin } from "lucide-react";
import { MobileNav } from "@/components/layout/MobileNav";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const Marketplace = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [searchQuery, setSearchQuery] = useState('');

  const content = {
    en: {
      marketplace: "Marketplace",
      search: "Search products...",
      filters: "Filters",
      featured: "Featured Products",
      viewAll: "View All",
      by: "by",
      rating: "rating"
    },
    hi: {
      marketplace: "बाज़ार",
      search: "उत्पाद खोजें...",
      filters: "फ़िल्टर",
      featured: "विशेष उत्पाद",
      viewAll: "सभी देखें",
      by: "द्वारा",
      rating: "रेटिंग"
    }
  };

  // Mock product data
  const products = [
    {
      id: 1,
      name: "Traditional White Kurta",
      nameHi: "पारंपरिक सफेद कुर्ता",
      price: "₹2,500",
      artisan: "राम कुमार",
      rating: 4.8,
      image: "/placeholder.svg",
      isFavorite: false
    },
    {
      id: 2,
      name: "Elegant Chikan Saree",
      nameHi: "सुंदर चिकन साड़ी",
      price: "₹8,000",
      artisan: "सुनीता देवी",
      rating: 4.9,
      image: "/placeholder.svg",
      isFavorite: true
    },
    {
      id: 3,
      name: "Designer Palazzo Set",
      nameHi: "डिज़ाइनर पलाज़ो सेट",
      price: "₹3,200",
      artisan: "मोहन लाल",
      rating: 4.7,
      image: "/placeholder.svg",
      isFavorite: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
        <div className="flex justify-between items-center max-w-md mx-auto mb-4">
          <h1 className={cn(
            "text-xl font-bold text-indigo-900",
            language === 'hi' ? 'hindi-text' : ''
          )}>
            {content[language].marketplace}
          </h1>
          <LanguageToggle language={language} onLanguageChange={setLanguage} />
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={content[language].search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        {/* Featured Section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className={cn(
            "text-lg font-semibold text-indigo-900",
            language === 'hi' ? 'hindi-text' : ''
          )}>
            {content[language].featured}
          </h2>
          <Button variant="ghost" size="sm" className={cn(
            "text-indigo-600",
            language === 'hi' ? 'hindi-text' : ''
          )}>
            {content[language].viewAll}
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <Link key={product.id} to={`/marketplace/product/${product.id}`}>
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all hover-lift">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                    <button 
                      className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full"
                      onClick={(e) => {
                        e.preventDefault();
                        // Handle favorite toggle
                      }}
                    >
                      <Heart className={cn(
                        "w-4 h-4",
                        product.isFavorite ? "fill-rose-500 text-rose-500" : "text-gray-600"
                      )} />
                    </button>
                  </div>
                  
                  <div className="p-3">
                    <h3 className={cn(
                      "font-semibold text-indigo-900 text-sm mb-1 line-clamp-2",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      {language === 'hi' ? product.nameHi : product.name}
                    </h3>
                    
                    <p className="text-lg font-bold text-indigo-600 mb-2">
                      {product.price}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span className={cn(
                        language === 'hi' ? 'hindi-text' : ''
                      )}>
                        {content[language].by} {product.artisan}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <MobileNav language={language} />
    </div>
  );
};

export default Marketplace;
