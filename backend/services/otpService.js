const crypto = require('crypto');
const nodemailer = require('nodemailer');
const twilio = require('twilio');

// In-memory OTP storage (use Redis in production)
const otpStorage = new Map();

// Demo OTP for development
const DEMO_OTP = '123456';
const DEMO_PHONE_NUMBERS = [
  '+1234567890', // Add demo phone numbers here
  '+9876543210'
];
const DEMO_EMAILS = [
  'demo@example.com', // Add demo emails here
  'test@example.com'
];

class OTPService {
  constructor() {
    // Initialize email transporter
    this.emailTransporter = null;
    this.initializeEmailTransporter();
    
    // Initialize Twilio client
    this.twilioClient = null;
    this.initializeTwilioClient();
  }

  initializeEmailTransporter() {
    try {
      if (process.env.EMAIL_SERVICE && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        this.emailTransporter = nodemailer.createTransporter({
          service: process.env.EMAIL_SERVICE, // gmail, outlook, etc.
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });
        console.log('Email transporter initialized');
      } else {
        console.warn('Email service not configured - using demo OTP only');
      }
    } catch (error) {
      console.error('Email transporter initialization failed:', error);
    }
  }

  initializeTwilioClient() {
    try {
      if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
        this.twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        console.log('Twilio client initialized');
      } else {
        console.warn('Twilio service not configured - using demo OTP only');
      }
    } catch (error) {
      console.error('Twilio client initialization failed:', error);
    }
  }

  // Generate random OTP
  generateOTP(length = 6) {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += digits[Math.floor(Math.random() * digits.length)];
    }
    return otp;
  }

  // Check if should use demo OTP
  shouldUseDemoOTP(contact, forceDemo = false) {
    // Force demo mode
    if (forceDemo) return true;
    
    // Development environment
    if (process.env.NODE_ENV === 'development' && process.env.USE_DEMO_OTP === 'true') {
      return true;
    }
    
    // Demo contacts
    if (this.isEmail(contact)) {
      return DEMO_EMAILS.includes(contact.toLowerCase());
    } else {
      return DEMO_PHONE_NUMBERS.includes(contact);
    }
  }

  // Check if contact is email
  isEmail(contact) {
    return contact.includes('@');
  }

  // Store OTP with expiration
  storeOTP(contact, otp, expirationMinutes = 10) {
    const expirationTime = Date.now() + (expirationMinutes * 60 * 1000);
    otpStorage.set(contact, {
      otp,
      expirationTime,
      attempts: 0,
      maxAttempts: 3
    });
  }

  // Send OTP via email
  async sendEmailOTP(email, otp, purpose = 'verification') {
    if (!this.emailTransporter) {
      throw new Error('Email service not configured');
    }

    const subject = `Your ${purpose} code`;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Verification Code</h2>
        <p>Your verification code for Chikan Connect Craft is:</p>
        <div style="background-color: #f0f0f0; padding: 20px; text-align: center; margin: 20px 0;">
          <h1 style="color: #007bff; letter-spacing: 5px; margin: 0;">${otp}</h1>
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this code, please ignore this email.</p>
        <hr style="margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">Chikan Connect Craft - Connecting Artisans with Customers</p>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      html: htmlContent
    };

    await this.emailTransporter.sendMail(mailOptions);
  }

  // Send OTP via SMS
  async sendSMSOTP(phoneNumber, otp, purpose = 'verification') {
    if (!this.twilioClient) {
      throw new Error('SMS service not configured');
    }

    const message = `Your ${purpose} code for Chikan Connect Craft is: ${otp}. This code expires in 10 minutes.`;

    await this.twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });
  }

  // Main method to send OTP
  async sendOTP(contact, purpose = 'verification', options = {}) {
    try {
      const { forceDemo = false, expirationMinutes = 10 } = options;
      
      let otp;
      let usedDemo = false;
      
      // Determine if using demo OTP
      if (this.shouldUseDemoOTP(contact, forceDemo)) {
        otp = DEMO_OTP;
        usedDemo = true;
        console.log(`Using demo OTP for ${contact}: ${otp}`);
      } else {
        otp = this.generateOTP();
      }

      // Store OTP
      this.storeOTP(contact, otp, expirationMinutes);

      // Send OTP if not demo
      if (!usedDemo) {
        if (this.isEmail(contact)) {
          await this.sendEmailOTP(contact, otp, purpose);
        } else {
          await this.sendSMSOTP(contact, otp, purpose);
        }
      }

      return {
        success: true,
        message: usedDemo 
          ? `Demo OTP sent to ${contact}` 
          : `OTP sent to ${contact}`,
        isDemo: usedDemo,
        // Only return OTP in demo mode for development
        ...(usedDemo && process.env.NODE_ENV === 'development' && { otp })
      };
    } catch (error) {
      console.error('Send OTP error:', error);
      throw new Error(`Failed to send OTP: ${error.message}`);
    }
  }

  // Verify OTP
  verifyOTP(contact, inputOTP, removeAfterVerification = true) {
    const storedData = otpStorage.get(contact);
    
    if (!storedData) {
      return {
        success: false,
        message: 'OTP not found or expired'
      };
    }

    // Check expiration
    if (Date.now() > storedData.expirationTime) {
      otpStorage.delete(contact);
      return {
        success: false,
        message: 'OTP has expired'
      };
    }

    // Check attempts
    if (storedData.attempts >= storedData.maxAttempts) {
      otpStorage.delete(contact);
      return {
        success: false,
        message: 'Maximum verification attempts exceeded'
      };
    }

    // Verify OTP
    if (storedData.otp === inputOTP) {
      if (removeAfterVerification) {
        otpStorage.delete(contact);
      }
      return {
        success: true,
        message: 'OTP verified successfully'
      };
    } else {
      // Increment attempts
      storedData.attempts += 1;
      otpStorage.set(contact, storedData);
      
      const remainingAttempts = storedData.maxAttempts - storedData.attempts;
      return {
        success: false,
        message: `Invalid OTP. ${remainingAttempts} attempts remaining`
      };
    }
  }

  // Resend OTP
  async resendOTP(contact, purpose = 'verification', options = {}) {
    // Delete existing OTP
    otpStorage.delete(contact);
    
    // Send new OTP
    return await this.sendOTP(contact, purpose, options);
  }

  // Get OTP status
  getOTPStatus(contact) {
    const storedData = otpStorage.get(contact);
    
    if (!storedData) {
      return {
        exists: false,
        message: 'No OTP found'
      };
    }

    const isExpired = Date.now() > storedData.expirationTime;
    const timeRemaining = Math.max(0, Math.floor((storedData.expirationTime - Date.now()) / 1000));
    
    return {
      exists: true,
      expired: isExpired,
      timeRemaining,
      attempts: storedData.attempts,
      maxAttempts: storedData.maxAttempts,
      attemptsRemaining: storedData.maxAttempts - storedData.attempts
    };
  }

  // Clean expired OTPs (call periodically)
  cleanExpiredOTPs() {
    const now = Date.now();
    for (const [contact, data] of otpStorage.entries()) {
      if (now > data.expirationTime) {
        otpStorage.delete(contact);
      }
    }
  }

  // Get demo configuration
  getDemoConfig() {
    return {
      demoOTP: DEMO_OTP,
      demoPhoneNumbers: DEMO_PHONE_NUMBERS,
      demoEmails: DEMO_EMAILS,
      useDemoOTP: process.env.USE_DEMO_OTP === 'true',
      environment: process.env.NODE_ENV
    };
  }
}

// Create and export singleton instance
const otpService = new OTPService();

// Clean expired OTPs every 5 minutes
setInterval(() => {
  otpService.cleanExpiredOTPs();
}, 5 * 60 * 1000);

module.exports = otpService;

