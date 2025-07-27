const mongoose = require('mongoose');

// Temp user schema for OTP verification
const tempUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    required: true,
  },
  otpExpiresAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Finds a temp user by email
tempUserSchema.statics.findByEmail = function(email) {
  return this.findOne({ email });
};

module.exports = mongoose.model('TempUser', tempUserSchema);
