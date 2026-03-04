import { Notification } from "../module/notificationModel.js";


export const deleteNotification = async (req , res) => {
    try {
        const { id } = req.params;

        const notification = await Notification.findByIdAndDelete(id);
        if(!notification){
            return res.status(404).json({
                message: "Notification not found"
            })
        }

        return res.status(200).json({
            message: "Notification Deleted"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Notification error"
        })
    }
}