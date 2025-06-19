import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Star, Heart, MapPin, ShoppingCart, Plus } from "lucide-react";
import { MobileNav } from "@/components/layout/MobileNav";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/mockData";
import api from "@/lib/mockApi";
import { toast } from "sonner";

const Marketplace = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(true);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const content = {
    en: {
      marketplace: "Marketplace",
      search: "Search products...",
      filters: "Filters",
      featured: "Featured Products",
      viewAll: "View All",
      by: "by",
      rating: "rating",
      addToCart: "Add to Cart",
      addedToCart: "Added to Cart!",
      loading: "Loading products...",
      noProducts: "No products found",
      searchHint: "Try searching for kurta, saree, or palazzo"
    },
    hi: {
      marketplace: "बाज़ार",
      search: "उत्पाद खोजें...",
      filters: "फ़िल्टर",
      featured: "विशेष उत्पाद",
      viewAll: "सभी देखें",
      by: "द्वारा",
      rating: "रेटिंग",
      addToCart: "कार्ट में जोड़ें",
      addedToCart: "कार्ट में जोड़ा गया!",
      loading: "उत्पाद लोड हो रहे हैं...",
      noProducts: "कोई उत्पाद नहीं मिला",
      searchHint: "कुर्ता, साड़ी, या पलाज़ो खोजें"
    }
  };

  // Load products on component mount
  useEffect(() => {
    checkAndRefreshData();
  }, []);

  // Search products when query changes
  useEffect(() => {
    if (searchQuery.trim()) {
      searchProducts();
    } else {
      filterProducts();
    }
  }, [searchQuery, allProducts, showFeaturedOnly]);

  const checkAndRefreshData = async () => {
    try {
      // Check if data needs refresh
      const dataCheck = api.util.checkDataVersion();
      console.log(`Data check: current=${dataCheck.currentCount}, expected=${dataCheck.expectedCount}, needsRefresh=${dataCheck.needsRefresh}`);
      
      if (dataCheck.needsRefresh) {
        console.log(`Refreshing data: found ${dataCheck.currentCount} products, expected ${dataCheck.expectedCount}`);
        api.util.refreshData();
        toast.success(`Updated product catalog! Now showing ${dataCheck.expectedCount} products.`);
      }
      await loadProducts();
    } catch (error) {
      console.error('Failed to check/refresh data:', error);
      await loadProducts(); // Fallback to normal load
    }
  };

  const filterProducts = () => {
    if (showFeaturedOnly && !searchQuery.trim()) {
      // Show only first 8 products as "featured"
      setProducts(allProducts.slice(0, 8));
    } else {
      setProducts(allProducts);
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const productsData = await api.products.getProducts();
      setAllProducts(productsData);
      // Initially show only featured products (first 8)
      setProducts(productsData.slice(0, 8));
    } catch (error) {
      console.error('Failed to load products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = async () => {
    try {
      setLoading(true);
      const productsData = await api.products.getProducts({ search: searchQuery });
      setProducts(productsData);
      // When searching, we show all results regardless of featured setting
      setShowFeaturedOnly(false);
    } catch (error) {
      console.error('Failed to search products:', error);
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
      toast.success('Removed from favorites');
    } else {
      newFavorites.add(productId);
      toast.success('Added to favorites');
    }
    setFavorites(newFavorites);
  };

  const addToCart = (productId: string, productName: string) => {
    api.cart.addToCart(productId, 1);
    toast.success(content[language].addedToCart);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4 dark:bg-gray-900/80 dark:border-gray-700">
        <div className="flex justify-between items-center max-w-7xl mx-auto mb-4">
          <h1 className={cn(
            "text-xl md:text-2xl lg:text-3xl font-bold text-indigo-900 dark:text-indigo-100",
            language === 'hi' ? 'hindi-text' : ''
          )}>{content[language].marketplace}</h1>
          <LanguageToggle language={language} onLanguageChange={setLanguage} />
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={content[language].search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>
          <Button variant="outline" size="icon" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">

        {/* Featured Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className={cn(
            "text-lg md:text-xl lg:text-2xl font-semibold text-indigo-900 dark:text-indigo-100",
            language === 'hi' ? 'hindi-text' : ''
          )}>
            {content[language].featured}
          </h2>
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "text-indigo-600 md:text-base",
              language === 'hi' ? 'hindi-text' : ''
            )}
            onClick={() => {
              if (showFeaturedOnly) {
                // Switch to showing all products
                setShowFeaturedOnly(false);
                setProducts(allProducts);
                toast.success(`Showing all ${allProducts.length} products`);
              } else {
                // Switch to showing only featured products
                setShowFeaturedOnly(true);
                setProducts(allProducts.slice(0, 8));
                toast.success('Showing featured products');
              }
            }}
          >
            {showFeaturedOnly ? content[language].viewAll : (language === 'hi' ? 'केवल चुनिंदा' : 'Show Featured')}
          </Button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-100 to-rose-100 rounded-full flex items-center justify-center animate-pulse dark:from-indigo-900 dark:to-rose-900">
              <Search className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <p className={cn(
              "text-gray-600 dark:text-gray-400",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].loading}
            </p>
          </div>
        )}

        {/* No Products State */}
        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-100 to-rose-100 rounded-full flex items-center justify-center dark:from-indigo-900 dark:to-rose-900">
              <Search className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className={cn(
              "text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-2",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].noProducts}
            </h3>
            <p className={cn(
              "text-gray-600 dark:text-gray-400",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].searchHint}
            </p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
            {products.map((product) => (
              <div key={product.id} className="relative">
                <Link to={`/marketplace/product/${product.id}`}>
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all hover-lift dark:bg-gray-800/80 dark:border-gray-700 h-full">
                    <CardContent className="p-0 h-full flex flex-col">
                      <div className="relative">
                        <img 
                          src={product.images[0]} 
                          alt={language === 'hi' ? product.nameHi : product.name}
                          className="w-full h-40 md:h-48 lg:h-52 object-cover rounded-t-lg"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://images.unsplash.com/photo-1583391733956-6c78c2018580?w=400&h=300&fit=crop&q=80';
                          }}
                        />
                        <button 
                          className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full dark:bg-gray-800/80 hover:bg-white transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite(product.id);
                          }}
                        >
                          <Heart className={cn(
                            "w-4 h-4 md:w-5 md:h-5",
                            favorites.has(product.id) ? "fill-rose-500 text-rose-500" : "text-gray-600 dark:text-gray-400"
                          )} />
                        </button>
                      </div>
                      
                      <div className="p-3 md:p-4 flex-1 flex flex-col">
                        <h3 className={cn(
                          "font-semibold text-indigo-900 dark:text-indigo-100 text-sm md:text-base mb-1 line-clamp-2 flex-1",
                          language === 'hi' ? 'hindi-text' : ''
                        )}>
                          {language === 'hi' ? product.nameHi : product.name}
                        </h3>
                        
                        <p className="text-lg md:text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                          ₹{product.price.toLocaleString()}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-3">
                          <span className={cn(
                            "truncate mr-2",
                            language === 'hi' ? 'hindi-text' : ''
                          )}>
                            {content[language].by} {language === 'hi' ? product.artisanNameHi : product.artisanName}
                          </span>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <Star className="w-3 h-3 md:w-4 md:h-4 fill-amber-400 text-amber-400" />
                            <span>{product.rating}</span>
                          </div>
                        </div>
                        
                        {/* Add to Cart Button */}
                        <Button 
                          size="sm" 
                          className={cn(
                            "w-full text-xs md:text-sm bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 mt-auto",
                            language === 'hi' ? 'hindi-text' : ''
                          )}
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(product.id, language === 'hi' ? product.nameHi : product.name);
                          }}
                        >
                          <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                          {content[language].addToCart}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <MobileNav language={language} />
    </div>
  );
};

export default Marketplace;
