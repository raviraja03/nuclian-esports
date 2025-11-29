import mongoose from "mongoose";
import Registration from "../models/registration.model.js";
import Tournament from "../models/tournament.model.js";
import Team from "../models/team.model.js";
import Payment from "../models/payment.model.js";
export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI environment variable is not defined");
    }
    const conn = await mongoose.connect(uri, {
      autoIndex: false,
      serverSelectionTimeoutMS: 5000,
    });
    Registration.syncIndexes();
    Tournament.syncIndexes();
    Team.syncIndexes();
    Payment.syncIndexes();

    console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};