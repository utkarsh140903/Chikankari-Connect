
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Camera, User, Upload } from "lucide-react";
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
      bioPlaceholder: "Tell us about yourself and your craft..."
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
      bioPlaceholder: "अपने बारे में और अपने शिल्प के बारे में बताएं..."
    }
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50">
      <AppHeader
        title={content[language].setupProfile}
        titleHi={content.hi.setupProfile}
        showBack={true}
        backTo="/auth/phone"
        language={language}
        onLanguageChange={setLanguage}
      />

      <div className="px-4 pt-6 pb-20">
        <div className="max-w-md mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className={cn(
                "text-xl text-indigo-900",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {content[language].setupProfile}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className={cn(
                    "text-sm font-semibold text-gray-700 block",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].name} *
                  </label>
                  <Input
                    placeholder={content[language].namePlaceholder}
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className={cn(
                    "text-sm font-semibold text-gray-700 block",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].location}
                  </label>
                  <Input
                    placeholder={content[language].locationPlaceholder}
                    value={profileData.location}
                    onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className={cn(
                    "text-sm font-semibold text-gray-700 block",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].bio}
                  </label>
                  <Textarea
                    placeholder={content[language].bioPlaceholder}
                    rows={3}
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  />
                </div>

                <div className="space-y-3">
                  <label className={cn(
                    "text-sm font-semibold text-gray-700 block",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].profilePicture}
                  </label>
                  <div className="border-2 border-dashed border-indigo-200 rounded-lg p-6 text-center bg-indigo-50/50">
                    <User className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
                    <p className={cn(
                      "text-gray-600 mb-4 text-sm",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      Add a profile picture to help customers recognize you
                    </p>
                    <div className="space-y-3">
                      <Button 
                        variant="outline"
                        className={cn(
                          "w-full",
                          language === 'hi' ? 'hindi-text' : ''
                        )}
                        type="button"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        {content[language].takePhoto}
                      </Button>
                      <Button 
                        variant="outline"
                        className={cn(
                          "w-full",
                          language === 'hi' ? 'hindi-text' : ''
                        )}
                        type="button"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {content[language].uploadPhoto}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                className={cn(
                  "w-full h-12 mt-8",
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
