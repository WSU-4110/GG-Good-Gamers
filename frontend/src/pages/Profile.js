import Sidebar from "../components/Sidebar.js";
import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; // FontAwesome for icons
import "../App.css"; // Ensure global styles are included
import { useAuth } from "../contexts/authContext/index.js";
import { useSearchParams } from "react-router-dom";
import { getUserDataByEmail, getUserDataByUsername, getPostsByUsername } from "../hooks/hooks.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../App.css";
import { Grid2, Stack } from "@mui/material";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/firebase.js";
import EditProfileModal from "../components/EditProfileModal.js";

function Profile() {
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");

  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      let user;
      if (username) {
        user = await getUserDataByUsername(username);
      } else {
        user = await getUserDataByEmail(currentUser.email);
      }
      setUserData(user);
      const postsData = await getPostsByUsername(user.username);
      for (const post of postsData) {
        if (post.imageId) {
          const imageRef = ref(storage, `images/${post.imageId}`);
          post.imageUrl = await getDownloadURL(imageRef);
        }
      }
      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
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
            <div className="mt-4 ml-8">
              <img
                src={userData?.pfpURL || "https://via.placeholder.com/150"}
                alt="Profile"
                className="ml-3 w-20 h-20 rounded-full"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold">{userData?.username}</h2>
                {currentUser?.email === userData?.email && (
                  <button onClick={() => setOpenModal(true)} className="mt-4 bg-purple-500 px-4 py-2 rounded-lg">
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Following and Followers Section */}
            <div className="mt-4 flex space-x-8 mr-8">
              {/* <div className="text-center">
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
              </div> */}
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
            {posts?.map((post, index) => (
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
                    {post?.imageUrl ? (
                      <img
                        src={post.imageUrl}
                        alt="Uploaded"
                        className="object-fill"
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
        <EditProfileModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          email={currentUser?.email}
          refetch={fetchUserData}
        />
      </main>
    </div>
  );
}

export default Profile;
