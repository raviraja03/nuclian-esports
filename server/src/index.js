const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const { Cashfree, CFEnvironment } = require('cashfree-pg');
const Tournament = require("./models/tournament.model");

const swaggerAPIDoc = require("./swagger");
// Load environment variables
dotenv.config();

//all routes
const userRouter =require("./app/users/users.route")
const tournamentRouter =require("./app/tournaments/tournaments.route")
const tournamentAdminRouter =require("./app/tournaments/tournaments.admin.route")
const paymentRouter=require("./app/payement/payment.route")
// error middleware
const { errorMiddleware ,CustomError} = require("./middleware/errorMiddleware");
const { ca } = require("zod/v4/locales");

const app = express();

// Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Cashfree SDK
const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;

// Initialize Cashfree SDK
// const cashfree = new Cashfree(
//   process.env.NODE_ENV === 'production' ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX,
//   CASHFREE_APP_ID,
//   CASHFREE_SECRET_KEY
// );
// Loadding Swagger API Doc


swaggerAPIDoc(app);

// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Routes
app.use('/api/v1', userRouter);
app.use('/api/v1', tournamentRouter);
app.use('/api/v1/admin', tournamentAdminRouter);
app.use('/api/v1/payments', paymentRouter);

app.all("*", (req, res, next) => {
  next(
    new CustomError(`The requested URL ${req.originalUrl} was not found`, 404)
  );
});


// Start server
const PORT = process.env.PORT || 5001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(
      `Server running in ${
        process.env.NODE_ENV || "development"
      } mode on port ${PORT}`
    );
  });
});

app.use(errorMiddleware);

// module.exports = {cashfree};

async function seed() {
  await Tournament.deleteMany({});
  await Tournament.insertMany([

  {
    title: "BGMI Solo Championship",
    description: "Solo BGMI tournament with prize pool rewards.",
    type: "solo",
    game: "BGMI",
    // gameId: "bgmi-001",
    platform: "mobile",
    schedule: {
      startTime: new Date("2025-09-20T18:00:00Z"),
      endTime: new Date("2025-09-20T20:00:00Z"),
      checkInStart: new Date("2025-09-20T17:00:00Z"),
      checkInEnd: new Date("2025-09-20T17:45:00Z"),
    },
    // participants: [],
    maxParticipants: 100,
    minParticipants: 10,
    entryFee: {
      coins: 0,
      currency: 50, // ₹50 entry fee
    },
    prizePool: {
      distribution: [
        { position: 1, currency: 500 },
        { position: 2, currency: 300 },
        { position: 3, currency: 200 }
      ],
      totalCoins: 0,
      totalCurrency: 1000
    },
    rules: ["No cheating", "Follow fair play", "Only mobile devices allowed"],
    status: "registration-open",
    // createdBy: "64f8a1b4d0a7c45a7b9e1d23", // sample user ObjectId
    // region: "India",
    streamLink: "https://youtube.com/bgmi-solo",
    isVisible: true
  },
  {
    title: "CODM Squad Battle",
    description: "Call of Duty Mobile Squad tournament.",
    type: "squad",
    game: "CODM",
    // gameId: "codm-001",
    platform: "mobile",
    schedule: {
      startTime: new Date("2025-09-25T15:00:00Z"),
      endTime: new Date("2025-09-25T18:00:00Z"),
      checkInStart: new Date("2025-09-25T14:00:00Z"),
      checkInEnd: new Date("2025-09-25T14:45:00Z"),
    },
    // participants: [],
    maxParticipants: 50,
    minParticipants: 5,
    entryFee: {
      coins: 0,
      currency: 100, // ₹100 entry fee
    },
    prizePool: {
      distribution: [
        { position: 1, currency: 2000 },
        { position: 2, currency: 1000 },
        { position: 3, currency: 500 }
      ],
      totalCoins: 0,
      totalCurrency: 3500
    },
    rules: ["Squads only", "No emulators", "Follow CODM rules"],
    status: "published",
    // createdBy: "64f8a1b4d0a7c45a7b9e1d23",
    // region: "India",
    discordLink: "https://discord.gg/codm-tournament",
    isVisible: true
  }

  ]);
  console.log("Tournaments seeded ✅");
  process.exit();
}

// seed();