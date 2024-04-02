import express from "express";
import {
  getBalance,
  addBalance,
  withdrawBalance,
  getTransactionHistory,
} from "../controllers/walletController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Get balance
router.get("/balance", auth, getBalance);

// Add balance
router.post("/deposit", auth, addBalance);

// Withdraw balance
router.post("/withdraw", auth, withdrawBalance);

// Transaction history
router.get("/transactions", auth, getTransactionHistory);

export default router;
