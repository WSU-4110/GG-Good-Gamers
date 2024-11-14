import CreatePostModal from "../components/CreatePostModal";
import Sidebar from "../components/Sidebar";
import TopRightSection from "../components/TopRightSection";
import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; // FontAwesome for icons
import "../App.css"; // Ensure global styles are included
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";
import AxiosInstance from "../components/Axios";
import { Box, Grid, Grid2, Paper, Stack, Typography } from "@mui/material";

function Profile() {
  const navigate = useNavigate();
  const { currentUser, userLoggedIn } = useAuth();
  const [posts, setPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setPosts([
      {
        userName: "mohue",
        postContent: null,
        postDescription: "Post description",
        userPfp: currentUser?.photoURL,
        image:
          "https://hard-drive.net/wp-content/uploads/2023/03/unleashed-daytime.jpg.webp",
      },
      {
        userName: "mohue",
        postContent: null,
        postDescription: "Post description",
        userPfp: currentUser?.photoURL,
      },
      {
        userName: "mohue",
        postContent: null,
        postDescription: "Post description",
        userPfp: currentUser?.photoURL,
        image: 'https://i.redd.it/qnj736563m151.jpg'
      },
      {
        userName: "mohue",
        postContent: null,
        postDescription: "Post description",
        userPfp: currentUser?.photoURL,
        image: 'https://www.godisageek.com/wp-content/uploads/SMG2-001.jpg'
      },
      {
        userName: "mohue",
        postContent: null,
        postDescription: "Post description",
        userPfp: currentUser?.photoURL,
        image: 'https://i.ytimg.com/vi/RRuBCBMLuQI/maxresdefault.jpg'
      },
      {
        userName: "mohue",
        postContent: null,
        postDescription: "Post description",
        userPfp: currentUser?.photoURL,
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Left Sidebar */}
      <Sidebar activePage={"profile"} />

      {/* Main Content */}
      <main className="flex-1 ml-24 p-8">
        {/* Profile Header */}
        {currentUser && (
          <div className="bg-gray-800 p-6 rounded-lg mb-8 flex justify-between">
            <div className="ml-8">
              <img
                src={currentUser.photoURL || "https://via.placeholder.com/150"}
                alt="Profile"
                className="ml-3 w-20 h-20 rounded-full"
              />
              <h2 className="mt-3 text-l ">
                {currentUser.displayName || "Name"}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold">{"mohue03"}</h2>
                <p className="text-gray-400">{"User bio goes here."}</p>
                <button className="mt-4 bg-purple-500 px-4 py-2 rounded-lg">
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Following and Followers Section */}
            <div className="mt-4 flex space-x-8 mr-8">
              <div className="text-center">
                <p className="font-semibold text-lg">
                  {currentUser.following?.length || 0}
                </p>
                <p className="text-gray-400">Following</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-lg">
                  {currentUser.followers?.length || 0}
                </p>
                <p className="text-gray-400">Followers</p>
              </div>
            </div>
          </div>
        )}

        {/* User's Posts */}
        <div>
          <h2 className="text-xl font-bold my-12">My Posts</h2>
          <Grid2
            mx={"12rem"}
            justifyContent={"center"}
            width={"full"}
            container
            spacing={2}
          >
            {posts.map((post, index) => (
              <Grid2
                item
                xs={4}
                key={index}
                sx={{ width: "32%", height: "300px" }}
              >
                <Stack
                  width={"100%"}
                  height={"100%"}
                  className={"bg-gray-800 rounded-lg"}
                >
                  <div className="flex items-center justify-center w-full h-72 bg-gray-400 rounded-lg overflow-hidden my-4 hover:cursor-pointer hover:scale-105 transition duration-300 ease-in-out">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt="Uploaded"
                        className="w-full h-full object-fill"
                      />
                    ) : (
                      <img
                        src={
                          "https://static-00.iconduck.com/assets.00/messages-2-icon-512x512-7jyh5yz9.png"
                        }
                        alt="Uploaded"
                        className="object-contain"
                        width={"30%"}
                      />
                    )}
                  </div>
                </Stack>
              </Grid2>
            ))}
          </Grid2>
        </div>
      </main>
    </div>
  );
}

export default Profile;