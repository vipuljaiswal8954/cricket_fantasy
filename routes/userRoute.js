import express from "express";
import { getUserProfile, getUserNotifications } from "../controllers/userController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/profile", auth, getUserProfile);

router.get("/notifications", auth, getUserNotifications);

export default router;
