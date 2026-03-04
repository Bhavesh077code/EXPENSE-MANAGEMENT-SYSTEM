
import { User } from "../module/userModel.js";
import jwt from "jsonwebtoken";
import "dotenv/config"


export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        
        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

      
        const now = new Date();
        const otpInput = String(otp).trim();

        if (
            !user.emailOtp || 
            user.emailOtp.toString().trim() !== otpInput || 
            now > new Date(user.emailOtpExpiry)
        ) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }


        user.isVerified = true;
        user.emailOtp = null;
        user.emailOtpExpiry = null;
        await user.save();

        const token = jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "7d" } 
        );

       
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, 
            sameSite: "lax",
        });

       
        return res.status(200).json({
            message: "OTP verified successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                isVerified: user.isVerified,
            },
            token, 
        });

    } catch (error) {
        console.error("Verify OTP Error:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};