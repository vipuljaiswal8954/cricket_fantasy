import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  type: {
    type: String,
    enum: ["Deposit", "Withdrawal"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const walletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  transactions: [transactionSchema], // Array of transactions with transaction ID
});

const Wallet = mongoose.model("Wallet", walletSchema);

export default Wallet;
