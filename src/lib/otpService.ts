// OTP Service with Real SMS Integration
// Supports both real OTP and demo mode for development

export interface OTPResponse {
  success: boolean;
  message: string;
  sessionId?: string;
  error?: string;
}

export interface OTPVerifyResponse {
  success: boolean;
  message: string;
  isValid: boolean;
}

// Configuration
const OTP_CONFIG = {
  // Demo mode - set to false for production
  DEMO_MODE: true,
  DEMO_OTP: '123456',
  
  // Real OTP service config (using Fast2SMS)
  FAST2SMS_API_KEY: 'YOUR_FAST2SMS_API_KEY', // Get from https://www.fast2sms.com/
  FAST2SMS_URL: 'https://www.fast2sms.com/dev/bulkV2',
  
  // Textlocal config (alternative)
  TEXTLOCAL_API_KEY: 'YOUR_TEXTLOCAL_API_KEY',
  TEXTLOCAL_URL: 'https://api.textlocal.in/send/',
  
  // OTP settings
  OTP_LENGTH: 6,
  OTP_EXPIRY: 5 * 60 * 1000, // 5 minutes
  SENDER_ID: 'CHIKAN'
};

// In-memory storage for OTP sessions (in production, use Redis/Database)
const otpSessions = new Map<string, {
  otp: string;
  createdAt: number;
  attempts: number;
  phoneNumber: string;
}>();

// Generate random OTP
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Clean expired OTPs
const cleanExpiredOTPs = () => {
  const now = Date.now();
  for (const [sessionId, session] of otpSessions.entries()) {
    if (now - session.createdAt > OTP_CONFIG.OTP_EXPIRY) {
      otpSessions.delete(sessionId);
    }
  }
};

// Create session ID
const createSessionId = (phoneNumber: string): string => {
  return `otp_${phoneNumber}_${Date.now()}`;
};

// Send OTP via Fast2SMS
const sendOTPViaFast2SMS = async (phoneNumber: string, otp: string): Promise<boolean> => {
  try {
    const message = `Your Chikankari Connect verification code is: ${otp}. Valid for 5 minutes. Do not share this code.`;
    
    const response = await fetch(OTP_CONFIG.FAST2SMS_URL, {
      method: 'POST',
      headers: {
        'authorization': OTP_CONFIG.FAST2SMS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sender_id: OTP_CONFIG.SENDER_ID,
        message: message,
        language: 'english',
        route: 'p',
        numbers: phoneNumber.replace('+91', '')
      })
    });
    
    const result = await response.json();
    return result.return === true;
  } catch (error) {
    console.error('Fast2SMS Error:', error);
    return false;
  }
};

// Send OTP via Textlocal (alternative)
const sendOTPViaTextlocal = async (phoneNumber: string, otp: string): Promise<boolean> => {
  try {
    const message = `Your Chikankari Connect verification code is: ${otp}. Valid for 5 minutes.`;
    
    const formData = new URLSearchParams();
    formData.append('apikey', OTP_CONFIG.TEXTLOCAL_API_KEY);
    formData.append('numbers', phoneNumber.replace('+91', ''));
    formData.append('message', message);
    formData.append('sender', OTP_CONFIG.SENDER_ID);
    
    const response = await fetch(OTP_CONFIG.TEXTLOCAL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    });
    
    const result = await response.json();
    return result.status === 'success';
  } catch (error) {
    console.error('Textlocal Error:', error);
    return false;
  }
};

// Send OTP via console (for development)
const sendOTPViaConsole = (phoneNumber: string, otp: string): boolean => {
  console.log('🔐 OTP SERVICE - DEMO MODE');
  console.log('📱 Phone:', phoneNumber);
  console.log('🔢 OTP:', otp);
  console.log('⏰ Valid for 5 minutes');
  console.log('💡 Use demo OTP "123456" for quick testing');
  return true;
};

// Main OTP sending function
export const sendOTP = async (phoneNumber: string): Promise<OTPResponse> => {
  try {
    // Clean expired OTPs
    cleanExpiredOTPs();
    
    // Validate phone number
    const cleanPhone = phoneNumber.replace(/\s+/g, '');
    if (!cleanPhone.match(/^\+91[6-9]\d{9}$/)) {
      return {
        success: false,
        message: 'Invalid phone number format',
        error: 'INVALID_PHONE'
      };
    }
    
    // Generate OTP and session
    const otp = generateOTP();
    const sessionId = createSessionId(cleanPhone);
    
    // Store OTP session
    otpSessions.set(sessionId, {
      otp: otp,
      createdAt: Date.now(),
      attempts: 0,
      phoneNumber: cleanPhone
    });
    
    let smsResult = false;
    let service = 'demo';
    
    if (OTP_CONFIG.DEMO_MODE) {
      // Demo mode - show in console
      smsResult = sendOTPViaConsole(cleanPhone, otp);
      service = 'console';
    } else {
      // Production mode - try real SMS services
      if (OTP_CONFIG.FAST2SMS_API_KEY && OTP_CONFIG.FAST2SMS_API_KEY !== 'YOUR_FAST2SMS_API_KEY') {
        smsResult = await sendOTPViaFast2SMS(cleanPhone, otp);
        service = 'fast2sms';
      } else if (OTP_CONFIG.TEXTLOCAL_API_KEY && OTP_CONFIG.TEXTLOCAL_API_KEY !== 'YOUR_TEXTLOCAL_API_KEY') {
        smsResult = await sendOTPViaTextlocal(cleanPhone, otp);
        service = 'textlocal';
      } else {
        // Fallback to console if no API keys configured
        smsResult = sendOTPViaConsole(cleanPhone, otp);
        service = 'console_fallback';
      }
    }
    
    if (smsResult) {
      return {
        success: true,
        message: OTP_CONFIG.DEMO_MODE 
          ? `OTP sent via ${service}. Check console for demo OTP or use ${OTP_CONFIG.DEMO_OTP}`
          : `OTP sent to ${cleanPhone} via ${service}`,
        sessionId: sessionId
      };
    } else {
      // Remove failed session
      otpSessions.delete(sessionId);
      return {
        success: false,
        message: 'Failed to send OTP. Please try again.',
        error: 'SMS_FAILED'
      };
    }
    
  } catch (error) {
    console.error('OTP Send Error:', error);
    return {
      success: false,
      message: 'Unable to send OTP. Please check your connection.',
      error: 'NETWORK_ERROR'
    };
  }
};

