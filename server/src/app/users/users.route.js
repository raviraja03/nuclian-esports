import { Router } from "express";
import {
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
} from "./users.controller.js";
import { protect, authorize } from "../../middleware/auth.js";
import {
  registerValidation,
  loginValidation,
  updateUserValidation,
  paginationValidation,
  userIdValidation,
  forgotPasswordValidation,
  verifyOtpValidation,
  resendOtpValidation,
} from "../../utils/validation.js";
import { validate } from "../../middleware/zodMiddleware.js";
import { registerSchema, loginSchema } from "../../middleware/schemas.js";

const userRouter = Router();

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

export default userRouter
