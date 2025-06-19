import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Eye
} from "lucide-react";
import { MobileNav } from "@/components/layout/MobileNav";
import { LanguageToggle } from "@/components/LanguageToggle";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const CustomerDashboard = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

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
      featuredArtisans: {
        title: "Featured Artisans",
        viewProfile: "View Profile",
        follow: "Follow"
      }
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
      featuredArtisans: {
        title: "विशेष कारीगर",
        viewProfile: "प्रोफाइल देखें",
        follow: "फॉलो करें"
      }
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
      color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
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
      color: "bg-amber-600 hover:bg-amber-700",
      path: "/customer/artisans"
    }
  ];

  const recentOrders = [
    {
      id: "ORD-001",
      product: "Traditional White Kurta",
      productHi: "पारंपरिक सफेद कुर्ता",
      artisan: "राम कुमार",
      status: "Delivered",
      statusHi: "डिलीवर किया गया",
      price: "₹2,500",
      date: "Dec 15",
      image: "https://images.unsplash.com/photo-1583391733956-6c78c2018580?w=100&h=100&fit=crop&q=80"
    },
    {
      id: "ORD-002",
      product: "Elegant Chikan Saree",
      productHi: "सुंदर चिकन साड़ी",
      artisan: "सुनीता देवी",
      status: "In Transit",
      statusHi: "ट्रांजिट में",
      price: "₹8,000",
      date: "Dec 18",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&h=100&fit=crop&q=80"
    }
  ];

  const recommendations = [
    {
      id: 1,
      name: "Designer Palazzo Set",
      nameHi: "डिज़ाइनर पलाज़ो सेट",
      price: "₹3,200",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1583391733975-b72f1ac82257?w=200&h=200&fit=crop&q=80"
    },
    {
      id: 2,
      name: "Festive Dupatta",
      nameHi: "त्योहारी दुपट्टा",
      price: "₹1,800",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop&q=80"
    }
  ];

  const featuredArtisans = [
    {
      id: 1,
      name: "Mohammad Ali",
      specialization: "Shadow Work Expert",
      specializationHi: "शैडो वर्क विशेषज्ञ",
      rating: 4.9,
      location: "Lucknow",
      followers: 234,
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Fatima Sheikh",
      specialization: "Phanda Work Master",
      specializationHi: "फांदा वर्क मास्टर",
      rating: 4.8,
      location: "Lucknow",
      followers: 189,
      avatar: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4 dark:bg-gray-900/80 dark:border-gray-700">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <div>
            <h1 className={cn(
              "text-xl font-bold text-indigo-900 dark:text-indigo-100",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].dashboard}
            </h1>
            <p className={cn(
              "text-sm text-gray-600 dark:text-gray-400",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].welcome}
            </p>
          </div>
          <LanguageToggle language={language} onLanguageChange={setLanguage} />
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/80">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", stat.color)}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">{stat.value}</p>
                  <p className={cn(
                    "text-xs text-gray-600 dark:text-gray-400 mb-1",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {stat.title}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400">{stat.change}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/80">
          <CardHeader className="pb-3">
            <CardTitle className={cn(
              "text-lg text-indigo-900 dark:text-indigo-100",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].quickActions.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    asChild
                    className={cn(
                      "h-auto p-4 flex flex-col items-center gap-2",
                      action.color,
                      language === 'hi' ? 'hindi-text' : ''
                    )}
                  >
                    <Link to={action.path}>
                      <Icon className="w-5 h-5" />
                      <span className="text-xs text-center">{action.title}</span>
                    </Link>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/80">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className={cn(
                "text-lg text-indigo-900 dark:text-indigo-100",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {content[language].recentOrders.title}
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-indigo-600 dark:text-indigo-400">
                {content[language].recentOrders.viewAll}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                    <img 
                      src={order.image} 
                      alt={order.product}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className={cn(
                        "font-semibold text-indigo-900 dark:text-indigo-100 text-sm",
                        language === 'hi' ? 'hindi-text' : ''
                      )}>
                        {language === 'hi' ? order.productHi : order.product}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">by {order.artisan}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{order.price}</span>
                        <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
                          {language === 'hi' ? order.statusHi : order.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-100 to-rose-100 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className={cn(
                  "text-lg font-semibold text-indigo-900 mb-2",
                  language === 'hi' ? 'hindi-text' : ''
                )}>
                  {content[language].recentOrders.noOrders}
                </h3>
                <p className={cn(
                  "text-gray-600",
                  language === 'hi' ? 'hindi-text' : ''
                )}>
                  {content[language].recentOrders.startShopping}
                </p>
                <Button asChild className="mt-4">
                  <Link to="/marketplace">
                    {language === 'hi' ? 'अभी खरीदारी करें' : 'Start Shopping'}
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/80">
          <CardHeader className="pb-3">
            <CardTitle className={cn(
              "text-lg text-indigo-900 dark:text-indigo-100",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].recommendations.title}
            </CardTitle>
            <p className={cn(
              "text-sm text-gray-600 dark:text-gray-400",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].recommendations.basedOn}
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {recommendations.map((product) => (
                <Link key={product.id} to={`/marketplace/product/${product.id}`}>
                  <Card className="border-0 shadow-sm hover:shadow-lg transition-all hover-lift">
                    <CardContent className="p-0">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-24 object-cover rounded-t-lg"
                      />
                      <div className="p-3">
                        <h4 className={cn(
                          "font-semibold text-indigo-900 dark:text-indigo-100 text-sm mb-1 line-clamp-2",
                          language === 'hi' ? 'hindi-text' : ''
                        )}>
                          {language === 'hi' ? product.nameHi : product.name}
                        </h4>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{product.price}</span>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-amber-400 fill-current" />
                            <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">{product.rating}</span>
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

        {/* Featured Artisans */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/80">
          <CardHeader className="pb-3">
            <CardTitle className={cn(
              "text-lg text-indigo-900 dark:text-indigo-100",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].featuredArtisans.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {featuredArtisans.map((artisan) => (
                <div key={artisan.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-rose-100 dark:from-indigo-900 dark:to-rose-900 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-indigo-900 dark:text-indigo-100">{artisan.name}</h4>
                    <p className={cn(
                      "text-sm text-gray-600 dark:text-gray-400",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      {language === 'hi' ? artisan.specializationHi : artisan.specialization}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-amber-400 fill-current" />
                        <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">{artisan.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-500">•</span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{artisan.followers} followers</span>
                    </div>
                  </div>
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                    <Plus className="w-3 h-3 mr-1" />
                    {content[language].featuredArtisans.follow}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <MobileNav language={language} />
    </div>
  );
};

export default CustomerDashboard;

