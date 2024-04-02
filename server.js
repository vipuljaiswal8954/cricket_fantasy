import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/index.js"; // Importing the main router for routing

import { insertSampleNotifications } from "./loadSampleData/loadNotification.js";
import { insertSampleMatches } from "./loadSampleData/loadMatches.js";

dotenv.config(); // Load environment variables from a .env file into process.env

const app = express(); // Creating an Express application
app.use(express.json()); // Middleware to parse JSON requests

// Define application routes
app.use(router);

const PORT = process.env.PORT || 6000; // Define the port number from environment variables or default to 6000

// Connect to MongoDB database and start the server
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    insertSampleMatches();
    app.listen(PORT, () => console.log("Server is up at:", PORT)); // Start the server
  })
  .catch((err) => console.log(err)); // Error handling for database connection
