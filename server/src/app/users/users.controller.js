import User from "../../models/user.model.js";
import sendMail from "../../utilities/mailer.js";
import { generateOTP } from "../../utilities/otp.js";
import {
  CustomError,
  GlobalErrorHandler,
} from "../../middleware/errorMiddleware.js";
import {
  generateAccessToken,
  generateRefreshToken,
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
  clearCookieOptions,
  verifyRefreshToken
} from "../../utilities/jwt.js";
import Session from "../../models/session.model.js";
import {createSession} from "../../utilities/getSessiondetails.js"







// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
export const register = GlobalErrorHandler(async (req, res, next) => {
  const { name, email, password, phoneNumber, role } = req.body;
  const user = await User.create({
    name,
    email,
    phoneNumber,
    password,
    role: role || "user",
    userStatus: "active", // Middleware
  });

 const session=await createSession(user,req)

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(session._id);

  res.clearCookie("accessToken", clearCookieOptions);
  res.clearCookie("refreshToken", clearCookieOptions);

  res.cookie("accessToken", accessToken, accessTokenCookieOptions);
  res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

  res.status(201).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      userProfileImage: user.userProfileImage,
    },
  });
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
export const login = GlobalErrorHandler(async (req, res, next) => {
  const { email, password, isAdminLogin = false } = req.body;

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
  if (isAdminLogin && user.role !== "admin") {
    return next(new CustomError("Unauthorized: Admin access required", 403));
  }
  // Update last login and session info
  user.lastLogin = Date.now();
  user.sessionInfo = "loggedIn";
  await user.save();

 const session=await createSession(user,req)

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(session._id);

  res.clearCookie("accessToken", clearCookieOptions);
  res.clearCookie("refreshToken", clearCookieOptions);

  res.cookie("accessToken", accessToken, accessTokenCookieOptions);
  res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

  res.status(200).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      userProfileImage: user.userProfileImage,
    },
  });
});

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Private
export const logout = GlobalErrorHandler(async (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (refreshToken) {
    try {
      const decoded = verifyRefreshToken(refreshToken); // { sid }
      await Session.findByIdAndUpdate(decoded.sid, { isRevoked: true });

    } catch (err) {
      // ignore invalid token, just clear cookies
    }
  }

  res.clearCookie("accessToken", clearCookieOptions);
  res.clearCookie("refreshToken", clearCookieOptions);

  res.status(200).json({ success: true, message: "Logged out successfully" });
});


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getProfile = GlobalErrorHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phoneNumber: req.user.phoneNumber,
      role: req.user.role,
      userProfileImage: req.user.userProfileImage,
    },
  });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = GlobalErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");
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

  await user.save();

  res.json({
    success: true,
    message: "Profile updated successfully",
  });
});

// Helper function to generate OTP

// @desc    Forgot password - Send OTPs
// @route   POST /api/users/forgot-password
// @access  Public
export const sendOtp = GlobalErrorHandler(async (req, res, next) => {
  const { email } = req.body;

  // Find user by email and phone
  const user = await User.findOne({ email }).select("+otp +otpExpiresAt");
  if (!user) {
    return next(new CustomError("No user found with this email", 404));
  }

  // Generate OTPs
  const emailOtp = generateOTP();
  if (user.otpExpiresAt) {
    const otpRequestedAt = new Date(user.otpExpiresAt - 10 * 60 * 1000);
    const diffInMs = new Date() - otpRequestedAt;
    if (diffInMs / (1000 * 60) < 1) {
      return next(
        new CustomError(
          "Please wait at least 1 minute before requesting a new OTP",
          429
        )
      );
    }
  }

  // Save OTPs with expiry (10 minutes)
  user.otp = emailOtp;

  await user.save();

  try {
    await sendMail(user.email, emailOtp);
    // TODO: Implement actual email and SMS sending
    // For development, return OTPs in response
    res.json({
      success: true,
      message: "OTPs sent to email",
      // debug: {
      //   emailOtp,
      // },
    });
  } catch (error) {
    console.error("Error sending OTPs:", error);
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    return next(new CustomError("Failed to send OTPs", 500));
  }
});

// @desc    Verify OTPs and Reset Password
// @route   POST /api/users/verify-otp nlbh ckjy aiys eaib

// @access  Public
export const verifyOtpAndResetPassword = GlobalErrorHandler(
  async (req, res, next) => {
    const { email, emailOtp, newPassword } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return next(new CustomError("User not found", 404));
    }

    // Check if OTPs exist and are valid
    if (!user.otp) {
      return next(
        new CustomError(
          "OTPs have not been generated. Please request new OTPs",
          400
        )
      );
    }

    // Check if OTPs have expired
    if (user.otpExpiresAt < Date.now()) {
      return next(
        new CustomError("OTPs have expired. Please request new OTPs", 400)
      );
    }

    // Verify OTPs
    if (user.otp !== emailOtp) {
      return next(new CustomError("Invalid OTPs. Please try again", 400));
    }

    // Update password
    user.password = newPassword;
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    res.json({
      success: true,
      message: "Password reset successful",
    });
  }
);
