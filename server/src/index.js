const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

// Load environment variables
dotenv.config();

// -------------------- ROUTES --------------------
const userRouter = require("./app/users/users.route");
const tournamentRouter = require("./app/tournaments/tournaments.route");
const tournamentAdminRouter = require("./app/tournaments/tournaments.admin.route");
const paymentRouter = require("./app/payement/payment.route");

// Error middleware
const { errorMiddleware } = require("./middleware/errorMiddleware");

// -------------------- EXPRESS APP --------------------
const app = express();
const server = http.createServer(app);

// -------------------- MIDDLEWARE --------------------
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:3000", // if sometimes using 3000
  "http://localhost:3001", // your React dev server
  "https://tribexesports.com",       // no-www
  "https://www.tribexesports.com"    // with www
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // if you use cookies/auth headers
    exposedHeaders: ["Content-Disposition", "FileLength"],
  })
);

// Handle preflight requests
app.options("*", cors());

// app.use(
//   cors({
//     origin: process.env.APP_HOST,  // must be exact domain
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,             // if using cookies or auth headers
//     exposedHeaders: ["Content-Disposition", "FileLength"],
//   })
// );

// -------------------- SOCKET.IO --------------------
const io = new Server(server, {
  cors: {
    origin:[ process.env.APP_HOST] ,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});
app.set("io", io);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -------------------- DATABASE --------------------
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ Database Connection Error: ${err.message}`);
    process.exit(1);
  }
};

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tournaments", tournamentRouter);
app.use("/api/v1/admin/tournaments", tournamentAdminRouter);
app.use("/api/v1/payments", paymentRouter);

// -------------------- ERROR HANDLING --------------------
app.use(errorMiddleware);

// -------------------- SOCKET.IO EVENTS --------------------
io.on("connection", (socket) => {
  console.log(`🔌 User connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 5001;
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(
      `🚀 Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`
    );
  });
});
