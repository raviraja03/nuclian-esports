const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// Load environment variables
dotenv.config();

// Routes
const userRouter = require("./app/users/users.route");
const tournamentRouter = require("./app/tournaments/tournaments.route");
const tournamentAdminRouter = require("./app/tournaments/tournaments.admin.route");
const paymentRouter = require("./app/payement/payment.route");

// Error middleware
const {
  errorMiddleware,
  CustomError,
} = require("./middleware/errorMiddleware");

const app = express();
const server = http.createServer(app); 

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      process.env.CLIENT_URL,
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  },
});
app.set("io", io);
// Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      process.env.CLIENT_URL,
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI,{
      dbName: process.env.DB_NAME,
    });
    console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
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

app.all("*", (req, res, next) => {
  next(
    new CustomError(`The requested URL ${req.originalUrl} was not found`, 404)
  );
});

// Error middleware
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 5001;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(
      `Server running in ${
        process.env.NODE_ENV || "development"
      } mode on port ${PORT}`
    );
  });
});

// ---------------- SOCKET.IO LOGIC ----------------
io.on("connection", (socket) => {
  // console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    // console.log("User disconnected:", socket.id);
  });
});
