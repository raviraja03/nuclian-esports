const express = require("express");
const {handleRegistration,verifyPayment,webhookHandler} = require("./payment.controller");
const { protect, authorize } = require("../../middleware/auth");



const paymentRouter = express.Router();

paymentRouter.post("/webhook", webhookHandler);

paymentRouter.use(protect);
paymentRouter.post("/register-in", handleRegistration);
paymentRouter.post("/verify", verifyPayment);


module.exports = paymentRouter;
