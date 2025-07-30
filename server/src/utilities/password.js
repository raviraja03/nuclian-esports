// Password hashing utilities
import bcrypt from 'bcryptjs';

export async function hashPassword(password) {
  // Returns the hashed password
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(enteredPassword, hashedPassword) {
  // Compares entered password with hashed password
  return await bcrypt.compare(enteredPassword, hashedPassword);
}
