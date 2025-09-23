const userRouter = require("express").Router();
const {
  register,
  login,
  logout,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile,
  sendOtp,
  verifyOtpAndResetPassword,
  resendOtp,
} = require("./users.controller");
const { protect, authorize } = require("../../middleware/auth");
const {
  registerValidation,
  loginValidation,
  updateUserValidation,
  paginationValidation,
  userIdValidation,
  forgotPasswordValidation,
  verifyOtpValidation,
  resendOtpValidation,
} = require("../../utils/validation");
const { validate } = require("../../middleware/zodMiddleware");
const { registerSchema, loginSchema } = require("../../middleware/schemas");

// Public routes
userRouter.post("/register", validate(registerSchema), register);
userRouter.post("/login", validate(loginSchema), login);
userRouter.post("/logout", logout);

userRouter.post("/forgot-password", sendOtp);
userRouter.post("/verify-otp", verifyOtpValidation, verifyOtpAndResetPassword);
// userRouter.post("/resend-otp", resendOtpValidation, resendOtp);

// Protected routes
userRouter.use(protect); // Apply authentication middleware to all routes below

// User profile routes
userRouter.route("/profile").get(getProfile).patch(updateProfile);

// Admin only routes
userRouter
  .route("/")
  .get(authorize("admin", "superadmin"), paginationValidation, getUsers);

userRouter
  .route("/:id")
  .get(
    authorize("admin", "superadmin"),
    userIdValidation,

    getUserById
  )
  .put(
    authorize("admin", "superadmin"),
    [...userIdValidation, ...updateUserValidation],

    updateUser
  )
  .delete(
    authorize("admin", "superadmin"),
    userIdValidation,

    deleteUser
  );

module.exports = userRouter;
