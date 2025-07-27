function createOtp() {
  // Generates a 6-digit OTP as a string
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function otpexpiresAt() {
  // Returns a Date object 10 minutes from now
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 10);
  return expires;
}

module.exports = {
  createOtp,
  otpexpiresAt,
};
