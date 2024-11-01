import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSignOutAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Lsidebar from "../components/lsidebar";
import ViewedPostPost from "../components/ViewedPost";
import { useAuth } from "../contexts/authContext";
import RighSideBar from "../components/RightSideBar";
import { useNavigate } from "react-router-dom";

function History() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/home");
  };

  const initialPosts = [
    {
      id: 1,
      name: "Sample Video 1",
      videoUrl: "path/to/video1.mp4",
      description: "This is a sample description for video 1.",
    },
    {
      id: 2,
      name: "Sample Video 2",
      videoUrl: "path/to/video2.mp4",
      description: "This is a sample description for video 2.",
    },
    {
      id: 3,
      name: "Sample Video 3",
      videoUrl: "path/to/video3.mp4",
      description: "This is a sample description for video 3.",
    },
    {
      id: 4,
      name: "Sample Video 4",
      videoUrl: "path/to/video4.mp4",
      description: "This is a sample description for video 4.",
    },
  ];

  const [posts, setPosts] = useState(initialPosts);

  const handleRemovePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 z-10">
        <Lsidebar UGI={currentUser} />
      </div>

      <div className="flex-1 pl-64 pr-64">
        <div
          className="fixed top-0 left-0 w-full bg-gray-800 z-20"
          style={{ marginLeft: "80px" }}
        >
          <div className="flex justify-between items-center h-24 px-4 text-white">
            <div className="relative w-full flex-grow max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search watch history"
                className="w-full px-10 py-2 text-black rounded-lg focus:outline-none"
              />
              <span className="absolute left-3 top-2 text-gray-600">
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </div>
            <ul className="flex space-x-4 ml-16">
              <li
                className="flex items-center p-4 hover:text-[#00df9a] cursor-pointer"
                onClick={handleHomeClick}
              >
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Home
              </li>
              <li className="flex items-center p-4 hover:text-[#00df9a]">
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-32 p-5">
          <h1 className="font-bold text-5xl mb-4">Watch History</h1>

          {posts.map((post) => (
            <ViewedPostPost
              key={post.id}
              name={post.name}
              videoUrl={post.videoUrl}
              description={post.description}
              onRemove={() => handleRemovePost(post.id)}
            />
          ))}
        </div>
      </div>

      <div className="fixed right-0 top-0 h-full w-64 bg-gray-800 z-10">
        <RighSideBar UGI={currentUser} />
      </div>
    </div>
  );
}

export default History;
