import User from "../models/User.js";
import Notification from "../models/Notification.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const getNotifications = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
        .populate({
            path: "notifications",
            select: "message isRead createdAt refrenceId"
        });
    console.log(user.notifications);
    res.status(200).json({
        success: true,
        notifications: user.notifications
    });
});

const markNotificationRead = asyncHandler(async (req, res) => {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
        res.status(404);
        throw new Error("Notification not found");
    }

    // Ensure user is allowed to modify their own notification:
    if (notification.userId.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error("You cannot access someone else's notification");
    }

    notification.isRead = true;
    // notification.status="approved"
    await notification.save();

    res.json({
        success: true,
        message: "Notification marked as read"
    });
});
export { getNotifications, markNotificationRead };


