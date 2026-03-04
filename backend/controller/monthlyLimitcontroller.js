import { Notification } from "../module/notificationModel.js";
import { User } from "../module/userModel.js";

export const setMonthlyLimit = async (req, res) => {
    try {
        const { monthlyLimit } = req.body;

        if (monthlyLimit == null || monthlyLimit < 0) {
            return res.status(400).json({
                message: "Valid monthly limit required"
            });
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { monthlyLimit },
            { new: true }
        ).select("-password");

        res.status(200).json({
            message: "Monthly limit updated successfully",
            monthlyLimit: user.monthlyLimit
        });

    } catch (error) {
        res.status(500).json({
            message: error.message || "Error updating monthly limit"
        });
    }
};