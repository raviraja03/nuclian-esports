import {
  CustomError,
  GlobalErrorHandler,
} from "../../middleware/errorMiddleware.js";
import Registration from "../../models/registration.model.js";
import Payment from "../../models/payment.model.js";
import Tournament from "../../models/tournament.model.js";
import Team from "../../models/team.model.js";
import "dotenv/config";
import mongoose from "mongoose";
import {cashfree} from "../../config/cashfree.js";




export const verifyPayment = GlobalErrorHandler(async (req, res, next) => {
  const { orderId } = req.body;
  const userId = req.user?._id;

  if (!orderId) {
    return next(new CustomError("Order ID is required", 400));
  }

  // ✅ Step 1: Verify with Cashfree
  const cashfreeResponse = await cashfree.PGFetchOrder(orderId);
  if (!cashfreeResponse?.data) {
    return next(new CustomError("Invalid response from Cashfree", 502));
  }

  const orderStatus = cashfreeResponse.data.order_status;
  // ✅ Step 2: Find Payment & populate registration
  const payment = await Payment.findOne({ orderID: orderId }).populate(
    "registrationID"
  );
  if (!payment) {
    return next(new CustomError("Payment not found", 404));
  }

  // ✅ Step 3: Normalize payment status
  const statusMap = {
    PAID: "paid",
    EXPIRED: "cancelled",
    FAILED: "failed",
    PENDING: "pending",
    ACTIVE: "pending",
  };
  const paymentStatus = statusMap[orderStatus];
  payment.status = paymentStatus;

  // ✅ Step 4: Handle status outcomes
  if (paymentStatus === "paid") {
    // Register the user officially
    if (payment.registrationID) {
      payment.registrationID.status = "registered";
      payment.registrationID.paymentStatus = "paid";
      await payment.registrationID.save();
    }

    await payment.save();

    return res.status(200).json({
      success: true,
      paymentStatus,
      details: cashfreeResponse.data,
    });
  }

  // ✅ Step 5: Handle failed/cancelled payments only
  if (["failed", "cancelled"].includes(paymentStatus)) {
    if (payment.registrationID) {
      const teamId = payment.registrationID.teamID;

      // Start a transaction to safely clean up
      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        if (teamId) {
          await Team.deleteOne({ _id: teamId }, { session });
        }
        await Registration.deleteOne(
          { _id: payment.registrationID._id },
          { session }
        );

        payment.registrationID = null;
        await payment.save({ session });

        await session.commitTransaction();
      } catch (err) {
        await session.abortTransaction();
        throw err;
      } finally {
        session.endSession();
      }
    }

    return next(new CustomError(`Payment ${paymentStatus}`, 400));
  }
  if (["pending", "active"].includes(paymentStatus)) {
    return next(new CustomError("Payment is pending, if you paid, contact support", 400));
  }

  // ✅ Step 6: Pending or unknown state — just return safely
  await payment.save();
  return res.status(200).json({
    success: true,
    paymentStatus,
    details: cashfreeResponse.data,
  });
});

// const webhookHandler = GlobalErrorHandler(async (req, res) => {
//   const {
//     order_id: orderId,
//     order_amount: orderAmount,
//     order_currency: orderCurrency,
//     order_status: orderStatus,
//     payment_id: paymentId,
//     payment_amount: paymentAmount,
//     payment_currency: paymentCurrency,
//     payment_status: paymentStatus,
//     payment_message: paymentMessage,
//     payment_time: paymentTime,
//     bank_reference: bankReference,
//     auth_id: authId,
//     payment_method: paymentMethod,
//   } = req.body;

//   console.log("Webhook received:", req.body);
//   // if (!orderId) {
//   //   return res.status(400).json({ message: "Order ID is required" });
//   // }

//   // // Find the payment record
//   // const paymentDoc = await Payment.findOne({ orderId });
//   // if (!paymentDoc) {
//   //   console.error(`Payment not found for orderId: ${orderId}`);
//   //   return res.status(404).json({ message: "Payment not found" });
//   // }

//   // console.log(`Updating Payment ${orderId} from status: ${paymentDoc.status} to: ${orderStatus}`);

//   // // Update Payment status
//   // switch (orderStatus) {
//   //   case "PAID":
//   //     paymentDoc.status = "paid";
//   //     paymentDoc.transactionId = paymentId || authId || paymentDoc.transactionId;
//   //     paymentDoc.metadata = { paymentMethod, paymentTime, bankReference };
//   //     break;

//   //   case "EXPIRED":
//   //     paymentDoc.status = "cancelled";
//   //     break;

//   //   case "FAILED":
//   //     paymentDoc.status = "failed";
//   //     paymentDoc.metadata = { paymentMessage };
//   //     break;

//   //   case "PENDING":
//   //     paymentDoc.status = "pending";
//   //     break;

//   //   default:
//   //     paymentDoc.status = orderStatus.toLowerCase();
//   // }

//   // await paymentDoc.save();

//   // // Update Registration linked to this payment
//   // const registration = await Registration.findOne({ payment: paymentDoc._id });
//   // if (registration) {
//   //   if (paymentDoc.status === "paid") {
//   //     registration.status = "confirmed";
//   //   } else if (paymentDoc.status === "cancelled" || paymentDoc.status === "failed") {
//   //     registration.status = paymentDoc.status;
//   //   } else {
//   //     registration.status = "pending";
//   //   }
//   //   await registration.save();
//   // }

//   // console.log(`Webhook processed: ${orderId} → ${paymentDoc.status}`);

//   // return res.json({
//   //   success: true,
//   //   message: "Webhook processed successfully",
//   //   orderId,
//   //   status: paymentDoc.status,
//   // });
// });

export const getMyPayments = GlobalErrorHandler(async (req, res, next) => {
  const userId = req.user._id;

  const payments = await Payment.find({ userID: userId })
    .sort({ createdAt: -1 })
    .lean();

  res.status(200).json({
    success: true,
    count: payments.length,
    data: payments,
  });
});
