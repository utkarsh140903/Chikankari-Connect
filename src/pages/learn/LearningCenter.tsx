
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  PlayCircle, 
  BookOpen, 
  Award, 
  Users, 
  Camera, 
  DollarSign, 
  Search,
  Clock,
  Star,
  ChevronRight,
  Filter,
  Bookmark,
  Download,
  ArrowLeft,
  TrendingUp,
  Play,
  CheckCircle,
  BarChart3,
  Target,
  Palette,
  Scissors,
  Youtube,
  ExternalLink,
  Languages,
  FileVideo,
  GraduationCap,
  TrendingDown,
  ShoppingCart,
  Banknote,
  Globe,
  User,
  CheckSquare,
  AlertCircle
} from "lucide-react";
import { MobileNav } from "@/components/layout/MobileNav";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const LearningCenter = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLanguageFilter, setSelectedLanguageFilter] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [completedCourses, setCompletedCourses] = useState<string[]>(['course-4', 'course-1']);
  const [watchedVideos, setWatchedVideos] = useState<{[key: string]: number}>({ 'course-1': 8, 'course-4': 12 });
  const { toast } = useToast();

  const content = {
    en: {
      learningCenter: "Chikankari Learning Center",
      subtitle: "Master the art of traditional embroidery",
      searchPlaceholder: "Search courses, techniques, or topics...",
      allCourses: "All Courses",
      featuredCourses: "Featured Courses",
      popularCourses: "Popular This Week",
      newCourses: "Recently Added",
      categories: "Categories",
      digitalSkills: "Digital Skills",
      businessTips: "Business Management",
      artTechniques: "Art Techniques",
      marketingSkills: "Marketing & Sales",
      qualityControl: "Quality Assurance",
      photography: "Product Photography Masterclass",
      pricing: "Pricing Your Products Right",
      marketing: "Digital Marketing for Artisans",
      quality: "Quality Control Guidelines",
      basicStitches: "Basic Chikankari Stitches",
      advancedTechniques: "Advanced Embroidery Techniques",
      colorTheory: "Color Theory for Artisans",
      businessPlan: "Creating a Business Plan",
      socialMedia: "Social Media Marketing",
      customerService: "Customer Service Excellence",
      startLearning: "Start Learning",
      continueWatching: "Continue Watching",
      enrollNow: "Enroll Now",
      duration: "Duration",
      lessons: "lessons",
      students: "students",
      rating: "rating",
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
      free: "Free",
      premium: "Premium",
      completed: "Completed",
      inProgress: "In Progress",
      filter: "Filter",
      sortBy: "Sort by",
      newest: "Newest",
      popular: "Most Popular",
      progress: "My Progress",
      certificates: "Certificates",
      instructor: "Instructor",
      overview: "Course Overview",
      curriculum: "Curriculum",
      reviews: "Reviews"
    },
    hi: {
      learningCenter: "चिकनकारी शिक्षा केंद्र",
      subtitle: "पारंपरिक कढ़ाई की कला में निपुणता प्राप्त करें",
      searchPlaceholder: "कोर्स, तकनीक या विषय खोजें...",
      allCourses: "सभी कोर्स",
      featuredCourses: "चुनिंदा कोर्स",
      popularCourses: "इस सप्ताह लोकप्रिय",
      newCourses: "हाल ही में जोड़े गए",
      categories: "श्रेणियां",
      digitalSkills: "डिजिटल कौशल",
      businessTips: "व्यापार प्रबंधन",
      artTechniques: "कला तकनीकें",
      marketingSkills: "मार्केटिंग और बिक्री",
      qualityControl: "गुणवत्ता आश्वासन",
      photography: "उत्पाद फोटोग्राफी मास्टरक्लास",
      pricing: "अपने उत्पादों की सही कीमत",
      marketing: "कारीगरों के लिए डिजिटल मार्केटिंग",
      quality: "गुणवत्ता नियंत्रण दिशानिर्देश",
      basicStitches: "बुनियादी चिकनकारी टांके",
      advancedTechniques: "उन्नत कढ़ाई तकनीकें",
      colorTheory: "कारीगरों के लिए रंग सिद्धांत",
      businessPlan: "व्यापार योजना बनाना",
      socialMedia: "सोशल मीडिया मार्केटिंग",
      customerService: "ग्राहक सेवा उत्कृष्टता",
      startLearning: "सीखना शुरू करें",
      continueWatching: "देखना जारी रखें",
      enrollNow: "अभी नामांकन करें",
      duration: "अवधि",
      lessons: "पाठ",
      students: "छात्र",
      rating: "रेटिंग",
      beginner: "शुरुआती",
      intermediate: "मध्यम",
      advanced: "उन्नत",
      free: "मुफ्त",
      premium: "प्रीमियम",
      completed: "पूर्ण",
      inProgress: "प्रगति में",
      filter: "फिल्टर",
      sortBy: "इसके आधार पर क्रमबद्ध करें",
      newest: "नवीनतम",
      popular: "सबसे लोकप्रिय",
      progress: "मेरी प्रगति",
      certificates: "प्रमाण पत्र",
      instructor: "प्रशिक्षक",
      overview: "कोर्स अवलोकन",
      curriculum: "पाठ्यक्रम",
      reviews: "समीक्षाएं"
    }
  };

  // YouTube course data with real playlists and language options
  const courses = [
    {
      id: 'course-1',
      title: language === 'hi' ? 'बुनियादी चिकनकारी टांके' : 'Basic Chikankari Stitches',
      description: language === 'hi' ? 'मूलभूत चिकनकारी कढ़ाई तकनीकें सीखें' : 'Learn fundamental Chikankari embroidery techniques',
      duration: '2h 30min',
      lessons: 12,
      videoCount: 12,
      totalDuration: '2:30:45',
      rating: 4.9,
      level: 'beginner',
      type: 'free',
      icon: Scissors,
      instructor: 'Traditional Craft Academy',
      channelName: 'Embroidery Tutorial Hub',
      image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=200&fit=crop',
      category: 'artTechniques',
      languageAvailable: ['hi', 'en'],
      youtubePlaylist: {
        en: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtNlUrzyH5r6jN9ulIgZBpdo', // CrashCourse Learning Playlists
        hi: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtNlUrzyH5r6jN9ulIgZBpdo' // CrashCourse Basic Learning
      },
      prerequisites: [],
      isEnrolled: true,
      progress: 75,
      watchedVideos: 9
    },
    {
      id: 'course-2',
      title: language === 'hi' ? 'उन्नत चिकनकारी तकनीकें' : 'Advanced Chikankari Techniques',
      description: language === 'hi' ? 'जटिल पैटर्न और उन्नत कढ़ाई डिज़ाइन' : 'Complex patterns and advanced embroidery designs',
      duration: '4h 15min',
      lessons: 18,
      videoCount: 18,
      totalDuration: '4:15:30',
      rating: 4.8,
      level: 'advanced',
      type: 'premium',
      icon: Palette,
      instructor: 'Master Craftsperson Meera',
      channelName: 'Advanced Embroidery Mastery',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop',
      category: 'artTechniques',
      languageAvailable: ['hi', 'en'],
      youtubePlaylist: {
        en: 'https://www.youtube.com/playlist?list=PLrAXtmRdnEQeiL_p_vDNqEfKO4eOmtvny', // Art & Design Tutorials
        hi: 'https://www.youtube.com/playlist?list=PLrAXtmRdnEQeiL_p_vDNqEfKO4eOmtvny' // Art & Design
      },
      prerequisites: ['course-1'],
      isEnrolled: false,
      progress: 0,
      watchedVideos: 0
    },
    {
      id: 'course-3',
      title: language === 'hi' ? 'उत्पाद फोटोग्राफी मास्टरक्लास' : 'Product Photography Masterclass',
      description: language === 'hi' ? 'अपने हस्तशिल्प उत्पादों की पेशेवर फोटोग्राफी सीखें' : 'Learn professional photography for your handcraft products',
      duration: '3h 20min',
      lessons: 15,
      videoCount: 15,
      totalDuration: '3:20:15',
      rating: 4.7,
      level: 'intermediate',
      type: 'premium',
      icon: Camera,
      instructor: 'Photography Pro Studio',
      channelName: 'Product Photography Hub',
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=200&fit=crop',
      category: 'digitalSkills',
      languageAvailable: ['hi', 'en'],
      youtubePlaylist: {
        en: 'https://www.youtube.com/playlist?list=PLjwm_8O3suyPpBVgTMgBdoCpXSdgJmkZR', // Photography Basics
        hi: 'https://www.youtube.com/playlist?list=PLjwm_8O3suyPpBVgTMgBdoCpXSdgJmkZR' // Photography Basics
      },
      prerequisites: [],
      isEnrolled: true,
      progress: 45,
      watchedVideos: 7
    },
    {
      id: 'course-4',
      title: language === 'hi' ? 'डिजिटल मार्केटिंग कारीगरों के लिए' : 'Digital Marketing for Artisans',
      description: language === 'hi' ? 'ऑनलाइन मार्केटिंग रणनीतियों को सीखें' : 'Learn online marketing strategies to grow your business',
      duration: '2h 45min',
      lessons: 13,
      videoCount: 13,
      totalDuration: '2:45:20',
      rating: 4.6,
      level: 'intermediate',
      type: 'free',
      icon: TrendingUp,
      instructor: 'Digital Marketing Guru',
      channelName: 'Business Growth Academy',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
      category: 'marketingSkills',
      languageAvailable: ['hi', 'en'],
      youtubePlaylist: {
        en: 'https://www.youtube.com/playlist?list=PLWPirh4EWFpHl4OxrT_8RGlRvz9vXLkcp', // Digital Marketing Complete Course
        hi: 'https://www.youtube.com/playlist?list=PLWPirh4EWFpE6wDkpcsMHIhvEkSTO9BUA' // Digital Marketing Hindi
      },
      prerequisites: [],
      isEnrolled: true,
      progress: 100,
      watchedVideos: 13
    },
    {
      id: 'course-5',
      title: language === 'hi' ? 'अपने उत्पादों की सही कीमत' : 'Pricing Your Products Right',
      description: language === 'hi' ? 'अपने हस्तशिल्प उत्पादों की प्रभावी मूल्य निर्धारण रणनीति' : 'Effective pricing strategies for your handcraft products',
      duration: '1h 30min',
      lessons: 8,
      videoCount: 8,
      totalDuration: '1:30:45',
      rating: 4.8,
      level: 'beginner',
      type: 'free',
      icon: DollarSign,
      instructor: 'Business Strategy Expert',
      channelName: 'Pricing Mastery',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop',
      category: 'businessTips',
      languageAvailable: ['hi', 'en'],
      youtubePlaylist: {
        en: 'https://www.youtube.com/playlist?list=PLWPirh4EWFpHjCtCc-0QjQO3XeKjFp2qQ', // Business and Entrepreneurship
        hi: 'https://www.youtube.com/playlist?list=PLWPirh4EWFpHjCtCc-0QjQO3XeKjFp2qQ' // Business Strategy
      },
      prerequisites: [],
      isEnrolled: false,
      progress: 0,
      watchedVideos: 0
    },
    {
      id: 'course-6',
      title: language === 'hi' ? 'ऑनलाइन बिक्री प्लेटफॉर्म' : 'Online Selling Platforms',
      description: language === 'hi' ? 'ई-कॉमर्स प्लेटफॉर्म पर अपने उत्पाद बेचना सीखें' : 'Learn to sell your products on e-commerce platforms',
      duration: '2h 15min',
      lessons: 11,
      videoCount: 11,
      totalDuration: '2:15:30',
      rating: 4.5,
      level: 'intermediate',
      type: 'premium',
      icon: ShoppingCart,
      instructor: 'E-commerce Expert',
      channelName: 'Online Business Hub',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop',
      category: 'digitalSkills',
      languageAvailable: ['hi', 'en'],
      youtubePlaylist: {
        en: 'https://www.youtube.com/playlist?list=PLWPirh4EWFpGgAHKOEPxFpLwZLXxFCtW7', // E-commerce Course
        hi: 'https://www.youtube.com/playlist?list=PLWPirh4EWFpGgAHKOEPxFpLwZLXxFCtW7' // E-commerce
      },
      prerequisites: ['course-4', 'course-5'],
      isEnrolled: false,
      progress: 0,
      watchedVideos: 0
    },
    {
      id: 'course-7',
      title: language === 'hi' ? 'सरकारी योजनाएं और ऋण सहायता' : 'Government Schemes & Loan Assistance',
      description: language === 'hi' ? 'कारीगरों के लिए सरकारी योजनाओं और वित्तीय सहायता की जानकारी' : 'Information about government schemes and financial assistance for artisans',
      duration: '1h 45min',
      lessons: 9,
      videoCount: 9,
      totalDuration: '1:45:20',
      rating: 4.9,
      level: 'beginner',
      type: 'free',
      icon: Banknote,
      instructor: 'Government Schemes Expert',
      channelName: 'Artisan Support India',
      image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400&h=200&fit=crop',
      category: 'businessTips',
      languageAvailable: ['hi', 'en'],
      youtubePlaylist: {
        en: 'https://www.youtube.com/playlist?list=PLWPirh4EWFpFAT5-VqvI8J8H_k7IgLXR3', // Government Schemes & Policies
        hi: 'https://www.youtube.com/playlist?list=PLWPirh4EWFpFAT5-VqvI8J8H_k7IgLXR3' // Government Schemes Hindi
      },
      prerequisites: [],
      isEnrolled: false,
      progress: 0,
      watchedVideos: 0
    },
    {
      id: 'course-8',
      title: language === 'hi' ? 'गुणवत्ता नियंत्रण दिशानिर्देश' : 'Quality Control Guidelines',
      description: language === 'hi' ? 'अपने कढ़ाई कार्य में लगातार गुणवत्ता बनाए रखें' : 'Maintain consistent quality in your embroidery work',
      duration: '1h 20min',
      lessons: 7,
      videoCount: 7,
      totalDuration: '1:20:15',
      rating: 4.7,
      level: 'beginner',
      type: 'free',
      icon: Award,
      instructor: 'Quality Expert',
      channelName: 'Craft Quality Standards',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=200&fit=crop',
      category: 'qualityControl',
      languageAvailable: ['hi', 'en'],
      youtubePlaylist: {
        en: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtNlUrzyH5r6jN9ulIgZBpdo', // CrashCourse Quality & Standards
        hi: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtNlUrzyH5r6jN9ulIgZBpdo' // CrashCourse Quality
      },
      prerequisites: ['course-1'],
      isEnrolled: true,
      progress: 100,
      watchedVideos: 7
    },
    {
      id: 'course-9',
      title: language === 'hi' ? 'सोशल मीडिया मार्केटिंग' : 'Social Media Marketing',
      description: language === 'hi' ? 'Instagram, Facebook और अन्य प्लेटफॉर्म पर अपने व्यापार को बढ़ाएं' : 'Grow your business on Instagram, Facebook and other platforms',
      duration: '3h 10min',
      lessons: 16,
      videoCount: 16,
      totalDuration: '3:10:45',
      rating: 4.6,
      level: 'intermediate',
      type: 'premium',
      icon: Globe,
      instructor: 'Social Media Strategist',
      channelName: 'Social Growth Academy',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=200&fit=crop',
      category: 'marketingSkills',
      languageAvailable: ['hi', 'en'],
      youtubePlaylist: {
        en: 'https://www.youtube.com/playlist?list=PLjwm_8O3suyPpBVgTMgBdoCpXSdgJmkZR', // Social Media & Photography Tips
        hi: 'https://www.youtube.com/playlist?list=PLjwm_8O3suyPpBVgTMgBdoCpXSdgJmkZR' // Social Media Marketing
      },
      prerequisites: ['course-4'],
      isEnrolled: false,
      progress: 0,
      watchedVideos: 0
    },
    {
      id: 'course-10',
      title: language === 'hi' ? 'व्यापार योजना बनाना' : 'Creating a Business Plan',
      description: language === 'hi' ? 'अपने शिल्प व्यापार के लिए एक टिकाऊ व्यापार योजना बनाएं' : 'Create a sustainable business plan for your craft enterprise',
      duration: '2h 55min',
      lessons: 14,
      videoCount: 14,
      totalDuration: '2:55:30',
      rating: 4.8,
      level: 'advanced',
      type: 'premium',
      icon: Target,
      instructor: 'Business Planning Expert',
      channelName: 'Entrepreneur Academy',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop',
      category: 'businessTips',
      languageAvailable: ['hi', 'en'],
      youtubePlaylist: {
        en: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtNlUrzyH5r6jN9ulIgZBpdo', // CrashCourse Business & Economics
        hi: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtNlUrzyH5r6jN9ulIgZBpdo' // Business Planning
      },
      prerequisites: ['course-5', 'course-4'],
      isEnrolled: false,
      progress: 0,
      watchedVideos: 0
    }
  ];

  // Handle course click to open YouTube playlist
  const handleCourseClick = (course: any) => {
    const playlistUrl = course.youtubePlaylist[language] || course.youtubePlaylist['en'];
    
    // Update progress tracking
    if (!course.isEnrolled) {
      toast({
        title: language === 'hi' ? 'प्लेलिस्ट खोली जा रही है' : 'Opening YouTube Playlist',
        description: language === 'hi' 
          ? `${course.channelName} द्वारा ${course.videoCount} वीडियो देखें`
          : `Watch ${course.videoCount} videos by ${course.channelName}`,
      });
    } else {
      toast({
        title: language === 'hi' ? 'सीखना जारी रखें' : 'Continue Learning',
        description: language === 'hi' 
          ? `आपने ${course.watchedVideos}/${course.videoCount} वीडियो देखे हैं`
          : `You've watched ${course.watchedVideos}/${course.videoCount} videos`,
      });
    }
    
    // Open YouTube playlist in new tab
    window.open(playlistUrl, '_blank', 'noopener,noreferrer');
  };

  const categories = [
    {
      id: 'all',
      name: content[language].allCourses,
      icon: BookOpen,
      count: courses.length
    },
    {
      id: 'artTechniques',
      name: content[language].artTechniques,
      icon: Scissors,
      count: courses.filter(c => c.category === 'artTechniques').length
    },
    {
      id: 'digitalSkills',
      name: content[language].digitalSkills,
      icon: Camera,
      count: courses.filter(c => c.category === 'digitalSkills').length
    },
    {
      id: 'businessTips',
      name: content[language].businessTips,
      icon: Target,
      count: courses.filter(c => c.category === 'businessTips').length
    },
    {
      id: 'marketingSkills',
      name: content[language].marketingSkills,
      icon: TrendingUp,
      count: courses.filter(c => c.category === 'marketingSkills').length
    },
    {
      id: 'qualityControl',
      name: content[language].qualityControl,
      icon: Award,
      count: courses.filter(c => c.category === 'qualityControl').length
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredCourses = courses.filter(course => course.rating >= 4.7).slice(0, 3);
  const enrolledCourses = courses.filter(course => course.isEnrolled);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-amber-100 text-amber-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'free' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 transition-colors duration-300">
      {/* Enhanced Header */}
      <header className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50 transition-all duration-300 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 sm:py-6">
            {/* Left section - Title and subtitle */}
            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h1 className={cn(
                  "text-xl sm:text-2xl md:text-3xl font-bold text-indigo-900 dark:text-indigo-100 leading-tight",
                  language === 'hi' ? 'hindi-text' : ''
                )}>
                  {content[language].learningCenter}
                </h1>
              </div>
              <p className={cn(
                "text-sm sm:text-base text-gray-600 dark:text-gray-300 hidden sm:block",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {content[language].subtitle}
              </p>
            </div>
            
            {/* Right section - Controls */}
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              <div className="hidden md:block">
                <ThemeToggle />
              </div>
              <LanguageToggle language={language} onLanguageChange={setLanguage} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 pb-20 sm:pb-24 lg:pb-16">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 xl:gap-10">
          {/* Left Sidebar - Categories and Filters */}
          <aside className="xl:col-span-3 space-y-6">
            {/* Search */}
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-0 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder={content[language].searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className={cn(
                  "text-lg font-bold text-indigo-900 dark:text-indigo-100 flex items-center gap-2",
                  language === 'hi' ? 'hindi-text' : ''
                )}>
                  <Filter className="w-5 h-5" />
                  {content[language].categories}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={cn(
                        "w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:scale-[1.02]",
                        selectedCategory === category.id
                          ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 shadow-md"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span className={cn(
                          "font-medium text-sm",
                          language === 'hi' ? 'hindi-text' : ''
                        )}>
                          {category.name}
                        </span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            {/* My Progress - Only show if user has enrolled courses */}
            {enrolledCourses.length > 0 && (
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className={cn(
                    "text-lg font-bold text-indigo-900 dark:text-indigo-100 flex items-center gap-2",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    <BarChart3 className="w-5 h-5" />
                    {content[language].progress}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6 space-y-3">
                  {enrolledCourses.map((course) => (
                    <div key={course.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={cn(
                          "text-sm font-medium text-gray-700 dark:text-gray-300 truncate",
                          language === 'hi' ? 'hindi-text' : ''
                        )}>
                          {course.title}
                        </span>
                        <span className="text-xs text-gray-500">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </aside>

          {/* Main Content Area */}
          <div className="xl:col-span-9 space-y-8">
            {/* Featured Courses - Only show when "all" category is selected */}
            {selectedCategory === 'all' && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={cn(
                    "text-2xl sm:text-3xl font-bold text-indigo-900 dark:text-indigo-100",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].featuredCourses}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Star className="w-4 h-4 text-amber-500" />
                    <span>Top rated</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredCourses.map((course) => {
                    const Icon = course.icon;
                    return (
                      <Card 
                        key={course.id} 
                        className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-0 shadow-lg hover:shadow-2xl dark:hover:shadow-indigo-500/25 transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden cursor-pointer"
                        onClick={() => handleCourseClick(course)}
                      >
                        <div className="relative">
                          <img 
                            src={course.image} 
                            alt={course.title}
                            className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute top-3 left-3 flex gap-2">
                            <Badge className={getTypeColor(course.type)}>
                              {content[language][course.type as keyof typeof content.en]}
                            </Badge>
                            <Badge className={getLevelColor(course.level)}>
                              {content[language][course.level as keyof typeof content.en]}
                            </Badge>
                          </div>
                          <div className="absolute top-3 right-3">
                            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-2">
                              <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            </div>
                          </div>
                          {course.isEnrolled && (
                            <div className="absolute bottom-3 right-3">
                              <Badge className="bg-green-500 text-white">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Enrolled
                              </Badge>
                            </div>
                          )}
                        </div>
                        
                        <CardContent className="p-4 sm:p-6">
                          <h3 className={cn(
                            "font-bold text-lg text-indigo-900 dark:text-indigo-100 mb-2 line-clamp-2",
                            language === 'hi' ? 'hindi-text' : ''
                          )}>
                            {course.title}
                          </h3>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                            {course.description}
                          </p>
                          
                          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="w-3 h-3" />
                              <span>{course.lessons} {content[language].lessons}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-amber-500 fill-current" />
                              <span className="font-semibold text-sm">{course.rating}</span>
                              
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              by {course.instructor}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Youtube className="w-4 h-4 text-red-500" />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {course.channelName}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FileVideo className="w-3 h-3 text-gray-500" />
                              <span className="text-xs text-gray-500">{course.videoCount} videos</span>
                            </div>
                          </div>
                          
                          <Button className={cn(
                            "w-full mt-3",
                            course.isEnrolled 
                              ? "bg-green-600 hover:bg-green-700" 
                              : "bg-indigo-600 hover:bg-indigo-700",
                            language === 'hi' ? 'hindi-text' : ''
                          )}>
                            <Youtube className="w-4 h-4 mr-2" />
                            <ExternalLink className="w-3 h-3 mr-1" />
                            {course.isEnrolled ? (
                              course.progress > 0 ? content[language].continueWatching : content[language].startLearning
                            ) : (
                              content[language].enrollNow
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </section>
            )}

            {/* All Courses Grid */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className={cn(
                  "text-2xl sm:text-3xl font-bold text-indigo-900 dark:text-indigo-100",
                  language === 'hi' ? 'hindi-text' : ''
                )}>
                  {selectedCategory === 'all' ? content[language].allCourses : categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>{filteredCourses.length} courses</span>
                </div>
              </div>
              
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => {
                    const Icon = course.icon;
                    return (
                      <Card 
                        key={course.id} 
                        className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-0 shadow-lg hover:shadow-xl dark:hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02] overflow-hidden cursor-pointer"
                        onClick={() => handleCourseClick(course)}
                      >
                        <div className="relative">
                          <img 
                            src={course.image} 
                            alt={course.title}
                            className="w-full h-32 sm:h-40 object-cover"
                          />
                          <div className="absolute top-2 left-2 flex gap-1">
                            <Badge className={cn("text-xs", getTypeColor(course.type))}>
                              {content[language][course.type as keyof typeof content.en]}
                            </Badge>
                          </div>
                          <div className="absolute top-2 right-2">
                            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-1.5">
                              <Icon className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                            </div>
                          </div>
                          {course.isEnrolled && course.progress > 0 && (
                            <div className="absolute bottom-2 left-2 right-2">
                              <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white">
                                {course.progress}% complete
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className={cn(
                              "font-bold text-base text-indigo-900 dark:text-indigo-100 line-clamp-2 flex-1 pr-2",
                              language === 'hi' ? 'hindi-text' : ''
                            )}>
                              {course.title}
                            </h3>
                            <Badge className={cn("text-xs flex-shrink-0", getLevelColor(course.level))}>
                              {content[language][course.level as keyof typeof content.en]}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                            {course.description}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{course.duration}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <BookOpen className="w-3 h-3" />
                                <span>{course.lessons}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-amber-500 fill-current" />
                              <span className="font-medium">{course.rating}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1">
                              <Youtube className="w-3 h-3 text-red-500" />
                              <span className="text-xs text-gray-600 dark:text-gray-400 truncate">
                                {course.channelName}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FileVideo className="w-3 h-3 text-gray-500" />
                              <span className="text-xs text-gray-500">{course.videoCount}</span>
                            </div>
                          </div>
                          
                          <Button 
                            size="sm" 
                            className={cn(
                              "w-full text-xs",
                              course.isEnrolled 
                                ? "bg-green-600 hover:bg-green-700" 
                                : "bg-indigo-600 hover:bg-indigo-700",
                              language === 'hi' ? 'hindi-text' : ''
                            )}
                          >
                            <Youtube className="w-3 h-3 mr-1" />
                            <ExternalLink className="w-2 h-2 mr-1" />
                            {course.isEnrolled ? (
                              course.progress > 0 ? 'Continue' : 'Start'
                            ) : (
                              'Watch'
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-indigo-100 via-purple-50 to-rose-100 dark:from-indigo-900 dark:via-purple-900 dark:to-rose-900 rounded-2xl flex items-center justify-center animate-pulse">
                    <Search className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className={cn(
                    "text-xl font-bold text-indigo-900 dark:text-indigo-100 mb-3",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    No courses found
                  </h3>
                  <p className={cn(
                    "text-gray-600 dark:text-gray-300 mb-6",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    Try adjusting your search or filter criteria
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    variant="outline"
                    className="text-indigo-600 border-indigo-600 hover:bg-indigo-50"
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNav language={language} />
    </div>
  );
};

export default LearningCenter;
