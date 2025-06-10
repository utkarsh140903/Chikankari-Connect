import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Camera, User, Upload, X, ShoppingBag, MapPin, Mail, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "@/components/layout/AppHeader";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { customerProfileSchema, type CustomerProfileData } from "@/lib/validations/profile";
import { toast } from "sonner";

const CustomerProfileSetup = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    location: '',
    address: '',
    preferences: [] as string[],
    profilePic: null as File | null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const content = {
    en: {
      setupProfile: "Customer Profile Setup",
      name: "Your Name",
      email: "Email Address",
      location: "Your Location",
      address: "Delivery Address",
      preferences: "Shopping Preferences",
      profilePicture: "Profile Picture",
      takePhoto: "Take Photo",
      uploadPhoto: "Upload Photo",
      finish: "Complete Setup",
      finishing: "Setting up...",
      namePlaceholder: "Enter your full name",
      emailPlaceholder: "your.email@example.com",
      locationPlaceholder: "City, State",
      addressPlaceholder: "Your delivery address...",
      profilePictureHelper: "Add a profile picture to personalize your account",
      removePhoto: "Remove Photo",
      welcomeText: "Welcome to Chikankari Connect! Let's set up your customer profile to provide you with the best shopping experience.",
      preferencesHelper: "Select your interests to get personalized recommendations"
    },
    hi: {
      setupProfile: "ग्राहक प्रोफ़ाइल सेटअप",
      name: "आपका नाम",
      email: "ईमेल पता",
      location: "आपका स्थान",
      address: "डिलीवरी पता",
      preferences: "खरीदारी की प्राथमिकताएं",
      profilePicture: "प्रोफ़ाइल चित्र",
      takePhoto: "फोटो लें",
      uploadPhoto: "फोटो अपलोड करें",
      finish: "सेटअप पूरा करें",
      finishing: "सेट अप किया जा रहा है...",
      namePlaceholder: "अपना पूरा नाम दर्ज करें",
      emailPlaceholder: "your.email@example.com",
      locationPlaceholder: "शहर, राज्य",
      addressPlaceholder: "आपका डिलीवरी पता...",
      profilePictureHelper: "अपने खाते को व्यक्तिगत बनाने के लिए प्रोफ़ाइल चित्र जोड़ें",
      removePhoto: "फोटो हटाएं",
      welcomeText: "चिकनकारी कनेक्ट में आपका स्वागत है! आपको सर्वोत्तम खरीदारी अनुभव प्रदान करने के लिए अपनी ग्राहक प्रोफ़ाइल सेट करें।",
      preferencesHelper: "व्यक्तिगत सिफारिशें प्राप्त करने के लिए अपनी रुचियां चुनें"
    }
  };

  const form = useForm<CustomerProfileData>({
    resolver: zodResolver(customerProfileSchema),
    defaultValues: {
      name: '',
      email: '',
      location: '',
      address: '',
      preferences: []
    }
  });
  
  const { handleSubmit, control, formState: { errors }, setValue, watch } = form;
  const watchedPreferences = watch('preferences') || [];

  const preferenceOptions = {
    en: [
      "Traditional Kurtas",
      "Designer Suits",
      "Casual Wear",
      "Formal Wear",
      "Accessories",
      "Home Decor",
      "Wedding Collection",
      "Festive Wear"
    ],
    hi: [
      "पारंपरिक कुर्ते",
      "डिजाइनर सूट",
      "कैजुअल वियर",
      "फॉर्मल वियर",
      "एक्सेसरीज",
      "होम डेकोर",
      "शादी कलेक्शन",
      "त्योहारी वस्त्र"
    ]
  };

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setProfileData({...profileData, profilePic: file});
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  const removePhoto = () => {
    setProfileData({...profileData, profilePic: null});
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const togglePreference = (preference: string) => {
    setProfileData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter(p => p !== preference)
        : [...prev.preferences, preference]
    }));
    
    // Also update form value
    const newPreferences = profileData.preferences.includes(preference)
      ? profileData.preferences.filter(p => p !== preference)
      : [...profileData.preferences, preference];
    setValue('preferences', newPreferences);
  };

  const onSubmit = async (data: CustomerProfileData) => {
    setIsLoading(true);
    console.log("Customer Profile Data:", data);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
      navigate('/marketplace');
      toast.success('Profile setup complete!');
    } catch (error) {
      setIsLoading(false);
      toast.error('Setup failed. Please try again.');
    }
  };
  
  const handleSubmitForm = async () => {
    // Validate using current profile data
    const formData = {
      name: profileData.name,
      email: profileData.email,
      location: profileData.location || '',
      address: profileData.address || '',
      preferences: profileData.preferences
    };
    
    try {
      const validData = customerProfileSchema.parse(formData);
      await onSubmit(validData);
    } catch (error: any) {
      if (error.errors) {
        toast.error(error.errors[0]?.message || 'Validation failed');
      } else {
        toast.error('Please fill in all required fields correctly');
      }
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-indigo-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <AppHeader
        title={content[language].setupProfile}
        titleHi={content.hi.setupProfile}
        showBack={true}
        backTo="/auth/phone?role=customer"
        language={language}
        onLanguageChange={setLanguage}
      />

      <div className="w-full px-4 pt-4 sm:pt-6 pb-20">
        <div className="w-full max-w-md mx-auto">
          <Card className="w-full bg-white/90 backdrop-blur-sm border-0 shadow-xl dark:bg-gray-800/90 dark:border-gray-700">
            <CardHeader className="pb-3 px-4 sm:px-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-rose-100 dark:from-indigo-900 dark:to-rose-900 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
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

                <div className="w-full space-y-2">
                  <label className={cn(
                    "text-sm font-semibold text-gray-700 dark:text-gray-300 block break-words",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].address}
                  </label>
                  <Textarea
                    placeholder={content[language].addressPlaceholder}
                    rows={3}
                    value={profileData.address}
                    onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                    className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 resize-none"
                  />
                </div>

                <div className="w-full space-y-3">
                  <label className={cn(
                    "text-sm font-semibold text-gray-700 dark:text-gray-300 block break-words",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].preferences}
                  </label>
                  <p className={cn(
                    "text-xs text-gray-500 dark:text-gray-400",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].preferencesHelper}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {preferenceOptions[language].map((preference, index) => (
                      <Badge
                        key={index}
                        variant={profileData.preferences.includes(preference) ? "default" : "outline"}
                        className={cn(
                          "cursor-pointer transition-all duration-200 hover:scale-105 text-sm font-medium",
                          profileData.preferences.includes(preference)
                            ? "bg-indigo-600 text-white hover:bg-indigo-700 border-indigo-600"
                            : "text-gray-700 border-gray-300 bg-white hover:bg-indigo-50 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-indigo-900/20",
                          language === 'hi' ? 'hindi-text' : ''
                        )}
                        onClick={() => togglePreference(preference)}
                      >
                        {profileData.preferences.includes(preference) && (
                          <Heart className="w-3 h-3 mr-1 fill-current" />
                        )}
                        {preference}
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
                    <div className="w-full border-2 border-indigo-200 dark:border-indigo-600 rounded-lg p-3 sm:p-4 text-center bg-indigo-50/50 dark:bg-indigo-900/20 relative">
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
                      <p className={cn(
                        "text-green-600 dark:text-green-400 mt-2 text-sm font-medium break-words",
                        language === 'hi' ? 'hindi-text' : ''
                      )}>
                        ✓ Photo selected
                      </p>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={removePhoto}
                        className={cn(
                          "mt-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 break-words",
                          language === 'hi' ? 'hindi-text' : ''
                        )}
                      >
                        {content[language].removePhoto}
                      </Button>
                    </div>
                  ) : (
                    <div className="w-full border-2 border-dashed border-indigo-200 dark:border-indigo-600 rounded-lg p-3 sm:p-6 text-center bg-indigo-50/50 dark:bg-indigo-900/20">
                      <User className="w-8 h-8 sm:w-12 sm:h-12 text-indigo-400 dark:text-indigo-300 mx-auto mb-2 sm:mb-3" />
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
                </div>
              </div>

              <Button 
                className={cn(
                  "w-full h-10 sm:h-12 mt-4 sm:mt-6 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-sm sm:text-base",
                  language === 'hi' ? 'hindi-text' : ''
                )}
                onClick={handleSubmitForm}
                disabled={!profileData.name.trim() || !profileData.email.trim() || profileData.preferences.length === 0 || isLoading}
              >
                {isLoading ? content[language].finishing : content[language].finish}
              </Button>
              
              {/* Validation Error Messages */}
              {errors.name && (
                <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
              )}
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
              )}
              {errors.preferences && (
                <p className="text-red-500 text-sm mt-2">{errors.preferences.message}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfileSetup;

