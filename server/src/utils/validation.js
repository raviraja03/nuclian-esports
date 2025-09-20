const { body, param, query } = require('express-validator');

const registerValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),
    // .isLength({ min: 2 })
    // .withMessage('Name must be at least 2 characters long'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('phoneNumber')
    .optional()
    .trim()
    .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
    .withMessage('Please enter a valid phone number'),
  body('role')
    .optional()
    .isIn(['user', 'admin', 'superadmin'])
    .withMessage('Invalid role specified'),
];

const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required'),
];

const updateUserValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('phone')
    .optional()
    .trim()
    .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
    .withMessage('Please enter a valid phone number'),
  body('userStatus')
    .optional()
    .isIn(['active', 'inactive', 'pending', 'blocked'])
    .withMessage('Invalid user status'),
  body('role')
    .optional()
    .isIn(['user', 'admin', 'superadmin'])
    .withMessage('Invalid role specified'),
];

const paginationValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer')
    .toInt(),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
    .toInt(),
];

const userIdValidation = [
  param('id')
    .notEmpty()
    .withMessage('User ID is required')
    .isMongoId()
    .withMessage('Invalid user ID format'),
];

const createTournamentValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters'),
  
  body('type')
    .trim()
    .notEmpty()
    .withMessage('Tournament type is required')
    .isIn(['solo', 'duo', 'squad'])
    .withMessage('Invalid tournament type'),
  
  body('game')
    .trim()
    .notEmpty()
    .withMessage('Game is required'),
  
  body('platform')
    .trim()
    .notEmpty()
    .withMessage('Platform is required')
    .isIn(['pc', 'mobile', 'console', 'cross-platform'])
    .withMessage('Invalid platform'),
  
  body('schedule.startTime')
    .notEmpty()
    .withMessage('Start time is required')
    .isISO8601()
    .withMessage('Invalid start time format')
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error('Start time must be in the future');
      }
      return true;
    }),
  
  body('schedule.endTime')
    .notEmpty()
    .withMessage('End time is required')
    .isISO8601()
    .withMessage('Invalid end time format')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.schedule.startTime)) {
        throw new Error('End time must be after start time');
      }
      return true;
    }),
  
  body('schedule.checkInStart')
    .notEmpty()
    .withMessage('Check-in start time is required')
    .isISO8601()
    .withMessage('Invalid check-in start time format')
    .custom((value, { req }) => {
      if (new Date(value) >= new Date(req.body.schedule.startTime)) {
        throw new Error('Check-in must end before tournament starts');
      }
      return true;
    }),
  
  body('schedule.checkInEnd')
    .notEmpty()
    .withMessage('Check-in end time is required')
    .isISO8601()
    .withMessage('Invalid check-in end time format')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.schedule.checkInStart)) {
        throw new Error('Check-in end must be after check-in start');
      }
      if (new Date(value) >= new Date(req.body.schedule.startTime)) {
        throw new Error('Check-in must end before tournament starts');
      }
      return true;
    }),
  
  body('maxParticipants')
    .notEmpty()
    .withMessage('Maximum participants is required')
    .isInt({ min: 2 })
    .withMessage('Maximum participants must be at least 2'),
  
  body('entryFee.coins')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Coins entry fee must be a non-negative number'),
  
  body('entryFee.amount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Amount entry fee must be a non-negative number'),
  
  body('prizePool.distribution.*.position')
    .notEmpty()
    .withMessage('Prize position is required')
    .isInt({ min: 1 })
    .withMessage('Prize position must be a positive number'),
  
  body('prizePool.distribution.*.rewardType')
    .notEmpty()
    .withMessage('Reward type is required')
    .isIn(['coins', 'currency'])
    .withMessage('Invalid reward type'),
  
  body('prizePool.distribution.*.amount')
    .notEmpty()
    .withMessage('Prize amount is required')
    .isFloat({ min: 0 })
    .withMessage('Prize amount must be a non-negative number'),
  
  body('rules')
    .optional()
    .isArray()
    .withMessage('Rules must be an array'),
  
  body('rules.*')
    .optional()
    .isString()
    .withMessage('Each rule must be a string'),
  
  body('region')
    .notEmpty()
    .withMessage('Region is required')
    .isIn(['NA', 'EU', 'ASIA', 'SEA', 'MENA', 'SA', 'OCE', 'GLOBAL'])
    .withMessage('Invalid region'),
  
  body('streamLink')
    .optional()
    .isURL()
    .withMessage('Invalid stream link URL'),
  
  body('discordLink')
    .optional()
    .isURL()
    .withMessage('Invalid discord link URL'),
];

const forgotPasswordValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('phoneNumber')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
    .withMessage('Please enter a valid phone number'),
];

const verifyOtpValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('emailOtp')
    .trim()
    .notEmpty()
    .withMessage('Email OTP is required')
    .isLength({ min: 6, max: 6 })
    .withMessage('Email OTP must be 6 digits')
    .isNumeric()
    .withMessage('Email OTP must contain only numbers'),
  body('newPassword')
    .trim()
    .notEmpty()
    .withMessage('New password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

const resendOtpValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
];

module.exports = {
  forgotPasswordValidation,
  verifyOtpValidation,
  resendOtpValidation,
  registerValidation,
  loginValidation,
  updateUserValidation,
  paginationValidation,
  userIdValidation,
  createTournamentValidation,
};
