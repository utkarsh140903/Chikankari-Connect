
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Edit, 
  Award, 
  MapPin, 
  Calendar,
  Star,
  Package,
  Eye,
  Users
} from "lucide-react";
import { MobileNav } from "@/components/layout/MobileNav";
import { LanguageToggle } from "@/components/LanguageToggle";
import { cn } from "@/lib/utils";

const ArtisanProfile = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const content = {
    en: {
      profile: "Profile",
      editProfile: "Edit Profile",
      verified: "Verified Artisan",
      experience: "years experience",
      location: "Lucknow, Uttar Pradesh",
      joinedDate: "Joined March 2023",
      rating: "Rating",
      orders: "Orders Completed",
      views: "Profile Views",
      followers: "Followers",
      portfolio: "Portfolio",
      specializations: "Specializations",
      achievements: "Achievements",
      addPhoto: "Add Portfolio Photo",
      bio: "About Me",
      skills: "Skills & Expertise"
    },
    hi: {
      profile: "प्रोफ़ाइल",
      editProfile: "प्रोफ़ाइल संपादित करें",
      verified: "सत्यापित कारीगर",
      experience: "साल का अनुभव",
      location: "लखनऊ, उत्तर प्रदेश",
      joinedDate: "मार्च 2023 में शामिल हुए",
      rating: "रेटिंग",
      orders: "पूर्ण किए गए ऑर्डर",
      views: "प्रोफ़ाइल व्यू",
      followers: "फॉलोअर्स",
      portfolio: "पोर्टफोलियो",
      specializations: "विशेषज्ञताएं",
      achievements: "उपलब्धियां",
      addPhoto: "पोर्टफोलियो फोटो जोड़ें",
      bio: "मेरे बारे में",
      skills: "कौशल और विशेषज्ञता"
    }
  };

  const artisan = {
    name: "राम कुमार",
    bio: "Traditional chikankari artisan with 15+ years of experience. Specialized in shadow work and phanda techniques.",
    bioHi: "15+ साल के अनुभव के साथ पारंपरिक चिकनकारी कारीगर। शैडो वर्क और फांदा तकनीकों में विशेषज्ञ।",
    experience: 15,
    location: "Lucknow, Uttar Pradesh",
    joinedDate: "March 2023",
    verified: true,
    stats: {
      rating: 4.8,
      orders: 124,
      views: 2340,
      followers: 89
    },
    specializations: ["Shadow Work", "Phanda Work", "Tepchi", "Murri"],
    achievements: [
      "GI Tag Certified Artisan",
      "Excellence Award 2023",
      "Traditional Craft Master"
    ],
    achievementsHi: [
      "जीआई टैग प्रमाणित कारीगर",
      "उत्कृष्टता पुरस्कार 2023",
      "पारंपरिक शिल्प मास्टर"
    ],
    portfolio: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ]
  };

  const statCards = [
    {
      label: content[language].rating,
      value: artisan.stats.rating.toString(),
      icon: Star,
      color: "text-amber-600 bg-amber-100"
    },
    {
      label: content[language].orders,
      value: artisan.stats.orders.toString(),
      icon: Package,
      color: "text-green-600 bg-green-100"
    },
    {
      label: content[language].views,
      value: artisan.stats.views.toString(),
      icon: Eye,
      color: "text-blue-600 bg-blue-100"
    },
    {
      label: content[language].followers,
      value: artisan.stats.followers.toString(),
      icon: Users,
      color: "text-purple-600 bg-purple-100"
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
            {content[language].profile}
          </h1>
          <div className="flex items-center gap-2">
            <LanguageToggle language={language} onLanguageChange={setLanguage} />
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-1" />
              {content[language].editProfile}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Profile Header */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-rose-100 rounded-full flex items-center justify-center">
                <Camera className="w-8 h-8 text-indigo-600" />
              </div>
              {artisan.verified && (
                <div className="absolute -bottom-1 -right-1 bg-green-600 rounded-full p-1">
                  <Award className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            <h2 className={cn(
              "text-xl font-bold text-indigo-900 mb-1",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {artisan.name}
            </h2>

            {artisan.verified && (
              <Badge className="bg-green-100 text-green-800 mb-3">
                <Award className="w-3 h-3 mr-1" />
                {content[language].verified}
              </Badge>
            )}

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{artisan.location}</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{artisan.experience} {content[language].experience}</span>
              </div>
              <p>{content[language].joinedDate}</p>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className={cn("w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center", stat.color)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <p className="text-lg font-bold text-indigo-900">{stat.value}</p>
                  <p className={cn(
                    "text-xs text-gray-600",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bio */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className={cn(
              "text-lg text-indigo-900",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].bio}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={cn(
              "text-gray-700 leading-relaxed",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {language === 'hi' ? artisan.bioHi : artisan.bio}
            </p>
          </CardContent>
        </Card>

        {/* Specializations */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className={cn(
              "text-lg text-indigo-900",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].specializations}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {artisan.specializations.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-indigo-100 text-indigo-800">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Portfolio */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className={cn(
              "text-lg text-indigo-900",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].portfolio}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {artisan.portfolio.map((image, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden">
                  <img 
                    src={image} 
                    alt={`Portfolio ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <Button variant="outline" className={cn(
              "w-full",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              <Camera className="w-4 h-4 mr-2" />
              {content[language].addPhoto}
            </Button>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className={cn(
              "text-lg text-indigo-900",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].achievements}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(language === 'hi' ? artisan.achievementsHi : artisan.achievements).map((achievement, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className={cn(
                    "font-medium text-indigo-900",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {achievement}
                  </span>
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

export default ArtisanProfile;
