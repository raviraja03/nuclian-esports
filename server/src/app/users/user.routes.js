const express = require('express');
const {
  register,
  login,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile
} = require('./user.controller');
const { protect, authorize } = require('../../middleware/auth');
const {
  registerValidation,
  loginValidation,
  updateUserValidation,
  paginationValidation,
  userIdValidation
} = require('../../utils/validation');
const { validateRequest } = require('../../middleware/error');

const router = express.Router();

router.get('/checking', async(req, res) => {
  res.json("hello World!!!!!!!!!!!");
});


// Public routes
router.post('/register', registerValidation, validateRequest, register);
router.post('/login', loginValidation, validateRequest, login);

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

module.exports = router;
