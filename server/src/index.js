import "dotenv/config";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
//models
import Registration from "./models/registration.model.js";
import Tournament from "./models/tournament.model.js";
import Team from "./models/team.model.js";
import Payment from "./models/payment.model.js";
import {connectDB} from "./config/db.js"
// Load environment variables

// Routes
import userRouter from "./app/users/users.route.js";
import userAdminRouter from "./app/users/users.admin.route.js";
import tournamentRouter from "./app/tournaments/tournaments.route.js";
import tournamentAdminRouter from "./app/tournaments/tournaments.admin.route.js";
import paymentRouter from "./app/payement/payment.route.js";
import { errorMiddleware, CustomError } from "./middleware/errorMiddleware.js";
import { generateEventCode } from "./utilities/generateEventCode.js";
// console.log("Sample Event Code for Free Fire:", generateEventCode("Free Fire"));
const app = express();
const server = http.createServer(app);


app.set('trust proxy', 1);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
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
      "http://localhost:3000",
      "http://127.0.0.1:5173",
      process.env.CLIENT_URL,
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Routes
app.get("/", (req, res) => {
  const forwarded = req.headers['x-forwarded-for'] || req.headers['x-real-ip'];
  const clientIp = forwarded ? forwarded.split(',')[0].trim() : (req.ip || req.connection?.remoteAddress || req.socket?.remoteAddress || 'unknown');
  const env = process.env.NODE_ENV || 'development';
  const message = env === 'production' ? 'Production health check: OK' : `${env} health check: OK`;

  res.status(200).json({
    status: 'ok',
    message,
    clientIp,
    host: req.hostname || req.headers.host || 'unknown',
    serverTime: new Date().toISOString()
  });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/admin/users", userAdminRouter);

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
