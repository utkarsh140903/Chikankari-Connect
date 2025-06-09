
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, BookOpen, Award, Users, Camera, DollarSign } from "lucide-react";
import { MobileNav } from "@/components/layout/MobileNav";
import { LanguageToggle } from "@/components/LanguageToggle";
import { cn } from "@/lib/utils";

const LearningCenter = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const content = {
    en: {
      learningCenter: "Learning Center",
      featuredCourses: "Featured Courses",
      digitalSkills: "Digital Skills",
      businessTips: "Business Tips",
      photography: "Product Photography Masterclass",
      pricing: "Pricing Your Products Right",
      marketing: "Digital Marketing for Artisans",
      quality: "Quality Control Guidelines",
      startLearning: "Start Learning",
      duration: "Duration",
      lessons: "lessons"
    },
    hi: {
      learningCenter: "शिक्षा केंद्र",
      featuredCourses: "चुनिंदा कोर्स",
      digitalSkills: "डिजिटल कौशल",
      businessTips: "व्यापार सुझाव",
      photography: "उत्पाद फोटोग्राफी मास्टरक्लास",
      pricing: "अपने उत्पादों की सही कीमत",
      marketing: "कारीगरों के लिए डिजिटल मार्केटिंग",
      quality: "गुणवत्ता नियंत्रण दिशानिर्देश",
      startLearning: "सीखना शुरू करें",
      duration: "अवधि",
      lessons: "पाठ"
    }
  };

  const courses = [
    {
      id: 1,
      title: content[language].photography,
      duration: "45 min",
      lessons: 8,
      icon: Camera,
      color: "bg-purple-100 text-purple-600",
      progress: 0
    },
    {
      id: 2,
      title: content[language].pricing,
      duration: "30 min",
      lessons: 5,
      icon: DollarSign,
      color: "bg-green-100 text-green-600",
      progress: 0
    },
    {
      id: 3,
      title: content[language].marketing,
      duration: "60 min",
      lessons: 10,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
      progress: 0
    },
    {
      id: 4,
      title: content[language].quality,
      duration: "25 min",
      lessons: 4,
      icon: Award,
      color: "bg-amber-100 text-amber-600",
      progress: 0
    }
  ];

  const categories = [
    {
      name: content[language].digitalSkills,
      icon: BookOpen,
      count: 12
    },
    {
      name: content[language].businessTips,
      icon: Award,
      count: 8
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
            {content[language].learningCenter}
          </h1>
          <LanguageToggle language={language} onLanguageChange={setLanguage} />
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Categories */}
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg cursor-pointer hover:shadow-xl transition-all hover-lift">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-indigo-100 to-rose-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className={cn(
                    "font-semibold text-indigo-900 mb-1",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600">{category.count} courses</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Featured Courses */}
        <div>
          <h2 className={cn(
            "text-lg font-semibold text-indigo-900 mb-4",
            language === 'hi' ? 'hindi-text' : ''
          )}>
            {content[language].featuredCourses}
          </h2>
          
          <div className="space-y-4">
            {courses.map((course) => {
              const Icon = course.icon;
              return (
                <Card key={course.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={cn("p-3 rounded-lg", course.color)}>
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className={cn(
                          "font-semibold text-indigo-900 mb-2",
                          language === 'hi' ? 'hindi-text' : ''
                        )}>
                          {course.title}
                        </h3>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span>{course.duration}</span>
                          <span>{course.lessons} {content[language].lessons}</span>
                        </div>
                        
                        <Button className={cn(
                          "w-full bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2",
                          language === 'hi' ? 'hindi-text' : ''
                        )}>
                          <PlayCircle className="w-4 h-4" />
                          {content[language].startLearning}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <MobileNav language={language} />
    </div>
  );
};

export default LearningCenter;
