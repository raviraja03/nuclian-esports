import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phoneNumber: {
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
export default User; 
