const express = require('express');
const router = express.Router();

// Mock OTP storage (in production, use Redis or database)
let otpStore = new Map();

// OTP service configuration
const OTP_CONFIG = {
  demoMode: process.env.OTP_DEMO_MODE === 'true' || true, // Default to demo mode
  demoOtp: '123456',
  length: 6,
  expiryMinutes: 5,
  // SMS providers configuration
  providers: {
    twilio: {
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
      fromNumber: process.env.TWILIO_FROM_NUMBER
    },
    textlocal: {
      apiKey: process.env.TEXTLOCAL_API_KEY,
      sender: process.env.TEXTLOCAL_SENDER || 'CHIKAN'
    }
  }
};

// Generate random OTP
const generateOTP = () => {
  if (OTP_CONFIG.demoMode) {
    return OTP_CONFIG.demoOtp;
  }
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// SMS service - Twilio implementation
const sendSMSViaTwilio = async (phone, message) => {
  if (!OTP_CONFIG.providers.twilio.accountSid) {
    throw new Error('Twilio credentials not configured');
  }
  
  // In production, import and use Twilio SDK
  // const twilio = require('twilio');
  // const client = twilio(OTP_CONFIG.providers.twilio.accountSid, OTP_CONFIG.providers.twilio.authToken);
  // 
  // await client.messages.create({
  //   body: message,
  //   from: OTP_CONFIG.providers.twilio.fromNumber,
  //   to: phone
  // });
  
  console.log(`[Twilio SMS] To: ${phone}, Message: ${message}`);
  return { success: true, provider: 'twilio' };
};

// SMS service - TextLocal implementation
const sendSMSViaTextLocal = async (phone, message) => {
  if (!OTP_CONFIG.providers.textlocal.apiKey) {
    throw new Error('TextLocal credentials not configured');
  }
  
  // In production, make HTTP request to TextLocal API
  // const axios = require('axios');
  // const response = await axios.post('https://api.textlocal.in/send/', {
  //   apikey: OTP_CONFIG.providers.textlocal.apiKey,
  //   numbers: phone,
  //   message: message,
  //   sender: OTP_CONFIG.providers.textlocal.sender
  // });
  
  console.log(`[TextLocal SMS] To: ${phone}, Message: ${message}`);
  return { success: true, provider: 'textlocal' };
};

// Send SMS with fallback providers
const sendSMS = async (phone, message) => {
  if (OTP_CONFIG.demoMode) {
    console.log(`[Demo Mode] SMS to ${phone}: ${message}`);
    return { success: true, provider: 'demo' };
  }
  
  // Try Twilio first
  try {
    return await sendSMSViaTwilio(phone, message);
  } catch (error) {
    console.log('Twilio failed, trying TextLocal:', error.message);
    
    // Fallback to TextLocal
    try {
      return await sendSMSViaTextLocal(phone, message);
    } catch (fallbackError) {
      console.error('All SMS providers failed:', fallbackError.message);
      throw new Error('SMS service unavailable');
    }
  }
};

// Send OTP
router.post('/send', async (req, res) => {
  try {
    const { phone, type = 'verification' } = req.body;
    
    if (!phone) {
      return res.status(400).json({ error: 'Phone number is required' });
    }
    
    // Validate phone number format (basic validation)
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return res.status(400).json({ error: 'Invalid phone number format' });
    }
    
    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + OTP_CONFIG.expiryMinutes * 60 * 1000);
    
    // Store OTP
    otpStore.set(phone, {
      otp,
      expiresAt,
      type,
      attempts: 0,
      createdAt: new Date()
    });
    
    // Prepare SMS message
    const message = `Your Chikankari Craft verification code is: ${otp}. Valid for ${OTP_CONFIG.expiryMinutes} minutes. Do not share this code.`;
    
    // Send SMS
    const smsResult = await sendSMS(phone, message);
    
    res.json({
      success: true,
      message: 'OTP sent successfully',
      expiresIn: OTP_CONFIG.expiryMinutes * 60, // seconds
      provider: smsResult.provider,
      demoMode: OTP_CONFIG.demoMode,
      ...(OTP_CONFIG.demoMode && { demoOtp: otp }) // Include OTP in demo mode
    });
    
  } catch (error) {
    console.error('OTP send error:', error);
    res.status(500).json({ 
      error: 'Failed to send OTP',
      details: error.message
    });
  }
});

