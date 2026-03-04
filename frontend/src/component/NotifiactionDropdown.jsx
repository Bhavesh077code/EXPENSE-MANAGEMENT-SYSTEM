/*
import React, { useEffect, useState, useRef } from "react";
import { Bell } from "lucide-react";
import axios from "axios";

const NotificationDropdown = () => {
    const [openNotif, setOpenNotif] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const notifRef = useRef();

    // Fetch notifications
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return; // Token missing, skip fetch

                const res = await axios.get(
                    "http://localhost:3000/expense/notification",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setNotifications(res.data || []);
            } catch (err) {
                console.log("Notification fetch error:", err);
            }
        };

        fetchNotifications();
    }, []); // Empty dependency → run once on mount

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setOpenNotif(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
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
                    <h3 className="font-semibold p-3 border-b border-gray-200">
                        Notifications
                    </h3>
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
    );
};

export default NotificationDropdown;

*/


/*

import React, { useEffect, useState, useRef } from "react";
import { Bell, MoreHorizontal } from "lucide-react";
import axios from "axios";

const NotificationDropdown = () => {
  const [openNotif, setOpenNotif] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const notifRef = useRef();

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(
        "http://localhost:3000/expense/notification",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = res.data || [];
      setNotifications(data);

      // Count unread notifications
      const unread = data.filter((n) => !n.isRead).length;
      setUnreadCount(unread);
    } catch (err) {
      console.log("Notification fetch error:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setOpenNotif(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Delete single notification
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/expense/notification/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Remove from state
      setNotifications((prev) => prev.filter((n) => n._id !== id));
      setUnreadCount((prev) => prev - 1);
    } catch (err) {
      console.log("Delete notification error:", err);
    }
  };

  // Mark all as read when dropdown opens
  const handleOpen = () => {
    setOpenNotif(!openNotif);

    if (!openNotif && unreadCount > 0) {
      const markAsRead = async () => {
        try {
          const token = localStorage.getItem("token");
          await axios.put(
            "http://localhost:3000/expense/notification/mark-read",
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setUnreadCount(0);
        } catch (err) {
          console.log("Mark read error:", err);
        }
      };
      markAsRead();
    }
  };

  return (
    <div className="relative" ref={notifRef}>
      <button
        onClick={handleOpen}
        className="relative p-2 rounded-full hover:bg-gray-200 transition"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {openNotif && (
        <div className="absolute right-0 mt-2 w-80 bg-white text-gray-800 rounded-2xl shadow-lg border border-gray-200 overflow-hidden z-50">
          <h3 className="font-semibold p-3 border-b border-gray-200">
            Notifications
          </h3>
          <div className="max-h-60 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="p-3 text-gray-500">No notifications</p>
            ) : (
              notifications.map((note) => (
                <div
                  key={note._id}
                  className="flex justify-between items-start p-3 border-b border-gray-100 hover:bg-gray-100 transition"
                >
                  <div>
                    <p className="text-sm">{note.message}</p>
                    <span className="text-xs text-gray-400">
                      {new Date(note.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="p-1 text-gray-400 hover:text-red-500"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;


*/



import React, { useEffect, useState, useRef } from "react";
import { Bell, MoreHorizontal } from "lucide-react";
import axios from "axios";

const NotificationDropdown = () => {
  const [openNotif, setOpenNotif] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const notifRef = useRef();

  const [activeMenu, setActiveMenu] = useState(null); // track which menu is open

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(
        "http://localhost:3000/expense/notification",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = res.data || [];
      setNotifications(data);

      const unread = data.filter((n) => !n.isRead).length;
      setUnreadCount(unread);
    } catch (err) {
      console.log("Notification fetch error:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setOpenNotif(false);
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Delete notification
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:3000/expense/notification/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotifications((prev) => prev.filter((n) => n._id !== id));
      setUnreadCount((prev) => prev - 1);
      setActiveMenu(null); // close menu
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  // Open notifications → mark as read
  const handleOpen = () => {
    setOpenNotif(!openNotif);
    if (!openNotif && unreadCount > 0) {
      const markAsRead = async () => {
        try {
          const token = localStorage.getItem("token");
          await axios.put(
            "http://localhost:3000/expense/notification",
            { notificationId: id },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setUnreadCount(0);
        } catch (err) {
          console.log("Mark read error:", err);
        }
      };
      markAsRead();
    }
  };

  return (
    <div className="relative" ref={notifRef}>
      <button
        onClick={handleOpen}
        className="relative p-2 rounded-full hover:bg-gray-200 transition"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {openNotif && (
        <div className="absolute right-0 mt-2 w-80 bg-white text-gray-800 rounded-2xl shadow-lg border border-gray-200 overflow-hidden z-50">
          <h3 className="font-semibold p-3 border-b border-gray-200">
            Notifications
          </h3>
          <div className="max-h-60 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="p-3 text-gray-500">No notifications</p>
            ) : (
              notifications.map((note) => (
                <div
                  key={note._id}
                  className="flex justify-between items-start p-3 border-b border-gray-100 hover:bg-gray-100 transition relative"
                >
                  <div>
                    <p className="text-sm">{note.message}</p>
                    <span className="text-xs text-gray-400">
                      {new Date(note.createdAt).toLocaleString()}
                    </span>
                  </div>

                  {/* 3-dot menu */}
                  <div className="relative">
                    <button
                      onClick={() =>
                        setActiveMenu(activeMenu === note._id ? null : note._id)
                      }
                      className="p-1 text-gray-400 hover:text-gray-800"
                    >
                      <MoreHorizontal size={16} />
                    </button>

                    {activeMenu === note._id && (
                      <div className="absolute right-0 top-6 w-24 bg-white border border-gray-200 rounded-md shadow-md z-50">
                        <button
                          onClick={() => handleDelete(note._id)}
                          className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-gray-100"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div >
      )
      }
    </div >
  );
};

export default NotificationDropdown;

