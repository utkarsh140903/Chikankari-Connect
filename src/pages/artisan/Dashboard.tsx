import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Package, MessageCircle, IndianRupee, Plus, Eye } from "lucide-react";
import { MobileNav } from "@/components/layout/MobileNav";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const ArtisanDashboard = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

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
      quickActions: "Quick Actions"
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
      quickActions: "त्वरित कार्य"
    }
  };

  const stats = [
    {
      title: content[language].totalEarnings,
      value: "₹12,450",
      icon: IndianRupee,
      color: "text-green-600 bg-green-100"
    },
    {
      title: content[language].activeProducts,
      value: "8",
      icon: Package,
      color: "text-blue-600 bg-blue-100"
    },
    {
      title: content[language].newMessages,
      value: "3",
      icon: MessageCircle,
      color: "text-purple-600 bg-purple-100"
    },
    {
      title: content[language].views,
      value: "24",
      icon: Eye,
      color: "text-amber-600 bg-amber-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <div>
            <h1 className={cn(
              "text-xl font-bold text-indigo-900",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].greeting}, राम कुमार
            </h1>
            <p className={cn(
              "text-gray-600 text-sm",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].overview}
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
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={cn(
                        "text-xs text-gray-600 mb-1",
                        language === 'hi' ? 'hindi-text' : ''
                      )}>
                        {stat.title}
                      </p>
                      <p className="text-lg font-bold text-indigo-900">{stat.value}</p>
                    </div>
                    <div className={cn("p-2 rounded-lg", stat.color)}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className={cn(
              "text-lg text-indigo-900",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].quickActions}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/artisan/products/new">
              <Button className={cn(
                "w-full bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                <Plus className="w-4 h-4" />
                {content[language].addProduct}
              </Button>
            </Link>
            <Link to="/artisan/products">
              <Button variant="outline" className={cn(
                "w-full flex items-center gap-2",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                <Package className="w-4 h-4" />
                {content[language].viewProducts}
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className={cn(
              "text-lg text-indigo-900",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].recentOrders}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className={cn(
                "text-gray-600",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {content[language].noOrders}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <MobileNav language={language} />
    </div>
  );
};

export default ArtisanDashboard;
