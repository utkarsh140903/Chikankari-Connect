import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  TrendingUp, 
  Package, 
  MessageCircle, 
  IndianRupee, 
  Plus, 
  Eye,
  ShoppingCart,
  Clock,
  Star,
  Users,
  Calendar,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from "lucide-react";
import { MobileNav } from "@/components/layout/MobileNav";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const ArtisanDashboard = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const { toast } = useToast();

  // Handler functions for button functionality

  const handleViewAll = (section: string) => {
    const sectionText = section === 'activities' 
      ? (language === 'hi' ? 'गतिविधियां' : 'activities')
      : (language === 'hi' ? 'विश्लेषण' : 'analytics');
    
    toast({
      title: language === 'hi' ? "सभी देखें" : "View All",
      description: language === 'hi' 
        ? `सभी ${sectionText} देख रहे हैं...`
        : `Viewing all ${sectionText}...`,
      variant: "default",
    });
  };

  const handleStatClick = (statTitle: string) => {
    toast({
      title: statTitle,
      description: language === 'hi' 
        ? "विस्तृत दृश्य जल्द आ रहा है!"
        : "Detailed view coming soon!",
      variant: "default",
    });
  };

  const handleActivityClick = (activity: any) => {
    toast({
      title: language === 'hi' ? "गतिविधि विवरण" : "Activity Details",
      description: activity.description,
      variant: "success",
    });
  };

  const content = {
    en: {
      dashboard: "Dashboard",
      greeting: "Good morning",
      overview: "Today's Overview",
      totalEarnings: "Total Earnings",
      activeProducts: "Active Products",
      newMessages: "New Messages",
      views: "Profile Views",
      addProduct: "Add New Product",
      viewProducts: "View All Products",
      recentOrders: "Recent Orders",
      noOrders: "No recent orders",
      quickActions: "Quick Actions",
      thisMonth: "This Month",
      monthlyGrowth: "Monthly Growth",
      pendingOrders: "Pending Orders",
      completedOrders: "Completed Orders",
      customerRating: "Customer Rating",
      salesAnalytics: "Sales Analytics",
      recentActivity: "Recent Activity",
      viewAll: "View All",
      manageProducts: "Manage Products",
      viewProfile: "View Profile",
      orderReceived: "New order received",
      productViewed: "Product viewed by customer",
      messageReceived: "New message from customer",
      today: "Today",
      yesterday: "Yesterday",
      weekAgo: "1 week ago"
    },
    hi: {
      dashboard: "डैशबोर्ड",
      greeting: "सुप्रभात",
      overview: "आज का सिंहावलोकन",
      totalEarnings: "कुल कमाई",
      activeProducts: "सक्रिय उत्पाद",
      newMessages: "नए संदेश",
      views: "प्रोफ़ाइल व्यू",
      addProduct: "नया उत्पाद जोड़ें",
      viewProducts: "सभी उत्पाद देखें",
      recentOrders: "हाल के ऑर्डर",
      noOrders: "कोई हाल का ऑर्डर नहीं",
      quickActions: "त्वरित कार्य",
      thisMonth: "इस महीने",
      monthlyGrowth: "मासिक वृद्धि",
      pendingOrders: "लंबित ऑर्डर",
      completedOrders: "पूर्ण ऑर्डर",
      customerRating: "ग्राहक रेटिंग",
      salesAnalytics: "बिक्री विश्लेषण",
      recentActivity: "हाल की गतिविधि",
      viewAll: "सभी देखें",
      manageProducts: "उत्पाद प्रबंधन",
      viewProfile: "प्रोफ़ाइल देखें",
      orderReceived: "नया ऑर्डर प्राप्त हुआ",
      productViewed: "ग्राहक द्वारा उत्पाद देखा गया",
      messageReceived: "ग्राहक से नया संदेश",
      today: "आज",
      yesterday: "कल",
      weekAgo: "1 सप्ताह पहले"
    }
  };

  const stats = [
    {
      title: content[language].totalEarnings,
      value: "₹12,450",
      change: "+12%",
      changeType: "positive" as const,
      icon: IndianRupee,
      color: "text-green-600 bg-green-100",
      description: content[language].thisMonth
    },
    {
      title: content[language].activeProducts,
      value: "8",
      change: "+2",
      changeType: "positive" as const,
      icon: Package,
      color: "text-blue-600 bg-blue-100",
      description: "Available for sale"
    },
    {
      title: content[language].pendingOrders,
      value: "5",
      change: "-1",
      changeType: "negative" as const,
      icon: ShoppingCart,
      color: "text-orange-600 bg-orange-100",
      description: "Awaiting processing"
    },
    {
      title: content[language].customerRating,
      value: "4.8",
      change: "+0.2",
      changeType: "positive" as const,
      icon: Star,
      color: "text-amber-600 bg-amber-100",
      description: "Average rating"
    },
    {
      title: content[language].newMessages,
      value: "3",
      change: "+3",
      changeType: "positive" as const,
      icon: MessageCircle,
      color: "text-purple-600 bg-purple-100",
      description: "Unread messages"
    },
    {
      title: content[language].views,
      value: "147",
      change: "+24",
      changeType: "positive" as const,
      icon: Eye,
      color: "text-indigo-600 bg-indigo-100",
      description: "This week"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "order",
      title: content[language].orderReceived,
      description: "Chikankari Kurta - White",
      time: content[language].today,
      icon: ShoppingCart,
      color: "text-green-600 bg-green-100"
    },
    {
      id: 2,
      type: "view",
      title: content[language].productViewed,
      description: "Traditional Saree - Blue",
      time: "2 hours ago",
      icon: Eye,
      color: "text-blue-600 bg-blue-100"
    },
    {
      id: 3,
      type: "message",
      title: content[language].messageReceived,
      description: "Inquiry about custom design",
      time: content[language].yesterday,
      icon: MessageCircle,
      color: "text-purple-600 bg-purple-100"
    }
  ];

  const quickActionItems = [
    {
      title: content[language].addProduct,
      description: "Create new product listing",
      icon: Plus,
      href: "/artisan/products/new",
      color: "bg-indigo-600 hover:bg-indigo-700 text-white"
    },
    {
      title: content[language].manageProducts,
      description: "View and edit your products",
      icon: Package,
      href: "/artisan/products",
      color: "bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200"
    },
    {
      title: content[language].viewProfile,
      description: "Update your profile information",
      icon: Users,
      href: "/artisan/profile",
      color: "bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 pb-32 lg:pb-16 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 transition-colors duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center max-w-md mx-auto lg:max-w-none">
            <div className="flex-1">
              <h1 className={cn(
                "text-xl lg:text-2xl xl:text-3xl font-bold text-indigo-900 dark:text-indigo-100",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {content[language].greeting}, राम कुमार
              </h1>
              <p className={cn(
                "text-gray-600 dark:text-gray-300 text-sm lg:text-base",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {content[language].overview}
              </p>
            </div>
            <div className="flex items-center gap-2 lg:gap-4">
              <div className="hidden lg:block">
                <ThemeToggle />
              </div>
              <LanguageToggle language={language} onLanguageChange={setLanguage} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 pb-12 lg:pb-12">
        <div className="max-w-md mx-auto lg:max-w-none">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Left Column - Stats and Quick Actions */}
            <div className="lg:col-span-8 xl:col-span-9">
              <div className="space-y-6 lg:space-y-8 mb-8 lg:mb-8">
                {/* Stats Grid */}
                <div>
                  <h2 className={cn(
                    "text-lg lg:text-xl font-semibold text-indigo-900 dark:text-indigo-100 mb-4 lg:mb-6",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].overview}
                  </h2>
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 lg:gap-6">
                    {stats.map((stat, index) => {
                      const Icon = stat.icon;
                      const ChangeIcon = stat.changeType === 'positive' ? ArrowUpRight : ArrowDownRight;
                      return (
                        <Card key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl dark:hover:shadow-indigo-500/25 transition-all duration-300 group cursor-pointer" onClick={() => handleStatClick(stat.title)}>
                          <CardContent className="p-4 lg:p-6">
                            <div className="flex items-start justify-between mb-3">
                              <div className={cn("p-2 lg:p-3 rounded-lg transition-transform duration-200 group-hover:scale-110", stat.color)}>
                                <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                              </div>
                              <div className={cn(
                                "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                                stat.changeType === 'positive' 
                                  ? "text-green-700 bg-green-100" 
                                  : "text-red-700 bg-red-100"
                              )}>
                                <ChangeIcon className="w-3 h-3" />
                                {stat.change}
                              </div>
                            </div>
                            <div>
                              <p className="text-2xl lg:text-3xl font-bold text-indigo-900 dark:text-indigo-100 mb-1">{stat.value}</p>
                              <p className={cn(
                                "text-xs lg:text-sm text-gray-600 dark:text-gray-300 font-medium mb-1",
                                language === 'hi' ? 'hindi-text' : ''
                              )}>
                                {stat.title}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{stat.description}</p>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Actions Grid */}
                <div>
                  <h2 className={cn(
                    "text-lg lg:text-xl font-semibold text-indigo-900 dark:text-indigo-100 mb-4 lg:mb-6",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].quickActions}
                  </h2>
                  <div className="grid gap-4 lg:gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {quickActionItems.map((action, index) => {
                      const Icon = action.icon;
                      return (
                        <Link key={index} to={action.href} className="group">
                          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl dark:hover:shadow-indigo-500/25 transition-all duration-300 group-hover:scale-105">
                            <CardContent className="p-6 lg:p-8 text-center">
                              <div className={cn(
                                "w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110",
                                action.color.includes('indigo') ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
                              )}>
                                <Icon className="w-6 h-6 lg:w-8 lg:h-8" />
                              </div>
                              <h3 className={cn(
                                "font-semibold text-indigo-900 dark:text-indigo-100 mb-2 lg:text-lg",
                                language === 'hi' ? 'hindi-text' : ''
                              )}>
                                {action.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-300">{action.description}</p>
                            </CardContent>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Recent Activity */}
            <div className="lg:col-span-4 xl:col-span-3 mt-6 lg:mt-0">
              <div className="lg:sticky lg:top-28 mb-8 lg:mb-8">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg dark:shadow-indigo-500/10">
                  <CardHeader className="pb-3 lg:pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className={cn(
                        "text-lg lg:text-xl text-indigo-900 dark:text-indigo-100",
                        language === 'hi' ? 'hindi-text' : ''
                      )}>
                        {content[language].recentActivity}
                      </CardTitle>
                      <Button variant="ghost" size="sm" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300" onClick={() => handleViewAll('activities')}>
                        {content[language].viewAll}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {recentActivities.length > 0 ? (
                      <div className="space-y-4">
                        {recentActivities.map((activity) => {
                          const Icon = activity.icon;
                          return (
                            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer" onClick={() => handleActivityClick(activity)}>
                              <div className={cn("p-2 rounded-lg flex-shrink-0", activity.color)}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">{activity.title}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{activity.description}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Activity className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className={cn(
                          "text-gray-600 dark:text-gray-300",
                          language === 'hi' ? 'hindi-text' : ''
                        )}>
                          No recent activity
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Sales Analytics Card */}
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg dark:shadow-indigo-500/10 mt-6 mb-8">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className={cn(
                        "text-lg text-indigo-900 dark:text-indigo-100",
                        language === 'hi' ? 'hindi-text' : ''
                      )}>
                        {content[language].salesAnalytics}
                      </CardTitle>
                      <Button variant="ghost" size="sm" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300" onClick={() => handleViewAll('analytics')}>
                        <BarChart3 className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/50 dark:to-purple-900/50 rounded-lg cursor-pointer hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-800/50 dark:hover:to-purple-800/50 transition-colors duration-200" onClick={() => handleStatClick('Monthly Earnings')}>
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{content[language].thisMonth}</p>
                          <p className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">₹12,450</p>
                        </div>
                        <div className="flex items-center text-green-600">
                          <ArrowUpRight className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium">+12%</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-colors duration-200" onClick={() => handleStatClick('Completed Orders')}>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{content[language].completedOrders}</p>
                          <p className="text-xl font-bold text-indigo-900 dark:text-indigo-100">24</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-colors duration-200" onClick={() => handleStatClick('Pending Orders')}>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{content[language].pendingOrders}</p>
                          <p className="text-xl font-bold text-orange-600 dark:text-orange-400">5</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MobileNav language={language} />
    </div>
  );
};

export default ArtisanDashboard;
