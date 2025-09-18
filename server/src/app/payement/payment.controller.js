const {
  CustomError,
  GlobalErrorHandler,
} = require("../../middleware/errorMiddleware");
const Registration = require("../../models/registrationSchema.mode");
const Payment = require("../../models/payment.model");
const Tournament = require("../../models/tournament.model");
// const {cashfree} = require("../../index");
const dotenv = require("dotenv");
dotenv.config();
const { Cashfree, CFEnvironment } = require("cashfree-pg");
const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
const cashfree = new Cashfree(
  process.env.NODE_ENV === "production"
    ? CFEnvironment.PRODUCTION
    : CFEnvironment.SANDBOX,
  CASHFREE_APP_ID,
  CASHFREE_SECRET_KEY
);

const generateOrderId = () => {
  return (
    "ORDER_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9)
  );
};

const handleRegistration = GlobalErrorHandler(async (req, res, next) => {
  const { tournament } = req.body;

  // 1. Validate input
  if (!tournament) {
    return next(new CustomError("Tournament ID is required", 400));
  }

  // 2. Check if tournament exists
  const tournamentDoc = await Tournament.findById(tournament);
  if (!tournamentDoc) {
    return next(new CustomError("Tournament not found", 404));
  }

  if (tournamentDoc.status !== "registration-open") {
    return next(
      new CustomError("Registration is closed for this tournament", 400)
    );
  }
  const count = await Registration.countDocuments({
    tournament,
    status: "paid",
  });
    if (count >= tournament.maxParticipants) {
    return next(new CustomError("Tournament is full", 400));
  }

if (tournamentDoc.entryFee.amount === 0) {
  const registration = await Registration.create({
    user: req.user._id,
    tournament,
    status: "free", 
    payment: null,  // no payment record needed
  });

  return res.json({
    success: true,
    message: "Successfully registered for free tournament",
    registrationId: registration._id,
  });
}




  const existingRegistration = await Registration.findOne({
    user: req.user._id,
    tournament,
  }).populate("payment");

  if (existingRegistration) {

    const cashfreeResponse = await cashfree.PGFetchOrder(
      existingRegistration.payment.orderId
    );
    const orderStatus = cashfreeResponse.data.order_status;

    if (existingRegistration.status === "paid" && orderStatus === "PAID") {
      return next(
        new CustomError("You are already registered for this tournament", 400)
      );
    }

    if (orderStatus === "EXPIRED" || orderStatus === "FAILED"||orderStatus === "ACTIVE") {

      if (existingRegistration.status === "pending") {
        existingRegistration.payment.status = "cancelled";
        await existingRegistration.payment.save();
      }

      const orderId = generateOrderId();
      const orderData = {
        order_amount: parseInt(tournamentDoc.entryFee.amount),
        order_currency: "INR",
        order_id: orderId,
        customer_details: {
          customer_id: `USER_${req.user.id}`,
          customer_phone: req.user.phoneNumber,
          customer_name: req.user.name,
          customer_email: req.user.email,
        },
        order_meta: {
          return_url: `http://localhost:5173/payment-success?order_id=${orderId}`,
          // notify_url: `http://localhost:5000/api/payment/webhook`,
          notify_url: `https://34ce71a33dab.ngrok-free.app/api/v1/payments/webhook`,
          payment_methods: "upi", // focus on UPI
        },
        cart_details: {
          cart_items: [
            {
              item_id: tournamentDoc._id.toString(),
              item_name: tournamentDoc.title,
              item_original_unit_price: tournamentDoc.entryFee.amount,
              item_discounted_unit_price: tournamentDoc.entryFee.amount,
              item_quantity: 1,
              item_currency: "INR",
            },
          ],
        },
      };

      const cashfreeResponse = await cashfree.PGCreateOrder(orderData);

      if (cashfreeResponse.data.payment_session_id) {
        const newPayment = await Payment.create({
          user: req.user._id,
          amount: parseInt(tournamentDoc.entryFee.amount),
          orderId,
          transactionId: cashfreeResponse.data.payment_session_id, // use session ID
          metadata: cashfreeResponse.data,
        });

        existingRegistration.payment = newPayment._id;
        existingRegistration.status = "pending";
        await existingRegistration.save();

        return res.json({
          success: true,
          message: "Order created, complete payment to confirm registration",
          orderId,
          paymentSessionId: cashfreeResponse.data.payment_session_id,
        });
      } else {
        return next(new CustomError("Failed to create order", 500));
      }
    }
  }



  const orderId = generateOrderId();
  const orderData = {
    order_amount: parseInt(tournamentDoc.entryFee.amount),
    order_currency: "INR",
    order_id: orderId,
    customer_details: {
      customer_id: `USER_${req.user.id}`,
      customer_phone: req.user.phoneNumber,
      customer_name: req.user.name,
      customer_email: req.user.email,
    },
    order_meta: {
      return_url: `http://localhost:5173/payment-success?order_id=${orderId}`,
      // notify_url: `http://localhost:5001/api/v1/payments/webhook`,
      notify_url: `https://34ce71a33dab.ngrok-free.app/api/v1/payments/webhook`,
      payment_methods: "upi",
    },
    cart_details: {
      cart_items: [
        {
          item_id: tournamentDoc._id.toString(),
          item_name: tournamentDoc.title,
          item_original_unit_price: tournamentDoc.entryFee.amount,
          item_discounted_unit_price: tournamentDoc.entryFee.amount,
          item_quantity: 1,
          item_currency: "INR",
        },
      ],
    },
  };

  const cashfreeResponse = await cashfree.PGCreateOrder(orderData);

  if (cashfreeResponse.data.payment_session_id) {
    const payment = await Payment.create({
      user: req.user._id,
      amount: tournamentDoc.entryFee.amount,
      orderId,
      transactionId: cashfreeResponse.data.payment_session_id, // use session ID
      metadata: cashfreeResponse.data,
    });

    // Save a "pending" registration
    await Registration.create({
      user: req.user._id,
      tournament,
      payment: payment._id,
    });

    res.json({
      success: true,
      message: "Order created, complete payment to confirm registration",
      orderId,
      paymentSessionId: cashfreeResponse.data.payment_session_id,
    });
  } else {
    return next(new CustomError("Failed to create order", 500));
  }
});

