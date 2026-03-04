
import { User } from "../module/userModel.js";
import jwt from "jsonwebtoken";
import "dotenv/config"


export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // 1️⃣ Validation
        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required" });
        }

        // 2️⃣ Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 3️⃣ Check OTP and expiry
        const now = new Date();
        const otpInput = String(otp).trim();

        if (
            !user.emailOtp || 
            user.emailOtp.toString().trim() !== otpInput || 
            now > new Date(user.emailOtpExpiry)
        ) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }


        // 4️⃣ Mark user as verified
        user.isVerified = true;
        user.emailOtp = null;
        user.emailOtpExpiry = null;
        await user.save();

        // 5️⃣ Generate JWT (secure and reasonable expiry)
        const token = jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "7d" } // ❌ avoid 30y
        );

        // 6️⃣ Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // production: true
            sameSite: "lax",
        });

        // 7️⃣ Send safe response (never send password)
        return res.status(200).json({
            message: "OTP verified successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                isVerified: user.isVerified,
            },
            token, // optional if frontend wants it
        });

    } catch (error) {
        console.error("Verify OTP Error:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};