// Verify OTP
export const verifyOTP = async (phoneNumber: string, inputOTP: string, sessionId?: string): Promise<OTPVerifyResponse> => {
  try {
    // Clean expired OTPs
    cleanExpiredOTPs();
    
    const cleanPhone = phoneNumber.replace(/\s+/g, '');
    const cleanOTP = inputOTP.replace(/\s+/g, '');
    
    // Demo mode - always accept demo OTP
    if (OTP_CONFIG.DEMO_MODE && cleanOTP === OTP_CONFIG.DEMO_OTP) {
      return {
        success: true,
        message: 'OTP verified successfully (Demo Mode)',
        isValid: true
      };
    }
    
    // Find session by phone number (if sessionId not provided)
    let session = null;
    let foundSessionId = '';
    
    if (sessionId && otpSessions.has(sessionId)) {
      session = otpSessions.get(sessionId)!;
      foundSessionId = sessionId;
    } else {
      // Find by phone number
      for (const [sid, sess] of otpSessions.entries()) {
        if (sess.phoneNumber === cleanPhone) {
          session = sess;
          foundSessionId = sid;
          break;
        }
      }
    }
    
    if (!session) {
      return {
        success: false,
        message: 'OTP expired or invalid. Please request a new one.',
        isValid: false
      };
    }
    
    // Check attempts
    if (session.attempts >= 3) {
      otpSessions.delete(foundSessionId);
      return {
        success: false,
        message: 'Too many attempts. Please request a new OTP.',
        isValid: false
      };
    }
    
    // Check expiry
    if (Date.now() - session.createdAt > OTP_CONFIG.OTP_EXPIRY) {
      otpSessions.delete(foundSessionId);
      return {
        success: false,
        message: 'OTP has expired. Please request a new one.',
        isValid: false
      };
    }
    
    // Increment attempts
    session.attempts++;
    
    // Verify OTP
    if (cleanOTP === session.otp) {
      // Success - remove session
      otpSessions.delete(foundSessionId);
      return {
        success: true,
        message: 'OTP verified successfully',
        isValid: true
      };
    } else {
      return {
        success: false,
        message: `Invalid OTP. ${3 - session.attempts} attempts remaining.`,
        isValid: false
      };
    }
    
  } catch (error) {
    console.error('OTP Verify Error:', error);
    return {
      success: false,
      message: 'Unable to verify OTP. Please try again.',
      isValid: false
    };
  }
};

// Get OTP service status
export const getOTPServiceStatus = () => {
  return {
    demoMode: OTP_CONFIG.DEMO_MODE,
    demoOTP: OTP_CONFIG.DEMO_MODE ? OTP_CONFIG.DEMO_OTP : undefined,
    activeSessions: otpSessions.size,
    services: {
      fast2sms: OTP_CONFIG.FAST2SMS_API_KEY !== 'YOUR_FAST2SMS_API_KEY',
      textlocal: OTP_CONFIG.TEXTLOCAL_API_KEY !== 'YOUR_TEXTLOCAL_API_KEY'
    }
  };
};

// Toggle demo mode (for development)
export const toggleDemoMode = (enabled: boolean) => {
  OTP_CONFIG.DEMO_MODE = enabled;
  console.log(`OTP Demo Mode: ${enabled ? 'ENABLED' : 'DISABLED'}`);
};

// Configure API keys (call this before using real SMS)
export const configureOTPService = (config: {
  fast2smsApiKey?: string;
  textlocalApiKey?: string;
  demoMode?: boolean;
}) => {
  if (config.fast2smsApiKey) {
    OTP_CONFIG.FAST2SMS_API_KEY = config.fast2smsApiKey;
  }
  if (config.textlocalApiKey) {
    OTP_CONFIG.TEXTLOCAL_API_KEY = config.textlocalApiKey;
  }
  if (config.demoMode !== undefined) {
    OTP_CONFIG.DEMO_MODE = config.demoMode;
  }
  
  console.log('OTP Service configured:', getOTPServiceStatus());
};

