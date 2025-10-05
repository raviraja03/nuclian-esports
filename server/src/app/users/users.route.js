import { Router } from "express";
import {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  sendOtp,
  verifyOtpAndResetPassword,
} from "./users.controller.js";
import { protect } from "../../middleware/auth.js";
import { validate } from "../../middleware/zodMiddleware.js";
import { registerSchema, loginSchema } from "../../middleware/schemas.js";

const userRouter = Router();

// Public routes
userRouter.post("/register", validate(registerSchema), register);
userRouter.post("/login", validate(loginSchema), login);
userRouter.post("/logout", logout);

userRouter.post("/forgot-password", sendOtp);
userRouter.post("/verify-otp", verifyOtpAndResetPassword);

// Protected routes
userRouter.use(protect); 

// User profile routes
userRouter.route("/profile").get(getProfile).patch(updateProfile);






export default userRouter
