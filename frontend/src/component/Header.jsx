

import React, { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import NotificationDropdown from "./NotifiactionDropdown";
import MonthlyLimitDropdown from "./MonthlyLimitDropdown";


const Header = () => {
  const [openProfile, setOpenProfile] = useState(false);

    const handleLogout = () => {
     
      localStorage.removeItem("token");

      
      navigate("/");
    };


    return (
      <header className="w-full bg-white shadow-sm px-8 py-4 flex justify-between items-center relative">

        {/* Left Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-green-500 text-white p-2 rounded-lg font-bold"></div>
          <h1 className="text-xl font-semibold text-gray-800">
            Expense Tracker
          </h1>
        </div>

        {/* Center Search */}
        <div className="relative w-1/3">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 relative">

         
          <NotificationDropdown />

       
          <MonthlyLimitDropdown />

       
          <div className="relative">
            <button
              onClick={() => setOpenProfile(!openProfile)}
              className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl hover:bg-gray-200 transition"
            >
              <img
                src="https://i.pravatar.cc/40"
                alt="profile"
                className="w-8 h-8 rounded-full"
              />
              <ChevronDown size={16} />
            </button>

            {openProfile && (
              <div className="absolute right-0 mt-3 w-44 bg-white shadow-lg rounded-xl border border-gray-100 overflow-hidden z-50">
                <button className="w-full text-left px-4 py-3 hover:bg-gray-100 transition">
                  <a href="/add-expense">Add Expense</a>
                </button>
                <button className="w-full text-left px-4 py-3 hover:bg-gray-100 transition">
                  <a href="/edit">Edit</a>
                </button>
                <button className="w-full text-left px-4 py-3 hover:bg-gray-100 transition">
                  Settings
                </button>
                <button 
                 onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 transition">
                  <a href="/">Logout</a>
                </button>
              </div>
            )}
          </div>

        </div>
      </header>
    );
  };

  export default Header;