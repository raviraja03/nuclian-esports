const bcrypt = require("bcryptjs");
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
    secure: true,
    sameSite: "None", 
    domain: ".sunilspace.me",
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
    secure: true,
    sameSite: "None", 
    domain: ".sunilspace.me",
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
      // token,
    },
  });
});

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Private
const logout = GlobalErrorHandler(async (req, res, next) => {
 

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

module.exports = {
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
