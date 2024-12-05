import db, { storage } from "../firebase/firebase.js";
import CreatePostModal from "../components/CreatePostModal.js";
import Sidebar from "../components/Sidebar.js";
import TopRightSection from "../components/TopRightSection.js";
import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; // FontAwesome for icons
import "../App.css"; // Ensure global styles are included
import { useNavigate } from "react-router-dom";
import Post from "../components/Post.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "../contexts/authContext/index.js";
import { getDownloadURL, ref } from "firebase/storage";
import { getUserDataByEmail } from "../hooks/hooks.js";

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

          if (postData.mediaId) {
            try {
              const fileRef = ref(storage, `images/${postData.mediaId}`);
              const fileUrl = await getDownloadURL(fileRef);
              postData.mediaUrl = fileUrl;
            } catch (error) {
              console.error("Error fetching media URL:", error);
            }
          }

          return postData;
        })
      );
      setPosts(postsWithUsers.sort((a, b) => b.createdAt - a.createdAt));
    });
  }, [refetchPosts]);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

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
                mediaUrl={post?.mediaUrl}
                mediaType={post?.mediaType}
                comments={post?.comments}
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
        <TopRightSection setOpenModal={setOpenModal} currentUser={user} />
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
