import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import Registration from "./models/registrationSchema.mode.js";
import Tournament from "./models/tournament.model.js";

// Load environment variables
import "dotenv/config";

// Routes
import userRouter from "./app/users/users.route.js";
import tournamentRouter from "./app/tournaments/tournaments.route.js";
import tournamentAdminRouter from "./app/tournaments/tournaments.admin.route.js";
import paymentRouter from "./app/payement/payment.route.js";
import { errorMiddleware, CustomError } from "./middleware/errorMiddleware.js";

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
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      autoIndex: false,
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

const updateRegistrationCounts = async () => {
  try {
    const tournaments = await Tournament.find();
    for (let t of tournaments) {
      const count = await Registration.countDocuments({ tournament: t._id });
      await Tournament.findByIdAndUpdate(t._id, { registeredCount: count });
    }
    console.log("Registration counts updated successfully");
  } catch (error) {
    console.error("Error updating registration counts:", error);
  }
};

// // Run the update function
// updateRegistrationCounts();
