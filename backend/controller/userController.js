import { User } from "../module/userModel.js";
import { sendOtpToEmail } from "../service/emailOtpProvider.js";
import { generateOtp } from "../utils/otpGenerator.js";
import bcrypt from "bcrypt";

//SEND OTP

export const sendOtp = async (req, res) => {
    try {
        const { email, password, username } = req.body;

       
        if (!email || !password || !username) {
            return res.status(400).json({ message: "All fields are required" });
        }


        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const otp = generateOtp();
        const expiry = new Date(Date.now() + 10 * 60 * 1000);

        let user = await User.findOne({ email });

        const hashPassword = await bcrypt.hash(password, 10);

        
        if (!user) {
            user = new User({
                username,
                email,
                password: hashPassword,
            });
        } else {
          
            user.password = hashPassword;
        }

        user.emailOtp = String(otp);
        user.emailOtpExpiry = expiry;
        user.isVerified = false;

        await user.save();

        await sendOtpToEmail(email, otp);

        return res.status(200).json({
            message: "OTP sent successfully to your email",
            email: user.email
        });

    } catch (error) {
        console.error("Send OTP Error:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
