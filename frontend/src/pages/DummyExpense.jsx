

import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import QuickStats from "../component/QuickStats";
import ViewExpense from "../component/ViewExpense";

export default function DashboardDummy() {
    const navigate = useNavigate();
    const username = localStorage.getItem("username") || "User";


    return (
        <div>
            <Header />
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                            Welcome, {username}!
                        </h1>
                        <p className="text-gray-500">
                            Here’s a quick overview of your expenses
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/add-expense")}
                        className="mt-4 md:mt-0 bg-gray-800 hover:bg-gray-900 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition duration-300"
                    >
                        Add Expense
                    </button>
                </div>

                <QuickStats />
                <ViewExpense />
            </div>
        </div>
    );
}




