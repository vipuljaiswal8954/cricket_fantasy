import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from a .env file into process.env

// Define the User schema
const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
    min: 2,
    max: 100,
  },
  phone: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isMobilePhone(value, "any")) {
        throw new Error("Invalid phone");
      }
    },
  },
});

// Method to generate authentication token for the user
UserSchema.methods.authToken = async function () {
  const user = this;
  const token = jwt.sign({ user: user }, process.env.JWT_SECRET);

  return token;
};

// Create the User model
const User = mongoose.model("User", UserSchema);

export default User;
