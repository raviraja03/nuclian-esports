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
    origin: process.env.APP_HOST || "*",
    methods: "GET,PUT,POST,DELETE",
    credentials: true,
  },
});
app.set("io", io);
// Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.APP_HOST || "*",
    methods: "GET,PUT,POST,DELETE",
    // credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    exposedHeaders: ["Content-Disposition", "FileLength"]
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React build
app.use(express.static(path.join(__dirname, '../../client/dist')));

// For any route, serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
});

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
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tournaments", tournamentRouter);
app.use("/api/v1/admin/tournaments", tournamentAdminRouter);
app.use("/api/v1/payments", paymentRouter);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: "API is running 🚀"
  });
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
