import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your gmail address
    pass: process.env.EMAIL_PASS, // your app password
  },
});

async function sendMail(to, emailOtp) {
  const mailOptions = {
    from: `"Tribex Esports" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your Tribex Esports OTP – Valid for 10 Minutes",
    html: `<div style="text-align:center; font-family: Arial, sans-serif;">
           <h2>Your OTP Code</h2>
           <p>Use the OTP below to complete your verification. It is valid for 10 minutes.</p>
           <div style="font-size:36px; font-weight:bold; color:#e84118; margin:20px 0;">${emailOtp}</div>
           <p>If you did not request this code, please ignore this email.</p>
         </div>`,
  };

  return transporter.sendMail(mailOptions);
}

export default sendMail
