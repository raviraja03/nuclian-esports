import express from "express";
const router = express.Router();
import {
  register,
  login,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile
} from './users.controller.js';
import { protect, authorize } from '../../middleware/auth.js';
import {
  registerValidation,
  loginValidation,
  updateUserValidation,
  paginationValidation,
  userIdValidation
} from '../../utils/validation.js';
import { validateRequest } from '../../middleware/error.js';

// Public routes
router.post('/users/register', registerValidation, validateRequest, register);
router.post('/users/login', loginValidation, validateRequest, login);

// Protected routes
router.use(protect); // Apply authentication middleware to all routes below

// User profile routes
router.route('/profile')
  .get(getProfile)
  .put(updateUserValidation, validateRequest, updateProfile);

// Admin only routes
router.route('/')
  .get(authorize('admin', 'superadmin'), paginationValidation, validateRequest, getUsers);

router.route('/:id')
  .get(authorize('admin', 'superadmin'), userIdValidation, validateRequest, getUserById)
  .put(authorize('admin', 'superadmin'), [...userIdValidation, ...updateUserValidation], validateRequest, updateUser)
  .delete(authorize('admin', 'superadmin'), userIdValidation, validateRequest, deleteUser);

export default router;