const verifyPayment = GlobalErrorHandler(async (req, res, next) => {
  const { orderId } = req.body;

  if (!orderId) {
    return next(new CustomError("Order ID is required", 400));
  }

  const cashfreeResponse = await cashfree.PGFetchOrder(orderId);
  const orderStatus = cashfreeResponse.data.order_status;

  const payment = await Payment.findOne({ orderId });
  if (!payment) {
    return next(new CustomError("Payment not found", 404));
  }
  const paymentStatus =
    orderStatus === "PAID"
      ? "paid"
      : orderStatus === "EXPIRED"
      ? "cancelled"
      : orderStatus === "FAILED"
      ? "failed"
      : "pending";
  payment.status = paymentStatus;
  await payment.save();

  const registration = await Registration.findOne({ payment: payment._id });
  if (!registration) {
    return next(new CustomError("Registration not found", 404));
  }
  registration.status = paymentStatus;
  await registration.save();

  res.status(200).json({
    success: true,
    paymentStatus: paymentStatus,
    details: cashfreeResponse.data,
  });
});



const webhookHandler = GlobalErrorHandler(async (req, res) => {
  const {
    order_id: orderId,
    order_amount: orderAmount,
    order_currency: orderCurrency,
    order_status: orderStatus,
    payment_id: paymentId,
    payment_amount: paymentAmount,
    payment_currency: paymentCurrency,
    payment_status: paymentStatus,
    payment_message: paymentMessage,
    payment_time: paymentTime,
    bank_reference: bankReference,
    auth_id: authId,
    payment_method: paymentMethod,
  } = req.body;

  console.log("Webhook received:", req.body);
  // if (!orderId) {
  //   return res.status(400).json({ message: "Order ID is required" });
  // }

  // // Find the payment record
  // const paymentDoc = await Payment.findOne({ orderId });
  // if (!paymentDoc) {
  //   console.error(`Payment not found for orderId: ${orderId}`);
  //   return res.status(404).json({ message: "Payment not found" });
  // }

  // console.log(`Updating Payment ${orderId} from status: ${paymentDoc.status} to: ${orderStatus}`);

  // // Update Payment status
  // switch (orderStatus) {
  //   case "PAID":
  //     paymentDoc.status = "paid";
  //     paymentDoc.transactionId = paymentId || authId || paymentDoc.transactionId;
  //     paymentDoc.metadata = { paymentMethod, paymentTime, bankReference };
  //     break;

  //   case "EXPIRED":
  //     paymentDoc.status = "cancelled";
  //     break;

  //   case "FAILED":
  //     paymentDoc.status = "failed";
  //     paymentDoc.metadata = { paymentMessage };
  //     break;

  //   case "PENDING":
  //     paymentDoc.status = "pending";
  //     break;

  //   default:
  //     paymentDoc.status = orderStatus.toLowerCase();
  // }

  // await paymentDoc.save();

  // // Update Registration linked to this payment
  // const registration = await Registration.findOne({ payment: paymentDoc._id });
  // if (registration) {
  //   if (paymentDoc.status === "paid") {
  //     registration.status = "confirmed";
  //   } else if (paymentDoc.status === "cancelled" || paymentDoc.status === "failed") {
  //     registration.status = paymentDoc.status;
  //   } else {
  //     registration.status = "pending";
  //   }
  //   await registration.save();
  // }

  // console.log(`Webhook processed: ${orderId} → ${paymentDoc.status}`);

  // return res.json({
  //   success: true,
  //   message: "Webhook processed successfully",
  //   orderId,
  //   status: paymentDoc.status,
  // });
});

module.exports = {
  handleRegistration,
  verifyPayment,
  webhookHandler,
};
