

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MoreHorizontal } from "lucide-react";

const ViewExpense = () => {
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeMenu, setActiveMenu] = useState(null); // track which menu is open

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("No token found. Please login.");
                    setLoading(false);
                    return;
                }

                const res = await axios.get("http://localhost:3000/expense/get-create", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setExpenses(res.data.expense || []);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load expenses");
            }
            setLoading(false);
        };
        fetchExpenses();
    }, []);

    const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
    const recentExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

    const handleEdit = (item) => {
        navigate(`/edit-expense/${item._id}`);
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this expense?");
        if (!confirm) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:3000/expense/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Remove deleted expense from state so UI updates
            setExpenses(expenses.filter((exp) => exp._id !== id));
            setActiveMenu(null); // dropdown close
        } catch (err) {
            alert(err.response?.data?.message || "Failed to delete expense");
            console.log("Delete Expense Error:", err);
        }
    };

    if (loading) {
        return (
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-white rounded-2xl p-6 shadow flex flex-col justify-between">
                            <Skeleton width="60%" height={20} className="mb-2" />
                            <Skeleton width="40%" height={30} />
                            <Skeleton width="50%" height={25} className="mt-2" />
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-2xl shadow p-6">
                    <h3 className="text-gray-500 font-medium mb-4">
                        <Skeleton width={150} />
                    </h3>
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="flex justify-between items-center py-3 border-b last:border-b-0 border-gray-200">
                            <div className="space-y-1 w-full">
                                <Skeleton width="70%" height={20} />
                                <Skeleton width="90%" height={15} />
                                <Skeleton width="60%" height={15} />
                            </div>
                            <Skeleton width={50} height={20} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Top Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
                    <h3 className="text-gray-500 font-medium mb-2">Total Expenses</h3>
                    <p className="text-3xl font-bold text-gray-800">₹ {totalExpenses}</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
                    <h3 className="text-gray-500 font-medium mb-3"><u>Latest Expense</u></h3>
                    {recentExpenses.length > 0 ? (
                        <>
                            <p className="text-gray-800 font-semibold">{recentExpenses[0].title}</p>
                            <p className="text-gray-500 text-sm mb-1">{recentExpenses[0].description}</p>
                            <p className="text-gray-400 text-sm">
                                ₹ {recentExpenses[0].amount} • {recentExpenses[0].category} • {new Date(recentExpenses[0].date).toLocaleDateString()}
                            </p>
                        </>
                    ) : (
                        <p className="text-gray-400">No recent expense</p>
                    )}
                </div>

                <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition flex flex-col justify-between">
                    <h3 className="text-gray-500 font-medium mb-2">Quick Actions</h3>
                    <button
                        onClick={() => navigate("/add-expense")}
                        className="bg-gray-800 hover:bg-gray-900 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition mt-2"
                    >
                        Add New Expense
                    </button>
                </div>
            </div>

            {/* Expense List */}
            <div className="bg-white rounded-2xl shadow p-6">
                <h3 className="text-gray-500 font-medium mb-4">Recent Expenses</h3>
                {recentExpenses.length > 0 ? (
                    <div className="space-y-3">
                        {recentExpenses.map((item) => (
                            <div key={item._id} className="flex justify-between items-center py-3 border-b last:border-b-0 border-gray-200 relative">
                                <div>
                                    <p className="text-gray-800 font-semibold">{item.title}</p>
                                    <p className="text-gray-500 text-sm">{item.description}</p>
                                    <p className="text-gray-400 text-sm">
                                        {item.category} • {item.paymentMethod} • {new Date(item.date).toLocaleDateString()}
                                    </p>
                                </div>

                                {/* Amount + 3-dot menu */}
                                <div className="">
                                    <p className=" text-gray-800 font-bold text-lg relative">₹ {item.amount}</p>

                                    {/* 3-dot button */}
                                    <button
                                        onClick={() => setActiveMenu(activeMenu === item._id ? null : item._id)}
                                        className="absolute -top-3 right-0 p-1 hover:bg-gray-200 rounded-full "
                                    >
                                        <MoreHorizontal size={20} />
                                    </button>

                                    {/* Dropdown menu */}
                                    {activeMenu === item._id && (
                                        <div className="absolute right-0 top-8 bg-white border shadow-md rounded-md w-28 z-10">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-red-500"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">No expenses added yet</p>
                )}
            </div>
        </div>
    );
};

export default ViewExpense;