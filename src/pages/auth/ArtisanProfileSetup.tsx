import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Camera, User, Upload, X, Scissors, MapPin, Award, Calendar, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "@/components/layout/AppHeader";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { artisanProfileSchema, type ArtisanProfileData } from "@/lib/validations/profile";
import { ZodError } from "zod";
import { toast } from "sonner";

const ArtisanProfileSetup = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [profileData, setProfileData] = useState({
    name: '',
    location: '',
    bio: '',
    experience: '',
    specializations: [] as string[],
    workshopAddress: '',
    phoneNumber: '',
    profilePic: null as File | null,
    portfolioImages: [] as File[]
  });
  
  const form = useForm<ArtisanProfileData>({
    resolver: zodResolver(artisanProfileSchema),
    defaultValues: {
      name: '',
      location: '',
      bio: '',
      experience: '',
      specializations: [],
      workshopAddress: '',
      phoneNumber: ''
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
      setupProfile: "Artisan Profile Setup",
      name: "Your Name",
      location: "Your Location",
      bio: "About Your Craft",
      experience: "Years of Experience",
      specializations: "Your Specializations",
      workshopAddress: "Workshop Address",
      phoneNumber: "Contact Number",
      profilePicture: "Profile Picture",
      portfolioImages: "Portfolio Images",
      takePhoto: "Take Photo",
      uploadPhoto: "Upload Photo",
      addPortfolio: "Add Portfolio Images",
      finish: "Complete Setup",
      finishing: "Setting up...",
      namePlaceholder: "Enter your full name",
      locationPlaceholder: "City, State",
      bioPlaceholder: "Tell us about your craft, techniques, and passion for Chikankari...",
      experiencePlaceholder: "e.g., 15",
      workshopPlaceholder: "Your workshop address...",
      phonePlaceholder: "9876543210",
      profilePictureHelper: "Add a profile picture to help customers connect with you",
      portfolioHelper: "Upload images of your work to showcase your skills",
      removePhoto: "Remove Photo",
      welcomeText: "Welcome to Chikankari Connect! Let's set up your artisan profile to showcase your beautiful craft to the world.",
      specializationsHelper: "Select your areas of expertise in Chikankari"
    },
    hi: {
      setupProfile: "कारीगर प्रोफ़ाइल सेटअप",
      name: "आपका नाम",
      location: "आपका स्थान",
      bio: "अपने शिल्प के बारे में",
      experience: "अनुभव के वर्ष",
      specializations: "आपकी विशेषज्ञताएं",
      workshopAddress: "कार्यशाला का पता",
      phoneNumber: "संपर्क नंबर",
      profilePicture: "प्रोफ़ाइल चित्र",
      portfolioImages: "पोर्टफोलियो चित्र",
      takePhoto: "फोटो लें",
      uploadPhoto: "फोटो अपलोड करें",
      addPortfolio: "पोर्टफोलियो चित्र जोड़ें",
      finish: "सेटअप पूरा करें",
      finishing: "सेट अप किया जा रहा है...",
      namePlaceholder: "अपना पूरा नाम दर्ज करें",
      locationPlaceholder: "शहर, राज्य",
      bioPlaceholder: "अपने शिल्प, तकनीकों और चिकनकारी के प्रति अपने जुनून के बारे में बताएं...",
      experiencePlaceholder: "जैसे, 15",
      workshopPlaceholder: "आपकी कार्यशाला का पता...",
      phonePlaceholder: "9876543210",
      profilePictureHelper: "ग्राहकों को आपसे जुड़ने में मदद के लिए प्रोफ़ाइल चित्र जोड़ें",
      portfolioHelper: "अपने कौशल को प्रदर्शित करने के लिए अपने काम की तस्वीरें अपलोड करें",
      removePhoto: "फोटो हटाएं",
      welcomeText: "चिकनकारी कनेक्ट में आपका स्वागत है! दुनिया को अपने सुंदर शिल्प का प्रदर्शन करने के लिए अपनी कारीगर प्रोफ़ाइल सेट करें।",
      specializationsHelper: "चिकनकारी में अपनी विशेषज्ञता के क्षेत्र चुनें"
    }
  };

  const specializationOptions = {
    en: [
      "Shadow Work",
      "Phanda Work",
      "Tepchi",
      "Murri",
      "Keel Kangan",
      "Bakhiya",
      "Jaali Work",
      "Khatau",
      "Ghaspatti",
      "Hool Work"
    ],
    hi: [
      "शैडो वर्क",
      "फांदा वर्क",
      "तेपची",
      "मुर्री",
      "कील कंगन",
      "बखिया",
      "जाली वर्क",
      "खताउ",
      "घासपट्टी",
      "हूल वर्क"
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
    // Validate using Zod schema
    const formData = {
      name: profileData.name,
      location: profileData.location || '',
      bio: profileData.bio,
      experience: profileData.experience || '',
      specializations: profileData.specializations,
      workshopAddress: profileData.workshopAddress || '',
      phoneNumber: profileData.phoneNumber || ''
    };
    
    try {
      const validData = artisanProfileSchema.parse(formData);
      
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate('/artisan/dashboard');
      toast.success('Profile setup complete!');
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        // Show the first validation error
        const firstError = error.issues[0];
        toast.error(firstError?.message || 'Validation failed');
      } else {
        console.error('Profile creation failed:', error);
        toast.error('Setup failed. Please try again.');
      }
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
        backTo="/auth/phone?role=artisan"
        language={language}
        onLanguageChange={setLanguage}
      />

      <div className="w-full px-4 pt-4 sm:pt-6 pb-20">
        <div className="w-full max-w-md mx-auto">
          <Card className="w-full bg-white/90 backdrop-blur-sm border-0 shadow-xl dark:bg-gray-800/90 dark:border-gray-700">
            <CardHeader className="pb-3 px-4 sm:px-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-white to-gray-50 dark:from-amber-900 dark:to-orange-900 border border-amber-200 dark:border-amber-700 rounded-full flex items-center justify-center">
                  <Scissors className="w-6 h-6 text-amber-600 dark:text-amber-400" />
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
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
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
                      {content[language].phoneNumber}
                    </label>
                    <Input
                      type="tel"
                      placeholder={content[language].phonePlaceholder}
                      value={profileData.phoneNumber}
                      onChange={(e) => setProfileData({...profileData, phoneNumber: e.target.value})}
                      className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    />
                  </div>
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

                <div className="w-full space-y-2">
                  <label className={cn(
                    "text-sm font-semibold text-gray-700 dark:text-gray-300 block break-words",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].workshopAddress}
                  </label>
                  <Textarea
                    placeholder={content[language].workshopPlaceholder}
                    rows={3}
                    value={profileData.workshopAddress}
                    onChange={(e) => setProfileData({...profileData, workshopAddress: e.target.value})}
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
                            ? "bg-amber-600 text-white hover:bg-amber-700 border-amber-600"
                            : "text-gray-700 border-gray-300 bg-white hover:bg-amber-50 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-amber-900/20",
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
                    <div className="w-full border-2 border-amber-200 dark:border-amber-600 rounded-lg p-3 sm:p-4 text-center bg-white dark:bg-amber-900/20 relative">
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
                    <div className="w-full border-2 border-dashed border-amber-200 dark:border-amber-600 rounded-lg p-3 sm:p-6 text-center bg-white dark:bg-amber-900/20">
                      <User className="w-8 h-8 sm:w-12 sm:h-12 text-amber-400 dark:text-amber-300 mx-auto mb-2 sm:mb-3" />
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
                  "w-full h-10 sm:h-12 mt-4 sm:mt-6 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-sm sm:text-base",
                  language === 'hi' ? 'hindi-text' : ''
                )}
                onClick={handleSubmitForm}
                disabled={!profileData.name.trim() || !profileData.bio.trim() || profileData.specializations.length === 0 || isLoading}
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

export default ArtisanProfileSetup;

