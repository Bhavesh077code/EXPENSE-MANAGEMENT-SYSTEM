
import jwt from "jsonwebtoken";
import { User } from "../module/userModel.js";

 const authMiddleware = async (req, res, next) => {
    try {
        let token;

        // 1️⃣ Get token from cookie
        if (req.cookies?.token) {
            token = req.cookies.token;
        }

        // 2️⃣ OR get token from Authorization header (Bearer token)
        if (!token && req.headers.authorization?.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        // 3️⃣ If no token provided
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // 4️⃣ Verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // 5️⃣ Find user
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        // 6️⃣ Check if user is verified
        if (!user.isVerified) {
            return res.status(403).json({ message: "Forbidden: User not verified" });
        }

        // 7️⃣ Attach user to request
        req.user = user;

        // 8️⃣ Proceed to next middleware / route
        next();

    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default authMiddleware;