
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Bell, 
  Globe, 
  HelpCircle, 
  Shield, 
  LogOut,
  ChevronRight,
  Phone,
  Mail
} from "lucide-react";
import { MobileNav } from "@/components/layout/MobileNav";
import { LanguageToggle } from "@/components/LanguageToggle";
import { cn } from "@/lib/utils";

const Settings = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [notifications, setNotifications] = useState({
    orders: true,
    messages: true,
    marketing: false
  });

  const content = {
    en: {
      settings: "Settings",
      profile: "Profile",
      account: "Account Settings",
      notifications: "Notifications",
      orderUpdates: "Order Updates",
      newMessages: "New Messages",
      marketing: "Marketing Emails",
      language: "Language",
      support: "Support & Help",
      help: "Help Center",
      contact: "Contact Support",
      privacy: "Privacy Policy",
      logout: "Log Out",
      version: "Version 1.0.0"
    },
    hi: {
      settings: "सेटिंग्स",
      profile: "प्रोफ़ाइल",
      account: "खाता सेटिंग्स",
      notifications: "सूचनाएं",
      orderUpdates: "ऑर्डर अपडेट",
      newMessages: "नए संदेश",
      marketing: "मार्केटिंग ईमेल",
      language: "भाषा",
      support: "सहायता और मदद",
      help: "सहायता केंद्र",
      contact: "सहायता से संपर्क करें",
      privacy: "गोपनीयता नीति",
      logout: "लॉग आउट",
      version: "संस्करण 1.0.0"
    }
  };

  const menuItems = [
    {
      icon: User,
      title: content[language].profile,
      subtitle: "Edit profile information",
      action: () => {}
    },
    {
      icon: HelpCircle,
      title: content[language].help,
      subtitle: "Get help and support",
      action: () => {}
    },
    {
      icon: Phone,
      title: content[language].contact,
      subtitle: "Call: +91 98765 43210",
      action: () => {}
    },
    {
      icon: Shield,
      title: content[language].privacy,
      subtitle: "Privacy and data policy",
      action: () => {}
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <h1 className={cn(
            "text-xl font-bold text-indigo-900",
            language === 'hi' ? 'hindi-text' : ''
          )}>
            {content[language].settings}
          </h1>
          <LanguageToggle language={language} onLanguageChange={setLanguage} />
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Account Settings */}
        <Card className="bg-white border-0 shadow-lg card-white">
          <CardHeader className="pb-3">
            <CardTitle className={cn(
              "text-lg text-indigo-900",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].account}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index}
                  className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 rounded-lg px-2 -mx-2"
                  onClick={item.action}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Icon className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className={cn(
                        "font-medium text-indigo-900",
                        language === 'hi' ? 'hindi-text' : ''
                      )}>
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">{item.subtitle}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-white border-0 shadow-lg card-white">
          <CardHeader className="pb-3">
            <CardTitle className={cn(
              "text-lg text-indigo-900 flex items-center gap-2",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              <Bell className="w-5 h-5" />
              {content[language].notifications}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className={cn(
                  "font-medium text-indigo-900",
                  language === 'hi' ? 'hindi-text' : ''
                )}>
                  {content[language].orderUpdates}
                </h3>
                <p className="text-sm text-gray-600">Get notified about order status</p>
              </div>
              <Switch 
                checked={notifications.orders}
                onCheckedChange={(checked) => 
                  setNotifications({...notifications, orders: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className={cn(
                  "font-medium text-indigo-900",
                  language === 'hi' ? 'hindi-text' : ''
                )}>
                  {content[language].newMessages}
                </h3>
                <p className="text-sm text-gray-600">Get notified about new messages</p>
              </div>
              <Switch 
                checked={notifications.messages}
                onCheckedChange={(checked) => 
                  setNotifications({...notifications, messages: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className={cn(
                  "font-medium text-indigo-900",
                  language === 'hi' ? 'hindi-text' : ''
                )}>
                  {content[language].marketing}
                </h3>
                <p className="text-sm text-gray-600">Receive marketing updates</p>
              </div>
              <Switch 
                checked={notifications.marketing}
                onCheckedChange={(checked) => 
                  setNotifications({...notifications, marketing: checked})
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Language & Others */}
        <Card className="bg-white border-0 shadow-lg card-white">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Globe className="w-4 h-4 text-indigo-600" />
                </div>
                <h3 className={cn(
                  "font-medium text-indigo-900",
                  language === 'hi' ? 'hindi-text' : ''
                )}>
                  {content[language].language}
                </h3>
              </div>
              <LanguageToggle language={language} onLanguageChange={setLanguage} />
            </div>

            <Button 
              variant="destructive" 
              className={cn(
                "w-full flex items-center gap-2",
                language === 'hi' ? 'hindi-text' : ''
              )}
            >
              <LogOut className="w-4 h-4" />
              {content[language].logout}
            </Button>
          </CardContent>
        </Card>

        {/* Version */}
        <div className="text-center">
          <p className="text-sm text-gray-500">{content[language].version}</p>
        </div>
      </div>

      <MobileNav language={language} />
    </div>
  );
};

export default Settings;
