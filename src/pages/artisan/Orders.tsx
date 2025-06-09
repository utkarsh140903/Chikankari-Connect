
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";
import { MobileNav } from "@/components/layout/MobileNav";
import { LanguageToggle } from "@/components/LanguageToggle";
import { cn } from "@/lib/utils";

const Orders = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const content = {
    en: {
      orders: "Orders",
      pending: "Pending",
      shipped: "Shipped",
      delivered: "Delivered",
      markShipped: "Mark as Shipped",
      viewDetails: "View Details",
      noOrders: "No orders yet",
      startSelling: "Orders will appear here when customers purchase your products"
    },
    hi: {
      orders: "ऑर्डर",
      pending: "लंबित",
      shipped: "भेजा गया",
      delivered: "वितरित",
      markShipped: "भेजा गया के रूप में चिह्नित करें",
      viewDetails: "विवरण देखें",
      noOrders: "अभी तक कोई ऑर्डर नहीं",
      startSelling: "जब ग्राहक आपके उत्पाद खरीदेंगे तो ऑर्डर यहां दिखाई देंगे"
    }
  };

  const orders = [
    {
      id: "ORD001",
      product: "Traditional White Kurta",
      productHi: "पारंपरिक सफेद कुर्ता",
      customer: "Priya Sharma",
      amount: "₹2,500",
      status: "pending",
      date: "2 hours ago"
    },
    {
      id: "ORD002",
      product: "Elegant Chikan Saree",
      productHi: "सुंदर चिकन साड़ी",
      customer: "Anjali Singh",
      amount: "₹8,000",
      status: "shipped",
      date: "1 day ago"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <h1 className={cn(
            "text-xl font-bold text-indigo-900",
            language === 'hi' ? 'hindi-text' : ''
          )}>
            {content[language].orders}
          </h1>
          <LanguageToggle language={language} onLanguageChange={setLanguage} />
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className={cn(
                        "font-semibold text-indigo-900 mb-1",
                        language === 'hi' ? 'hindi-text' : ''
                      )}>
                        {language === 'hi' ? order.productHi : order.product}
                      </h3>
                      <p className="text-sm text-gray-600">#{order.id}</p>
                    </div>
                    <Badge className={cn(
                      "flex items-center gap-1",
                      getStatusColor(order.status)
                    )}>
                      {getStatusIcon(order.status)}
                      {content[language][order.status as keyof typeof content.en]}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-sm text-gray-600">Customer: {order.customer}</p>
                      <p className="text-lg font-bold text-indigo-600">{order.amount}</p>
                    </div>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>

                  <div className="flex gap-2">
                    {order.status === 'pending' && (
                      <Button size="sm" className={cn(
                        "bg-indigo-600 hover:bg-indigo-700 flex-1",
                        language === 'hi' ? 'hindi-text' : ''
                      )}>
                        {content[language].markShipped}
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className={cn(
                      order.status === 'pending' ? 'flex-1' : 'w-full',
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      {content[language].viewDetails}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-100 to-rose-100 rounded-full flex items-center justify-center">
              <Package className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className={cn(
              "text-lg font-semibold text-indigo-900 mb-2",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].noOrders}
            </h3>
            <p className={cn(
              "text-gray-600",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].startSelling}
            </p>
          </div>
        )}
      </div>

      <MobileNav language={language} />
    </div>
  );
};

export default Orders;
