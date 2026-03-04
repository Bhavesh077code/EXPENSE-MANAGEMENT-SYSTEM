/*
import React, { useState, useRef, useEffect } from "react";
import { DollarSign } from "lucide-react";

const MonthlyLimitDropdown = () => {
  const [openLimit, setOpenLimit] = useState(false);
  const [monthlyLimit, setMonthlyLimit] = useState("");
  const limitRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (limitRef.current && !limitRef.current.contains(event.target)) {
        setOpenLimit(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSaveLimit = () => {
    console.log("New Monthly Limit:", monthlyLimit);
    setOpenLimit(false);
  };

  return (
    <div className="relative" ref={limitRef}>
      <button
        onClick={() => setOpenLimit(!openLimit)}
        className="p-2 rounded-full hover:bg-gray-200 transition"
      >
        <DollarSign size={24} />
      </button>

      {openLimit && (
        <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-2xl shadow-lg border border-gray-200 p-4 z-50">
          <h3 className="font-semibold mb-2">Set Monthly Limit</h3>
          <input
            type="number"
            placeholder="Enter limit"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-2"
            value={monthlyLimit}
            onChange={(e) => setMonthlyLimit(e.target.value)}
          />
          <button
            onClick={handleSaveLimit}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default MonthlyLimitDropdown;

*/


/*
import React, { useState, useRef, useEffect } from "react";
import { DollarSign } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MonthlyLimitDropdown = () => {
    const navigate = useNavigate();
  const [openLimit, setOpenLimit] = useState(false);
  const [monthlyLimit, setMonthlyLimit] = useState("");
  const [loading, setLoading] = useState(false);
  const limitRef = useRef();

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (limitRef.current && !limitRef.current.contains(event.target)) {
        setOpenLimit(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔥 Save limit to backend
  const handleSaveLimit = async () => {
    if (!monthlyLimit) return alert("Please enter a limit");

    try {
      setLoading(true);

      const res = await axios.put(
        "http://localhost:3000/expense/set-limit",
        { limit: monthlyLimit }, // 👈 make sure backend expects this key
        { withCredentials: true }
      );

      console.log(res.data);
      alert("Monthly limit saved successfully ✅");
      setOpenLimit(false);
      setMonthlyLimit("");
      //navigate(" ")
    } catch (err) {
      console.log(err);
      alert("Failed to save limit ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative" ref={limitRef}>
      <button
        onClick={() => setOpenLimit(!openLimit)}
        className="p-2 rounded-full hover:bg-gray-200 transition"
      >
        <DollarSign size={24} />
      </button>

      {openLimit && (
        <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-2xl shadow-lg border border-gray-200 p-4 z-50">
          <h3 className="font-semibold mb-2">Set Monthly Limit</h3>

          <input
            type="number"
            placeholder="Enter limit"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-2"
            value={monthlyLimit}
            onChange={(e) => setMonthlyLimit(e.target.value)}
          />

          <button
            onClick={handleSaveLimit}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MonthlyLimitDropdown;

*/




import React, { useState, useRef, useEffect } from "react";
import { DollarSign } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MonthlyLimitDropdown = () => {
  const navigate = useNavigate();
  const [openLimit, setOpenLimit] = useState(false);
  const [monthlyLimit, setMonthlyLimit] = useState("");
  const [loading, setLoading] = useState(false);
  const limitRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (limitRef.current && !limitRef.current.contains(event.target)) {
        setOpenLimit(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Save limit to backend
  const handleSaveLimit = async () => {
    if (!monthlyLimit) return alert("Please enter a limit");

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first!");
        setLoading(false);
        return;
      }

      const res = await axios.put(
        "http://localhost:3000/expense/set-limit", // POST → check backend
        { monthlyLimit: Number(monthlyLimit) }, // backend key must match
        {
          headers: {
            Authorization: `Bearer ${token}`, // JWT header
          },
        }
      );

      console.log(res.data);
      alert(res.data.message || "Monthly limit saved successfully ✅");
      setOpenLimit(false);
      setMonthlyLimit("");
      // Optional: navigate("/dashboard")
    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.message || "Failed to save limit ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative" ref={limitRef}>
      <button
        onClick={() => setOpenLimit(!openLimit)}
        className="p-2 rounded-full hover:bg-gray-200 transition"
      >
        <DollarSign size={24} />
      </button>

      {openLimit && (
        <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-2xl shadow-lg border border-gray-200 p-4 z-50">
          <h3 className="font-semibold mb-2">Set Monthly Limit</h3>

          <input
            type="number"
            placeholder="Enter limit"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-2"
            value={monthlyLimit}
            onChange={(e) => setMonthlyLimit(e.target.value)}
          />

          <button
            onClick={handleSaveLimit}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MonthlyLimitDropdown;