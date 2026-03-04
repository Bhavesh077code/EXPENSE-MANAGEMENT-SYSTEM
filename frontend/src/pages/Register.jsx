
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SendOtp() {


  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:3000/user/send-otp", // apna backend route yaha daalna
        {
          username,
          email,
          password,
        }
      );
      // 🔹 Save token and username in localStorage
      localStorage.setItem("token", res.data.token);      // JWT token
      localStorage.setItem("username", res.data.username);    // name saved here



      setMessage(res.data.message);

      // Redirect to dashboard
      setTimeout(() => {
        navigate("/verify");
      }, 1000);


    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-black/40 to-black/30 backdrop-blur-md z-50 px-4">

      {/* Modal Card */}
      <div className="relative w-full max-w-md 
      bg-white/25 backdrop-blur-2xl 
      border border-white/40 
      shadow-[0_20px_60px_rgba(0,0,0,0.3)]
      rounded-3xl p-10 text-white">

        {/* Title */}
        <h2 className="text-3xl font-semibold text-center mb-8 tracking-wide">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Username */}
          <div className="space-y-2">
            <label className="text-sm text-white/80">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-3 rounded-xl 
            bg-white/30 placeholder-white/70
            outline-none 
            focus:ring-2 focus:ring-blue-400 
            focus:bg-white/40
            transition duration-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm text-white/80">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl 
            bg-white/30 placeholder-white/70
            outline-none 
            focus:ring-2 focus:ring-blue-400 
            focus:bg-white/40
            transition duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm text-white/80">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl 
            bg-white/30 placeholder-white/70
            outline-none 
            focus:ring-2 focus:ring-blue-400 
            focus:bg-white/40
            transition duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 
          py-3 rounded-xl font-semibold 
          shadow-lg hover:shadow-blue-500/40
          hover:scale-[1.02] active:scale-95
          transition duration-300"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>

          {/* Success Message */}
          {message && (
            <p className="text-green-300 text-center text-sm">{message}</p>
          )}

          {/* Error Message */}
          {error && (
            <p className="text-red-300 text-center text-sm">{error}</p>
          )}

        </form>

      </div>
    </div>
  );
}