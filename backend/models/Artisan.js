const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const artisanSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  
  // Profile Information
  bio: {
    type: String,
    maxlength: 1000
  },
  avatar: {
    type: String
  },
  coverImage: {
    type: String
  },
  
  // Business Information
  businessName: {
    type: String,
    trim: true
  },
  businessType: {
    type: String,
    enum: ['individual', 'small-business', 'cooperative', 'family-business'],
    default: 'individual'
  },
  establishedYear: {
    type: Number
  },
  
  // Craft Specialization
  specializations: [{
    type: String,
    enum: ['chikankari', 'embroidery', 'weaving', 'pottery', 'jewelry', 'woodwork', 'metalwork', 'painting', 'textiles', 'leather', 'other']
  }],
  techniques: [{
    name: String,
    experience: { type: Number, min: 0 } // years of experience
  }],
  
  // Address Information
  address: {
    street: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, default: 'India' },
    pincode: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  
  // Workshop Information
  workshop: {
    hasWorkshop: { type: Boolean, default: false },
    capacity: Number, // number of artisans
    workingHours: {
      start: String,
      end: String
    },
    workingDays: [{
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }],
    images: [String]
  },
  
  // Verification & Certification
  verification: {
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    isProfileVerified: { type: Boolean, default: false },
    verifiedAt: Date,
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  
  certifications: [{
    name: String,
    issuedBy: String,
    issuedDate: Date,
    expiryDate: Date,
    certificateUrl: String
  }],
  
  // Social Media & Contact
  socialMedia: {
    instagram: String,
    facebook: String,
    whatsapp: String,
    website: String
  },
  
  // Business Metrics
  metrics: {
    totalProducts: { type: Number, default: 0 },
    totalOrders: { type: Number, default: 0 },
    totalRevenue: { type: Number, default: 0 },
    avgRating: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0 },
    repeatCustomers: { type: Number, default: 0 }
  },
  
  // Banking Information (encrypted/secure)
  bankDetails: {
    accountHolder: String,
    accountNumber: String,
    ifscCode: String,
    bankName: String,
    branch: String,
    upiId: String
  },
  
  // Status & Settings
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended', 'pending-approval'],
    default: 'pending-approval'
  },
  
  preferences: {
    language: { type: String, default: 'en' },
    currency: { type: String, default: 'INR' },
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: true },
      push: { type: Boolean, default: true }
    },
    orderNotifications: { type: Boolean, default: true },
    marketingEmails: { type: Boolean, default: false }
  },
  
  // Commission & Pricing
  commission: {
    rate: { type: Number, default: 10 }, // percentage
    type: { type: String, enum: ['percentage', 'fixed'], default: 'percentage' }
  },
  
  // Subscription & Plan
  subscription: {
    plan: { type: String, enum: ['free', 'basic', 'premium'], default: 'free' },
    startDate: Date,
    endDate: Date,
    isActive: { type: Boolean, default: true }
  },
  
  // SEO & Discovery
  seo: {
    slug: {
      type: String,
      unique: true,
      sparse: true
    },
    keywords: [String],
    metaDescription: String
  },
  
  // Followers & Following
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artisan'
  }],
  
  // Activity tracking
  lastActive: {
    type: Date,
    default: Date.now
  },
  lastLoginAt: Date,
  
  // Terms and Privacy
  agreedToTerms: {
    type: Boolean,
    required: true,
    default: false
  },
  termsAcceptedAt: Date
}, {
  timestamps: true
});

// Indexes for better performance
artisanSchema.index({ email: 1 });
artisanSchema.index({ phone: 1 });
artisanSchema.index({ 'address.city': 1, 'address.state': 1 });
artisanSchema.index({ specializations: 1 });
artisanSchema.index({ status: 1 });
artisanSchema.index({ 'verification.isProfileVerified': 1 });
artisanSchema.index({ 'metrics.avgRating': -1 });
artisanSchema.index({ lastActive: -1 });
artisanSchema.index({ name: 'text', bio: 'text', businessName: 'text' });

// Virtual for follower count
artisanSchema.virtual('followerCount').get(function() {
  return this.followers.length;
});

// Virtual for following count
artisanSchema.virtual('followingCount').get(function() {
  return this.following.length;
});

// Virtual for full address
artisanSchema.virtual('fullAddress').get(function() {
  const addr = this.address;
  return `${addr.street ? addr.street + ', ' : ''}${addr.city}, ${addr.state}, ${addr.country} ${addr.pincode || ''}`;
});

// Ensure virtuals are included in JSON output
artisanSchema.set('toJSON', { 
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.password;
    delete ret.bankDetails; // Don't expose bank details in JSON
    return ret;
  }
});
artisanSchema.set('toObject', { virtuals: true });

// Generate slug before saving
artisanSchema.pre('save', function(next) {
  if (this.isModified('businessName') || (this.isModified('name') && !this.seo.slug)) {
    const nameToUse = this.businessName || this.name;
    this.seo.slug = nameToUse
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

// Hash password before saving
artisanSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
artisanSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to update last active
artisanSchema.methods.updateLastActive = function() {
  this.lastActive = new Date();
  return this.save({ validateBeforeSave: false });
};

// Static method to find nearby artisans
artisanSchema.statics.findNearby = function(coordinates, maxDistance = 50) {
  return this.find({
    'address.coordinates': {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: coordinates
        },
        $maxDistance: maxDistance * 1000 // Convert km to meters
      }
    },
    status: 'active',
    'verification.isProfileVerified': true
  });
};

module.exports = mongoose.model('Artisan', artisanSchema);

