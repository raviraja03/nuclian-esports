import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import {loadRoutesAndMiddleware} from "./utilities/server-utils.js";
import swaggerAPIDoc from "./swagger.js";
import { errorHandler } from './middleware/errorMiddleware.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Loadding Swagger API Doc
swaggerAPIDoc(app);

// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://kisan251:7pXvcpzKYezUzFea@cluster0.bihao.mongodb.net/eSports');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Routes
// app.use('/api/users', userRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5001;

connectDB().then(async () => {
  // load routes and controllers files
  await loadRoutesAndMiddleware(app);
  
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}); 