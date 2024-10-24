import { doSignOut } from '../firebase/auth';
import CreatePostModal from '../components/CreatePostModal';
import Sidebar from '../components/Sidebar';
import TopRightSection from '../components/TopRightSection'; 
import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; // FontAwesome for icons
import "../App.css"; // Ensure global styles are included
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";
import Lsidebar from "../components/lsidebar";
import Rsidebar  from "../components/rsidebar";
import AxiosInstance from "../components/Axios";

function Home() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('home');
  const { currentUser, userLoggedIn } = useAuth();
  const [posts, setPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const onSignOut = (e) => {
    setActiveMenu('logout');
    e.preventDefault();
    if (userLoggedIn) {
      doSignOut();
    }
  };

  useEffect(() => {
    if (!userLoggedIn) {
      navigate('/');
    }
  }, [userLoggedIn, currentUser, navigate]);

  // Function to handle post creation
  const handleCreatePost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Left Sidebar */}
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} onSignOut={onSignOut} />

      {/* Main Content */}
      <main className="flex-1 p-8">
        {posts.map((post, index) => (
          <Post
            key={index}
            name={post.name}
            image={post.image}
            text={post.text}
            profilePicture={currentUser?.photoURL}
          />
        ))}
      </main>

      {/* Right Sidebar */}
      <aside className="w-1/4 bg-gray-900 p-4 min-h-screen space-y-8">
        {/* Top-right section */}
        <TopRightSection setOpenModal={setOpenModal} currentUser={currentUser} />

        {/* Suggested for You */}
        <div className="bg-gray-800 p-6 rounded-lg mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Suggested for You</h2>
            <i className="fas fa-ellipsis-h text-gray-400"></i>
          </div>
          <div className="space-y-4">
            {['Faraz Tariq', 'Tina Tzoo', 'MKBHD'].map((name) => (
              <div key={name} className="flex justify-between items-center bg-gray-700 p-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <img
                    src="https://via.placeholder.com/40"
                    alt={name}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-bold">{name}</p>
                    <p className="text-gray-400 text-sm">Super Active</p>
                  </div>
                </div>
                <button className="bg-purple-500 px-3 py-1 rounded-lg">Follow</button>
              </div>
            ))}
          </div>
        </div>

        {/* Live Chat */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Live Chat</h2>
            <button className="bg-gray-700 px-2 py-1 rounded-lg">Add Group</button>
          </div>
          <div className="space-y-4">
            {['BigDaddy', 'NoobPlayer69'].map((user) => (
              <div key={user} className="flex justify-between items-center bg-gray-700 p-2 rounded-lg">
                <div>{user}</div>
                <div>2h ago</div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Create Post Modal */}
      <CreatePostModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreatePost={handleCreatePost}
        userName={currentUser?.displayName || 'User'}
      />
    </div>
  );
}

export default Home;
