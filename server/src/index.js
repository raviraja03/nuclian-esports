const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const {loadRoutesAndMiddleware} = require("./utilities/server-utils");
const swaggerAPIDoc = require("./swagger");
const { errorHandler } = require('./middleware/errorMiddleware');

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
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://kisan251:7pXvcpzKYezUzFea@cluster0.bihao.mongodb.net/businessTask');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Routes
app.use('/api/users', userRoutes);

// Error handling middleware
app.use(errorHandler);

// load routes and controllers files
loadRoutesAndMiddleware(app);

// Start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}); 