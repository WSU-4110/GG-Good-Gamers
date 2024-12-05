import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import db from "../firebase/firebase";
import Sidebar from "../components/Sidebar";
import TopRightSection from "../components/TopRightSection";
import { IconButton, TextField, Avatar, Badge } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";

const Messages = () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const [currentUsername, setCurrentUsername] = useState(null);

  const [users, setUsers] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null); // Selected user for the conversation
  const [messages, setMessages] = useState([]); // Messages for the selected conversation
  const [newMessage, setNewMessage] = useState(""); // New message input
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const [searchResults, setSearchResults] = useState([]); // Filtered users

  // Fetch the current user's username from Firestore
  useEffect(() => {
    const fetchUsername = async () => {
      if (currentUser) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", currentUser.email)); // Assuming email is unique
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const user = snapshot.docs[0]?.data();
          if (user) {
            setCurrentUsername(user.username);
          }
        });
        return unsubscribe;
      }
    };
    fetchUsername();
  }, [currentUser]);

  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      const usersRef = collection(db, "users");
      const unsubscribe = onSnapshot(usersRef, (snapshot) => {
        const fetchedUsers = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((user) => user.username !== currentUsername); // Exclude current user by username
        setUsers(fetchedUsers);
      });
      return unsubscribe;
    };
    fetchUsers();
  }, [currentUsername]);

  // Fetch messages for the selected contact
  useEffect(() => {
    if (currentUsername && selectedContact) {
      const messagesRef = collection(db, "Messages");
      const q = query(
        messagesRef,
        where("sendingUser", "in", [currentUsername, selectedContact.username]),
        where("receivingUser", "in", [currentUsername, selectedContact.username]),
        orderBy("timestamp", "asc")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => doc.data());
        setMessages(fetchedMessages);
      });

      return unsubscribe;
    }
  }, [currentUsername, selectedContact]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedContact) {
      try {
        await addDoc(collection(db, "Messages"), {
          message: newMessage,
          sendingUser: currentUsername,
          receivingUser: selectedContact.username,
          timestamp: serverTimestamp(),
        });
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  // Handle search input
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = users.filter((user) =>
        user.username?.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-24 flex-1 flex flex-col">
        <div className="flex justify-end p-4">
          <TopRightSection />
        </div>

        <div className="flex-1 flex px-8 pb-8 space-x-4">
          {/* Contacts List */}
          <aside className="w-1/4 p-4 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Contacts</h2>
            <div className="mb-4">
              <TextField
                placeholder="Search Users"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <IconButton>
                      <SearchIcon sx={{ color: "rgb(156, 163, 175)" }} />
                    </IconButton>
                  ),
                  className: "bg-gray-700 text-white rounded-lg",
                }}
              />
            </div>

            <ul className="space-y-4">
              {(searchResults.length > 0 ? searchResults : users).map((user) => (
                <li
                  key={user.id}
                  className={`p-4 rounded-lg cursor-pointer flex items-center space-x-3 ${
                    selectedContact?.id === user.id
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  onClick={() => setSelectedContact(user)}
                >
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    color="success"
                    variant="dot"
                  >
                    <Avatar src={user.avatar || "https://via.placeholder.com/40"} />
                  </Badge>
                  <div className="flex-1 text-left">
                    <h3 className="text-lg font-semibold">{user.username}</h3>
                    <p className="text-gray-300 text-sm">{user.email}</p>
                  </div>
                </li>
              ))}
            </ul>
          </aside>

          {/* Chat Window */}
          <main className="flex-1 flex flex-col bg-gray-700 rounded-lg">
            {selectedContact ? (
              <>
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-600 bg-gray-800 rounded-t-lg">
                  <Avatar src={selectedContact.avatar || "https://via.placeholder.com/40"} />
                  <h2 className="text-xl font-bold">{selectedContact.username}</h2>
                </div>

                <div
                  className="flex-1 overflow-y-auto px-6 py-4 bg-gray-800"
                  style={{ maxHeight: "70vh", overflowY: "auto" }}
                >
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex flex-col mb-4 ${
                        msg.sendingUser === currentUsername ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs p-3 rounded-lg ${
                          msg.sendingUser === currentUsername
                            ? "bg-indigo-500 text-white"
                            : "bg-gray-600 text-gray-200"
                        }`}
                      >
                        <p className="text-left">{msg.message}</p>
                      </div>
                      <p className="text-xs mt-1 text-gray-300">
                        {msg.timestamp?.toDate().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center p-4 border-t border-gray-600 bg-gray-800">
                  <TextField
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      className: "bg-gray-700 text-white rounded-lg",
                    }}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <IconButton onClick={handleSendMessage}>
                    <SendIcon sx={{ color: "rgb(156, 163, 175)" }} />
                  </IconButton>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center flex-1 text-gray-400">
                Select a contact to start chatting
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Messages;
