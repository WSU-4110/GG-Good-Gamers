import React, { useState, useEffect } from "react";
import {
  collection,
  doc,
  updateDoc,
  arrayUnion,
  getDocs,
} from "firebase/firestore";
import db from "../firebase/firebase.js"; // Adjust the import based on your firebase setup

import Sidebar from "../components/Sidebar.js";
import TopRightSection from "../components/TopRightSection.js";
import { useAuth } from "../contexts/authContext/index.js";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { getUserDataByEmail } from "../hooks/hooks.js";

function Lounge() {
  const { currentUser } = useAuth();
  const [user, setUser] = useState();
  const [communities, setCommunities] = useState([]);
  const [activeCommunity, setActiveCommunity] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

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
  }, []);

  // Fetch communities from Firestore
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const communityCollectionRef = collection(db, "lounges");
        const snapshot = await getDocs(communityCollectionRef);
        const communityData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCommunities(communityData.sort((a, b) => a.order - b.order));
        if (communityData.length) setActiveCommunity(communityData[0]);
      } catch (error) {
        console.error("Error fetching communities: ", error);
      }
    };

    fetchCommunities();
  }, []);

  // Fetch messages of the active community
  useEffect(() => {
    if (activeCommunity) {
      setMessages(activeCommunity.messages || []);
    }
  }, [activeCommunity]);

  const handleCommunityChange = (community) => {
    setActiveCommunity(community);
    setMessages(community.messages || []);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const newMessageObject = {
        user: user.username,
        text: newMessage,
        timestamp: new Date().toISOString(),
      };

      try {
        // Update Firestore
        const communityDocRef = doc(db, "lounges", activeCommunity.id);
        await updateDoc(communityDocRef, {
          messages: arrayUnion(newMessageObject),
        });

        // Update local state
        setMessages((prevMessages) => [...prevMessages, newMessageObject]);
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar activePage={"lounge"} />

      {/* Main Content */}
      <div className="flex-1 ml-24 flex flex-col">
        {/* TopRightSection */}
        <div className="flex justify-end p-4">
          <TopRightSection />
        </div>

        {/* Community Content */}
        <div className="flex-1 flex px-8 pb-8">
          {/* Community List */}
          <aside className="w-1/4 p-4 bg-gray-800 rounded-lg mr-4">
            <h2 className="text-xl font-bold mb-4">Communities</h2>
            <ul className="space-y-4">
              {communities.map((community) => (
                <li
                  key={community.id}
                  className={`p-4 rounded-lg cursor-pointer ${
                    activeCommunity?.id === community.id
                      ? "bg-purple-500"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                  onClick={() => handleCommunityChange(community)}
                >
                  <h3 className="text-lg font-semibold">{community.name}</h3>
                  <p className="text-gray-400">{community.description}</p>
                </li>
              ))}
            </ul>
          </aside>

          {/* Chat and Threads */}
          <main className="flex-1 flex flex-col p-4 bg-gray-800 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">{activeCommunity?.name}</h2>

            {/* Chat Section */}
            <div className="flex-1 overflow-y-auto mb-4 bg-gray-700 p-4 rounded-lg">
              {messages.map((msg, index) => (
                <div key={index} className="mb-2">
                  <span className="font-bold">{msg.user}: </span>
                  <span>{msg.text}</span>
                  <span className="text-gray-400 text-sm ml-2">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="flex items-center p-2 bg-gray-800 rounded-lg">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow p-2 bg-gray-700 text-white rounded-lg focus:outline-none h-10"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <IconButton
                onClick={handleSendMessage}
                sx={{ color: "white", marginLeft: "8px" }}
              >
                <SendIcon />
              </IconButton>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Lounge;
