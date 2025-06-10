
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Phone, AlertCircle, CheckCircle, Shield, Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "@/components/layout/AppHeader";
import { cn } from "@/lib/utils";

const PhoneAuth = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const navigate = useNavigate();

  const content = {
    en: {
      title: "Welcome Back",
      subtitle: "Sign in to continue to your account",
      phoneLabel: "Mobile Number",
      otpLabel: "Enter Verification Code",
      sendOtp: "Send OTP",
      verify: "Verify & Continue",
      resend: "Resend Code",
      otpSent: "Verification code sent to",
      sending: "Sending code...",
      verifying: "Verifying...",
      invalidPhone: "Please enter a valid 10-digit mobile number",
      invalidOtp: "Please enter a valid 6-digit OTP",
      otpExpired: "OTP has expired. Please request a new one",
      tooManyAttempts: "Too many attempts. Please try again later",
      networkError: "Network error. Please check your connection",
      resendIn: "Resend in",
      seconds: "seconds",
      attempts: "attempts remaining",
      secureConnection: "Secure connection",
      privacyNote: "We'll send you a verification code to confirm your identity",
      changeNumber: "Change Number"
    },
    hi: {
      title: "वापस स्वागत है",
      subtitle: "अपने खाते में जारी रखने के लिए साइन इन करें",
      phoneLabel: "मोबाइल नंबर",
      otpLabel: "सत्यापन कोड दर्ज करें",
      sendOtp: "OTP भेजें",
      verify: "सत्यापित करें और जारी रखें",
      resend: "कोड फिर से भेजें",
      otpSent: "सत्यापन कोड भेजा गया",
      sending: "कोड भेजा जा रहा है...",
      verifying: "सत्यापित किया जा रहा है...",
      invalidPhone: "कृपया एक वैध 10-अंकीय मोबाइल नंबर दर्ज करें",
      invalidOtp: "कृपया एक वैध 6-अंकीय OTP दर्ज करें",
      otpExpired: "OTP की समय सीमा समाप्त हो गई है। कृपया नया मांगें",
      tooManyAttempts: "बहुत सारे प्रयास। कृपया बाद में पुनः प्रयास करें",
      networkError: "नेटवर्क त्रुटि। कृपया अपना कनेक्शन जांचें",
      resendIn: "फिर से भेजें",
      seconds: "सेकंड में",
      attempts: "प्रयास शेष",
      secureConnection: "सुरक्षित कनेक्शन",
      privacyNote: "आपकी पहचान की पुष्टि के लिए हम आपको एक सत्यापन कोड भेजेंगे",
      changeNumber: "नंबर बदलें"
    }
  };
  // Timer effect for resend functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Phone number validation
  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number format
    return phoneRegex.test(phone);
  };

  // OTP validation
  const validateOtp = (otpValue: string): boolean => {
    return /^\d{6}$/.test(otpValue);
  };

  const handleSendOtp = async () => {
    setError('');
    
    if (!validatePhoneNumber(phoneNumber)) {
      setError(content[language].invalidPhone);
      return;
    }

    if (attempts >= 3) {
      setError(content[language].tooManyAttempts);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setStep('otp');
      setResendTimer(30); // 30 seconds resend timer
      setAttempts(prev => prev + 1);
      setError('');
    } catch (error) {
      setError(content[language].networkError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError('');
    
    if (!validateOtp(otp)) {
      setError(content[language].invalidOtp);
      return;
    }

    if (attempts >= 5) {
      setError(content[language].tooManyAttempts);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random success/failure for demo
      if (otp === '123456' || Math.random() > 0.3) {
        navigate('/auth/setup');
      } else {
        setError(content[language].invalidOtp);
        setAttempts(prev => prev + 1);
      }
    } catch (error) {
      setError(content[language].networkError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = () => {
    setOtp('');
    setError('');
    setStep('phone');
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-indigo-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <AppHeader
        title={content[language].title}
        titleHi={content.hi.title}
        showBack={true}
        backTo="/"
        language={language}
        onLanguageChange={setLanguage}
      />

      <div className="w-full px-4 pt-6 sm:pt-8 pb-20">
        <div className="w-full max-w-md mx-auto">
          <Card className="w-full bg-white/95 backdrop-blur-sm border-0 shadow-2xl dark:bg-gray-800/95 dark:border-gray-700">
            <CardHeader className="text-center pb-6 px-6">
              <div className="relative mx-auto mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-100 to-rose-100 dark:from-indigo-900 dark:to-rose-900 rounded-full flex items-center justify-center shadow-lg">
                  <Phone className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Shield className="w-3 h-3 text-white" />
                </div>
              </div>
              <CardTitle className={cn(
                "text-2xl font-bold text-indigo-900 dark:text-indigo-100 mb-2",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {content[language].title}
              </CardTitle>
              <p className={cn(
                "text-gray-600 dark:text-gray-400 text-sm leading-relaxed",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {step === 'otp' 
                  ? `${content[language].otpSent} +91 ${phoneNumber}`
                  : content[language].subtitle
                }
              </p>
              
              {step === 'phone' && (
                <div className="flex items-center justify-center gap-2 mt-3 text-xs text-green-600 dark:text-green-400">
                  <Shield className="w-4 h-4" />
                  <span className={cn(language === 'hi' ? 'hindi-text' : '')}>
                    {content[language].secureConnection}
                  </span>
                </div>
              )}
            </CardHeader>

            <CardContent className="w-full space-y-6 px-6">
              {/* Error Alert */}
              {error && (
                <Alert variant="destructive" className="border-red-200 dark:border-red-800">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className={cn(
                    "text-sm",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {step === 'phone' ? (
                <>
                  <div className="space-y-3">
                    <label className={cn(
                      "text-sm font-semibold text-gray-700 dark:text-gray-300 block",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      {content[language].phoneLabel} *
                    </label>
                    <div className="flex relative">
                      <div className="flex items-center px-4 bg-gray-50 dark:bg-gray-700 border-2 border-r-0 border-gray-200 dark:border-gray-600 rounded-l-lg text-gray-700 dark:text-gray-300 font-medium text-sm">
                        +91
                      </div>
                      <Input
                        type="tel"
                        placeholder="9876543210"
                        value={phoneNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setPhoneNumber(value);
                          if (error) setError('');
                        }}
                        className={cn(
                          "rounded-l-none border-l-0 text-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400",
                          validatePhoneNumber(phoneNumber) && phoneNumber.length === 10 ? "border-green-500 dark:border-green-500" : ""
                        )}
                        maxLength={10}
                        autoComplete="tel"
                      />
                      {phoneNumber.length === 10 && validatePhoneNumber(phoneNumber) && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                      )}
                    </div>
                    <p className={cn(
                      "text-xs text-gray-500 dark:text-gray-400 leading-relaxed",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      {content[language].privacyNote}
                    </p>
                  </div>

                  <Button 
                    onClick={handleSendOtp}
                    disabled={!validatePhoneNumber(phoneNumber) || isLoading || attempts >= 3}
                    className={cn(
                      "w-full h-12 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium transition-all duration-200",
                      language === 'hi' ? 'hindi-text' : ''
                    )}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        {content[language].sending}
                      </>
                    ) : (
                      content[language].sendOtp
                    )}
                  </Button>
                  
                  {attempts > 0 && attempts < 3 && (
                    <p className={cn(
                      "text-xs text-amber-600 dark:text-amber-400 text-center",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      {3 - attempts} {content[language].attempts}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className={cn(
                        "text-sm font-semibold text-gray-700 dark:text-gray-300",
                        language === 'hi' ? 'hindi-text' : ''
                      )}>
                        {content[language].otpLabel} *
                      </label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleResendOtp}
                        className={cn(
                          "text-indigo-600 dark:text-indigo-400 p-0 h-auto font-normal text-xs",
                          language === 'hi' ? 'hindi-text' : ''
                        )}
                      >
                        {content[language].changeNumber}
                      </Button>
                    </div>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="123456"
                        value={otp}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                          setOtp(value);
                          if (error) setError('');
                        }}
                        className={cn(
                          "text-center text-xl tracking-widest font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400",
                          validateOtp(otp) ? "border-green-500 dark:border-green-500" : ""
                        )}
                        maxLength={6}
                        autoComplete="one-time-code"
                      />
                      {validateOtp(otp) && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                      )}
                    </div>
                  </div>

                  <Button 
                    onClick={handleVerifyOtp}
                    disabled={!validateOtp(otp) || isLoading || attempts >= 5}
                    className={cn(
                      "w-full h-12 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium transition-all duration-200",
                      language === 'hi' ? 'hindi-text' : ''
                    )}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        {content[language].verifying}
                      </>
                    ) : (
                      content[language].verify
                    )}
                  </Button>

                  <div className="text-center space-y-2">
                    {resendTimer > 0 ? (
                      <div className={cn(
                        "flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400",
                        language === 'hi' ? 'hindi-text' : ''
                      )}>
                        <Timer className="w-4 h-4" />
                        {content[language].resendIn} {resendTimer} {content[language].seconds}
                      </div>
                    ) : (
                      <Button 
                        variant="ghost"
                        onClick={handleSendOtp}
                        disabled={isLoading || attempts >= 3}
                        className={cn(
                          "text-indigo-600 dark:text-indigo-400 font-medium",
                          language === 'hi' ? 'hindi-text' : ''
                        )}
                      >
                        {content[language].resend}
                      </Button>
                    )}
                    
                    {attempts > 0 && attempts < 5 && (
                      <p className={cn(
                        "text-xs text-amber-600 dark:text-amber-400",
                        language === 'hi' ? 'hindi-text' : ''
                      )}>
                        {5 - attempts} {content[language].attempts}
                      </p>
                    )}
                  </div>
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
