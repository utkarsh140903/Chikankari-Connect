import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Camera, 
  Edit, 
  Save,
  X,
  MapPin, 
  Calendar,
  Heart,
  ShoppingBag,
  Star,
  Mail,
  Phone,
  User,
  Settings,
  Upload,
  Package,
  CreditCard,
  Gift
} from "lucide-react";
import { MobileNav } from "@/components/layout/MobileNav";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import api from "@/lib/mockApi";
import { useNavigate } from "react-router-dom";

const CustomerProfile = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  // Profile data state
  const [profileData, setProfileData] = useState({
    name: 'Priya Sharma',
    nameHi: 'प्रिया शर्मा',
    email: 'priya.sharma@email.com',
    phone: '+91 9876543210',
    location: 'Delhi, India',
    locationHi: 'दिल्ली, भारत',
    address: '123, Main Street, Connaught Place, New Delhi - 110001',
    addressHi: '123, मुख्य मार्ग, कनॉट प्लेस, नई दिल्ली - 110001',
    bio: 'Passionate about traditional Indian craftsmanship, especially Chikankari embroidery.',
    bioHi: 'पारंपरिक भारतीय शिल्प कौशल, विशेष रूप से चिकनकारी कढ़ाई के बारे में भावुक।',
    joinedDate: 'January 2024',
    joinedDateHi: 'जनवरी 2024',
    preferences: ['Traditional Kurtas', 'Designer Suits', 'Festive Wear', 'Accessories'],
    stats: {
      orders: 12,
      favorites: 24,
      reviews: 8,
      wishlist: 16
    },
    recentActivity: {
      en: [
        'Ordered Traditional Kurta Set',
        'Added 3 items to wishlist',
        'Reviewed Designer Saree'
      ],
      hi: [
        'पारंपरिक कुर्ता सेट ऑर्डर किया',
        'विशलिस्ट में 3 आइटम जोड़े',
        'डिज़ाइनर साड़ी की समीक्षा की'
      ]
    }
  });

  const content = {
    en: {
      profile: "My Profile",
      editProfile: "Edit Profile",
      saveProfile: "Save Changes",
      cancelEdit: "Cancel",
      personalInfo: "Personal Information",
      shoppingStats: "Shopping Stats",
      preferences: "Shopping Preferences",
      recentActivity: "Recent Activity",
      settings: "Account Settings",
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      location: "Location",
      address: "Address",
      bio: "About Me",
      joinedDate: "Member Since",
      orders: "Orders",
      favorites: "Favorites",
      reviews: "Reviews",
      wishlist: "Wishlist",
      changePhoto: "Change Photo",
      removePhoto: "Remove Photo",
      uploadPhoto: "Upload Photo",
      takePicture: "Take Picture",
      profileUpdated: "Profile updated successfully!",
      updateFailed: "Failed to update profile",
      viewOrders: "View All Orders",
      manageWishlist: "Manage Wishlist",
      writeReview: "Write Review",
      accountSettings: "Account Settings",
      privacySettings: "Privacy Settings",
      notifications: "Notifications",
      helpSupport: "Help & Support"
    },
    hi: {
      profile: "मेरी प्रोफ़ाइल",
      editProfile: "प्रोफ़ाइल संपादित करें",
      saveProfile: "बदलाव सेव करें",
      cancelEdit: "रद्द करें",
      personalInfo: "व्यक्तिगत जानकारी",
      shoppingStats: "खरीदारी की स्थिति",
      preferences: "खरीदारी की प्राथमिकताएं",
      recentActivity: "हाल की गतिविधि",
      settings: "खाता सेटिंग्स",
      name: "पूरा नाम",
      email: "ईमेल पता",
      phone: "फोन नंबर",
      location: "स्थान",
      address: "पता",
      bio: "मेरे बारे में",
      joinedDate: "सदस्य बने",
      orders: "ऑर्डर",
      favorites: "पसंदीदा",
      reviews: "समीक्षाएं",
      wishlist: "विशलिस्ट",
      changePhoto: "फोटो बदलें",
      removePhoto: "फोटो हटाएं",
      uploadPhoto: "फोटो अपलोड करें",
      takePicture: "तस्वीर लें",
      profileUpdated: "प्रोफ़ाइल सफलतापूर्वक अपडेट हुई!",
      updateFailed: "प्रोफ़ाइल अपडेट करने में असफल",
      viewOrders: "सभी ऑर्डर देखें",
      manageWishlist: "विशलिस्ट प्रबंधित करें",
      writeReview: "समीक्षा लिखें",
      accountSettings: "खाता सेटिंग्स",
      privacySettings: "गोपनीयता सेटिंग्स",
      notifications: "सूचनाएं",
      helpSupport: "सहायता और समर्थन"
    }
  };

  const preferenceOptions = {
    en: [
      "Traditional Kurtas",
      "Designer Suits", 
      "Casual Wear",
      "Formal Wear",
      "Accessories",
      "Home Decor",
      "Wedding Collection",
      "Festive Wear",
      "Sarees",
      "Lehengas"
    ],
    hi: [
      "पारंपरिक कुर्ते",
      "डिजाइनर सूट",
      "कैजुअल वियर", 
      "फॉर्मल वियर",
      "एक्सेसरीज",
      "होम डेकोर",
      "शादी कलेक्शन",
      "त्योहारी वस्त्र",
      "साड़ियां",
      "लहंगे"
    ]
  };

  // Stats cards configuration
  const statCards = [
    {
      label: content[language].orders,
      value: profileData.stats.orders.toString(),
      icon: Package,
      color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20",
      action: content[language].viewOrders
    },
    {
      label: content[language].favorites,
      value: profileData.stats.favorites.toString(),
      icon: Heart,
      color: "text-rose-600 bg-rose-100 dark:text-rose-400 dark:bg-rose-900/20",
      action: content[language].manageWishlist
    },
    {
      label: content[language].reviews,
      value: profileData.stats.reviews.toString(),
      icon: Star,
      color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/20",
      action: content[language].writeReview
    },
    {
      label: content[language].wishlist,
      value: profileData.stats.wishlist.toString(),
      icon: Gift,
      color: "text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/20",
      action: content[language].manageWishlist
    }
  ];

  // Handle file selection for profile picture
  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      toast.success('Photo selected successfully!');
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const removePhoto = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    toast.success('Photo removed successfully!');
  };

  // Toggle preference selection
  const togglePreference = (preference: string) => {
    setProfileData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter(p => p !== preference)
        : [...prev.preferences, preference]
    }));
  };

  // Save profile changes
  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsEditing(false);
      toast.success(content[language].profileUpdated);
    } catch (error) {
      toast.error(content[language].updateFailed);
    } finally {
      setLoading(false);
    }
  };

  // Handle settings button clicks
  const handleSettingsClick = (settingType: string) => {
    // For now, redirect to 404 page since these features are not implemented yet
    navigate('/not-found');
    toast.info(`${settingType} feature coming soon!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700 p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 max-w-4xl mx-auto">
          <h1 className={cn(
            "text-lg sm:text-xl md:text-2xl font-bold text-indigo-900 dark:text-indigo-100",
            language === 'hi' ? 'hindi-text' : ''
          )}>
            {content[language].profile}
          </h1>
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
            <ThemeToggle />
            <LanguageToggle language={language} onLanguageChange={setLanguage} />
            {!isEditing ? (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsEditing(true)}
                className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 text-xs sm:text-sm"
              >
                <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                <span className="hidden sm:inline">{content[language].editProfile}</span>
                <span className="sm:hidden">Edit</span>
              </Button>
            ) : (
              <div className="flex gap-1 sm:gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsEditing(false)}
                  className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 text-xs sm:text-sm"
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="hidden sm:inline">{content[language].cancelEdit}</span>
                  <span className="sm:hidden">Cancel</span>
                </Button>
                <Button 
                  size="sm"
                  onClick={handleSaveProfile}
                  disabled={loading}
                  className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-xs sm:text-sm"
                >
                  <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="hidden sm:inline">{loading ? "Saving..." : content[language].saveProfile}</span>
                  <span className="sm:hidden">{loading ? "..." : "Save"}</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
        {/* Profile Header */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/80 dark:border-gray-700">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6">
              {/* Profile Picture */}
              <div className="relative flex-shrink-0">
                <Avatar className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 border-2 sm:border-4 border-white dark:border-gray-600 shadow-lg">
                  <AvatarImage src={previewUrl || "https://images.unsplash.com/photo-1494790108755-2616b75bd3f2?w=150&h=150&fit=crop&q=80"} />
                  <AvatarFallback>
                    <User className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-gray-400" />
                  </AvatarFallback>
                </Avatar>
                
                {isEditing && (
                  <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full w-6 h-6 sm:w-8 sm:h-8 shadow-lg"
                      onClick={handleUploadClick}
                    >
                      <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1 w-full text-center md:text-left space-y-3 sm:space-y-4 min-w-0">
                {isEditing ? (
                  <div className="space-y-3 sm:space-y-4">
                    <Input
                      value={language === 'hi' ? profileData.nameHi : profileData.name}
                      onChange={(e) => setProfileData({...profileData, [language === 'hi' ? 'nameHi' : 'name']: e.target.value})}
                      className="text-lg sm:text-xl font-bold dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder={content[language].name}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <Input
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                        placeholder={content[language].email}
                      />
                      <Input
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                        placeholder={content[language].phone}
                      />
                    </div>
                    <Input
                      value={language === 'hi' ? profileData.locationHi : profileData.location}
                      onChange={(e) => setProfileData({...profileData, [language === 'hi' ? 'locationHi' : 'location']: e.target.value})}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                      placeholder={content[language].location}
                    />
                    <Textarea
                      value={language === 'hi' ? profileData.addressHi : profileData.address}
                      onChange={(e) => setProfileData({...profileData, [language === 'hi' ? 'addressHi' : 'address']: e.target.value})}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none text-sm"
                      placeholder={content[language].address}
                      rows={2}
                    />
                    <Textarea
                      value={language === 'hi' ? profileData.bioHi : profileData.bio}
                      onChange={(e) => setProfileData({...profileData, [language === 'hi' ? 'bioHi' : 'bio']: e.target.value})}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none text-sm"
                      placeholder={content[language].bio}
                      rows={3}
                    />
                  </div>
                ) : (
                  <div className="space-y-2 sm:space-y-3">
                    <h2 className={cn(
                      "text-xl sm:text-2xl md:text-3xl font-bold text-indigo-900 dark:text-indigo-100 break-words",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      {language === 'hi' ? profileData.nameHi : profileData.name}
                    </h2>
                    
                    <div className="space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                      <div className="flex items-center justify-center md:justify-start gap-2 break-all">
                        <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">{profileData.email}</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span>{profileData.phone}</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">{language === 'hi' ? profileData.locationHi : profileData.location}</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start gap-2 text-xs sm:text-sm">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">{content[language].joinedDate}: {language === 'hi' ? profileData.joinedDateHi : profileData.joinedDate}</span>
                      </div>
                    </div>
                    
                    <p className={cn(
                      "text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed break-words",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      {language === 'hi' ? profileData.bioHi : profileData.bio}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/80 dark:border-gray-700 hover:shadow-xl transition-shadow cursor-pointer">
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className={cn("w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 sm:mb-3 rounded-lg flex items-center justify-center", stat.color)}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <p className="text-lg sm:text-2xl font-bold text-indigo-900 dark:text-indigo-100">{stat.value}</p>
                  <p className={cn(
                    "text-xs text-gray-600 dark:text-gray-400 mt-1 leading-tight",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Shopping Preferences */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/80 dark:border-gray-700">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className={cn(
              "text-lg sm:text-xl text-indigo-900 dark:text-indigo-100",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].preferences}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {preferenceOptions[language].map((preference, index) => (
                <Badge
                  key={index}
                  variant={profileData.preferences.includes(preference) ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer transition-all duration-200 hover:scale-105 text-xs sm:text-sm px-2 py-1",
                    isEditing ? "hover:bg-indigo-50 dark:hover:bg-indigo-900/20" : "",
                    profileData.preferences.includes(preference)
                      ? "bg-indigo-600 text-white hover:bg-indigo-700 border-indigo-600"
                      : "text-gray-700 border-gray-300 bg-white hover:bg-indigo-50 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-indigo-900/20",
                    language === 'hi' ? 'hindi-text' : ''
                  )}
                  onClick={isEditing ? () => togglePreference(preference) : undefined}
                >
                  {profileData.preferences.includes(preference) && (
                    <Heart className="w-3 h-3 mr-1 fill-current" />
                  )}
                  {preference}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/80 dark:border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className={cn(
                "text-base sm:text-lg text-indigo-900 dark:text-indigo-100",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {content[language].recentActivity}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3 pt-0">
              {profileData.recentActivity[language].map((activity, index) => {
                const icons = [ShoppingBag, Heart, Star];
                const colors = [
                  'text-indigo-600 dark:text-indigo-400',
                  'text-rose-600 dark:text-rose-400', 
                  'text-amber-600 dark:text-amber-400'
                ];
                const Icon = icons[index];
                return (
                  <div key={index} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <Icon className={cn("w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0", colors[index])} />
                    <span className={cn(
                      "text-xs sm:text-sm text-gray-700 dark:text-gray-300 break-words",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      {activity}
                    </span>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/80 dark:border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className={cn(
                "text-base sm:text-lg text-indigo-900 dark:text-indigo-100",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {content[language].settings}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3 pt-0">
              <Button 
                variant="ghost" 
                className="w-full justify-start dark:text-gray-300 dark:hover:bg-gray-700 text-sm py-2 hover:bg-gray-100 transition-colors"
                onClick={() => handleSettingsClick(content[language].accountSettings)}
              >
                <Settings className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 flex-shrink-0" />
                <span className="truncate">{content[language].accountSettings}</span>
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start dark:text-gray-300 dark:hover:bg-gray-700 text-sm py-2 hover:bg-gray-100 transition-colors"
                onClick={() => handleSettingsClick(content[language].privacySettings)}
              >
                <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 flex-shrink-0" />
                <span className="truncate">{content[language].privacySettings}</span>
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start dark:text-gray-300 dark:hover:bg-gray-700 text-sm py-2 hover:bg-gray-100 transition-colors"
                onClick={() => handleSettingsClick(content[language].notifications)}
              >
                <Settings className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 flex-shrink-0" />
                <span className="truncate">{content[language].notifications}</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
        }}
      />

      <MobileNav language={language} />
    </div>
  );
};

export default CustomerProfile;

