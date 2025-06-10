
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Camera, User, Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "@/components/layout/AppHeader";
import { cn } from "@/lib/utils";

const ProfileSetup = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [profileData, setProfileData] = useState({
    name: '',
    location: '',
    bio: '',
    profilePic: null as File | null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const content = {
    en: {
      setupProfile: "Setup Profile",
      name: "Your Name",
      location: "Your Location",
      bio: "Bio (Optional)",
      profilePicture: "Profile Picture",
      takePhoto: "Take Photo",
      uploadPhoto: "Upload Photo",
      finish: "Finish Setup",
      finishing: "Setting up...",
      namePlaceholder: "Enter your full name",
      locationPlaceholder: "City, State",
      bioPlaceholder: "Tell us about yourself and your craft...",
      profilePictureHelper: "Add a profile picture to help customers recognize you",
      removePhoto: "Remove Photo"
    },
    hi: {
      setupProfile: "प्रोफ़ाइल सेट करें",
      name: "आपका नाम",
      location: "आपका स्थान",
      bio: "परिचय (वैकल्पिक)",
      profilePicture: "प्रोफ़ाइल चित्र",
      takePhoto: "फोटो लें",
      uploadPhoto: "फोटो अपलोड करें",
      finish: "सेटअप पूरा करें",
      finishing: "सेट अप किया जा रहा है...",
      namePlaceholder: "अपना पूरा नाम दर्ज करें",
      locationPlaceholder: "शहर, राज्य",
      bioPlaceholder: "अपने बारे में और अपने शिल्प के बारे में बताएं...",
      profilePictureHelper: "ग्राहकों को आपको पहचानने में मदद के लिए प्रोफ़ाइल चित्र जोड़ें",
      removePhoto: "फोटो हटाएं"
    }
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

  const handleSubmit = async () => {
    if (profileData.name.trim()) {
      setIsLoading(true);
      console.log("Profile Data:", profileData);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        navigate('/artisan/dashboard');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-indigo-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <AppHeader
        title={content[language].setupProfile}
        titleHi={content.hi.setupProfile}
        showBack={true}
        backTo="/auth/phone"
        language={language}
        onLanguageChange={setLanguage}
      />

      <div className="w-full px-4 pt-4 sm:pt-6 pb-20">
        <div className="w-full max-w-md mx-auto">
          <Card className="w-full bg-white/90 backdrop-blur-sm border-0 shadow-xl dark:bg-gray-800/90 dark:border-gray-700">
            <CardHeader className="pb-3 px-4 sm:px-6">
              <CardTitle className={cn(
                "text-lg sm:text-xl text-indigo-900 dark:text-indigo-100 break-words",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {content[language].setupProfile}
              </CardTitle>
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
                  <Input
                    placeholder={content[language].locationPlaceholder}
                    value={profileData.location}
                    onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                    className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  />
                </div>

                <div className="w-full space-y-2">
                  <label className={cn(
                    "text-sm font-semibold text-gray-700 dark:text-gray-300 block break-words",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].bio}
                  </label>
                  <Textarea
                    placeholder={content[language].bioPlaceholder}
                    rows={3}
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
                onClick={handleSubmit}
                disabled={!profileData.name.trim() || isLoading}
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

export default ProfileSetup;
