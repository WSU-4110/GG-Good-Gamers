import React, { useState } from "react";
import { doSignOut } from "../firebase/auth.js";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Lsidebar({ UGI }) {
  const onSignOut = (e) => {
    setActiveMenu("logout");
    e.preventDefault();
    if (UGI) {
      doSignOut();
    }
  };
  const navigate = useNavigate();
  const handleClockClick = () => {
    setActiveMenu("clock"); 
    navigate("/history"); 
};
  const [activeMenu, setActiveMenu] = useState("home"); // State to manage active menu
  return (
    <aside className="w-24 bg-gray-800 min-h-screen p-4 relative flex flex-col items-center">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-green-500">GG</h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-6">
        <div
          className={`p-3 rounded-lg cursor-pointer flex justify-center items-center hover:bg-gray-700 transition-all ${
            activeMenu === "home"
              ? "bg-gray-700 text-purple-500"
              : "text-gray-400"
          }`}
          onClick={() => setActiveMenu("home")}
        >
          <i className="fas fa-home text-2xl transition-transform duration-300 transform hover:scale-125"></i>
        </div>
        <div
          className={`p-3 rounded-lg cursor-pointer flex justify-center items-center hover:bg-gray-700 transition-all ${
            activeMenu === "explore"
              ? "bg-gray-700 text-purple-500"
              : "text-gray-400"
          }`}
          onClick={() => setActiveMenu("explore")}
        >
          <i className="fas fa-search text-2xl transition-transform duration-300 transform hover:scale-125"></i>
        </div>
        <div
          className={`p-3 rounded-lg cursor-pointer flex justify-center items-center hover:bg-gray-700 transition-all ${
            activeMenu === "lounge"
              ? "bg-gray-700 text-purple-500"
              : "text-gray-400"
          }`}
          onClick={() => setActiveMenu("lounge")}
        >
          <i className="fas fa-couch text-2xl transition-transform duration-300 transform hover:scale-125"></i>
        </div>
        <div
          className={`p-3 rounded-lg cursor-pointer flex justify-center items-center hover:bg-gray-700 transition-all ${
            activeMenu === "friends"
              ? "bg-gray-700 text-purple-500"
              : "text-gray-400"
          }`}
          onClick={() => setActiveMenu("friends")}
        >
          <i className="fas fa-user-friends text-2xl transition-transform duration-300 transform hover:scale-125"></i>
        </div>
        <div
          className={`p-3 rounded-lg cursor-pointer flex justify-center items-center hover:bg-gray-700 transition-all ${
            activeMenu === "clock"
              ? "bg-gray-700 text-purple-500"
              : "text-gray-400"
          }`}
          onClick={handleClockClick}
        >
          <i className="fas fa-clock text-2xl transition-transform duration-300 transform hover:scale-125"></i>
        </div>

        <hr className="border-gray-600 my-4 w-full" />
        <div
          className={`p-3 rounded-lg cursor-pointer flex justify-center items-center hover:bg-gray-700 transition-all ${
            activeMenu === "settings"
              ? "bg-gray-700 text-purple-500"
              : "text-gray-400"
          }`}
          onClick={() => setActiveMenu("settings")}
        >
          <i className="fas fa-cog text-2xl transition-transform duration-300 transform hover:scale-125"></i>
        </div>
        <div
          className={`p-3 mt-auto rounded-lg cursor-pointer flex justify-center items-center hover:bg-gray-700 transition-all ${
            activeMenu === "logout"
              ? "bg-gray-700 text-purple-500"
              : "text-gray-400"
          }`}
          onClick={onSignOut}
        >
          <i className="fas fa-sign-out-alt text-2xl transition-transform duration-300 transform hover:scale-125"></i>
        </div>
      </nav>
    </aside>
  );
}