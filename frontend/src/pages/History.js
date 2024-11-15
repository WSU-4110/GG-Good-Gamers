import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSignOutAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import Lsidebar from "../components/lsidebar";
import ViewedPostPost from "../components/ViewedPost"; // Child component
import { useAuth } from "../contexts/authContext";
import RighSideBar from "../components/RightSideBar";
import { useNavigate } from "react-router-dom"; // For navigation
import Sidebar from "../components/Sidebar";
import TopRightSection from "../components/TopRightSection";
import HistoryRidebar from "../components/RightSideBar";

function History() {
  const { currentUser } = useAuth();
  const navigate = useNavigate(); // Initialize navigation

  // Function to handle home icon click (navigates to the home page)
  const handleHomeClick = () => {
    navigate("/home");
  };

  // State to manage visibility of the ViewedPostPost components
  const [isPostVisible1, setIsPostVisible1] = useState(true); // For the first post
  const [isPostVisible2, setIsPostVisible2] = useState(true); // For the second post
  const [isPostVisible3, setIsPostVisible3] = useState(true); // For the third post
  const [isPostVisible4, setIsPostVisible4] = useState(true); // For the fourth post

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Left Sidebar */}
      <Sidebar activePage={'history'} />

      {/* Main Content Area */}
      <div className="flex-1 mr-64 ml-24"> {/* Adjust padding for sidebars */}
        <div className="fixed top-0 left-9 w-full bg-gray-800 z-20" style={{ marginLeft: '80px' }}> {/* Added left margin */}
          <div className="flex justify-between items-center h-24 text-white">
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
          </div>
        </div>

        <div className="pt-32"> {/* Padding to avoid overlap with fixed navbar */}
          <h1 className="font-bold text-5xl mb-4">Watch History</h1>

          {/* Conditionally render the posts based on their visibility */}
          {isPostVisible1 && (
            <ViewedPostPost
              name="Sample Video 1"
              videoUrl="path/to/video1.mp4"
              description="This is a sample description for video 1."
              onRemove={() => setIsPostVisible1(false)} // Hide this post when "Remove" is clicked
            />
          )}

          {isPostVisible2 && (
            <ViewedPostPost
              name="Sample Video 2"
              videoUrl="path/to/video2.mp4"
              description="This is a sample description for video 2."
              onRemove={() => setIsPostVisible2(false)} // Hide this post when "Remove" is clicked
            />
          )}

          {isPostVisible3 && (
            <ViewedPostPost
              name="Sample Video 3"
              videoUrl="path/to/video3.mp4"
              description="This is a sample description for video 3."
              onRemove={() => setIsPostVisible3(false)} // Hide this post when "Remove" is clicked
            />
          )}

          {isPostVisible4 && (
            <ViewedPostPost
              name="Sample Video 4"
              videoUrl="path/to/video4.mp4"
              description="This is a sample description for video 4."
              onRemove={() => setIsPostVisible4(false)} // Hide this post when "Remove" is clicked
            />
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="fixed right-0 top-0 h-full w-64 bg-gray-800 z-10">
        <HistoryRidebar UGI={currentUser} />
      </div>
    </div>
  );
}

export default History;