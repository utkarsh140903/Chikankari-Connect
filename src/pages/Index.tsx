
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles, Users, ShoppingBag, BookOpen, Star, Heart, Palette, Scissors } from "lucide-react";

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const content = {
    en: {
      hero: {
        title: "Chikankari Connect",
        subtitle: "Empowering Traditional Artisans",
        description: "Connect directly with skilled Chikankari artisans from Lucknow. Eliminate middlemen, preserve heritage craft, and earn fair prices.",
        getStarted: "Get Started",
        exploreMarket: "Explore Marketplace"
      },
      roleSelection: {
        title: "Join as",
        subtitle: "Choose your role to get started",
        roles: [
          {
            id: "customer",
            title: "Customer",
            description: "Discover authentic Chikankari products",
            icon: ShoppingBag,
            path: "/marketplace"
          },
          {
            id: "artisan",
            title: "Artisan",
            description: "Showcase and sell your craft",
            icon: Scissors,
            path: "/auth/phone?role=artisan"
          },
          {
            id: "designer",
            title: "Designer",
            description: "Create and collaborate on designs",
            icon: Palette,
            path: "/auth/phone?role=designer"
          }
        ]
      },
      features: [
        {
          icon: Users,
          title: "Direct Connection",
          description: "Connect directly with artisans, no middlemen"
        },
        {
          icon: ShoppingBag,
          title: "Fair Marketplace",
          description: "Buy authentic Chikankari at fair prices"
        },
        {
          icon: BookOpen,
          title: "Learn & Grow",
          description: "Access learning resources and tutorials"
        },
        {
          icon: Star,
          title: "Quality Assured",
          description: "Verified artisans and authentic products"
        }
      ],
      heritage: {
        title: "Preserving Chikankari Heritage",
        description: "Chikankari is a traditional embroidery style from Lucknow, known for its delicate and intricate hand embroidery. Our platform connects you directly with master artisans who have inherited this beautiful craft through generations.",
        stats: [
          { value: "500+", label: "Artisans" },
          { value: "1000+", label: "Products" },
          { value: "50+", label: "Cities" }
        ]
      }
    },
    hi: {
      hero: {
        title: "चिकनकारी कनेक्ट",
        subtitle: "पारंपरिक कारीगरों को सशक्त बनाना",
        description: "लखनऊ के कुशल चिकनकारी कारीगरों से सीधे जुड़ें। बिचौलियों को हटाएं, विरासती शिल्प को संरक्षित करें, और उचित मूल्य कमाएं।",
        getStarted: "शुरू करें",
        exploreMarket: "बाज़ार देखें"
      },
      roleSelection: {
        title: "के रूप में जुड़ें",
        subtitle: "शुरू करने के लिए अपनी भूमिका चुनें",
        roles: [
          {
            id: "customer",
            title: "ग्राहक",
            description: "प्रामाणिक चिकनकारी उत्पाद खोजें",
            icon: ShoppingBag,
            path: "/marketplace"
          },
          {
            id: "artisan",
            title: "कारीगर",
            description: "अपने शिल्प का प्रदर्शन और बिक्री करें",
            icon: Scissors,
            path: "/auth/phone?role=artisan"
          },
          {
            id: "designer",
            title: "डिज़ाइनर",
            description: "डिज़ाइन बनाएं और सहयोग करें",
            icon: Palette,
            path: "/auth/phone?role=designer"
          }
        ]
      },
      features: [
        {
          icon: Users,
          title: "सीधा संपर्क",
          description: "कारीगरों से सीधे जुड़ें, कोई बिचौलिया नहीं"
        },
        {
          icon: ShoppingBag,
          title: "निष्पक्ष बाज़ार",
          description: "उचित मूल्य पर प्रामाणिक चिकनकारी खरीदें"
        },
        {
          icon: BookOpen,
          title: "सीखें और बढ़ें",
          description: "शिक्षण संसाधन और ट्यूटोरियल का उपयोग करें"
        },
        {
          icon: Star,
          title: "गुणवत्ता आश्वासन",
          description: "सत्यापित कारीगर और प्रामाणिक उत्पाद"
        }
      ],
      heritage: {
        title: "चिकनकारी विरासत का संरक्षण",
        description: "चिकनकारी लखनऊ की एक पारंपरिक कढ़ाई शैली है, जो अपनी नाजुक और जटिल हाथ की कढ़ाई के लिए जानी जाती है। हमारा प्लेटफॉर्म आपको उन मास्टर कारीगरों से सीधे जोड़ता है जिन्होंने इस सुंदर शिल्प को पीढ़ियों से विरासत में प्राप्त किया है।",
        stats: [
          { value: "500+", label: "कारीगर" },
          { value: "1000+", label: "उत्पाद" },
          { value: "50+", label: "शहर" }
        ]
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 px-4 py-4 dark:bg-gray-900/90 dark:border-gray-700">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-rose-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className={cn(
              "text-xl font-bold text-indigo-900 dark:text-indigo-100",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].hero.title}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageToggle language={language} onLanguageChange={setLanguage} />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={cn(
            "text-4xl md:text-5xl font-bold text-indigo-900 mb-4 dark:text-indigo-100",
            language === 'hi' ? 'hindi-text' : ''
          )}>
            {content[language].hero.subtitle}
          </h2>
          <p className={cn(
            "text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed dark:text-gray-300",
            language === 'hi' ? 'hindi-text' : ''
          )}>
            {content[language].hero.description}
          </p>
        </div>
      </section>

      {/* Role Selection Section */}
      <section className="px-4 py-16 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className={cn(
            "text-2xl font-bold text-indigo-900 mb-2 dark:text-indigo-100",
            language === 'hi' ? 'hindi-text' : ''
          )}>
            {content[language].roleSelection.title}
          </h3>
          <p className={cn(
            "text-gray-600 mb-8 dark:text-gray-300",
            language === 'hi' ? 'hindi-text' : ''
          )}>
            {content[language].roleSelection.subtitle}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content[language].roleSelection.roles.map((role) => {
              const Icon = role.icon;
              return (
                <Card key={role.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-100 to-rose-100 dark:from-indigo-900 dark:to-rose-900 rounded-full flex items-center justify-center">
                      <Icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h4 className={cn(
                      "text-xl font-semibold text-indigo-900 mb-2 dark:text-indigo-100",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      {role.title}
                    </h4>
                    <p className={cn(
                      "text-gray-600 text-sm mb-4 dark:text-gray-300",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      {role.description}
                    </p>
                    <Button asChild className={cn(
                      "w-full",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      <Link to={role.path}>
                        {content[language].hero.getStarted}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className={cn(
              "text-2xl font-bold text-indigo-900 mb-4 dark:text-indigo-100",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].heritage.title}
            </h3>
            <p className={cn(
              "text-gray-600 max-w-3xl mx-auto leading-relaxed dark:text-gray-300",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].heritage.description}
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-8 text-center">
            {content[language].heritage.stats.map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                  {stat.value}
                </div>
                <div className={cn(
                  "text-gray-600 font-medium dark:text-gray-300",
                  language === 'hi' ? 'hindi-text' : ''
                )}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content[language].features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-indigo-100 to-rose-100 dark:from-indigo-900 dark:to-rose-900 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className={cn(
                      "text-lg font-semibold text-indigo-900 mb-2 dark:text-indigo-100",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      {feature.title}
                    </h3>
                    <p className={cn(
                      "text-gray-600 text-sm dark:text-gray-300",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sample Products Section */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h3 className={cn(
            "text-2xl font-bold text-indigo-900 text-center mb-8 dark:text-indigo-100",
            language === 'hi' ? 'hindi-text' : ''
          )}>
            {language === 'hi' ? 'प्रामाणिक चिकनकारी उत्पाद' : 'Authentic Chikankari Products'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
                title: language === 'hi' ? 'सफेद चिकनकारी कुर्ता' : 'White Chikankari Kurta',
                price: '₹2,500'
              },
              {
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
                title: language === 'hi' ? 'पीला चिकनकारी दुपट्टा' : 'Yellow Chikankari Dupatta',
                price: '₹1,200'
              },
              {
                image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
                title: language === 'hi' ? 'नीला चिकनकारी सूट' : 'Blue Chikankari Suit',
                price: '₹3,800'
              }
            ].map((product, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700">
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h4 className={cn(
                    "font-semibold text-indigo-900 mb-2 dark:text-indigo-100",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {product.title}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                      {product.price}
                    </span>
                    <Button size="sm" asChild>
                      <Link to="/marketplace">
                        <Heart className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
