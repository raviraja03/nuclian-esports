import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { getProfileImage } from "../utilities/getProfileImage.js";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
      
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      
    },
    phoneNumber: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
      
    },
    userProfileImage: {
      type: String,
      default: () => getProfileImage(),
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    userStatus: {
      type: String,
      enum: ["active", "inactive", "pending", "blocked"],
      default: "pending",
    },
    otp: {
      type: String,
      default: null,
      select: false,
    },
    otpExpiresAt: {
      type: Date,
      default: null,
      select: false,
    },
    isVerified: {
      email: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: Boolean,
        default: false,
      },
    },
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
      
    },
    loc: {
      type: {
        type: String,
        enum: ["Point"],
        // default: "Point",
      },
      coordinates: { type: [Number], index: "2dsphere" }, // [longitude, latitude]
    },
    sessionInfo: {
      type: String,
      enum: ["loggedIn", "loggedOut"],
      default: "loggedOut",
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    deviceType: {
      type: String,
      enum: ["desktop", "mobile", "tablet"],
      default: "desktop",
    },
    deviceToken: {
      type: String,
      default: null,
    },
    appVersion: {
      type: String,
      default: null,
    },
    remark: {
      type: String,
      default: null,
    },
    isSuspended: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

/* 🔑 Compare Password Method */
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

/* 🔐 Password Hash Middleware */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 7);
  next();
});

/* 🔐 OTP Expiry Middleware */
userSchema.pre("save", function (next) {
  if (this.isModified("otp")) {
    if (this.otp) {
      this.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    }
  }
  next();
});

/* 🔍 Static Query Helper */
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};


userSchema.index({ role: 1 });
userSchema.index({ userStatus: 1 });
userSchema.index({ loc: "2dsphere" });

const User = mongoose.model("User", userSchema);
export default User;
