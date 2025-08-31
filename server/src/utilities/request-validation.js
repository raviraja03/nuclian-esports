// User input validation schemas using zod
import { z } from 'zod';

export const userSignupSchema = z.object({
  username: z.string().min(3), // Username must be at least 3 characters
  email: z.string().email(),   // Valid email required
  password: z.string().min(6), // Password must be at least 6 characters
});

export const userSigninSchema = z.object({
  email: z.string().email(),   // Valid email required
  password: z.string().min(6), // Password must be at least 6 characters
});