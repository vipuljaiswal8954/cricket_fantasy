import express from "express";
import { sendOtp, verifyOtp, resendOtp } from "../controllers/authController.js";

const router = express.Router();

router.post("/send_otp", sendOtp);

router.post("/verify_otp", verifyOtp);

router.post("/resend_otp", resendOtp);

export default router;
