import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  MessageSquare, 
  Key, 
  Smartphone, 
  CheckCircle, 
  AlertCircle,
  Copy,
  Eye,
  EyeOff
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  getOTPServiceStatus, 
  toggleDemoMode, 
  configureOTPService 
} from '@/lib/otpService';
import { cn } from '@/lib/utils';

interface OTPSettingsProps {
  language: 'en' | 'hi';
}

export const OTPSettings: React.FC<OTPSettingsProps> = ({ language }) => {
  const [status, setStatus] = useState(getOTPServiceStatus());
  const [showApiKeys, setShowApiKeys] = useState(false);
  const [fast2smsKey, setFast2smsKey] = useState('');
  const [textlocalKey, setTextlocalKey] = useState('');

  const content = {
    en: {
      title: 'OTP Service Settings',
      subtitle: 'Configure SMS OTP delivery options',
      demoMode: 'Demo Mode',
      demoModeDesc: 'Use demo OTP (123456) for testing',
      realSMS: 'Real SMS Service',
      realSMSDesc: 'Send actual OTP to phone numbers',
      currentStatus: 'Current Status',
      activeSessions: 'Active OTP Sessions',
      demoOTP: 'Demo OTP Code',
      apiConfiguration: 'SMS Service Configuration',
      fast2smsKey: 'Fast2SMS API Key',
      textlocalKey: 'Textlocal API Key',
      getApiKey: 'Get API Key',
      saveConfig: 'Save Configuration',
      testOTP: 'Test OTP Service',
      copyDemoOTP: 'Copy Demo OTP',
      showKeys: 'Show API Keys',
      hideKeys: 'Hide API Keys',
      instructions: 'Instructions',
      step1: '1. Get API key from SMS service provider',
      step2: '2. Enter API key below',
      step3: '3. Toggle off Demo Mode for production',
      step4: '4. Test OTP service with real number',
      providers: 'Supported Providers'
    },
    hi: {
      title: 'OTP सेवा सेटिंग्स',
      subtitle: 'SMS OTP डिलीवरी विकल्प कॉन्फ़िगर करें',
      demoMode: 'डेमो मोड',
      demoModeDesc: 'टेस्टिंग के लिए डेमो OTP (123456) का उपयोग करें',
      realSMS: 'वास्तविक SMS सेवा',
      realSMSDesc: 'फोन नंबर पर वास्तविक OTP भेजें',
      currentStatus: 'वर्तमान स्थिति',
      activeSessions: 'सक्रिय OTP सत्र',
      demoOTP: 'डेमो OTP कोड',
      apiConfiguration: 'SMS सेवा कॉन्फ़िगरेशन',
      fast2smsKey: 'Fast2SMS API कुंजी',
      textlocalKey: 'Textlocal API कुंजी',
      getApiKey: 'API कुंजी प्राप्त करें',
      saveConfig: 'कॉन्फ़िगरेशन सहेजें',
      testOTP: 'OTP सेवा परीक्षण',
      copyDemoOTP: 'डेमो OTP कॉपी करें',
      showKeys: 'API कुंजी दिखाएं',
      hideKeys: 'API कुंजी छुपाएं',
      instructions: 'निर्देश',
      step1: '1. SMS सेवा प्रदाता से API कुंजी प्राप्त करें',
      step2: '2. नीचे API कुंजी दर्ज करें',
      step3: '3. प्रोडक्शन के लिए डेमो मोड बंद करें',
      step4: '4. वास्तविक नंबर के साथ OTP सेवा का परीक्षण करें',
      providers: 'समर्थित प्रदाता'
    }
  };

  useEffect(() => {
    setStatus(getOTPServiceStatus());
  }, []);

  const handleDemoModeToggle = (enabled: boolean) => {
    toggleDemoMode(enabled);
    setStatus(getOTPServiceStatus());
    toast.success(
      enabled 
        ? (language === 'hi' ? 'डेमो मोड सक्षम' : 'Demo mode enabled')
        : (language === 'hi' ? 'वास्तविक SMS मोड सक्षम' : 'Real SMS mode enabled')
    );
  };

  const handleSaveConfig = () => {
    configureOTPService({
      fast2smsApiKey: fast2smsKey.trim() || undefined,
      textlocalApiKey: textlocalKey.trim() || undefined
    });
    setStatus(getOTPServiceStatus());
    toast.success(
      language === 'hi' ? 'कॉन्फ़िगरेशन सहेजा गया' : 'Configuration saved'
    );
  };

  const copyDemoOTP = () => {
    if (status.demoOTP) {
      navigator.clipboard.writeText(status.demoOTP);
      toast.success(
        language === 'hi' ? 'डेमो OTP कॉपी किया गया' : 'Demo OTP copied'
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/80">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <CardTitle className={cn(
              "text-indigo-900 dark:text-indigo-100",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].currentStatus}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className={cn(
              "text-sm font-medium text-gray-700 dark:text-gray-300",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].demoMode}
            </span>
            <Badge variant={status.demoMode ? 'default' : 'secondary'}>
              {status.demoMode ? 
                (language === 'hi' ? 'सक्षम' : 'Enabled') : 
                (language === 'hi' ? 'निष्क्रिय' : 'Disabled')
              }
            </Badge>
          </div>
          
          {status.demoMode && status.demoOTP && (
            <div className="flex items-center justify-between p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <div>
                <span className={cn(
                  "text-sm font-medium text-indigo-900 dark:text-indigo-100",
                  language === 'hi' ? 'hindi-text' : ''
                )}>
                  {content[language].demoOTP}: {status.demoOTP}
                </span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={copyDemoOTP}
                className="h-8"
              >
                <Copy className="w-3 h-3 mr-1" />
                {language === 'hi' ? 'कॉपी' : 'Copy'}
              </Button>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <span className={cn(
              "text-sm font-medium text-gray-700 dark:text-gray-300",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].activeSessions}
            </span>
            <Badge variant="outline">
              {status.activeSessions}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className={cn(
              "text-sm font-medium text-gray-700 dark:text-gray-300",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              Fast2SMS
            </span>
            <Badge variant={status.services.fast2sms ? 'default' : 'secondary'}>
              {status.services.fast2sms ? 
                <CheckCircle className="w-3 h-3 mr-1" /> : 
                <AlertCircle className="w-3 h-3 mr-1" />
              }
              {status.services.fast2sms ? 
                (language === 'hi' ? 'कॉन्फ़िगर्ड' : 'Configured') : 
                (language === 'hi' ? 'अकॉन्फ़िगर्ड' : 'Not Configured')
              }
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className={cn(
              "text-sm font-medium text-gray-700 dark:text-gray-300",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              Textlocal
            </span>
            <Badge variant={status.services.textlocal ? 'default' : 'secondary'}>
              {status.services.textlocal ? 
                <CheckCircle className="w-3 h-3 mr-1" /> : 
                <AlertCircle className="w-3 h-3 mr-1" />
              }
              {status.services.textlocal ? 
                (language === 'hi' ? 'कॉन्फ़िगर्ड' : 'Configured') : 
                (language === 'hi' ? 'अकॉन्फ़िगर्ड' : 'Not Configured')
              }
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Mode Toggle */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/80">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <CardTitle className={cn(
              "text-indigo-900 dark:text-indigo-100",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].title}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-600">
            <div className="space-y-1">
              <div className={cn(
                "font-medium text-gray-900 dark:text-gray-100",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {content[language].demoMode}
              </div>
              <div className={cn(
                "text-sm text-gray-600 dark:text-gray-400",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {content[language].demoModeDesc}
              </div>
            </div>
            <Switch
              checked={status.demoMode}
              onCheckedChange={handleDemoModeToggle}
            />
          </div>
          
          {!status.demoMode && (
            <div className="flex items-center justify-between p-4 border rounded-lg border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
              <div className="space-y-1">
                <div className={cn(
                  "font-medium text-green-900 dark:text-green-100 flex items-center gap-2",
                  language === 'hi' ? 'hindi-text' : ''
                )}>
                  <Smartphone className="w-4 h-4" />
                  {content[language].realSMS}
                </div>
                <div className={cn(
                  "text-sm text-green-700 dark:text-green-300",
                  language === 'hi' ? 'hindi-text' : ''
                )}>
                  {content[language].realSMSDesc}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* API Configuration */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/80">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <CardTitle className={cn(
                "text-indigo-900 dark:text-indigo-100",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {content[language].apiConfiguration}
              </CardTitle>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowApiKeys(!showApiKeys)}
            >
              {showApiKeys ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
              {showApiKeys ? content[language].hideKeys : content[language].showKeys}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <Label className={cn(
                "text-sm font-medium text-gray-700 dark:text-gray-300",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {content[language].fast2smsKey}
              </Label>
              <div className="flex gap-2 mt-1">
                <Input
                  type={showApiKeys ? 'text' : 'password'}
                  placeholder="Enter Fast2SMS API key"
                  value={fast2smsKey}
                  onChange={(e) => setFast2smsKey(e.target.value)}
                  className="flex-1 dark:bg-gray-700 dark:border-gray-600"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('https://www.fast2sms.com/', '_blank')}
                >
                  {content[language].getApiKey}
                </Button>
              </div>
            </div>
            
            <div>
              <Label className={cn(
                "text-sm font-medium text-gray-700 dark:text-gray-300",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {content[language].textlocalKey}
              </Label>
              <div className="flex gap-2 mt-1">
                <Input
                  type={showApiKeys ? 'text' : 'password'}
                  placeholder="Enter Textlocal API key"
                  value={textlocalKey}
                  onChange={(e) => setTextlocalKey(e.target.value)}
                  className="flex-1 dark:bg-gray-700 dark:border-gray-600"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('https://textlocal.in/', '_blank')}
                >
                  {content[language].getApiKey}
                </Button>
              </div>
            </div>
          </div>
          
          <Button
            onClick={handleSaveConfig}
            className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            disabled={!fast2smsKey.trim() && !textlocalKey.trim()}
          >
            {content[language].saveConfig}
          </Button>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="bg-blue-50/80 backdrop-blur-sm border-0 shadow-lg dark:bg-blue-900/20">
        <CardHeader className="pb-3">
          <CardTitle className={cn(
            "text-blue-900 dark:text-blue-100 text-sm",
            language === 'hi' ? 'hindi-text' : ''
          )}>
            {content[language].instructions}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className={cn(
            "text-sm text-blue-800 dark:text-blue-200 space-y-1",
            language === 'hi' ? 'hindi-text' : ''
          )}>
            <div>{content[language].step1}</div>
            <div>{content[language].step2}</div>
            <div>{content[language].step3}</div>
            <div>{content[language].step4}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

