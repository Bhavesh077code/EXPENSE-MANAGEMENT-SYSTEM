

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OtpVerify = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");



  const handleVerify = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");


    try {
      const res = await axios.post(
        "http://localhost:3000/user/verify-otp",
        { email, otp },
        { withCredentials: true } // important for cookie
      );

      setMessage(res.data.message);

      // Optional: Save token in localStorage
      console.log(localStorage.setItem("token", res.data.token));
      console.log(localStorage.setItem("username", res.data.username));

      // Redirect to dashboard
      setTimeout(() => {
        navigate("/dummy");
      }, 1000);

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center 
  bg-gradient-to-br from-black/40 to-black/30 
  backdrop-blur-md px-4 z-50">

      <form
        onSubmit={handleVerify}
        className="w-full max-w-md 
      bg-white/25 backdrop-blur-2xl 
      border border-white/40 
      shadow-[0_20px_60px_rgba(0,0,0,0.3)]
      rounded-3xl p-8 sm:p-10 
      text-white space-y-6"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-center tracking-wide">
          Verify OTP
        </h2>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm text-white/80">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 
          bg-white/30 placeholder-white/70 
          rounded-xl outline-none
          focus:ring-2 focus:ring-green-400
          focus:bg-white/40
          transition duration-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* OTP */}
        <div className="space-y-2">
          <label className="text-sm text-white/80">OTP Code</label>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full px-4 py-3 
          bg-white/30 placeholder-white/70 
          rounded-xl outline-none 
          tracking-[0.3em] text-center text-lg
          focus:ring-2 focus:ring-green-400
          focus:bg-white/40
          transition duration-300"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 
        py-3 rounded-xl font-semibold
        shadow-lg hover:shadow-green-500/40
        hover:scale-[1.02] active:scale-95
        transition duration-300"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Success */}
        {message && (
          <p className="text-green-300 text-center text-sm">{message}</p>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-300 text-center text-sm">{error}</p>
        )}
      </form>

    </div>
  );
}

export default OtpVerify;