// Verify OTP
router.post('/verify', async (req, res) => {
  try {
    const { phone, otp } = req.body;
    
    if (!phone || !otp) {
      return res.status(400).json({ error: 'Phone number and OTP are required' });
    }
    
    const otpData = otpStore.get(phone);
    
    if (!otpData) {
      return res.status(400).json({ error: 'OTP not found or expired' });
    }
    
    // Check expiry
    if (new Date() > otpData.expiresAt) {
      otpStore.delete(phone);
      return res.status(400).json({ error: 'OTP has expired' });
    }
    
    // Check attempts
    if (otpData.attempts >= 3) {
      otpStore.delete(phone);
      return res.status(400).json({ error: 'Too many failed attempts. Please request a new OTP.' });
    }
    
    // Verify OTP
    if (otpData.otp !== otp) {
      otpData.attempts += 1;
      otpStore.set(phone, otpData);
      return res.status(400).json({ 
        error: 'Invalid OTP',
        attemptsLeft: 3 - otpData.attempts
      });
    }
    
    // OTP verified successfully
    otpStore.delete(phone);
    
    res.json({
      success: true,
      message: 'OTP verified successfully',
      phone,
      verifiedAt: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('OTP verify error:', error);
    res.status(500).json({ 
      error: 'Failed to verify OTP',
      details: error.message
    });
  }
});

// Get OTP status
router.get('/status/:phone', (req, res) => {
  try {
    const { phone } = req.params;
    const otpData = otpStore.get(phone);
    
    if (!otpData) {
      return res.json({ 
        exists: false,
        message: 'No active OTP found'
      });
    }
    
    const now = new Date();
    const isExpired = now > otpData.expiresAt;
    
    if (isExpired) {
      otpStore.delete(phone);
      return res.json({ 
        exists: false,
        message: 'OTP has expired'
      });
    }
    
    const timeLeft = Math.ceil((otpData.expiresAt - now) / 1000);
    
    res.json({
      exists: true,
      expiresIn: timeLeft,
      attempts: otpData.attempts,
      attemptsLeft: 3 - otpData.attempts,
      type: otpData.type,
      createdAt: otpData.createdAt
    });
    
  } catch (error) {
    console.error('OTP status error:', error);
    res.status(500).json({ 
      error: 'Failed to get OTP status',
      details: error.message
    });
  }
});

// Resend OTP
router.post('/resend', async (req, res) => {
  try {
    const { phone } = req.body;
    
    if (!phone) {
      return res.status(400).json({ error: 'Phone number is required' });
    }
    
    // Delete existing OTP
    otpStore.delete(phone);
    
    // Generate new OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + OTP_CONFIG.expiryMinutes * 60 * 1000);
    
    // Store new OTP
    otpStore.set(phone, {
      otp,
      expiresAt,
      type: 'verification',
      attempts: 0,
      createdAt: new Date()
    });
    
    // Prepare SMS message
    const message = `Your new Chikankari Craft verification code is: ${otp}. Valid for ${OTP_CONFIG.expiryMinutes} minutes. Do not share this code.`;
    
    // Send SMS
    const smsResult = await sendSMS(phone, message);
    
    res.json({
      success: true,
      message: 'OTP resent successfully',
      expiresIn: OTP_CONFIG.expiryMinutes * 60, // seconds
      provider: smsResult.provider,
      demoMode: OTP_CONFIG.demoMode,
      ...(OTP_CONFIG.demoMode && { demoOtp: otp }) // Include OTP in demo mode
    });
    
  } catch (error) {
    console.error('OTP resend error:', error);
    res.status(500).json({ 
      error: 'Failed to resend OTP',
      details: error.message
    });
  }
});

// Clean up expired OTPs (utility endpoint)
router.post('/cleanup', (req, res) => {
  try {
    const now = new Date();
    let cleanedCount = 0;
    
    for (const [phone, otpData] of otpStore.entries()) {
      if (now > otpData.expiresAt) {
        otpStore.delete(phone);
        cleanedCount++;
      }
    }
    
    res.json({
      success: true,
      message: `Cleaned up ${cleanedCount} expired OTPs`,
      activeOTPs: otpStore.size
    });
    
  } catch (error) {
    console.error('OTP cleanup error:', error);
    res.status(500).json({ 
      error: 'Failed to cleanup OTPs',
      details: error.message
    });
  }
});

// Get OTP configuration (for frontend)
router.get('/config', (req, res) => {
  res.json({
    demoMode: OTP_CONFIG.demoMode,
    length: OTP_CONFIG.length,
    expiryMinutes: OTP_CONFIG.expiryMinutes,
    maxAttempts: 3
  });
});

module.exports = router;

