
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddExpense() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        category: "",
        paymentMethod: "Cash",
        description: "",
        date: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const token = localStorage.getItem("token");

            const res = await axios.post(
                "http://localhost:3000/expense/create",
                {
                    ...formData,
                    amount: Number(formData.amount)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setSuccess(res.data.message);

            setTimeout(() => {
                navigate("/dummy");
            }, 1000);

        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg p-8 rounded-2xl w-full max-w-lg space-y-5"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    Add Expense
                </h2>

                {/* Title */}
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />

                {/* Amount */}
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />

                {/* Category */}
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-700"
                >
                    <option value="">Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Travel">Room Rent</option>
                    <option value="Bills">Bills</option>
                    <option value="Other">Other</option>
                </select>

                {/* Payment Method */}
                <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-700"
                >
                    <option value="Cash">Cash</option>
                    <option value="Esewa">Esewa</option>
                    <option calue="Khalti">Khalti</option>
                    <option value="MobileBanking">Mobile Banking</option>
                </select>

                {/* Date */}
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />

                {/* Description */}
                <textarea
                    name="description"
                    placeholder="Description (optional)"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />

                {/* Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-lg font-semibold transition disabled:opacity-50"
                >
                    {loading ? "Adding..." : "Add Expense"}
                </button>

                {/* Messages */}
                {success && (
                    <p className="text-green-600 text-center font-medium">
                        {success}
                    </p>
                )}
                {error && (
                    <p className="text-red-600 text-center font-medium">
                        {error}
                    </p>
                )}
            </form>
        </div>
    );
}