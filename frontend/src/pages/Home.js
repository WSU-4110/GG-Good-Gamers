import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; 
import "../App.css"; 
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";
import CreatePostModal from "../components/CreatePostModal"; // Import the modal for creating posts
import { IconButton, Box, Modal } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function Home() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("home"); 
  const { currentUser, userLoggedIn } = useAuth();
  const [posts, setPosts] = useState([]); // State to hold posts
  const [openModal, setOpenModal] = useState(false); // Modal visibility state

  const onSignOut = (e) => {
    setActiveMenu("logout");
    e.preventDefault();
    if (userLoggedIn) {
      doSignOut();
    }
  };

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/");
    }
  }, [userLoggedIn, currentUser, navigate]);

  // Function to handle post creation
  const handleCreatePost = (newPost) => {
    setPosts([newPost, ...posts]); // Add new post to top of list
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Left Sidebar */}
      <aside className="w-24 bg-gray-800 min-h-screen p-4 relative flex flex-col items-center">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-green-500">GG</h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-6">
          <div
            className={`p-3 rounded-lg cursor-pointer flex justify-center items-center hover:bg-gray-700 transition-all ${
              activeMenu === "home" ? "bg-gray-700 text-purple-500" : "text-gray-400"
            }`}
            onClick={() => setActiveMenu("home")}
          >
            <i className="fas fa-home text-2xl transition-transform duration-300 transform hover:scale-125"></i>
          </div>
          <div
            className={`p-3 rounded-lg cursor-pointer flex justify-center items-center hover:bg-gray-700 transition-all ${
              activeMenu === "explore" ? "bg-gray-700 text-purple-500" : "text-gray-400"
            }`}
            onClick={() => setActiveMenu("explore")}
          >
            <i className="fas fa-search text-2xl transition-transform duration-300 transform hover:scale-125"></i>
          </div>
          <div
            className={`p-3 rounded-lg cursor-pointer flex justify-center items-center hover:bg-gray-700 transition-all ${
              activeMenu === "lounge" ? "bg-gray-700 text-purple-500" : "text-gray-400"
            }`}
            onClick={() => setActiveMenu("lounge")}
          >
            <i className="fas fa-couch text-2xl transition-transform duration-300 transform hover:scale-125"></i>
          </div>
          <div
            className={`p-3 rounded-lg cursor-pointer flex justify-center items-center hover:bg-gray-700 transition-all ${
              activeMenu === "friends" ? "bg-gray-700 text-purple-500" : "text-gray-400"
            }`}
            onClick={() => setActiveMenu("friends")}
          >
            <i className="fas fa-user-friends text-2xl transition-transform duration-300 transform hover:scale-125"></i>
          </div>
          <hr className="border-gray-600 my-4 w-full" />
          <div
            className={`p-3 rounded-lg cursor-pointer flex justify-center items-center hover:bg-gray-700 transition-all ${
              activeMenu === "settings" ? "bg-gray-700 text-purple-500" : "text-gray-400"
            }`}
            onClick={() => setActiveMenu("settings")}
          >
            <i className="fas fa-cog text-2xl transition-transform duration-300 transform hover:scale-125"></i>
          </div>
          <div
            className={`p-3 mt-auto rounded-lg cursor-pointer flex justify-center items-center hover:bg-gray-700 transition-all ${
              activeMenu === "logout" ? "bg-gray-700 text-purple-500" : "text-gray-400"
            }`}
            onClick={onSignOut}
          >
            <i className="fas fa-sign-out-alt text-2xl transition-transform duration-300 transform hover:scale-125"></i>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Display Posts */}
        {posts.map((post, index) => (
          <Post
            key={index}
            name={post.name}
            image={post.image}
            text={post.text}
            profilePicture={currentUser?.photoURL} // Pass profile picture
          />
        ))}
      </main>

      {/* Right Sidebar */}
      <aside className="w-1/4 bg-gray-900 p-4 min-h-screen space-y-8">
        {/* Top-right section */}
<div className="flex justify-end mb-4 space-x-6 items-center">
  {/* Notification Icon with shake effect */}
  <i className="fas fa-bell text-3xl text-gray-400 hover:text-white cursor-pointer shake"></i>

  {/* Message Icon */}
  <IconButton sx={{ color: "rgb(156, 163, 175)" }}> {/* Same color for all */}
    <i className="fas fa-comments"></i>
  </IconButton>

  {/* + Button for creating a post */}
  <IconButton 
    onClick={() => setOpenModal(true)} 
    sx={{ color: "rgb(156, 163, 175)" }} // Applies the same color as the other icons
  >
    <AddIcon fontSize="large" />
  </IconButton>

  {/* User Profile */}
  {currentUser ? (
    <img
      src={currentUser?.photoURL || "https://via.placeholder.com/40"}
      alt="User Profile"
      className="rounded-full cursor-pointer"
      width={"40px"}
    />
  ) : (
    <div>Loading...</div>
  )}
</div>



        {/* Suggested for You */}
        <div className="bg-gray-800 p-6 rounded-lg mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Suggested for You</h2>
            <i className="fas fa-ellipsis-h text-gray-400"></i>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-gray-700 p-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Faraz Tariq"
                  className="rounded-full"
                />
                <div>
                  <p className="font-bold">Faraz Tariq</p>
                  <p className="text-gray-400 text-sm">Super Active</p>
                </div>
              </div>
              <button className="bg-purple-500 px-3 py-1 rounded-lg">Follow</button>
            </div>
            <div className="flex justify-between items-center bg-gray-700 p-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Tina Tzoo"
                  className="rounded-full"
                />
                <div>
                  <p className="font-bold">Tina Tzoo</p>
                  <p className="text-gray-400 text-sm">Super Active</p>
                </div>
              </div>
              <button className="bg-purple-500 px-3 py-1 rounded-lg">Follow</button>
            </div>
            <div className="flex justify-between items-center bg-gray-700 p-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <img
                  src="https://via.placeholder.com/40"
                  alt="MKBHD"
                  className="rounded-full"
                />
                <div>
                  <p className="font-bold">MKBHD</p>
                  <p className="text-gray-400 text-sm">Super Active</p>
                </div>
              </div>
              <button className="bg-purple-500 px-3 py-1 rounded-lg">Follow</button>
            </div>
          </div>
        </div>

        {/* Live Chat */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Live Chat</h2>
            <button className="bg-gray-700 px-2 py-1 rounded-lg">Add Group</button>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-gray-700 p-2 rounded-lg">
              <div>BigDaddy</div>
              <div>2h ago</div>
            </div>
            <div className="flex justify-between items-center bg-gray-700 p-2 rounded-lg">
              <div>NoobPlayer69</div>
              <div>2h ago</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Create Post Modal */}
      <CreatePostModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreatePost={handleCreatePost}
        userName={currentUser?.displayName || "User"} // Pass user's name
      />
    </div>
  );
}

export default Home;
