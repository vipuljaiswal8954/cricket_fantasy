import User from "../models/user.js";
import Notification from "../models/notifications.js";

export const getUserProfile = async (req, res) => {
  try {
    const { phone } = req.userDetails.user;

    // Use the phone number to fetch the user profile or perform other actions
    // For example, you can query the database using the phone number
    const user = await User.findOne({ phone: phone });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user profile
    res.status(200).json({ user });
  } catch (error) {
    // Handle errors
    console.error("Error in getUserProfile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.userDetails.user._id; // Assuming the authenticated user's ID is available in req.user

    // Fetch notifications for the given userId, filter by read: false, and exclude _id, userId, and read properties
    const notifications = await Notification.find({ userId, read: false })
      .sort({ createdAt: -1 })
      .select({ _id: 0, userId: 0, read: 0 });

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};
