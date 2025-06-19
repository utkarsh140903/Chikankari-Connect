import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Search, ArrowLeft, Scissors } from "lucide-react";
import { Link } from "react-router-dom";
import { LanguageToggle } from "@/components/LanguageToggle";
import { cn } from "@/lib/utils";

const NotFound = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const content = {
    en: {
      title: "Page Not Found",
      subtitle: "The thread seems to have been cut...",
      description: "The page you're looking for seems to have wandered off like a lost thread. Let's get you back to our beautiful Chikankari collection.",
      backHome: "Back to Home",
      browseMarket: "Browse Marketplace",
      helpText: "Need help? Try these options:"
    },
    hi: {
      title: "पेज नहीं मिला",
      subtitle: "धागा कट गया लगता है...",
      description: "आप जो पेज खोज रहे हैं वह खो गए धागे की तरह भटक गया है। आइए आपको हमारे सुंदर चिकनकारी संग्रह में वापस ले चलते हैं।",
      backHome: "होम पर वापस जाएं",
      browseMarket: "मार्केटप्लेस ब्राउज़ करें",
      helpText: "मदद चाहिए? ये विकल्प आज़माएं:"
    }
  };

  const quickLinks = [
    {
      title: language === 'hi' ? 'मार्केटप्लेस' : 'Marketplace',
      path: '/marketplace',
      icon: Search,
      description: language === 'hi' ? 'उत्पाद ब्राउज़ करें' : 'Browse products'
    },
    {
      title: language === 'hi' ? 'सीखना' : 'Learning',
      path: '/learn',
      icon: Scissors,
      description: language === 'hi' ? 'चिकनकारी सीखें' : 'Learn Chikankari'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4 dark:bg-gray-900/80 dark:border-gray-700">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="relative">
              <img 
                src="/favicon-light.svg" 
                alt="Logo" 
                className="w-8 h-8 dark:hidden transition-transform hover:scale-105"
              />
              <img 
                src="/favicon-dark.svg" 
                alt="Logo" 
                className="w-8 h-8 hidden dark:block transition-transform hover:scale-105"
              />
            </div>
            <h1 className="text-lg font-bold text-indigo-900 dark:text-indigo-100">
              Chikankari Connect
            </h1>
          </Link>
          <LanguageToggle language={language} onLanguageChange={setLanguage} />
        </div>
      </div>

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="text-center w-full max-w-md mx-auto">
          {/* 404 Illustration */}
          <div className="relative mb-8">
            <h1 className="text-8xl md:text-9xl font-bold text-indigo-200 dark:text-indigo-800/50 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl md:text-5xl animate-pulse">🧵</div>
            </div>
          </div>
          
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl dark:bg-gray-800/90">
            <CardContent className="p-6 text-center">
              <h2 className={cn(
                "text-2xl md:text-3xl font-bold text-indigo-900 dark:text-indigo-100 mb-2",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {content[language].title}
              </h2>
              
              <p className={cn(
                "text-lg text-indigo-600 dark:text-indigo-400 mb-4 italic",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {content[language].subtitle}
              </p>
              
              <p className={cn(
                "text-gray-600 dark:text-gray-400 mb-6 leading-relaxed",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {content[language].description}
              </p>
              
              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700">
                  <Link to="/" className={cn(
                    "flex items-center justify-center gap-2",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    <Home className="w-4 h-4" />
                    {content[language].backHome}
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="w-full">
                  <Link to="/marketplace" className={cn(
                    "flex items-center justify-center gap-2",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    <Search className="w-4 h-4" />
                    {content[language].browseMarket}
                  </Link>
                </Button>
              </div>
              
              {/* Quick Links */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className={cn(
                  "text-sm text-gray-600 dark:text-gray-400 mb-3",
                  language === 'hi' ? 'hindi-text' : ''
                )}>
                  {content[language].helpText}
                </p>
                
                <div className="space-y-2">
                  {quickLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={index}
                        to={link.path}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                          <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className={cn(
                            "font-medium text-indigo-900 dark:text-indigo-100",
                            language === 'hi' ? 'hindi-text' : ''
                          )}>
                            {link.title}
                          </p>
                          <p className={cn(
                            "text-xs text-gray-600 dark:text-gray-400",
                            language === 'hi' ? 'hindi-text' : ''
                          )}>
                            {link.description}
                          </p>
                        </div>
                        <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
