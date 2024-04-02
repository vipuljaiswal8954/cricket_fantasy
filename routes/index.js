import express from "express";
import authRoutes from "./authRoute.js";
import userRoutes from "./userRoute.js";
import matchRoutes from "./matchRoute.js";
import walletRoutes from "./walletRoute.js";

// Create an Express router instance
const router = express.Router();

// Define default routes with their corresponding paths
const defaultRoutes = [
  {
    path: "/auth", // Path for sending and verifying OTP
    route: authRoutes, // sending and verifying OTP handler
  },
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/match",
    route: matchRoutes,
  },
  {
    path: "/wallet",
    route: walletRoutes,
  },
];

// Iterate through the default routes and mount them to the router
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

// Export the router to be used by the application
export default router;
