import Notification from "../models/notifications.js";

export async function insertSampleNotifications(userId) {
  try {
    const sampleNotifications = [
      {
        userId: userId, // Replace with an existing user ID
        message: "Welcome to our notification system!",
        read: false,
        createdAt: new Date(),
      },
      {
        userId: userId, // Replace with an existing user ID
        message: "You have a new message from admin.",
        read: false,
        createdAt: new Date(),
      },
    ];

    // Insert sample notification data
    await Notification.insertMany(sampleNotifications);
    console.log("Sample notification data inserted successfully");
  } catch (error) {
    console.error("Error inserting sample notification data:", error);
  }
}
