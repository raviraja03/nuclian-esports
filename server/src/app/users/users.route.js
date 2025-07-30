import express from 'express';
import {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getProfile
} from './user.controller.js';
import authMiddleware from '../../middleware/errorMiddleware.js'; // Adjust if you have a real auth middleware

const router = express.Router();

// Registration route
router.post('/register', register);

// Login route
router.post('/login', login);

// Get user profile (protected)
router.get('/profile', authMiddleware, getProfile);

// CRUD routes
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
