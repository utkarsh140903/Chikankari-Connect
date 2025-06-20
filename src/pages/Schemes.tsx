import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileNav } from "@/components/layout/MobileNav";
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle, 
  GanttChart, 
  Sparkles, 
  Landmark, 
  Users 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate, Link } from "react-router-dom";

const Schemes: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const navigate = useNavigate();

  // Bilingual content
  const content = {
    en: {
      title: "Government Schemes",
      subtitle: "Financial support and development programs for artisans",
      status: {
        active: "Active",
        upcoming: "Upcoming",
        closed: "Closed"
      },
      target: "Target:",
      benefits: "Benefits:",
      eligibility: "Eligibility:",
      applyNow: "Apply Now",
      backToHome: "Back"
    },
    hi: {
      title: "सरकारी योजनाएं",
      subtitle: "कारीगरों के लिए वित्तीय सहायता और विकास कार्यक्रम",
      status: {
        active: "सक्रिय",
        upcoming: "आगामी",
        closed: "बंद"
      },
      target: "लक्षित:",
      benefits: "लाभ:",
      eligibility: "पात्रता:",
      applyNow: "आवेदन करें",
      backToHome: "वापस"
    }
  };

  // Define types for scheme data
  type SchemeContent = {
    en: string;
    hi: string;
  };

  type SchemeBenefits = {
    en: string[];
    hi: string[];
  };

  type Scheme = {
    id: number;
    title: SchemeContent;
    target: SchemeContent;
    benefits: SchemeBenefits;
    eligibility: SchemeContent;
    status: string;
    link: string;
  };

  // Schemes data with bilingual support
  const schemes: Scheme[] = [
    {
      id: 1,
      title: {
        en: "PM Vishwakarma Yojana",
        hi: "पीएम विश्वकर्मा योजना"
      },
      target: {
        en: "Traditional artisans in handicrafts",
        hi: "हस्तशिल्प में पारंपरिक कारीगर"
      },
      benefits: {
        en: [
          "₹10,000 toolkit support",
          "Skill development training",
          "₹1-3 lakh credit support",
          "Digital payments promotion"
        ],
        hi: [
          "₹10,000 टूलकिट समर्थन",
          "कौशल विकास प्रशिक्षण",
          "₹1-3 लाख क्रेडिट समर्थन",
          "डिजिटल भुगतान प्रोत्साहन"
        ]
      },
      eligibility: {
        en: "Traditional artisans and craftspeople working with hands and tools",
        hi: "हाथों और उपकरणों से काम करने वाले पारंपरिक कारीगर और शिल्पकार"
      },
      status: "active",
      link: "https://vishwakarma.gov.in/"
    },
    {
      id: 2,
      title: {
        en: "Skill India Mission",
        hi: "कौशल भारत मिशन"
      },
      target: {
        en: "Youth and artisans seeking skill enhancement",
        hi: "कौशल वृद्धि चाहने वाले युवा और कारीगर"
      },
      benefits: {
        en: [
          "Free skill training",
          "Industry certification",
          "Job placement assistance",
          "Entrepreneurship support"
        ],
        hi: [
          "मुफ्त कौशल प्रशिक्षण",
          "उद्योग प्रमाणन",
          "नौकरी प्लेसमेंट सहायता",
          "उद्यमिता समर्थन"
        ]
      },
      eligibility: {
        en: "Indian citizens aged 18-45 years",
        hi: "18-45 वर्ष की आयु के भारतीय नागरिक"
      },
      status: "active",
      link: "https://www.skillindia.gov.in/"
    },
    {
      id: 3,
      title: {
        en: "MUDRA Yojana",
        hi: "मुद्रा योजना"
      },
      target: {
        en: "Micro enterprises and artisan businesses",
        hi: "सूक्ष्म उद्यम और कारीगर व्यवसाय"
      },
      benefits: {
        en: [
          "₹50,000 - ₹10 lakh loans",
          "No collateral required",
          "Low interest rates",
          "Business development support"
        ],
        hi: [
          "₹50,000 - ₹10 लाख ऋण",
          "कोई संपार्श्विक आवश्यक नहीं",
          "कम ब्याज दरें",
          "व्यवसाय विकास समर्थन"
        ]
      },
      eligibility: {
        en: "Non-corporate small business owners and entrepreneurs",
        hi: "गैर-कॉर्पोरेट लघु व्यवसाय मालिक और उद्यमी"
      },
      status: "active",
      link: "https://www.mudra.org.in/"
    },
    {
      id: 4,
      title: {
        en: "Stand Up India",
        hi: "स्टैंड अप इंडिया"
      },
      target: {
        en: "Women and SC/ST artisan entrepreneurs",
        hi: "महिला और अनुसूचित जाति/अनुसूचित जनजाति कारीगर उद्यमी"
      },
      benefits: {
        en: [
          "₹10 lakh - ₹1 crore loans",
          "Mentorship programs",
          "Business guidance",
          "Market linkage support"
        ],
        hi: [
          "₹10 लाख - ₹1 करोड़ ऋण",
          "मेंटरशिप प्रोग्राम",
          "व्यापार मार्गदर्शन",
          "बाज़ार लिंकेज समर्थन"
        ]
      },
      eligibility: {
        en: "SC/ST and women entrepreneurs starting new enterprises",
        hi: "नए उद्यम शुरू करने वाले अनुसूचित जाति/अनुसूचित जनजाति और महिला उद्यमी"
      },
      status: "active",
      link: "https://www.standupmitra.in/"
    }
  ];

  // Status Badge component
  const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    return (
      <div className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        status === "active" ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" :
        status === "upcoming" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300" :
        "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300"
      )}>
        <CheckCircle className="w-3 h-3 mr-1" />
        {status === "active" ? content[language].status.active :
         status === "upcoming" ? content[language].status.upcoming :
         content[language].status.closed}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-rose-50 dark:from-indigo-950 dark:via-gray-900 dark:to-rose-950 pb-20 relative overflow-x-hidden">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 p-3 sm:p-4 sticky top-0 z-20 shadow-sm w-full">
        <div className="flex justify-between items-center w-full max-w-[95%] sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto px-1 sm:px-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              className="h-8 w-8 sm:h-9 sm:w-9 rounded-full transition-all duration-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
              onClick={() => navigate('/')}
              aria-label={content[language].backToHome}
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-700 dark:text-indigo-400" />
            </Button>
            <h1 className={cn(
              "text-lg sm:text-xl font-bold text-indigo-900 dark:text-indigo-100",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].title}
            </h1>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <ThemeToggle />
            <LanguageToggle language={language} onLanguageChange={setLanguage} />
          </div>
        </div>
      </div>

      <div className="w-full max-w-[95%] sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto px-1 sm:px-4 py-6">
        {/* Subtitle */}
        <p className={cn(
          "text-center mb-8 text-gray-600 dark:text-gray-300",
          language === 'hi' ? 'hindi-text' : ''
        )}>
          {content[language].subtitle}
        </p>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 md:gap-8">
          {schemes.map((scheme: Scheme) => (
            <Card 
              key={scheme.id}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px] group w-full overflow-hidden max-w-full"
            >
              <CardHeader className="p-2 sm:p-6">
                <div className="flex flex-wrap sm:flex-nowrap justify-between items-start gap-1 sm:gap-2">
                  <div className="flex items-center gap-2 sm:gap-3 flex-shrink">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      {scheme.id === 1 && <GanttChart className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />}
                      {scheme.id === 2 && <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />}
                      {scheme.id === 3 && <Landmark className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />}
                      {scheme.id === 4 && <Users className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />}
                    </div>
                    <CardTitle className={cn(
                      "text-base sm:text-lg md:text-xl text-indigo-900 dark:text-indigo-100 break-words",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      {scheme.title[language]}
                    </CardTitle>
                  </div>
                  <StatusBadge status={scheme.status} />
                </div>
              </CardHeader>

              <CardContent className="p-2 sm:p-6 space-y-3 sm:space-y-4 overflow-hidden">
                {/* Target */}
                <div>
                  <h3 className={cn(
                    "font-medium text-sm text-gray-500 dark:text-gray-400 mb-1",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].target}
                  </h3>
                  <p className={cn(
                    "text-gray-700 dark:text-gray-300 text-sm sm:text-base break-words",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {scheme.target[language]}
                  </p>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className={cn(
                    "font-medium text-sm text-gray-500 dark:text-gray-400 mb-1",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].benefits}
                  </h3>
                  <ul className="space-y-1">
                    {scheme.benefits[language].map((benefit: string, index: number) => (
                      <li 
                        key={index}
                        className={cn(
                          "flex items-start text-xs sm:text-sm md:text-base",
                          language === 'hi' ? 'hindi-text' : ''
                        )}
                      >
                        <span className="mr-1 sm:mr-2 mt-1 text-indigo-500 dark:text-indigo-400 flex-shrink-0">•</span>
                        <span className="text-gray-700 dark:text-gray-300 break-words">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Eligibility */}
                <div>
                  <h3 className={cn(
                    "font-medium text-sm text-gray-500 dark:text-gray-400 mb-1",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].eligibility}
                  </h3>
                  <p className={cn(
                    "text-gray-700 dark:text-gray-300 text-sm sm:text-base break-words",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {scheme.eligibility[language]}
                  </p>
                </div>
              </CardContent>

              <CardFooter className="p-2 sm:p-6">
                <a 
                  href={scheme.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full"
                  aria-label={`Apply for ${scheme.title[language]}`}
                >
                  <Button 
                    className="w-full h-9 sm:h-10 md:h-12 bg-indigo-600 hover:bg-indigo-700 group-hover:bg-indigo-500 text-white flex items-center justify-center gap-1 sm:gap-2 transition-colors duration-300 text-xs sm:text-sm md:text-base"
                  >
                    <span className={cn(
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      {content[language].applyNow}
                    </span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Mobile Nav */}
      <MobileNav language={language} />
      
      {/* Extra spacing for mobile nav */}
      <div className="h-16 md:h-20"></div>
    </div>
  );
};

export default Schemes;
