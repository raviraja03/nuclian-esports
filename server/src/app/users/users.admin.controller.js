import {
  CustomError,
  GlobalErrorHandler,
} from "../../middleware/errorMiddleware.js";
import User from "../../models/user.model.js";


// @desc    Get all users with pagination
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = GlobalErrorHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const query = { isDeleted: false };

  const [users, total] = await Promise.all([
    User.find(query).skip(skip).limit(limit).sort("-createdAt"),
    User.countDocuments(query),
  ]);

  res.json({
    success: true,
    data: users,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = GlobalErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user || user.isDeleted) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.json({
    success: true,
    data: user,
  });
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = GlobalErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user || user.isDeleted) {
    return next(new CustomError("User not found", 404));
  }

  const { name, email, phone, role, userStatus } = req.body;

  // Update fields
  if (name) user.name = name;
  if (email) user.email = email;
  if (phone) user.phone = phone;
  if (role) user.role = role;
  if (userStatus) user.userStatus = userStatus;

  const updatedUser = await user.save();

  res.json({
    success: true,
    data: updatedUser,
  });
});

// @desc    Delete user (soft delete)
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = GlobalErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user || user.isDeleted) {
    return next(new CustomError("User not found", 404));
  }

  user.isDeleted = true;
  user.sessionInfo = "loggedOut";
  await user.save();

  res.json({
    success: true,
    message: "User deleted successfully",
  });
});