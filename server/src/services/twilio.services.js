// Twilio SMS sending logic
import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export function sendSms(to, message) {
  // Sends an SMS using Twilio
  return client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to,
  });
}
