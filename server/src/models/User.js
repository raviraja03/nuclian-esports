import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
  password: {
    type: String,
    required: true
  },
  otp: {
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


const User = mongoose.model('User', userSchema);
export default User;