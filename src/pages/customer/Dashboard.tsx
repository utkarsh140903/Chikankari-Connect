import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  Heart, 
  ShoppingBag, 
  Package, 
  Star, 
  TrendingUp,
  Clock,
  Gift,
  MapPin,
  User,
  ArrowRight,
  Plus,
  Search,
  Eye,
  Settings,
  Activity,
  Menu,
  X
} from "lucide-react";
import { MobileNav } from "@/components/layout/MobileNav";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { mockProducts } from "@/lib/mockData";
import { Link } from "react-router-dom";

const CustomerDashboard = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [isLoading, setIsLoading] = useState(true);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const { toast } = useToast();

  // Screen size detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 800);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  // Handler functions for interactive elements
  const handleStatClick = (statTitle: string) => {
    toast({
      title: statTitle,
      description: language === 'hi' 
        ? "विस्तृत दृश्य जल्द आ रहा है!"
        : "Detailed view coming soon!",
      variant: "default",
    });
  };

  const handleViewAllOrders = () => {
    toast({
      title: language === 'hi' ? "सभी ऑर्डर" : "All Orders",
      description: language === 'hi' 
        ? "ऑर्डर पेज पर जा रहे हैं..."
        : "Navigating to orders page...",
      variant: "default",
    });
  };


  const content = {
    en: {
      dashboard: "My Dashboard",
      welcome: "Welcome back, Priya!",
      stats: {
        orders: "Total Orders",
        favorites: "Saved Items",
        points: "Reward Points",
        reviews: "Reviews Given"
      },
      quickActions: {
        title: "Quick Actions",
        browseProducts: "Browse Products",
        favorites: "My Favorites",
        trackOrders: "Track Orders",
        findArtisans: "Find Artisans"
      },
      recentOrders: {
        title: "Recent Orders",
        viewAll: "View All Orders",
        noOrders: "No orders yet",
        startShopping: "Start exploring our beautiful Chikankari collection!"
      },
      recommendations: {
        title: "Recommended for You",
        basedOn: "Based on your preferences"
      },
      notifications: "Notifications",
      settings: "Settings",
      greeting: "Good morning"
    },
    hi: {
      dashboard: "मेरा डैशबोर्ड",
      welcome: "वापस स्वागत है, प्रिया!",
      stats: {
        orders: "कुल ऑर्डर",
        favorites: "सेव किए गए आइटम",
        points: "रिवार्ड पॉइंट्स",
        reviews: "दी गई समीक्षाएं"
      },
      quickActions: {
        title: "त्वरित कार्य",
        browseProducts: "उत्पाद ब्राउज़ करें",
        favorites: "मेरे पसंदीदा",
        trackOrders: "ऑर्डर ट्रैक करें",
        findArtisans: "कारीगर खोजें"
      },
      recentOrders: {
        title: "हाल के ऑर्डर",
        viewAll: "सभी ऑर्डर देखें",
        noOrders: "अभी तक कोई ऑर्डर नहीं",
        startShopping: "हमारे सुंदर चिकनकारी संग्रह की खोज शुरू करें!"
      },
      recommendations: {
        title: "आपके लिए सुझाव",
        basedOn: "आपकी प्राथमिकताओं के आधार पर"
      },
      notifications: "सूचनाएं",
      settings: "सेटिंग्स",
      greeting: "सुप्रभात"
    }
  };

  const stats = [
    {
      title: content[language].stats.orders,
      value: "12",
      icon: Package,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
      change: "+3 this month"
    },
    {
      title: content[language].stats.favorites,
      value: "28",
      icon: Heart,
      color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
      change: "+5 recently added"
    },
    {
      title: content[language].stats.points,
      value: "1,240",
      icon: Gift,
      color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
      change: "280 points earned"
    },
    {
      title: content[language].stats.reviews,
      value: "8",
      icon: Star,
                      color: "bg-white text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800",
      change: "Average 4.9 rating"
    }
  ];

  const quickActions = [
    {
      title: content[language].quickActions.browseProducts,
      icon: Search,
      color: "bg-indigo-600 hover:bg-indigo-700",
      path: "/marketplace"
    },
    {
      title: content[language].quickActions.favorites,
      icon: Heart,
      color: "bg-rose-600 hover:bg-rose-700",
      path: "/customer/favorites"
    },
    {
      title: content[language].quickActions.trackOrders,
      icon: Package,
      color: "bg-blue-600 hover:bg-blue-700",
      path: "/customer/orders"
    },
    {
      title: content[language].quickActions.findArtisans,
      icon: User,
      color: "bg-indigo-600 hover:bg-indigo-700",
      path: "/customer/artisans"
    }
  ];

  // Use mock data for recent orders and recommendations
  const recentOrders = mockProducts.slice(0, 2);
  const recommendations = mockProducts.slice(2, 5);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-md mx-auto p-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 pb-20 sm:pb-24 lg:pb-16 transition-colors duration-300">
      {/* Enhanced Header */}
      <header className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50 transition-all duration-300 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 sm:py-6">
            {/* Left section - Greeting and info */}
            <div className="flex-1 min-w-0 pr-4">
              <h1 className={cn(
                "text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-indigo-900 dark:text-indigo-100 leading-tight",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {content[language].greeting}, Priya!
              </h1>
              <p className={cn(
                "text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 mt-1 leading-relaxed",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {content[language].welcome.split(',')[1]?.trim() || 'Welcome to your personalized dashboard'}
              </p>
            </div>
            
            {/* Right section - Controls */}
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 ml-4">
              {/* Theme toggle - Hidden on mobile */}
              <div className="hidden md:block">
                <ThemeToggle />
              </div>
              
              {/* Language toggle */}
              <LanguageToggle language={language} onLanguageChange={setLanguage} />
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 sm:py-8 lg:py-10">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 xl:gap-10">
            {/* Left Column - Stats and Quick Actions */}
            <div className="xl:col-span-8 2xl:col-span-9">
              <div className="space-y-6 sm:space-y-8 lg:space-y-10">
                {/* Enhanced Stats Grid */}
                <section>
                  <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <h2 className={cn(
                      "text-xl sm:text-2xl lg:text-3xl font-bold text-indigo-900 dark:text-indigo-100",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      Your Overview
                    </h2>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-green-600 dark:text-green-400 font-medium">+12% this month</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                    {stats.map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <Card 
                          key={index} 
                          className="group cursor-pointer bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-0 shadow-lg hover:shadow-2xl dark:hover:shadow-indigo-500/25 transition-all duration-500 hover:scale-105 hover:-translate-y-1" 
                          onClick={() => handleStatClick(stat.title)}
                        >
                          <CardContent className="p-4 sm:p-5 lg:p-6">
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                              <div className={cn(
                                "w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3", 
                                stat.color
                              )}>
                                <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                              </div>
                              <div className="text-right">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              </div>
                            </div>
                            
                            <div className="space-y-1 sm:space-y-2">
                              <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-indigo-900 dark:text-indigo-100 leading-none">
                                {stat.value}
                              </p>
                              <p className={cn(
                                "text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-300 font-semibold line-clamp-2",
                                language === 'hi' ? 'hindi-text' : ''
                              )}>
                                {stat.title}
                              </p>
                              <p className="text-xs sm:text-sm text-green-600 dark:text-green-400 font-medium">
                                {stat.change}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </section>

                {/* Enhanced Quick Actions */}
                <section>
                  <div className="mb-6 sm:mb-8">
                    <h2 className={cn(
                      "text-xl sm:text-2xl lg:text-3xl font-bold text-indigo-900 dark:text-indigo-100 mb-2",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      {content[language].quickActions.title}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                      {language === 'hi' ? 'आपके लिए शॉर्टकट' : 'Quick shortcuts for you'}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                    {quickActions.map((action, index) => {
                      const Icon = action.icon;
                      const colorMap = {
                        indigo: { bg: 'bg-indigo-600', hover: 'hover:bg-indigo-700', icon: '#4f46e5', light: 'bg-indigo-50 dark:bg-indigo-900/20' },
                        rose: { bg: 'bg-rose-600', hover: 'hover:bg-rose-700', icon: '#e11d48', light: 'bg-rose-50 dark:bg-rose-900/20' },
                        blue: { bg: 'bg-blue-600', hover: 'hover:bg-blue-700', icon: '#2563eb', light: 'bg-blue-50 dark:bg-blue-900/20' },
                        emerald: { bg: 'bg-emerald-600', hover: 'hover:bg-emerald-700', icon: '#059669', light: 'bg-emerald-50 dark:bg-emerald-900/20' }
                      };
                      const colorKey = action.color.includes('indigo') ? 'indigo' : 
                                     action.color.includes('rose') ? 'rose' : 
                                     action.color.includes('blue') ? 'blue' : 'emerald';
                      const colors = colorMap[colorKey];
                      
                      return (
                        <Link key={index} to={action.path} className="group block">
                          <Card className="h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-0 shadow-lg hover:shadow-2xl dark:hover:shadow-indigo-500/25 transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2">
                            <CardContent className="p-4 sm:p-6 lg:p-8 text-center h-full flex flex-col justify-center">
                              <div className={cn(
                                "w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-3 sm:mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6",
                                colors.light
                              )}>
                                <Icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" style={{color: colors.icon}} />
                              </div>
                              <h3 className={cn(
                                "font-bold text-sm sm:text-base lg:text-lg text-indigo-900 dark:text-indigo-100 leading-tight",
                                language === 'hi' ? 'hindi-text' : ''
                              )}>
                                {action.title}
                              </h3>
                              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <ArrowRight className="w-4 h-4 text-indigo-500 mx-auto" />
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                  
                  {/* Mobile optimization hint */}
                  {screenSize === 'mobile' && (
                    <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                      <p className="text-xs text-indigo-700 dark:text-indigo-300 text-center">
                        💡 {language === 'hi' ? 'टिप: बेहतर अनुभव के लिए अपने फोन को घुमाएं' : 'Tip: Rotate your phone for better experience'}
                      </p>
                    </div>
                  )}
                </section>
              </div>
            </div>

            {/* Enhanced Right Column - Recent Orders and Recommendations */}
            <aside className="xl:col-span-4 2xl:col-span-3 mt-8 xl:mt-0">
              <div className="xl:sticky xl:top-32 space-y-6 sm:space-y-8">

                {/* Enhanced Recent Orders */}
                <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl dark:shadow-indigo-500/10 transition-all duration-300">
                  <CardHeader className="pb-4 sm:pb-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                      <div>
                        <CardTitle className={cn(
                          "text-lg sm:text-xl lg:text-2xl font-bold text-indigo-900 dark:text-indigo-100 flex items-center gap-2",
                          language === 'hi' ? 'hindi-text' : ''
                        )}>
                          <Package className="w-5 h-5 sm:w-6 sm:h-6" />
                          {content[language].recentOrders.title}
                        </CardTitle>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {language === 'hi' ? 'आपके हाल के ऑर्डर' : 'Your latest purchases'}
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 self-start sm:self-center" 
                        onClick={handleViewAllOrders}
                      >
                        <span className="hidden sm:inline">{content[language].recentOrders.viewAll}</span>
                        <span className="sm:hidden">View All</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6">
                    {recentOrders.length > 0 ? (
                      <div className="space-y-3 sm:space-y-4">
                        {recentOrders.map((order) => (
                          <div 
                            key={order.id} 
                            className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-600/50 hover:from-indigo-50 hover:to-rose-50 dark:hover:from-indigo-900/20 dark:hover:to-rose-900/20 transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
                          >
                            <div className="relative flex-shrink-0">
                              <img 
                                src={order.images[0]} 
                                alt={order.name}
                                className="w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-xl object-cover ring-2 ring-white dark:ring-gray-700 group-hover:ring-indigo-200 dark:group-hover:ring-indigo-800 transition-all duration-300"
                                loading="lazy"
                              />
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-800 group-hover:scale-110 transition-transform duration-200"></div>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <h4 className={cn(
                                    "font-bold text-sm sm:text-base text-indigo-900 dark:text-indigo-100 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-200 leading-tight mb-1",
                                    language === 'hi' ? 'hindi-text' : ''
                                  )}>
                                    {language === 'hi' ? order.nameHi : order.name}
                                  </h4>
                                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    <span>by {order.artisanName}</span>
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between mt-2 sm:mt-3">
                                <span className="text-sm sm:text-base lg:text-lg font-black text-indigo-600 dark:text-indigo-400">
                                  ₹{order.price}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {new Date(order.createdAt).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', { month: 'short', day: 'numeric' })}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 sm:py-12">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-gradient-to-br from-indigo-100 via-purple-50 to-rose-100 dark:from-indigo-900 dark:via-purple-900 dark:to-rose-900 rounded-2xl flex items-center justify-center animate-pulse">
                          <ShoppingBag className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h3 className={cn(
                          "text-lg sm:text-xl font-bold text-indigo-900 dark:text-indigo-100 mb-3",
                          language === 'hi' ? 'hindi-text' : ''
                        )}>
                          {content[language].recentOrders.noOrders}
                        </h3>
                        <p className={cn(
                          "text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 px-4",
                          language === 'hi' ? 'hindi-text' : ''
                        )}>
                          {content[language].recentOrders.startShopping}
                        </p>
                        <Button asChild className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                          <Link to="/marketplace" className="flex items-center gap-2">
                            <Search className="w-4 h-4" />
                            {language === 'hi' ? 'अभी खरीदारी करें' : 'Start Shopping'}
                          </Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Enhanced Recommendations */}
                <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl dark:shadow-indigo-500/10 transition-all duration-300">
                  <CardHeader className="pb-4 sm:pb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-rose-500 rounded-lg flex items-center justify-center">
                        <Star className="w-4 h-4 text-white" />
                      </div>
                      <CardTitle className={cn(
                        "text-lg sm:text-xl lg:text-2xl font-bold text-indigo-900 dark:text-indigo-100",
                        language === 'hi' ? 'hindi-text' : ''
                      )}>
                        {content[language].recommendations.title}
                      </CardTitle>
                    </div>
                    <p className={cn(
                      "text-xs sm:text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      <Activity className="w-3 h-3" />
                      {content[language].recommendations.basedOn}
                    </p>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6">
                    <div className="space-y-3 sm:space-y-4">
                      {recommendations.map((product) => (
                        <Link key={product.id} to={`/marketplace/product/${product.id}`} className="group block">
                          <Card className="border-0 shadow-sm hover:shadow-lg dark:hover:shadow-indigo-500/25 transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-1 dark:bg-gray-700/50 overflow-hidden">
                            <CardContent className="p-0">
                              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
                                <div className="relative flex-shrink-0">
                                  <img 
                                    src={product.images[0]} 
                                    alt={product.name}
                                    className="w-16 h-16 sm:w-18 sm:h-18 object-cover rounded-xl ring-2 ring-white dark:ring-gray-700 group-hover:ring-indigo-200 dark:group-hover:ring-indigo-800 transition-all duration-300"
                                    loading="lazy"
                                  />
                                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-indigo-500 to-rose-500 rounded-full flex items-center justify-center">
                                    <Star className="w-3 h-3 text-white fill-current" />
                                  </div>
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                  <h4 className={cn(
                                    "font-bold text-sm sm:text-base text-indigo-900 dark:text-indigo-100 mb-2 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-200 leading-tight",
                                    language === 'hi' ? 'hindi-text' : ''
                                  )}>
                                    {language === 'hi' ? product.nameHi : product.name}
                                  </h4>
                                  
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm sm:text-base font-black text-indigo-600 dark:text-indigo-400">
                                      ₹{product.price}
                                    </span>
                                    <div className="flex items-center gap-1 bg-white dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 px-2 py-1 rounded-full">
                                      <Star className="w-3 h-3 text-indigo-500 fill-current" />
                                      <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-400">{product.rating}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                      <span>{language === 'hi' ? 'अनुशंसित' : 'Recommended'}</span>
                                      <ArrowRight className="w-3 h-3" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                  </Card>

                
                {/* Performance hint for large screens */}
                {screenSize === 'desktop' && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 text-sm">
                          {language === 'hi' ? 'प्रदर्शन टिप' : 'Performance Tip'}
                        </h4>
                        <p className="text-xs text-indigo-700 dark:text-indigo-300">
                          {language === 'hi' 
                            ? 'सबसे अच्छे अनुभव के लिए, अपनी स्क्रीन का पूरा उपयोग करें'
                            : 'For the best experience, utilize your full screen real estate'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Enhanced Mobile Navigation */}
      <MobileNav language={language} />
      
      {/* Back to top button for mobile */}
      {screenSize === 'mobile' && (
        <Button
          className="fixed bottom-24 right-4 w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 z-40"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowRight className="w-4 h-4 rotate-[-90deg] text-white" />
        </Button>
      )}
    </div>
  );
};

export default CustomerDashboard;

