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
    origin: ["http://localhost:5173", "http://127.0.0.1:5173","http://localhost:4173", "http://127.0.0.1:4173"],
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


// swaggerAPIDoc(app);

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
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tournaments', tournamentRouter);
app.use('/api/v1/admin/tournaments', tournamentAdminRouter);
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
  await Tournament.insertMany(
[
  {
    title: "BGMI Battle Royale",
    description: "Classic BGMI solo tournament with cash prizes.",
    type: "solo",
    game: "BGMI",
    platform: "mobile",
    schedule: {
      startTime: new Date("2025-09-28T18:00:00Z"),
      endTime: new Date("2025-09-28T20:00:00Z"),
      checkInStart: new Date("2025-09-28T17:00:00Z"),
      checkInEnd: new Date("2025-09-28T17:45:00Z"),
    },
    maxParticipants: 100,
    entryFee: { coins: 0, amount: 0 }, // free
    prizePool: {
      distribution: [
        { position: 1, rewardType: "currency", amount: 3000 },
        { position: 2, rewardType: "currency", amount: 1500 },
      ],
      totalCoins: 0,
      totalCurrency: 4500,
    },
    rules: ["No emulator players", "Only classic mode", "Report hackers immediately"],
    status: "registration-open",
    streamLink: "https://youtube.com/bgmibattle",
    discordLink: "https://discord.gg/bgmi",
    metadata: { region: "India", mode: "TPP" },
    isVisible: true,
  },
  {
    title: "Call of Duty Mobile Clash",
    description: "CODM 5v5 multiplayer tournament with prize pool in INR.",
    type: "squad",
    game: "Call of Duty Mobile",
    platform: "mobile",
    schedule: {
      startTime: new Date("2025-09-30T14:00:00Z"),
      endTime: new Date("2025-09-30T18:00:00Z"),
      checkInStart: new Date("2025-09-30T13:00:00Z"),
      checkInEnd: new Date("2025-09-30T13:45:00Z"),
    },
    maxParticipants: 32,
    entryFee: { coins: 0, amount: 250 }, // paid ₹250
    prizePool: {
      distribution: [
        { position: 1, rewardType: "currency", amount: 5000 },
        { position: 2, rewardType: "currency", amount: 2500 },
      ],
      totalCoins: 0,
      totalCurrency: 7500,
    },
    rules: ["Only mobile players", "Bo3 matches", "Server: Asia"],
    status: "registration-open",
    streamLink: "https://twitch.tv/codmclash",
    discordLink: "https://discord.gg/codm",
    metadata: { format: "Bo3", mapPool: "Firing Range, Nuketown" },
    isVisible: true,
  },
  {
    title: "Clash Royale King’s Cup",
    description: "1v1 Clash Royale tournament for mobile gamers.",
    type: "solo",
    game: "Clash Royale",
    platform: "mobile",
    schedule: {
      startTime: new Date("2025-10-02T12:00:00Z"),
      endTime: new Date("2025-10-02T15:00:00Z"),
      checkInStart: new Date("2025-10-02T11:00:00Z"),
      checkInEnd: new Date("2025-10-02T11:45:00Z"),
    },
    maxParticipants: 64,
    entryFee: { coins: 0, amount: 100 }, // paid ₹100
    prizePool: {
      distribution: [
        { position: 1, rewardType: "currency", amount: 3000 },
        { position: 2, rewardType: "currency", amount: 1000 },
      ],
      totalCoins: 0,
      totalCurrency: 4000,
    },
    rules: ["Single elimination", "Custom tournament code provided"],
    status: "published",
    streamLink: "https://youtube.com/clashroyalecup",
    discordLink: "https://discord.gg/clashroyale",
    metadata: { format: "Single Elimination", mode: "Tournament Standard" },
    isVisible: true,
  },
  {
    title: "CS:GO 1v1 Sniper Cup",
    description: "Competitive CS:GO tournament for solo snipers.",
    type: "solo",
    game: "CS:GO",
    platform: "pc",
    schedule: {
      startTime: new Date("2025-10-05T16:00:00Z"),
      endTime: new Date("2025-10-05T19:00:00Z"),
      checkInStart: new Date("2025-10-05T15:00:00Z"),
      checkInEnd: new Date("2025-10-05T15:45:00Z"),
    },
    maxParticipants: 32,
    entryFee: { coins: 0, amount: 150 }, // paid ₹150
    prizePool: {
      distribution: [
        { position: 1, rewardType: "currency", amount: 4000 },
        { position: 2, rewardType: "currency", amount: 2000 },
      ],
      totalCoins: 0,
      totalCurrency: 6000,
    },
    rules: ["AWP-only matches", "Best of 3", "Anti-cheat mandatory"],
    status: "registration-open",
    streamLink: "https://twitch.tv/csgo1v1",
    discordLink: "https://discord.gg/csgo",
    metadata: { map: "awp_lego", format: "Bo3" },
    isVisible: true,
  },
  {
    title: "Rocket League 2v2 Cup",
    description: "Fast-paced Rocket League tournament with duos.",
    type: "duo",
    game: "Rocket League",
    platform: "cross-platform",
    schedule: {
      startTime: new Date("2025-10-07T13:00:00Z"),
      endTime: new Date("2025-10-07T16:00:00Z"),
      checkInStart: new Date("2025-10-07T12:00:00Z"),
      checkInEnd: new Date("2025-10-07T12:45:00Z"),
    },
    maxParticipants: 32,
    entryFee: { coins: 0, amount: 200 }, // paid ₹200
    prizePool: {
      distribution: [
        { position: 1, rewardType: "currency", amount: 3500 },
        { position: 2, rewardType: "currency", amount: 1500 },
      ],
      totalCoins: 0,
      totalCurrency: 5000,
    },
    rules: ["Crossplay enabled", "Best of 3 series", "No toxic behavior"],
    status: "registration-open",
    streamLink: "https://youtube.com/rocketleaguecup",
    discordLink: "https://discord.gg/rocketleague",
    metadata: { mode: "Soccar", format: "Bo3" },
    isVisible: true,
  }
]

);
  console.log("Tournaments seeded ✅");
  process.exit();
}

// seed();