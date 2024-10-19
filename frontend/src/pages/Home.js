import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; // FontAwesome for icons
import "../App.css"; // Ensure global styles are included
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";
import Lsidebar from "../components/lsidebar";
import Rsidebar  from "../components/rsidebar";
function Home() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("home"); // State to manage active menu
  const { currentUser, userLoggedIn } = useAuth();

  useEffect(() => {
    console.log(currentUser);
    !userLoggedIn && navigate("/");
  }, [userLoggedIn]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Left Sidebar */}
      <Lsidebar UGI={userLoggedIn} />

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Content area */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-2">
            Check What Your Friends Up To!
          </h2>
          <p className="text-gray-400 mb-4">
            Conveniently customize proactive web services for leveraged
            aggregate content.
          </p>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="What's on your mind?"
              className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg">
              Create
            </button>
          </div>
        </div>

        {/* Post */}
        <Post name={"Abrar"} />
        <Post name={"Moe"} />
        <Post name={"Ali"} />
        <Post />
      </main>

      {/* Right Sidebar */}
      <Rsidebar  currentuser ={currentUser} />
    </div>
  );
}

export default Home;
