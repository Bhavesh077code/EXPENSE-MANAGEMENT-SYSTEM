/*
import React, { useState } from "react";
import { Bell, ChevronDown, Search } from "lucide-react";
import Notification from "./Notification";


const Header = () => {
  const [open, setOpen] = useState(false);



  return (
    <header className="w-full bg-white shadow-sm px-8 py-4 flex justify-between items-center">

   
      <div className="flex items-center gap-2">
        <div className="bg-green-500 text-white p-2 rounded-lg font-bold">

        </div>
        <h1 className="text-xl font-semibold text-gray-800">
          Expense Tracker
        </h1>
      </div>

 
      <div className="relative w-1/3">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      
      <div className="flex items-center gap-6 relative">

        
        <div className="relative cursor-pointer">
          <button
            className="relative p-2 rounded-full hover:bg-gray-700 transition"
          >
            <Bell size={24} />
          </button>

        </div>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl hover:bg-gray-200 transition"
          >
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
            <ChevronDown size={16} />
          </button>


         
          {open && (
            <div className="absolute right-0 mt-3 w-44 bg-white shadow-lg rounded-xl border border-gray-100 overflow-hidden">
              <button className="w-full text-left px-4 py-3 hover:bg-gray-100 transition">
                <a href="/add-expense">AddExpense</a>
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-gray-100 transition">
                <a href="/dashboard">Dashboard</a>
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-gray-100 transition">
                <a href="/edit">Edit</a>
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-gray-100 transition">
                <a href="/limit">RateLimit</a>
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-gray-100 transition">
                <a href="/get-expense">Expanse</a>
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-gray-100 transition">
                Settings
              </button>
              <button className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 transition">
                <a href="/">LogOut</a>
              </button>
            </div>
          )}
        </div>

      </div>

    </header>
  );
};

export default Header;

*/

/*
import React, { useState, useEffect, useRef } from "react";
import { Bell, ChevronDown, Search } from "lucide-react";
import axios from "axios";

const Header = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notifRef = useRef();

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/expense/notification",
          { withCredentials: true }
        );
        setNotifications(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotifications();
  }, []);

  // Close notification dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setOpenNotif(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white shadow-sm px-8 py-4 flex justify-between items-center relative">

      // Left Logo 
      <div className="flex items-center gap-2">
        <div className="bg-green-500 text-white p-2 rounded-lg font-bold"></div>
        <h1 className="text-xl font-semibold text-gray-800">Expense Tracker</h1>
      </div>

      // Center Search 
      <div className="relative w-1/3">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      // Right Section 
      <div className="flex items-center gap-6 relative">

        // Notification 
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setOpenNotif(!openNotif)}
            className="relative p-2 rounded-full hover:bg-gray-200 transition"
          >
            <Bell size={24} />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {notifications.length}
              </span>
            )}
          </button>

          // Notification Dropdown 
          {openNotif && (
            <div className="absolute right-0 mt-2 w-80 bg-white text-gray-800 rounded-2xl shadow-lg border border-gray-200 overflow-hidden z-50">
              <h3 className="font-semibold p-3 border-b border-gray-200">Notifications</h3>
              <div className="max-h-60 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="p-3 text-gray-500">No notifications</p>
                ) : (
                  notifications.map((note) => (
                    <div
                      key={note._id}
                      className="p-3 border-b border-gray-100 hover:bg-gray-100 transition"
                    >
                      <p className="text-sm">{note.message}</p>
                      <span className="text-xs text-gray-400">
                        {new Date(note.createdAt).toLocaleString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        // Profile Button
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

          // Profile Dropdown
          {openProfile && (
            <div className="absolute right-0 mt-3 w-44 bg-white shadow-lg rounded-xl border border-gray-100 overflow-hidden z-50">
              <button className="w-full text-left px-4 py-3 hover:bg-gray-100 transition">
                <a href="/add-expense">Add Expense</a>
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-gray-100 transition">
                <a href="/dashboard">Dashboard</a>
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-gray-100 transition">
                Settings
              </button>
              <button className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 transition">
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

*/

{/*
import React, { useState, useEffect, useRef } from "react";
import { Bell, ChevronDown, Search, DollarSign } from "lucide-react";
import axios from "axios";

const Header = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const [openLimit, setOpenLimit] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [monthlyLimit, setMonthlyLimit] = useState("");
  const notifRef = useRef();
  const limitRef = useRef();

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/expense/notification",
          { withCredentials: true }
        );
        setNotifications(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotifications();
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setOpenNotif(false);
      }
      if (limitRef.current && !limitRef.current.contains(event.target)) {
        setOpenLimit(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle save monthly limit
  const handleSaveLimit = () => {
    console.log("New Monthly Limit:", monthlyLimit);
    setOpenLimit(false);
    // Optional: send to backend via axios.post(...)
  };

  return (
    <header className="w-full bg-white shadow-sm px-8 py-4 flex justify-between items-center relative">

      // Left Logo 
      <div className="flex items-center gap-2">
        <div className="bg-green-500 text-white p-2 rounded-lg font-bold"></div>
        <h1 className="text-xl font-semibold text-gray-800">Expense Tracker</h1>
      </div>

      //Center Search 
      <div className="relative w-1/3">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      
      <div className="flex items-center gap-4 relative">

        // Notification 
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setOpenNotif(!openNotif)}
            className="relative p-2 rounded-full hover:bg-gray-200 transition"
          >
            <Bell size={24} />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {notifications.length}
              </span>
            )}
          </button>

         
          {openNotif && (
            <div className="absolute right-0 mt-2 w-80 bg-white text-gray-800 rounded-2xl shadow-lg border border-gray-200 overflow-hidden z-50">
              <h3 className="font-semibold p-3 border-b border-gray-200">Notifications</h3>
              <div className="max-h-60 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="p-3 text-gray-500">No notifications</p>
                ) : (
                  notifications.map((note) => (
                    <div
                      key={note._id}
                      className="p-3 border-b border-gray-100 hover:bg-gray-100 transition"
                    >
                      <p className="text-sm">{note.message}</p>
                      <span className="text-xs text-gray-400">
                        {new Date(note.createdAt).toLocaleString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

       
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
                <a href="/dashboard">Dashboard</a>
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-gray-100 transition">
                Settings
              </button>
              <button className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 transition">
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

*/}

import React, { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import NotificationDropdown from "./NotifiactionDropdown";
import MonthlyLimitDropdown from "./MonthlyLimitDropdown";


const Header = () => {
  const [openProfile, setOpenProfile] = useState(false);

    const handleLogout = () => {
      // 1. Token delete karo
      localStorage.removeItem("token");

      // 2. Redirect karo
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

          {/* ✅ Separate Notification Component */}
          <NotificationDropdown />

          {/* ✅ Separate Monthly Limit Component */}
          <MonthlyLimitDropdown />

          {/* Profile Button */}
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