const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../../models/user.model");
const { generateToken } = require("../../middleware/auth");
const {
  CustomError,
  GlobalErrorHandler,
} = require("../../middleware/errorMiddleware");
const dotenv = require("dotenv");
dotenv.config();

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const register = GlobalErrorHandler(async (req, res, next) => {
  const { name, email, password, phoneNumber, role } = req.body;
  const user = await User.create({
    name,
    email,
    phoneNumber,
    password,
    role: role || "user",
    userStatus: "active", // Middleware
  });
  const token = generateToken(user._id);
  res.clearCookie("sessionId");
  res.cookie("sessionId", token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production", // HTTPS only in prod
    secure: true, // HTTPS only in prod
    sameSite: "None", // Required for cross-subdomain in modern browsers
    // domain: ".yourapp.com", // Root domain for subdomains
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  res.status(201).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      userProfileImage: user.userProfileImage,
      // token,
    },
  });
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const login = GlobalErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new CustomError("Email and password are required", 400));
  }

  // Find user by email
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    return next(new CustomError("Incorrect email or password!", 401));
  }

  // Check if user is suspended or deleted
  if (user.isSuspended || user.isDeleted) {
    return next(
      new CustomError(
        user.isSuspended ? "Account suspended" : "Account deleted",
        403
      )
    );
  }

  // Update last login and session info
  user.lastLogin = Date.now();
  user.sessionInfo = "loggedIn";
  await user.save();

  // Generate token
  const token = generateToken(user._id);
  res.clearCookie("sessionId");
  res.cookie("sessionId", token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production", // HTTPS only in prod
    secure: true,
    sameSite: "None", // Required for cross-subdomain in modern browsers
    // domain: ".yourapp.com", // Root domain for subdomains
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  res.json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      userProfileImage: user.userProfileImage,
      token,
    },
  });
});

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Private
const logout = GlobalErrorHandler(async (req, res, next) => {
  // Update user session info
  // const user = await User.findById(req.user._id);
  // if (user) {
  //   user.sessionInfo = "loggedOut";
  //   await user.save();
  // }

  // Clear the session cookie
  res.clearCookie("sessionId", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  res.json({
    success: true,
    message: "Logged out successfully",
  });
});

// @desc    Get all users with pagination
// @route   GET /api/users
// @access  Private/Admin
const getUsers = GlobalErrorHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const query = { isDeleted: false };

  const [users, total] = await Promise.all([
    User.find(query).skip(skip).limit(limit).sort("-createdAt"),
    User.countDocuments(query),
  ]);

  res.json({
    success: true,
    data: users,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = GlobalErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user || user.isDeleted) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.json({
    success: true,
    data: user,
  });
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = GlobalErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user || user.isDeleted) {
    return next(new CustomError("User not found", 404));
  }

  const { name, email, phone, role, userStatus } = req.body;

  // Update fields
  if (name) user.name = name;
  if (email) user.email = email;
  if (phone) user.phone = phone;
  if (role) user.role = role;
  if (userStatus) user.userStatus = userStatus;

  const updatedUser = await user.save();

  res.json({
    success: true,
    data: updatedUser,
  });
});

// @desc    Delete user (soft delete)
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = GlobalErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user || user.isDeleted) {
    return next(new CustomError("User not found", 404));
  }

  user.isDeleted = true;
  user.sessionInfo = "loggedOut";
  await user.save();

  res.json({
    success: true,
    message: "User deleted successfully",
  });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = GlobalErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.json({
    success: true,
    data: user,
  });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = GlobalErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const { name, email, phoneNumber, currentPassword, newPassword } = req.body;

  // Update basic fields
  if (name) user.name = name;
  if (email) user.email = email;
  if (phoneNumber) user.phoneNumber = phoneNumber;

  // Update password if provided
  if (currentPassword && newPassword) {
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return next(new CustomError("Current password is incorrect", 400));
    }
    if (newPassword.length < 6) {
      return next(
        new CustomError("password must be at least 6 characters", 400)
      );
    }
    user.password = newPassword;
  }

  const updatedUser = await user.save();

  res.json({
    success: true,
    data: {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      role: updatedUser.role,
    },
  });
});

// Helper function to generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// @desc    Forgot password - Send OTPs
// @route   POST /api/users/forgot-password
// @access  Public
const forgotPassword = GlobalErrorHandler(async (req, res, next) => {
  const { email } = req.body;

  // Find user by email and phone
  const user = await User.findOne({ email });
  if (!user) {
    return next(new CustomError("No user found with this email", 404));
  }

  // Generate OTPs
  const emailOtp = generateOTP();

  // Save OTPs with expiry (10 minutes)
  user.otp = {
    code: emailOtp,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000)
  };
  user.verifyOtp = {
    code: emailOtp,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000)
  };

  await user.save();

  try {
    // TODO: Implement actual email and SMS sending
    // For development, return OTPs in response
    res.json({
      success: true,
      message: "OTPs sent to email",
      debug: {
        emailOtp,
      }
    });
  } catch (error) {
    user.otp = undefined;
    user.verifyOtp = undefined;
    await user.save();

    return next(new CustomError("Failed to send OTPs", 500));
  }
});

// @desc    Verify OTPs and Reset Password
// @route   POST /api/users/verify-otp
// @access  Public
const verifyOtpAndResetPassword = GlobalErrorHandler(async (req, res, next) => {
  const { email, emailOtp, newPassword } = req.body;

  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    return next(new CustomError("User not found", 404));
  }

  // Check if OTPs exist and are valid
  if (!user.otp?.code || !user.verifyOtp?.code) {
    return next(new CustomError("OTPs have not been generated. Please request new OTPs", 400));
  }

  // Check if OTPs have expired
  if (user.otp.expiresAt < Date.now() || user.verifyOtp.expiresAt < Date.now()) {
    return next(new CustomError("OTPs have expired. Please request new OTPs", 400));
  }

  // Verify OTPs
  if (user.otp.code !== emailOtp || user.verifyOtp.code !== emailOtp) {
    return next(new CustomError("Invalid OTPs. Please try again", 400));
  }

  // Update password
  user.password = newPassword;
  user.otp = undefined;
  user.verifyOtp = undefined;
  await user.save();

  res.json({
    success: true,
    message: "Password reset successful"
  });
});

// @desc    Resend OTP to email
// @route   POST /api/users/resend-otp
// @access  Public
const resendOtp = GlobalErrorHandler(async (req, res, next) => {
  const { email } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return next(new CustomError("No user found with this email", 404));
  }

  // Check if previous OTP request was made within last 1 minute
  const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
  if (user.otp?.expiresAt && new Date(user.otp.expiresAt) > oneMinuteAgo) {
    return next(new CustomError("Please wait 1 minute before requesting a new OTP", 429));
  }

  // Generate new OTP
  const emailOtp = generateOTP();

  // Save OTP with expiry (10 minutes)
  user.otp = {
    code: emailOtp,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000)
  };
  user.verifyOtp = {
    code: emailOtp,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000)
  };

  await user.save();

  try {
    // TODO: Implement actual email sending
    // For development, return OTP in response
    res.json({
      success: true,
      message: "New OTP sent to email",
      debug: {
        emailOtp
      }
    });
  } catch (error) {
    user.otp = undefined;
    user.verifyOtp = undefined;
    await user.save();

    return next(new CustomError("Failed to send OTP", 500));
  }
});

module.exports = {
  forgotPassword,
  verifyOtpAndResetPassword,
  resendOtp,
  register,
  login,
  logout,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile,
};
