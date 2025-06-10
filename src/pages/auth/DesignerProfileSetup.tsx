import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Camera, User, Upload, X, Palette, MapPin, Mail, Briefcase, GraduationCap, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "@/components/layout/AppHeader";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { designerProfileSchema, type DesignerProfileData } from "@/lib/validations/profile";
import { toast } from "sonner";

const DesignerProfileSetup = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    location: '',
    bio: '',
    education: '',
    experience: '',
    specializations: [] as string[],
    company: '',
    website: '',
    profilePic: null as File | null,
    portfolioImages: [] as File[]
  });
  
  const form = useForm<DesignerProfileData>({
    resolver: zodResolver(designerProfileSchema),
    defaultValues: {
      name: '',
      email: '',
      location: '',
      bio: '',
      education: '',
      experience: '',
      specializations: [],
      company: '',
      website: ''
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [portfolioPreviews, setPortfolioPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const portfolioInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const content = {
    en: {
      setupProfile: "Designer Profile Setup",
      name: "Your Name",
      email: "Email Address",
      location: "Your Location",
      bio: "About Your Design Philosophy",
      education: "Education Background",
      experience: "Years of Experience",
      specializations: "Design Specializations",
      company: "Company/Studio",
      website: "Portfolio Website",
      profilePicture: "Profile Picture",
      portfolioImages: "Design Portfolio",
      takePhoto: "Take Photo",
      uploadPhoto: "Upload Photo",
      addPortfolio: "Add Portfolio Images",
      finish: "Complete Setup",
      finishing: "Setting up...",
      namePlaceholder: "Enter your full name",
      emailPlaceholder: "your.email@example.com",
      locationPlaceholder: "City, State",
      bioPlaceholder: "Tell us about your design philosophy, inspiration, and approach to Chikankari fusion...",
      educationPlaceholder: "Fashion Design, NIFT Delhi",
      experiencePlaceholder: "e.g., 8",
      companyPlaceholder: "Your company or studio name",
      websitePlaceholder: "https://yourportfolio.com",
      profilePictureHelper: "Add a professional profile picture to showcase your brand",
      portfolioHelper: "Upload images of your design work and collaborations",
      removePhoto: "Remove Photo",
      welcomeText: "Welcome to Chikankari Connect! Let's set up your designer profile to connect you with skilled artisans and showcase your creative vision.",
      specializationsHelper: "Select your areas of design expertise"
    },
    hi: {
      setupProfile: "डिजाइनर प्रोफ़ाइल सेटअप",
      name: "आपका नाम",
      email: "ईमेल पता",
      location: "आपका स्थान",
      bio: "अपने डिजाइन दर्शन के बारे में",
      education: "शिक्षा पृष्ठभूमि",
      experience: "अनुभव के वर्ष",
      specializations: "डिजाइन विशेषज्ञताएं",
      company: "कंपनी/स्टूडियो",
      website: "पोर्टफोलियो वेबसाइट",
      profilePicture: "प्रोफ़ाइल चित्र",
      portfolioImages: "डिजाइन पोर्टफोलियो",
      takePhoto: "फोटो लें",
      uploadPhoto: "फोटो अपलोड करें",
      addPortfolio: "पोर्टफोलियो चित्र जोड़ें",
      finish: "सेटअप पूरा करें",
      finishing: "सेट अप किया जा रहा है...",
      namePlaceholder: "अपना पूरा नाम दर्ज करें",
      emailPlaceholder: "your.email@example.com",
      locationPlaceholder: "शहर, राज्य",
      bioPlaceholder: "अपने डिजाइन दर्शन, प्रेरणा और चिकनकारी फ्यूजन के प्रति अपने दृष्टिकोण के बारे में बताएं...",
      educationPlaceholder: "फैशन डिजाइन, NIFT दिल्ली",
      experiencePlaceholder: "जैसे, 8",
      companyPlaceholder: "आपकी कंपनी या स्टूडियो का नाम",
      websitePlaceholder: "https://yourportfolio.com",
      profilePictureHelper: "अपने ब्रांड को प्रदर्शित करने के लिए एक पेशेवर प्रोफ़ाइल चित्र जोड़ें",
      portfolioHelper: "अपने डिजाइन काम और सहयोग की तस्वीरें अपलोड करें",
      removePhoto: "फोटो हटाएं",
      welcomeText: "चिकनकारी कनेक्ट में आपका स्वागत है! आपको कुशल कारीगरों से जोड़ने और आपकी रचनात्मक दृष्टि को प्रदर्शित करने के लिए अपनी डिजाइनर प्रोफ़ाइल सेट करें।",
      specializationsHelper: "अपनी डिजाइन विशेषज्ञता के क्षेत्र चुनें"
    }
  };

  const specializationOptions = {
    en: [
      "Traditional Fusion",
      "Contemporary Chikankari",
      "Bridal Wear",
      "Western Fusion",
      "Kids Wear",
      "Home Textiles",
      "Accessories Design",
      "Sustainable Fashion",
      "Luxury Collections",
      "Casual Wear"
    ],
    hi: [
      "पारंपरिक फ्यूजन",
      "समकालीन चिकनकारी",
      "ब्राइडल वियर",
      "पश्चिमी फ्यूजन",
      "बच्चों के कपड़े",
      "घरेलू वस्त्र",
      "उपकरण डिजाइन",
      "स्थायी फैशन",
      "लक्जरी कलेक्शन",
      "कैजुअल वियर"
    ]
  };

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setProfileData({...profileData, profilePic: file});
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handlePortfolioSelect = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      
      setProfileData(prev => ({
        ...prev,
        portfolioImages: [...prev.portfolioImages, ...newFiles]
      }));
      setPortfolioPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removePortfolioImage = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      portfolioImages: prev.portfolioImages.filter((_, i) => i !== index)
    }));
    setPortfolioPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  const handlePortfolioClick = () => {
    portfolioInputRef.current?.click();
  };

  const removePhoto = () => {
    setProfileData({...profileData, profilePic: null});
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const toggleSpecialization = (specialization: string) => {
    setProfileData(prev => ({
      ...prev,
      specializations: prev.specializations.includes(specialization)
        ? prev.specializations.filter(s => s !== specialization)
        : [...prev.specializations, specialization]
    }));
  };

  const handleSubmitForm = async () => {
    if (!profileData.name.trim() || !profileData.email.trim() || !profileData.bio.trim() || profileData.specializations.length === 0) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate('/designer/dashboard');
      toast.success('Profile setup complete!');
    } catch (error) {
      toast.error('Setup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-indigo-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <AppHeader
        title={content[language].setupProfile}
        titleHi={content.hi.setupProfile}
        showBack={true}
        backTo="/auth/phone?role=designer"
        language={language}
        onLanguageChange={setLanguage}
      />

      <div className="w-full px-4 pt-4 sm:pt-6 pb-20">
        <div className="w-full max-w-md mx-auto">
          <Card className="w-full bg-white/90 backdrop-blur-sm border-0 shadow-xl dark:bg-gray-800/90 dark:border-gray-700">
            <CardHeader className="pb-3 px-4 sm:px-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-full flex items-center justify-center">
                  <Palette className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className={cn(
                  "text-lg sm:text-xl text-indigo-900 dark:text-indigo-100 break-words",
                  language === 'hi' ? 'hindi-text' : ''
                )}>
                  {content[language].setupProfile}
                </CardTitle>
              </div>
              <p className={cn(
                "text-sm text-gray-600 dark:text-gray-400 leading-relaxed",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {content[language].welcomeText}
              </p>
            </CardHeader>

            <CardContent className="w-full space-y-4 sm:space-y-6 px-4 sm:px-6">
              <div className="w-full space-y-4 sm:space-y-6">
                <div className="w-full space-y-2">
                  <label className={cn(
                    "text-sm font-semibold text-gray-700 dark:text-gray-300 block break-words",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].name} *
                  </label>
                  <Input
                    placeholder={content[language].namePlaceholder}
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  />
                </div>

                <div className="w-full space-y-2">
                  <label className={cn(
                    "text-sm font-semibold text-gray-700 dark:text-gray-300 block break-words",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].email} *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder={content[language].emailPlaceholder}
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="w-full space-y-2">
                  <label className={cn(
                    "text-sm font-semibold text-gray-700 dark:text-gray-300 block break-words",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].location}
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder={content[language].locationPlaceholder}
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      className="w-full pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className={cn(
                      "text-sm font-semibold text-gray-700 dark:text-gray-300 block break-words",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      {content[language].experience}
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="number"
                        placeholder={content[language].experiencePlaceholder}
                        value={profileData.experience}
                        onChange={(e) => setProfileData({...profileData, experience: e.target.value})}
                        className="w-full pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className={cn(
                      "text-sm font-semibold text-gray-700 dark:text-gray-300 block break-words",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      {content[language].company}
                    </label>
                    <Input
                      placeholder={content[language].companyPlaceholder}
                      value={profileData.company}
                      onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                      className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="w-full space-y-2">
                  <label className={cn(
                    "text-sm font-semibold text-gray-700 dark:text-gray-300 block break-words",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].education}
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder={content[language].educationPlaceholder}
                      value={profileData.education}
                      onChange={(e) => setProfileData({...profileData, education: e.target.value})}
                      className="w-full pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="w-full space-y-2">
                  <label className={cn(
                    "text-sm font-semibold text-gray-700 dark:text-gray-300 block break-words",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].website}
                  </label>
                  <Input
                    type="url"
                    placeholder={content[language].websitePlaceholder}
                    value={profileData.website}
                    onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                    className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  />
                </div>

                <div className="w-full space-y-2">
                  <label className={cn(
                    "text-sm font-semibold text-gray-700 dark:text-gray-300 block break-words",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].bio} *
                  </label>
                  <Textarea
                    placeholder={content[language].bioPlaceholder}
                    rows={4}
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 resize-none"
                  />
                </div>

                <div className="w-full space-y-3">
                  <label className={cn(
                    "text-sm font-semibold text-gray-700 dark:text-gray-300 block break-words",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].specializations} *
                  </label>
                  <p className={cn(
                    "text-xs text-gray-500 dark:text-gray-400",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].specializationsHelper}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {specializationOptions[language].map((specialization, index) => (
                      <Badge
                        key={index}
                        variant={profileData.specializations.includes(specialization) ? "default" : "outline"}
                        className={cn(
                          "cursor-pointer transition-all duration-200 hover:scale-105 text-sm font-medium",
                          profileData.specializations.includes(specialization)
                            ? "bg-purple-600 text-white hover:bg-purple-700 border-purple-600"
                            : "text-gray-700 border-gray-300 bg-white hover:bg-purple-50 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-purple-900/20",
                          language === 'hi' ? 'hindi-text' : ''
                        )}
                        onClick={() => toggleSpecialization(specialization)}
                      >
                        {profileData.specializations.includes(specialization) && (
                          <Star className="w-3 h-3 mr-1 fill-current" />
                        )}
                        {specialization}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="w-full space-y-3">
                  <label className={cn(
                    "text-sm font-semibold text-gray-700 dark:text-gray-300 block break-words",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].profilePicture}
                  </label>
                  
                  {previewUrl ? (
                    <div className="w-full border-2 border-purple-200 dark:border-purple-600 rounded-lg p-3 sm:p-4 text-center bg-purple-50/50 dark:bg-purple-900/20 relative">
                      <div className="relative inline-block">
                        <img 
                          src={previewUrl} 
                          alt="Profile preview" 
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mx-auto border-4 border-white dark:border-gray-600 shadow-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full"
                          onClick={removePhoto}
                        >
                          <X className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full border-2 border-dashed border-purple-200 dark:border-purple-600 rounded-lg p-3 sm:p-6 text-center bg-purple-50/50 dark:bg-purple-900/20">
                      <User className="w-8 h-8 sm:w-12 sm:h-12 text-purple-400 dark:text-purple-300 mx-auto mb-2 sm:mb-3" />
                      <p className={cn(
                        "text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed break-words px-1",
                        language === 'hi' ? 'hindi-text' : ''
                      )}>
                        {content[language].profilePictureHelper}
                      </p>
                      <div className="w-full space-y-2 sm:space-y-3">
                        <Button 
                          type="button"
                          variant="outline"
                          className={cn(
                            "w-full text-xs sm:text-sm dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700",
                            language === 'hi' ? 'hindi-text' : ''
                          )}
                          onClick={handleCameraClick}
                        >
                          <Camera className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          {content[language].takePhoto}
                        </Button>
                        <Button 
                          type="button"
                          variant="outline"
                          className={cn(
                            "w-full text-xs sm:text-sm dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700",
                            language === 'hi' ? 'hindi-text' : ''
                          )}
                          onClick={handleUploadClick}
                        >
                          <Upload className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          {content[language].uploadPhoto}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-full space-y-3">
                  <label className={cn(
                    "text-sm font-semibold text-gray-700 dark:text-gray-300 block break-words",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].portfolioImages}
                  </label>
                  <p className={cn(
                    "text-xs text-gray-500 dark:text-gray-400",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].portfolioHelper}
                  </p>
                  
                  {portfolioPreviews.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {portfolioPreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Portfolio ${index + 1}`}
                            className="w-full aspect-square object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-1 -right-1 w-5 h-5 rounded-full"
                            onClick={() => removePortfolioImage(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <Button 
                    type="button"
                    variant="outline"
                    className={cn(
                      "w-full dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700",
                      language === 'hi' ? 'hindi-text' : ''
                    )}
                    onClick={handlePortfolioClick}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {content[language].addPortfolio}
                  </Button>
                </div>

                {/* Hidden file inputs */}
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
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                />
                <input
                  ref={portfolioInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handlePortfolioSelect(e.target.files)}
                />
              </div>

              <Button 
                className={cn(
                  "w-full h-10 sm:h-12 mt-4 sm:mt-6 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-sm sm:text-base",
                  language === 'hi' ? 'hindi-text' : ''
                )}
                onClick={handleSubmitForm}
                disabled={!profileData.name.trim() || !profileData.email.trim() || !profileData.bio.trim() || profileData.specializations.length === 0 || isLoading}
              >
                {isLoading ? content[language].finishing : content[language].finish}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DesignerProfileSetup;

