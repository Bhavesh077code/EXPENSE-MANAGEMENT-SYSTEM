import { Notification } from "../module/notificationModel.js";


export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user._id })
            .sort({ createdAt: -1 });  // latest first

        res.status(200).json(notifications);

    } catch (error) {
        res.status(500).json({ message: error.message || "Notifications Error" });
    }
};