// User input validation schemas using zod
const zod = require('zod');

const userSignupSchema = zod.object({
  username: zod.string().min(3), // Username must be at least 3 characters
  email: zod.string().email(),   // Valid email required
  password: zod.string().min(6), // Password must be at least 6 characters
});

const userSigninSchema = zod.object({
  email: zod.string().email(),   // Valid email required
  password: zod.string().min(6), // Password must be at least 6 characters
});

module.exports = {
  userSignupSchema,
  userSigninSchema,
};
