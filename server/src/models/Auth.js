import mongoose from 'mongoose';

const authSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  jwtToken: {
    type: String,
    required: true
  },
  sessionInfo: {
    deviceType: String,
    ipAddress: String,
    userAgent: String,
    location: String
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
authSchema.index({ userId: 1 });
authSchema.index({ jwtToken: 1 });

const Auth = mongoose.model('Auth', authSchema);

export default Auth; 