import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { 
  ArrowRight, 
  Sparkles, 
  Users, 
  ShoppingBag, 
  BookOpen, 
  Star, 
  Heart, 
  Palette, 
  Scissors,
  Zap,
  Play,
  Shield,
  Truck,
  Award,
  MessageCircle,
  ChevronRight,
  MapPin
} from "lucide-react";

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const content = {
    en: {
      hero: {
        title: "Chikankari Connect",
        subtitle: "Empowering Traditional Artisans",
        description: "Connect directly with skilled Chikankari artisans from Lucknow. Eliminate middlemen, preserve heritage craft, and earn fair prices.",
        getStarted: "Get Started",
        exploreMarket: "Explore Market"
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
            path: "/auth/phone?role=customer"
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
            description: "Create designs and collaborate",
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
          title: "Quality Assurance",
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
      },
      testimonials: [
        {
          name: "Priya Sharma",
          role: "Customer from Delhi",
          content: "Amazing quality and authentic Chikankari. Direct connection with artisans made the experience special.",
          rating: 5
        },
        {
          name: "Mohammad Ali",
          role: "Artisan from Lucknow",
          content: "This platform helped me reach customers directly and earn fair prices for my craft.",
          rating: 5
        },
        {
          name: "Sneha Gupta",
          role: "Designer",
          content: "Collaborating with skilled artisans has been incredible. The quality is unmatched.",
          rating: 5
        }
      ],
      cta: {
        title: "Ready to Start Your Journey?",
        subtitle: "Join thousands of satisfied customers, skilled artisans, and creative designers",
        button: "Get Started Today"
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
            path: "/auth/phone?role=customer"
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
      },
      testimonials: [
        {
          name: "प्रिया शर्मा",
          role: "दिल्ली से ग्राहक",
          content: "अद्भुत गुणवत्ता और प्रामाणिक चिकनकारी। कारीगरों के साथ सीधा संपर्क अनुभव को विशेष बनाता है।",
          rating: 5
        },
        {
          name: "मोहम्मद अली",
          role: "लखनऊ के कारीगर",
          content: "इस प्लेटफॉर्म ने मुझे सीधे ग्राहकों तक पहुंचने और अपने शिल्प के लिए उचित मूल्य कमाने में मदद की।",
          rating: 5
        },
        {
          name: "स्नेहा गुप्ता",
          role: "डिज़ाइनर",
          content: "कुशल कारीगरों के साथ सहयोग अविश्वसनीय रहा है। गुणवत्ता बेजोड़ है।",
          rating: 5
        }
      ],
      cta: {
        title: "अपनी यात्रा शुरू करने के लिए तैयार?",
        subtitle: "हजारों संतुष्ट ग्राहकों, कुशल कारीगरों और रचनात्मक डिज़ाइनरों से जुड़ें",
        button: "आज ही शुरू करें"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200/60 px-4 py-4 shadow-sm dark:bg-gray-900/95 dark:border-gray-700/60">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="relative">
              <img 
                src="/favicon-light.svg" 
                alt="Logo" 
                className="w-10 h-10 dark:hidden transition-transform hover:scale-105"
              />
              <img 
                src="/favicon-dark.svg" 
                alt="Logo" 
                className="w-10 h-10 hidden dark:block transition-transform hover:scale-105"
              />
            </div>
            <h1 className={cn(
              "text-xl font-bold text-indigo-900 dark:text-indigo-100 tracking-tight",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].hero.title}
            </h1>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild className="hidden md:flex">
              <Link to="/marketplace">
                <ShoppingBag className="w-4 h-4 mr-2" />
                {language === 'hi' ? 'बाज़ार' : 'Marketplace'}
              </Link>
            </Button>
            <ThemeToggle />
            <LanguageToggle language={language} onLanguageChange={setLanguage} />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-rose-500/10 dark:from-indigo-500/5 dark:to-rose-500/5" />
        <div className={cn(
          "max-w-5xl mx-auto text-center relative z-10 transition-all duration-1000",
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        )}>
          <div className="inline-flex items-center px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-6">
            <Zap className="w-4 h-4 mr-2" />
            {language === 'hi' ? 'भारत का #1 चिकनकारी प्लेटफॉर्म' : "India's #1 Chikankari Platform"}
          </div>
          <h2 className={cn(
            "text-4xl md:text-6xl font-bold text-indigo-900 mb-6 dark:text-indigo-100 leading-tight",
            language === 'hi' ? 'hindi-text' : ''
          )}>
            {content[language].hero.subtitle}
          </h2>
          <p className={cn(
            "text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed dark:text-gray-300",
            language === 'hi' ? 'hindi-text' : ''
          )}>
            {content[language].hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <Link to="#role-selection" onClick={(e) => {
                e.preventDefault();
                document.querySelector('#role-selection')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                {content[language].hero.getStarted}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="text-lg px-8 py-6">
              <Link to="/marketplace">
                <Play className="w-5 h-5 mr-2" />
                {content[language].hero.exploreMarket}
              </Link>
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-2">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {language === 'hi' ? 'सत्यापित कारीगर' : 'Verified Artisans'}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-2">
                <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {language === 'hi' ? 'मुफ्त डिलीवरी' : 'Free Delivery'}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-2">
                <Award className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {language === 'hi' ? 'गुणवत्ता की गारंटी' : 'Quality Guarantee'}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-2">
                <MessageCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {language === 'hi' ? '24/7 सहायता' : '24/7 Support'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section id="role-selection" className="px-4 py-16 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className={cn(
            "text-3xl font-bold text-indigo-900 mb-4 dark:text-indigo-100",
            language === 'hi' ? 'hindi-text' : ''
          )}>
            {content[language].roleSelection.title}
          </h3>
          <p className={cn(
            "text-gray-600 mb-12 dark:text-gray-300",
            language === 'hi' ? 'hindi-text' : ''
          )}>
            {content[language].roleSelection.subtitle}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content[language].roleSelection.roles.map((role, index) => {
              const Icon = role.icon;
              return (
                <Card key={role.id} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 bg-white dark:bg-gray-800 dark:border-gray-700 relative overflow-hidden card-white">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-rose-500/5 group-hover:from-indigo-500/10 group-hover:to-rose-500/10 transition-all duration-500" />
                  <CardContent className="p-8 text-center relative z-10">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-100 to-rose-100 dark:from-indigo-900 dark:to-rose-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Icon className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h4 className={cn(
                      "text-2xl font-bold text-indigo-900 mb-3 dark:text-indigo-100",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      {role.title}
                    </h4>
                    <p className={cn(
                      "text-gray-600 mb-6 dark:text-gray-300 leading-relaxed",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      {role.description}
                    </p>
                    <Button asChild className={cn(
                      "w-full group-hover:bg-indigo-600 transition-colors duration-300",
                      language === 'hi' ? 'hindi-text' : ''
                    )} size="lg">
                      <Link to={role.path}>
                        {content[language].hero.getStarted}
                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
        <div className="max-w-4xl mx-auto text-center">
          <h3 className={cn(
            "text-3xl font-bold text-indigo-900 mb-6 dark:text-indigo-100",
            language === 'hi' ? 'hindi-text' : ''
          )}>
            {content[language].heritage.title}
          </h3>
          <p className={cn(
            "text-gray-600 mb-12 leading-relaxed dark:text-gray-300",
            language === 'hi' ? 'hindi-text' : ''
          )}>
            {content[language].heritage.description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            {content[language].heritage.stats.map((stat, index) => (
              <div key={index} className="p-4 sm:p-8 bg-white/50 dark:bg-gray-800/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-2xl sm:text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2 sm:mb-3 animate-pulse">
                  {stat.value}
                </div>
                <div className={cn(
                  "text-sm sm:text-base text-gray-600 font-semibold dark:text-gray-300 px-2 sm:px-0",
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
      <section className="px-4 py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className={cn(
              "text-3xl font-bold text-indigo-900 mb-4 dark:text-indigo-100",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {language === 'hi' ? 'हमारी विशेषताएं' : 'Why Choose Us'}
            </h3>
            <p className={cn(
              "text-gray-600 dark:text-gray-300 max-w-2xl mx-auto",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {language === 'hi' 
                ? 'हमारे प्लेटफॉर्म की अनूठी विशेषताओं का अनुभव करें'
                : 'Experience the unique features of our platform'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content[language].features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white dark:bg-gray-800 dark:border-gray-700 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-rose-500/5 group-hover:from-indigo-500/10 group-hover:to-rose-500/10 transition-all duration-500" />
                  <CardContent className="p-8 text-center relative z-10">
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-indigo-100 to-rose-100 dark:from-indigo-900 dark:to-rose-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className={cn(
                      "text-xl font-bold text-indigo-900 mb-3 dark:text-indigo-100",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      {feature.title}
                    </h3>
                    <p className={cn(
                      "text-gray-600 dark:text-gray-300 leading-relaxed",
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

      {/* Products Section */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h3 className={cn(
            "text-3xl font-bold text-indigo-900 mb-12 text-center dark:text-indigo-100",
            language === 'hi' ? 'hindi-text' : ''
          )}>
            {language === 'hi' ? 'फीचर्ड उत्पाद' : 'Featured Products'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: "https://i.etsystatic.com/16387285/r/il/0dfa61/2532111172/il_fullxfull.2532111172_hl3g.jpg",
                title: language === 'hi' ? 'सफेद चिकनकारी कुर्ता' : 'White Chikankari Kurta',
                price: '₹2,500',
                rating: 4.8,
                reviews: 124
              },
              {
                image: "https://i.pinimg.com/originals/ff/2c/8b/ff2c8bbbbf9ceb9ff5afdaaa6ce84c3e.jpg",
                title: language === 'hi' ? 'पीला चिकनकारी दुपट्टा' : 'Yellow Chikankari Dupatta',
                price: '₹1,200',
                rating: 4.9,
                reviews: 89
              },
              {
                image: "https://www.dress365days.com/cdn/shop/products/powder-blue-chikankari-anarkali-suit-966_1445x.jpg?v=1626543406",
                title: language === 'hi' ? 'नीला चिकनकारी सूट' : 'Blue Chikankari Suit',
                price: '₹3,800',
                rating: 4.7,
                reviews: 156
              }
            ].map((product, index) => (
              <Card key={index} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white dark:bg-gray-800 dark:border-gray-700">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white shadow-lg">
                      <Heart className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {language === 'hi' ? 'हस्तनिर्मित' : 'Handmade'}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h4 className={cn(
                    "font-bold text-indigo-900 mb-2 dark:text-indigo-100 text-lg",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {product.title}
                  </h4>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "w-4 h-4",
                            i < Math.floor(product.rating) 
                              ? 'text-orange-400 fill-current'
                              : 'text-gray-300'
                          )} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {product.price}
                    </span>
                    <Button asChild className="group-hover:bg-indigo-600 transition-colors">
                      <Link to="/marketplace">
                        {language === 'hi' ? 'देखें' : 'View'}
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link to="/marketplace">
                {language === 'hi' ? 'सभी उत्पाद देखें' : 'View All Products'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-16 bg-indigo-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className={cn(
            "text-3xl font-bold text-indigo-900 mb-12 dark:text-indigo-100",
            language === 'hi' ? 'hindi-text' : ''
          )}>
            {language === 'hi' ? 'हमारे समुदाव की आवाज़ें' : 'Voices from Our Community'}
          </h3>
          
          <div className="relative h-64">
            {content[language].testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={cn(
                  "absolute inset-0 transition-all duration-500 ease-in-out",
                  index === currentTestimonial 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-4'
                )}
              >
                <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-orange-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className={cn(
                      "text-lg text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      "{testimonial.content}"
                    </blockquote>
                    <div className="text-center">
                      <div className={cn(
                        "font-semibold text-indigo-900 dark:text-indigo-100",
                        language === 'hi' ? 'hindi-text' : ''
                      )}>
                        {testimonial.name}
                      </div>
                      <div className={cn(
                        "text-sm text-gray-600 dark:text-gray-400",
                        language === 'hi' ? 'hindi-text' : ''
                      )}>
                        {testimonial.role}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {content[language].testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === currentTestimonial 
                    ? 'bg-indigo-600 w-8' 
                    : 'bg-gray-300 dark:bg-gray-600'
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter/CTA Section */}
      <section className="px-4 py-16 bg-gradient-to-r from-indigo-600 to-rose-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className={cn(
            "text-3xl font-bold mb-4",
            language === 'hi' ? 'hindi-text' : ''
          )}>
            {content[language].cta.title}
          </h3>
          <p className={cn(
            "text-xl mb-8 text-indigo-100",
            language === 'hi' ? 'hindi-text' : ''
          )}>
            {content[language].cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white text-indigo-600 hover:bg-gray-100 border-white" asChild>
              <Link to="#role-selection" onClick={(e) => {
                e.preventDefault();
                document.querySelector('#role-selection')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                {content[language].cta.button}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="ghost" className="text-white hover:bg-white/10" asChild>
              <Link to="/learn">
                <BookOpen className="w-5 h-5 mr-2" />
                {language === 'hi' ? 'और जानें' : 'Learn More'}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/favicon-dark.svg" 
                  alt="Logo" 
                  className="w-8 h-8"
                />
                <h4 className={cn(
                  "text-xl font-bold",
                  language === 'hi' ? 'hindi-text' : ''
                )}>
                  {content[language].hero.title}
                </h4>
              </div>
              <p className={cn(
                "text-gray-400 leading-relaxed max-w-md",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {language === 'hi' 
                  ? 'भारत की सबसे बड़ी चिकनकारी मार्केटप्लेस में आपका स्वागत है। पारंपरिक कला को आधुनिक तकनीक से जोड़ना।'
                  : 'Welcome to India\'s largest Chikankari marketplace. Connecting traditional art with modern technology.'}
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">{language === 'hi' ? 'त्वरित लिंक' : 'Quick Links'}</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/marketplace" className="hover:text-white transition-colors">{language === 'hi' ? 'बाज़ार' : 'Marketplace'}</Link></li>
                <li><Link to="/learn" className="hover:text-white transition-colors">{language === 'hi' ? 'सीखना' : 'Learn'}</Link></li>
                <li><Link to="/auth/phone" className="hover:text-white transition-colors">{language === 'hi' ? 'साइन अप' : 'Sign Up'}</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">{language === 'hi' ? 'संपर्क' : 'Contact'}</h5>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {language === 'hi' ? 'लखनऊ, उत्तर प्रदेश' : 'Lucknow, UP'}
                </li>
                <li className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  support@chikankari.com
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>{language === 'hi' 
              ? '© 2025 चिकनकारी कनेक्ट। सभी अधिकार सुरक्षित।'
              : '© 2025 Chikankari Connect. All rights reserved.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

