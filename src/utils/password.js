// Hashes a password using bcryptjs
const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  // Returns the hashed password
  return await bcrypt.hash(password, 10);
}

async function comparePassword(enteredPassword, hashedPassword) {
  // Compares entered password with hashed password
  return await bcrypt.compare(enteredPassword, hashedPassword);
}

module.exports = {
  hashPassword,
  comparePassword,
};
