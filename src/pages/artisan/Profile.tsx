
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
  Users,
  Upload,
  X,
  Save,
  Plus
} from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { MobileNav } from "@/components/layout/MobileNav";
import { LanguageToggle } from "@/components/LanguageToggle";
import { cn } from "@/lib/utils";

const ArtisanProfile = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
  const [isImageViewOpen, setIsImageViewOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [profileData, setProfileData] = useState({
    name: "राम कुमार",
    bio: "Traditional chikankari artisan with 15+ years of experience. Specialized in shadow work and phanda techniques.",
    bioHi: "15+ साल के अनुभव के साथ पारंपरिक चिकनकारी कारीगर। शैडो वर्क और फांदा तकनीकों में विशेषज्ञ।",
    location: "Lucknow, Uttar Pradesh",
    experience: 15,
    specializations: ["Shadow Work", "Phanda Work", "Tepchi", "Murri"]
  });
  
  const { toast } = useToast();

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
      skills: "Skills & Expertise",
      save: "Save Changes",
      cancel: "Cancel",
      name: "Name",
      uploadPhoto: "Upload Photo",
      changeProfilePicture: "Change Profile Picture",
      selectFile: "Select File",
      profileUpdated: "Profile updated successfully!",
      photoAdded: "Photo added to portfolio!",
      clickToView: "Click to view image"
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
      skills: "कौशल और विशेषज्ञता",
      save: "परिवर्तन सेव करें",
      cancel: "रद्द करें",
      name: "नाम",
      uploadPhoto: "फोटो अपलोड करें",
      changeProfilePicture: "प्रोफ़ाइल तस्वीर बदलें",
      selectFile: "फाइल चुनें",
      profileUpdated: "प्रोफ़ाइल सफलतापूर्वक अपडेट हो गया!",
      photoAdded: "फोटो पोर्टफोलियो में जोड़ दी गई!",
      clickToView: "छवि देखने के लिए क्लिक करें"
    }
  };

  // Handler functions
  const handleEditProfile = () => {
    setIsEditDialogOpen(true);
  };

  const handleSaveProfile = () => {
    // Here you would typically make an API call to save the profile
    console.log('Saving profile:', profileData);
    setIsEditDialogOpen(false);
    toast({
      title: "Success!",
      description: content[language].profileUpdated,
    });
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Here you would typically upload the file to your server
      console.log('Uploading file:', file);
      setIsPhotoDialogOpen(false);
      toast({
        title: "Success!",
        description: content[language].photoAdded,
      });
    }
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setIsImageViewOpen(true);
  };

  const artisan = {
    name: profileData.name,
    bio: profileData.bio,
    bioHi: profileData.bioHi,
    experience: profileData.experience,
    location: profileData.location,
    joinedDate: "March 2023",
    verified: true,
    stats: {
      rating: 4.8,
      orders: 124,
      views: 2340,
      followers: 89
    },
    specializations: profileData.specializations,
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
      "https://tse1.mm.bing.net/th?id=OIP.g9WRgEY2hYYARAC4cYqAqwHaE7&pid=Api&P=0&h=180",
      "https://www.avishya.com/cdn/shop/products/1_10059383_profile.jpg?v=1676715503&width=900",
      "https://www.avishya.com/cdn/shop/products/1_10059387_profile.jpg?v=1676710736&width=1080",
      "https://tse3.mm.bing.net/th?id=OIP.lKw2Ccxqns6Ny_HGupfAdwHaHa&pid=Api&P=0&h=180"
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 pb-20 lg:pb-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center max-w-md mx-auto lg:max-w-none">
            <h1 className={cn(
              "text-xl lg:text-2xl font-bold text-indigo-900",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].profile}
            </h1>
            <div className="flex items-center gap-2 lg:gap-4">
              <LanguageToggle language={language} onLanguageChange={setLanguage} />
              <Button variant="outline" size="sm" className="lg:size-default" onClick={handleEditProfile}>
                <Edit className="w-4 h-4 mr-1 lg:mr-2" />
                <span className="hidden sm:inline">{content[language].editProfile}</span>
                <span className="sm:hidden">Edit</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-md mx-auto lg:max-w-none">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="space-y-6 lg:sticky lg:top-28">
                {/* Profile Header */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="relative inline-block mb-4">
                      <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-indigo-100 to-rose-100 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity duration-200" 
                           onClick={() => setIsPhotoDialogOpen(true)}
                           title={content[language].changeProfilePicture}>
                        <Camera className="w-8 h-8 lg:w-10 lg:h-10 text-indigo-600" />
                      </div>
                      {artisan.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-green-600 rounded-full p-1 lg:p-1.5">
                          <Award className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                        </div>
                      )}
                    </div>

                    <h2 className={cn(
                      "text-xl lg:text-2xl font-bold text-indigo-900 mb-1",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      {artisan.name}
                    </h2>

                    {artisan.verified && (
                      <Badge className="bg-green-100 text-green-800 mb-3 lg:mb-4">
                        <Award className="w-3 h-3 mr-1" />
                        {content[language].verified}
                      </Badge>
                    )}

                    <div className="space-y-2 text-sm lg:text-base text-gray-600">
                      <div className="flex items-center justify-center gap-1 lg:gap-2">
                        <MapPin className="w-4 h-4 lg:w-5 lg:h-5" />
                        <span>{artisan.location}</span>
                      </div>
                      <div className="flex items-center justify-center gap-1 lg:gap-2">
                        <Calendar className="w-4 h-4 lg:w-5 lg:h-5" />
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
                      <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardContent className="p-4 lg:p-6 text-center">
                          <div className={cn("w-8 h-8 lg:w-10 lg:h-10 mx-auto mb-2 lg:mb-3 rounded-lg flex items-center justify-center", stat.color)}>
                            <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                          </div>
                          <p className="text-lg lg:text-xl font-bold text-indigo-900">{stat.value}</p>
                          <p className={cn(
                            "text-xs lg:text-sm text-gray-600",
                            language === 'hi' ? 'hindi-text' : ''
                          )}>
                            {stat.label}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="lg:col-span-8 xl:col-span-9 mt-6 lg:mt-0">
              <div className="space-y-6">

                {/* Bio */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-3 lg:pb-4">
                    <CardTitle className={cn(
                      "text-lg lg:text-xl text-indigo-900",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      {content[language].bio}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={cn(
                      "text-gray-700 leading-relaxed lg:text-lg",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      {language === 'hi' ? artisan.bioHi : artisan.bio}
                    </p>
                  </CardContent>
                </Card>

                {/* Specializations */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-3 lg:pb-4">
                    <CardTitle className={cn(
                      "text-lg lg:text-xl text-indigo-900",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      {content[language].specializations}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 lg:gap-3">
                      {artisan.specializations.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition-colors duration-200 lg:text-sm lg:px-3 lg:py-1">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Portfolio */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-3 lg:pb-4">
                    <CardTitle className={cn(
                      "text-lg lg:text-xl text-indigo-900",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      {content[language].portfolio}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-4 mb-4 lg:mb-6">
                      {artisan.portfolio.map((image, index) => (
                        <div key={index} className="aspect-square rounded-lg overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300"
                             onClick={() => handleImageClick(image)}
                             title={content[language].clickToView}>
                          <img 
                            src={image} 
                            alt={`Portfolio ${index + 1}`}
                            className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                          />
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className={cn(
                      "w-full lg:w-auto hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200",
                      language === 'hi' ? 'hindi-text' : ''
                    )} onClick={() => setIsPhotoDialogOpen(true)}>
                      <Camera className="w-4 h-4 mr-2" />
                      {content[language].addPhoto}
                    </Button>
                  </CardContent>
                </Card>

                {/* Achievements */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-3 lg:pb-4">
                    <CardTitle className={cn(
                      "text-lg lg:text-xl text-indigo-900",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      {content[language].achievements}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 lg:space-y-4">
                      {(language === 'hi' ? artisan.achievementsHi : artisan.achievements).map((achievement, index) => (
                        <div key={index} className="flex items-center gap-3 lg:gap-4 p-2 lg:p-3 rounded-lg hover:bg-amber-50 transition-colors duration-200">
                          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Award className="w-4 h-4 lg:w-5 lg:h-5 text-amber-600" />
                          </div>
                          <span className={cn(
                            "font-medium text-indigo-900 lg:text-lg",
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
            </div>
          </div>
        </div>
      </div>

      <MobileNav language={language} />

      {/* Edit Profile Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px] lg:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className={cn(
              "text-indigo-900",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].editProfile}
            </DialogTitle>
            <DialogDescription className={cn(
              language === 'hi' ? 'hindi-text' : ''
            )}>
              Update your profile information below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className={cn(
                "text-right font-medium",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {content[language].name}
              </Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className={cn(
                "text-right font-medium",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                Location
              </Label>
              <Input
                id="location"
                value={profileData.location}
                onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="experience" className={cn(
                "text-right font-medium",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                Experience
              </Label>
              <Input
                id="experience"
                type="number"
                value={profileData.experience}
                onChange={(e) => setProfileData(prev => ({ ...prev, experience: parseInt(e.target.value) || 0 }))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="bio" className={cn(
                "text-right font-medium mt-2",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {content[language].bio}
              </Label>
              <Textarea
                id="bio"
                value={language === 'hi' ? profileData.bioHi : profileData.bio}
                onChange={(e) => {
                  if (language === 'hi') {
                    setProfileData(prev => ({ ...prev, bioHi: e.target.value }));
                  } else {
                    setProfileData(prev => ({ ...prev, bio: e.target.value }));
                  }
                }}
                className="col-span-3 min-h-[100px]"
                placeholder="Tell us about your expertise and experience..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className={cn(
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].cancel}
            </Button>
            <Button onClick={handleSaveProfile} className={cn(
              "bg-indigo-600 hover:bg-indigo-700",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              <Save className="w-4 h-4 mr-2" />
              {content[language].save}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Photo Upload Dialog */}
      <Dialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className={cn(
              "text-indigo-900",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].uploadPhoto}
            </DialogTitle>
            <DialogDescription className={cn(
              language === 'hi' ? 'hindi-text' : ''
            )}>
              Choose a photo to add to your portfolio or update your profile picture.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
              <div className="text-center">
                <Label htmlFor="photo-upload" className={cn(
                  "cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200",
                  language === 'hi' ? 'hindi-text' : ''
                )}>
                  <Plus className="w-4 h-4 mr-2" />
                  {content[language].selectFile}
                </Label>
                <Input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPhotoDialogOpen(false)} className={cn(
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].cancel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image View Dialog */}
      <Dialog open={isImageViewOpen} onOpenChange={setIsImageViewOpen}>
        <DialogContent className="sm:max-w-[800px] p-0">
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={() => setIsImageViewOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Portfolio Image"
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArtisanProfile;
