import express from "express";
import { handleRegistration, verifyPayment, getMyPayments, updateRegistrationData } from "./payment.controller.js";
import { protect, authorize } from "../../middleware/auth.js";


const paymentRouter = express.Router();

// paymentRouter.post("/webhook", webhookHandler);

paymentRouter.use(protect);
paymentRouter.post("/register-in", handleRegistration);
paymentRouter.patch("/update-registration", updateRegistrationData); 
paymentRouter.post("/verify", verifyPayment);
paymentRouter.get("/my-payments", getMyPayments);

export default paymentRouter;


