import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditExpense() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    paymentMethod: "Cash",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🔹 Fetch existing expense
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/expense/edit/${id}`,
          { withCredentials: true }
        );
        setFormData({
          title: res.data.expense.title,
          amount: res.data.expense.amount,
          category: res.data.expense.category,
          paymentMethod: res.data.expense.paymentMethod || "Cash",
          description: res.data.expense.description || "",
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load expense");
      }
      setLoading(false);
    };

    fetchExpense();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.put(
        `http://localhost:5000/api/expense/${id}`,
        { ...formData, amount: Number(formData.amount) },
        { withCredentials: true }
      );
      setSuccess(res.data.message);

      setTimeout(() => {
        navigate("/expenses");
      }, 1000);

    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }

    setSubmitLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-900 text-white">
        Loading Expense...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-6 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Edit Expense</h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-white/20 outline-none"
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-white/20 outline-none"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-white/20 outline-none text-white"
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Shopping">Shopping</option>
          <option value="Transport">Transport</option>
          <option value="Bills">Bills</option>
          <option value="Other">Other</option>
        </select>

        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-white/20 outline-none"
        >
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="UPI">UPI</option>
        </select>

        <textarea
          name="description"
          placeholder="Description (optional)"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-white/20 outline-none"
        />

        <button
          type="submit"
          disabled={submitLoading}
          className="w-full bg-green-500 hover:bg-green-600 p-3 rounded-xl font-semibold transition"
        >
          {submitLoading ? "Updating..." : "Update Expense"}
        </button>

        {success && <p className="text-green-400 text-center">{success}</p>}
        {error && <p className="text-red-400 text-center">{error}</p>}
      </form>
    </div>
  );
}