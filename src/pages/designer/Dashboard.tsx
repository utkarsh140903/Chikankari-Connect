import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Palette, 
  Users, 
  TrendingUp, 
  MessageCircle, 
  Star, 
  Calendar, 
  ArrowRight,
  Plus,
  Scissors,
  Eye,
  Heart,
  Award
} from "lucide-react";
import { MobileNav } from "@/components/layout/MobileNav";
import { LanguageToggle } from "@/components/LanguageToggle";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const DesignerDashboard = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const content = {
    en: {
      dashboard: "Designer Dashboard",
      welcome: "Welcome back, Priya!",
      stats: {
        collaborations: "Active Collaborations",
        designs: "Total Designs",
        earnings: "This Month Earnings",
        rating: "Average Rating"
      },
      quickActions: {
        title: "Quick Actions",
        newDesign: "Create New Design",
        findArtisans: "Find Artisans",
        viewProjects: "View Projects",
        checkMessages: "Check Messages"
      },
      recentActivity: {
        title: "Recent Activity",
        items: [
          "New collaboration request from Ram Kumar",
          "Design 'Floral Fusion' was approved",
          "Payment received for 'Modern Chikankari'",
          "5-star rating received from customer"
        ]
      },
      activeProjects: {
        title: "Active Projects",
        viewAll: "View All"
      },
      featuredArtisans: {
        title: "Featured Artisans",
        viewProfile: "View Profile",
        collaborate: "Collaborate"
      }
    },
    hi: {
      dashboard: "डिजाइनर डैशबोर्ड",
      welcome: "वापस स्वागत है, प्रिया!",
      stats: {
        collaborations: "सक्रिय सहयोग",
        designs: "कुल डिजाइन",
        earnings: "इस महीने की कमाई",
        rating: "औसत रेटिंग"
      },
      quickActions: {
        title: "त्वरित कार्य",
        newDesign: "नया डिजाइन बनाएं",
        findArtisans: "कारीगर खोजें",
        viewProjects: "प्रोजेक्ट देखें",
        checkMessages: "संदेश देखें"
      },
      recentActivity: {
        title: "हाल की गतिविधि",
        items: [
          "राम कुमार से नया सहयोग अनुरोध",
          "डिजाइन 'फ्लोरल फ्यूजन' को मंजूरी मिली",
          "'मॉडर्न चिकनकारी' के लिए भुगतान प्राप्त",
          "ग्राहक से 5-स्टार रेटिंग प्राप्त"
        ]
      },
      activeProjects: {
        title: "सक्रिय प्रोजेक्ट",
        viewAll: "सभी देखें"
      },
      featuredArtisans: {
        title: "विशेष कारीगर",
        viewProfile: "प्रोफाइल देखें",
        collaborate: "सहयोग करें"
      }
    }
  };

  const stats = [
    {
      title: content[language].stats.collaborations,
      value: "8",
      icon: Users,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
      change: "+2 this week"
    },
    {
      title: content[language].stats.designs,
      value: "24",
      icon: Palette,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
      change: "+5 this month"
    },
    {
      title: content[language].stats.earnings,
      value: "₹45,000",
      icon: TrendingUp,
      color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
      change: "+15% from last month"
    },
    {
      title: content[language].stats.rating,
      value: "4.8",
      icon: Star,
      color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
      change: "Based on 156 reviews"
    }
  ];

  const quickActions = [
    {
      title: content[language].quickActions.newDesign,
      icon: Plus,
      color: "bg-purple-600 hover:bg-purple-700",
      path: "/designer/create"
    },
    {
      title: content[language].quickActions.findArtisans,
      icon: Scissors,
      color: "bg-amber-600 hover:bg-amber-700",
      path: "/designer/artisans"
    },
    {
      title: content[language].quickActions.viewProjects,
      icon: Eye,
      color: "bg-blue-600 hover:bg-blue-700",
      path: "/designer/projects"
    },
    {
      title: content[language].quickActions.checkMessages,
      icon: MessageCircle,
      color: "bg-green-600 hover:bg-green-700",
      path: "/chat"
    }
  ];

  const activeProjects = [
    {
      id: 1,
      title: "Floral Fusion Collection",
      artisan: "Mohammad Ali",
      status: "In Progress",
      progress: 75,
      dueDate: "Dec 25"
    },
    {
      id: 2,
      title: "Modern Chikankari Kurtas",
      artisan: "Fatima Sheikh",
      status: "Review",
      progress: 95,
      dueDate: "Dec 20"
    },
    {
      id: 3,
      title: "Wedding Collection",
      artisan: "Aisha Khan",
      status: "Planning",
      progress: 25,
      dueDate: "Jan 15"
    }
  ];

  const featuredArtisans = [
    {
      id: 1,
      name: "Mohammad Ali",
      specialization: "Shadow Work",
      rating: 4.9,
      location: "Lucknow",
      experience: "15+ years",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Fatima Sheikh",
      specialization: "Phanda Work",
      rating: 4.8,
      location: "Lucknow",
      experience: "12+ years",
      avatar: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4 dark:bg-gray-900/80 dark:border-gray-700">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <div>
            <h1 className={cn(
              "text-xl font-bold text-purple-900 dark:text-purple-100",
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
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{stat.value}</p>
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
              "text-lg text-purple-900 dark:text-purple-100",
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

        {/* Active Projects */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/80">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className={cn(
                "text-lg text-purple-900 dark:text-purple-100",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {content[language].activeProjects.title}
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-purple-600 dark:text-purple-400">
                {content[language].activeProjects.viewAll}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeProjects.map((project) => (
                <div key={project.id} className="border-l-4 border-purple-500 pl-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-purple-900 dark:text-purple-100">{project.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">with {project.artisan}</p>
                    </div>
                    <Badge variant={project.status === 'In Progress' ? 'default' : project.status === 'Review' ? 'secondary' : 'outline'}>
                      {project.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{project.progress}%</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Calendar className="w-3 h-3 mr-1" />
                    Due: {project.dueDate}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Featured Artisans */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/80">
          <CardHeader className="pb-3">
            <CardTitle className={cn(
              "text-lg text-purple-900 dark:text-purple-100",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].featuredArtisans.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {featuredArtisans.map((artisan) => (
                <div key={artisan.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-full flex items-center justify-center">
                    <Scissors className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-purple-900 dark:text-purple-100">{artisan.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{artisan.specialization}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-amber-400 fill-current" />
                        <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">{artisan.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-500">•</span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{artisan.experience}</span>
                    </div>
                  </div>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Heart className="w-3 h-3 mr-1" />
                    {content[language].featuredArtisans.collaborate}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/80">
          <CardHeader className="pb-3">
            <CardTitle className={cn(
              "text-lg text-purple-900 dark:text-purple-100",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].recentActivity.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {content[language].recentActivity.items.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                  <p className={cn(
                    "text-sm text-gray-700 dark:text-gray-300",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {activity}
                  </p>
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

export default DesignerDashboard;

