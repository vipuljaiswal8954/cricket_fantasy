import twilio from "twilio";
import randomstring from "randomstring";

import User from "../models/user.js";
import Wallet from "../models/wallet.js";
import { insertSampleNotifications } from "../loadSampleData/loadNotification.js";

// Twilio credentials
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE;

const client = twilio(accountSid, authToken);

// This object will store the generated OTPs for each phone number
const otpStorage = {};

export const sendOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res.status(400).json({ error: "Phone number not provided" });
    }

    // Generate a random 6-digit OTP
    const otp = randomstring.generate({ length: 6, charset: "numeric" });

    // Store the OTP for verification later
    otpStorage[phoneNumber] = otp;

    // Send OTP via SMS
    const message = await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: twilioPhoneNumber,
      to: phoneNumber,
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    if (!phoneNumber || !otp) {
      return res.status(400).json({ error: "Phone number or OTP not provided" });
    }

    const storedOtp = otpStorage[phoneNumber];
    if (!storedOtp) {
      return res.status(404).json({ error: "OTP not generated for this phone number" });
    }

    if (otp === storedOtp) {
      // If OTP is correct, create a new user or find an existing user
      let user = await User.findOne({ phone: phoneNumber });

      if (!user) {
        user = new User({ phone: phoneNumber });
        await user.save();
        const newWallet = new Wallet({
          userId: user._id,
          balance: 0, // Set initial balance to 0 or any other value you desire
          transactions: [], // Start with an empty array of transactions
        });
        insertSampleNotifications(user._id);

        // Save the wallet to the database
        await newWallet.save();
      }

      // Generate authentication token
      const token = await user.authToken();

      // Send response with user data and token
      return res.status(200).json({ user, token });
    } else {
      // Incorrect OTP entered
      return res.status(401).json({ error: "Incorrect OTP" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const resendOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res.status(400).json({ error: "Phone number not provided" });
    }

    // Generate a new OTP
    const newOtp = randomstring.generate({ length: 6, charset: "numeric" });

    // Update the OTP for the phone number
    otpStorage[phoneNumber] = newOtp;

    // Send the new OTP via SMS
    const message = await client.messages.create({
      body: `Your new OTP is: ${newOtp}`,
      from: twilioPhoneNumber,
      to: phoneNumber,
    });

    res.status(200).json({ message: "OTP resent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to resend OTP" });
  }
};
