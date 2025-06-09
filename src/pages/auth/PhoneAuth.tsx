
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "@/components/layout/AppHeader";
import { cn } from "@/lib/utils";

const PhoneAuth = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const content = {
    en: {
      title: "Sign In",
      subtitle: "Enter your phone number to get started",
      phoneLabel: "Phone Number",
      otpLabel: "Enter OTP",
      sendOtp: "Send OTP",
      verify: "Verify OTP",
      resend: "Resend OTP",
      otpSent: "OTP sent to",
      sending: "Sending...",
      verifying: "Verifying...",
    },
    hi: {
      title: "साइन इन करें",
      subtitle: "शुरू करने के लिए अपना फोन नंबर दर्ज करें",
      phoneLabel: "फोन नंबर",
      otpLabel: "OTP दर्ज करें",
      sendOtp: "OTP भेजें",
      verify: "OTP सत्यापित करें",
      resend: "OTP फिर से भेजें",
      otpSent: "OTP भेजा गया",
      sending: "भेजा जा रहा है...",
      verifying: "सत्यापित किया जा रहा है...",
    }
  };

  const handleSendOtp = async () => {
    if (phoneNumber.length === 10) {
      setIsLoading(true);
      console.log("Sending OTP to:", phoneNumber);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setStep('otp');
      }, 1500);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length === 6) {
      setIsLoading(true);
      console.log("Verifying OTP:", otp);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        navigate('/auth/setup');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50">
      <AppHeader
        title={content[language].title}
        titleHi={content.hi.title}
        showBack={true}
        backTo="/"
        language={language}
        onLanguageChange={setLanguage}
      />

      <div className="px-4 pt-8">
        <div className="w-full max-w-md mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-100 to-rose-100 rounded-full flex items-center justify-center">
                <Phone className="w-10 h-10 text-indigo-600" />
              </div>
              <CardTitle className={cn(
                "text-2xl font-bold text-indigo-900",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {content[language].title}
              </CardTitle>
              <p className={cn(
                "text-gray-600 mt-3 text-base",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {step === 'otp' 
                  ? `${content[language].otpSent} +91 ${phoneNumber}`
                  : content[language].subtitle
                }
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {step === 'phone' ? (
                <>
                  <div className="space-y-3">
                    <label className={cn(
                      "text-sm font-semibold text-gray-700 block",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      {content[language].phoneLabel}
                    </label>
                    <div className="flex">
                      <div className="flex items-center px-4 bg-gray-50 border-2 border-r-0 border-gray-200 rounded-l-lg text-gray-700 font-medium">
                        +91
                      </div>
                      <Input
                        type="tel"
                        placeholder="9876543210"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="rounded-l-none border-l-0 text-lg"
                        maxLength={10}
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handleSendOtp}
                    disabled={phoneNumber.length !== 10 || isLoading}
                    className={cn(
                      "w-full h-12",
                      language === 'hi' ? 'hindi-text' : ''
                    )}
                  >
                    {isLoading ? content[language].sending : content[language].sendOtp}
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-3">
                    <label className={cn(
                      "text-sm font-semibold text-gray-700 block",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      {content[language].otpLabel}
                    </label>
                    <Input
                      type="text"
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="text-center text-xl tracking-widest font-mono"
                      maxLength={6}
                    />
                  </div>

                  <Button 
                    onClick={handleVerifyOtp}
                    disabled={otp.length !== 6 || isLoading}
                    className={cn(
                      "w-full h-12",
                      language === 'hi' ? 'hindi-text' : ''
                    )}
                  >
                    {isLoading ? content[language].verifying : content[language].verify}
                  </Button>

                  <Button 
                    variant="ghost"
                    onClick={() => setStep('phone')}
                    disabled={isLoading}
                    className={cn(
                      "w-full text-indigo-600",
                      language === 'hi' ? 'hindi-text' : ''
                    )}
                  >
                    {content[language].resend}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PhoneAuth;
