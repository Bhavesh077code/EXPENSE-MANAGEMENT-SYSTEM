


import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const QuickStats = () => {
  const [totalSpent, setTotalSpent] = useState(0);
  const [monthlyLimit, setMonthlyLimit] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please login.");
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:3000/expense/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { totalSpent, monthlyLimit, remaining } = res.data;

        setTotalSpent(totalSpent);
        setMonthlyLimit(monthlyLimit);
        setRemaining(remaining);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch dashboard data");
        console.log("QuickStats error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // ✅ Skeleton Loading
  if (loading) {
    return (
      <div>
        {/* Dashboard Title */}
        <div className="text-center text-2xl text-gray-500 font-bold underline mb-4">
          <Skeleton width={150} />
        </div>

        {/* Cards Skeleton */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-2xl p-6 shadow flex flex-col justify-between"
            >
              {/* Label */}
              <Skeleton width="60%" />
              {/* Amount */}
              <Skeleton height={30} width="40%" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (error) return <p className="text-red-500">{error}</p>;

  // ✅ Real Data
  return (
    <div>
      <div className="text-center text-2xl text-gray-500 font-bold underline mb-4">
        Dashboard
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition flex flex-col justify-between">
          <p className="text-gray-300">Total Spent</p>
          <h2 className="text-2xl font-bold text-red-400">₹ {totalSpent}</h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition flex flex-col justify-between">
          <p className="text-gray-300">Monthly Limit</p>
          <h2 className="text-2xl font-bold text-blue-400">₹ {monthlyLimit}</h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition flex flex-col justify-between">
          <p className="text-gray-300">Remaining</p>
          <h2
            className={`text-2xl font-bold ${
              remaining < 0 ? "text-red-500" : "text-green-400"
            }`}
          >
            ₹ {remaining}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;