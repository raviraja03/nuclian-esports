const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    sparse: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    unique: true,
    sparse: true
  },
  userProfileImage: {
    type: String,
    default: null
  },
  password: {
    type: String,
    required: true
  },
  userStatus: {
    type: String,
    enum: ['active', 'inactive', 'pending', 'blocked'],
    default: 'pending'
  },
  otp: {
    code: String,
    expiresAt: Date
  },
  verifyOtp: {
    code: String,
    expiresAt: Date
  },
  isVerified: {
    email: {
      type: Boolean,
      default: false
    },
    phone: {
      type: Boolean,
      default: false
    }
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'superadmin'],
    default: 'user'
  },
  loc: {
    type: {
      type: String,
      enum: ["Point"],
      // default: "Point",
    },
    coordinates: { type: [Number] }, // [longitude, latitude]
  },
  sessionInfo: {
    type: String,
    enum: ['loggedIn', 'loggedOut'],
    default: 'loggedOut'
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  deviceType: {
    type: String,
    enum: ['desktop', 'mobile', 'tablet'],
    default: 'desktop'
  },
  deviceToken: {
    type: String,
    default: null
  },
  appVersion: {
    type: String,
    default: null
  },
  remark: {
    type: String,
    default: null
  },
  isSuspended: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email });
};

userSchema.index({ 'loc': '2dsphere' });

const User = mongoose.model('User', userSchema);
module.exports = User; 
