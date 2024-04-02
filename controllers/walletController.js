import Wallet from "../models/wallet.js";

// Get Balance
export const getBalance = async (req, res) => {
  try {
    const userId = req.userDetails.user._id;
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }
    res.status(200).json({ balance: wallet.balance });
  } catch (error) {
    console.error("Error retrieving balance:", error);
    res.status(500).json({ error: "Failed to retrieve balance" });
  }
};

// Add Balance
export const addBalance = async (req, res) => {
  try {
    const userId = req.userDetails.user._id;
    const { amount } = req.body;
    const wallet = await Wallet.findOneAndUpdate(
      { userId },
      { $inc: { balance: amount } },
      { new: true }
    );
    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    // Create transaction for the deposit
    const transaction = {
      type: "Deposit",
      amount: amount,
      date: new Date(),
    };

    // Push the transaction to the transactions array in the wallet
    wallet.transactions.push(transaction);

    // Save the updated wallet with the new transaction
    await wallet.save();

    res.status(200).json({ balance: wallet.balance });
  } catch (error) {
    console.error("Error adding balance:", error);
    res.status(500).json({ error: "Failed to add balance" });
  }
};

// Withdraw Balance
export const withdrawBalance = async (req, res) => {
  try {
    const userId = req.userDetails.user._id;
    const { amount } = req.body;
    const wallet = await Wallet.findOneAndUpdate(
      { userId, balance: { $gte: amount } },
      { $inc: { balance: -amount } },
      { new: true }
    );
    if (!wallet) {
      return res.status(404).json({ error: "Insufficient balance" });
    }

    // Create transaction for the deposit
    const transaction = {
      type: "Withdrawal",
      amount: amount,
      date: new Date(),
    };

    // Push the transaction to the transactions array in the wallet
    wallet.transactions.push(transaction);

    // Save the updated wallet with the new transaction
    await wallet.save();

    res.status(200).json({ balance: wallet.balance });
  } catch (error) {
    console.error("Error withdrawing balance:", error);
    res.status(500).json({ error: "Failed to withdraw balance" });
  }
};

// Get Transaction History
export const getTransactionHistory = async (req, res) => {
  try {
    const userId = req.userDetails.user._id;
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }
    res.status(200).json({ transactions: wallet.transactions });
  } catch (error) {
    console.error("Error retrieving transaction history:", error);
    res.status(500).json({ error: "Failed to retrieve transaction history" });
  }
};
