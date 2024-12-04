import db, { storage } from "../firebase/firebase";
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
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "../contexts/authContext";
import { getDownloadURL, ref } from "firebase/storage";
import { getUserDataByEmail } from "../hooks/hooks";

function Home() {
  const navigate = useNavigate();
  const { currentUser, userLoggedIn } = useAuth();

  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [refetchPosts, setRefetchPosts] = useState(false);

  useEffect(() => {
    // Fetch current user data
    const fetchUserData = async () => {
      try {
        const userData = await getUserDataByEmail(currentUser.email);
        setUser(userData); // Set user state with the retrieved data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData(); // Call the async function

    // Fetch posts
    onSnapshot(collection(db, "posts"), async (snapshot) => {
      const postsWithUsers = await Promise.all(
        snapshot.docs.map(async (docSnapshot) => {
          let postData = docSnapshot.data();
          postData.id = docSnapshot.id;

          if (postData.userRef) {
            try {
              const userDoc = await getDoc(postData.userRef);
              if (userDoc.exists()) {
                postData.user = userDoc.data();
              }
            } catch (error) {
              console.error("Error fetching user data:", error);
            }
          }

          if (postData.imageId) {
            try {
              const imageRef = ref(storage, `images/${postData.imageId}`);
              postData.imageUrl = await getDownloadURL(imageRef);
            } catch (error) {
              console.error("Error fetching image URL:", error);
            }         
          }

          return postData;
        })
      );
      setPosts(postsWithUsers.sort((a, b) => b.createdAt - a.createdAt));
    });
  }, [refetchPosts]);



  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Left Sidebar */}
      <Sidebar activePage={"home"} />

      {/* Main Content */}
      <main className="flex-1 ml-24 p-8">
        {posts.length !== 0 &&
          posts.map((post, index) => (
            <>
              <Post
                key={index}
                name={post?.user?.username && post.user.username}
                image={post?.imageUrl}
                comments = {post?.comments}
                text={post?.text}
                profilePicture={post?.user?.pfpURL && post?.user?.pfpURL}
                postId={post?.id}
              />
            </>
          ))}
      </main>

      {/* Right Sidebar */}
      <aside className="w-1/4 bg-gray-900 p-4 min-h-screen space-y-8">
        {/* Top-right section */}
        <TopRightSection
          setOpenModal={setOpenModal}
          currentUser={user}
        />

        {/* Suggested for You */}
        <div className="bg-gray-800 p-6 rounded-lg mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Suggested for You</h2>
            <i className="fas fa-ellipsis-h text-gray-400"></i>
          </div>
          <div className="space-y-4">
            {["Faraz Tariq", "Tina Tzoo", "MKBHD"].map((name) => (
              <div
                key={name}
                className="flex justify-between items-center bg-gray-700 p-2 rounded-lg"
              >
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
                <button className="bg-purple-500 px-3 py-1 rounded-lg">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Live Chat */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Live Chat</h2>
            <button className="bg-gray-700 px-2 py-1 rounded-lg">
              Add Group
            </button>
          </div>
          <div className="space-y-4">
            {["BigDaddy", "NoobPlayer69"].map((user) => (
              <div
                key={user}
                className="flex justify-between items-center bg-gray-700 p-2 rounded-lg"
              >
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
        email={currentUser?.email || null}
        setRefetchPosts={setRefetchPosts}
      />
    </div>
  );
}

export default Home;
