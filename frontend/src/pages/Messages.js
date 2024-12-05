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
import db from "../firebase/firebase.js";
import Sidebar from "../components/Sidebar.js";
import TopRightSection from "../components/TopRightSection.js";
import { IconButton, TextField, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import SendIcon from "@mui/icons-material/Send";
import { getDocs, doc, updateDoc } from "firebase/firestore";
import { Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  Button,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

const Messages = () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const [currentUsername, setCurrentUsername] = useState(null);

  const [contacts, setContacts] = useState([]); // List of contacts
  const [pinnedContacts, setPinnedContacts] = useState([]); // List of pinned contacts
  const [selectedContact, setSelectedContact] = useState(null); // Selected user for the conversation
  const [messages, setMessages] = useState([]); // Messages for the selected conversation
  const [newMessage, setNewMessage] = useState(""); // New message input
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const [filteredContacts, setFilteredContacts] = useState([]); // Filtered contacts based on search
  const [contactsData, setContactsData] = useState([]);

  const [modalOpen, setModalOpen] = useState(false); // Modal state
  const [globalSearchResults, setGlobalSearchResults] = useState([]); // Results from the global user search

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  // Search for users on the platform
  const handleGlobalSearch = async (queryText) => {
    if (queryText.trim()) {
      const usersRef = collection(db, "users");
      const q = query(
        usersRef,
        where("username", ">=", queryText),
        where("username", "<=", queryText + "\uf8ff")
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const results = snapshot.docs.map((doc) => doc.data().username);
        setGlobalSearchResults(results);
      });
      return unsubscribe;
    } else {
      setGlobalSearchResults([]);
    }
  };

  // Add a new contact from the global search
  const addNewContact = (username) => {
    if (!contacts.includes(username)) {
      setContacts([...contacts, username]);
      setFilteredContacts([...contacts, username]); // Update filtered contacts
    }
    handleCloseModal();
  };

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  // Fetch user details for contacts
  useEffect(() => {
    const fetchContactsData = async () => {
      if (contacts.length > 0) {
        try {
          const usersRef = collection(db, "users");
          // Query users whose usernames are in the contacts array
          const q = query(usersRef, where("username", "in", contacts));
          const snapshot = await getDocs(q);

          // Map through the snapshot to extract user data
          const usersData = snapshot.docs.map((doc) => ({
            id: doc.id, // Document ID
            ...doc.data(), // Other user data
          }));

          setContactsData(usersData); // Store the fetched data in the state
        } catch (error) {
          console.error("Error fetching contacts data:", error);
        }
      } else {
        setContactsData([]); // Clear contacts data if no contacts
      }
    };

    fetchContactsData();
  }, [contacts]); // Run whenever `contacts` changes

  // Fetch the current user's username from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("email", "==", currentUser.email));

          const unsubscribe = onSnapshot(q, (snapshot) => {
            if (!snapshot.empty) {
              const user = snapshot.docs[0]?.data();
              if (user) {
                setCurrentUsername(user.username);
                setPinnedContacts(user.pinnedChats || []); // Fetch pinned chats
              }
            } else {
              console.error("No user data found.");
            }
          });

          return unsubscribe;
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  // Fetch contacts (people who the current user has messaged)
  useEffect(() => {
    if (currentUsername) {
      const messagesRef = collection(db, "Messages");
      const q = query(messagesRef, where("sendingUser", "==", currentUsername));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedContacts = [];
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          if (!fetchedContacts.includes(data.receivingUser)) {
            fetchedContacts.push(data.receivingUser);
          }
        });
        setContacts(fetchedContacts);
        setFilteredContacts(fetchedContacts); // Default filtered is the same as contacts
      });
      return unsubscribe;
    }
  }, [currentUsername]);

  // Fetch messages for the selected contact
  useEffect(() => {
    if (currentUsername && selectedContact) {
      const messagesRef = collection(db, "Messages");
      const q = query(
        messagesRef,
        where("sendingUser", "in", [currentUsername, selectedContact]),
        where("receivingUser", "in", [currentUsername, selectedContact]),
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
          receivingUser: selectedContact,
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
      const results = contacts.filter((contact) =>
        contact.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredContacts(results);
    } else {
      setFilteredContacts(contacts);
    }
  };

  // Handle pinning/unpinning contacts
  const togglePin = async (contact) => {
    const usersRef = collection(db, "users");
    const userDoc = query(usersRef, where("email", "==", currentUser.email));
    const snapshot = await getDocs(userDoc);

    if (!snapshot.empty) {
      const userId = snapshot.docs[0].id;
      const userRef = doc(db, "users", userId);

      if (pinnedContacts.includes(contact)) {
        // Unpin the contact
        const updatedPins = pinnedContacts.filter((c) => c !== contact);
        setPinnedContacts(updatedPins);
        await updateDoc(userRef, { pinnedChats: updatedPins });
      } else {
        // Pin the contact
        const updatedPins = [...pinnedContacts, contact];
        setPinnedContacts(updatedPins);
        await updateDoc(userRef, { pinnedChats: updatedPins });
      }
    }
  };

  // Handle deleting a contact
  const deleteContact = async (contact) => {
    try {
      // Fetch the user's document to update pinnedChats
      const usersRef = collection(db, "users");
      const userDocQuery = query(
        usersRef,
        where("email", "==", currentUser.email)
      );
      const userSnapshot = await getDocs(userDocQuery);

      if (!userSnapshot.empty) {
        const userId = userSnapshot.docs[0].id;
        const userRef = doc(db, "users", userId);

        // Remove the contact from pinnedChats in Firestore
        const updatedPins = pinnedContacts.filter((c) => c !== contact);
        await updateDoc(userRef, { pinnedChats: updatedPins });

        // Update pinnedChats state
        setPinnedContacts(updatedPins);
      }

      // Delete all messages involving this contact in Firestore
      const messagesRef = collection(db, "Messages");
      const q = query(
        messagesRef,
        where("sendingUser", "in", [currentUsername, contact]),
        where("receivingUser", "in", [currentUsername, contact])
      );
      const messageSnapshot = await getDocs(q);

      if (!messageSnapshot.empty) {
        const batch = db.batch();
        messageSnapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();
      }

      // Remove the contact from local state
      setContacts((prevContacts) => prevContacts.filter((c) => c !== contact));
      setFilteredContacts((prevFiltered) =>
        prevFiltered.filter((c) => c !== contact)
      );

      // Clear the selected contact if it's the deleted one
      if (selectedContact === contact) {
        setSelectedContact(null);
      }

      console.log(`Deleted conversation with ${contact}`);
    } catch (error) {
      console.error("Error deleting contact:", error);
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Messages</h2>
              <IconButton onClick={handleOpenModal}>
                <SearchIcon sx={{ color: "white" }} />
              </IconButton>
            </div>

            <div className="mb-4">
              <TextField
                placeholder="Search"
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

            {/* Pinned Contacts */}
            {/* Pinned Contacts */}
            {pinnedContacts.length > 0 && (
              <div className="mb-4">
                <h3 className="flex items-center text-sm font-bold text-gray-400 mb-2">
                  <span className="mr-2">
                    <i className="fas fa-star"></i>
                  </span>
                  <span>Pinned</span>
                </h3>
                <ul className="space-y-4">
                  {pinnedContacts.map((contact) => (
                    <li
                      key={contact}
                      className={`p-4 rounded-lg flex items-center justify-between ${
                        selectedContact === contact
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-700 hover:bg-gray-600"
                      }`}
                      onClick={() => setSelectedContact(contact)}
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar src="https://via.placeholder.com/40" />
                        <span className="text-left">{contact}</span>
                      </div>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePin(contact);
                        }}
                      >
                        <PushPinIcon sx={{ color: "red" }} />
                      </IconButton>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* All Messages */}
            <div>
              <h3 className="flex items-center text-sm font-bold text-gray-400 mb-2">
                <span className="mr-2">
                  <i className="fas fa-envelope"></i>
                </span>
                <span>All Messages</span>
              </h3>
              <ul className="space-y-4">
                {contactsData.map((contact) => (
                  <li
                    key={contact.id}
                    className={`p-4 rounded-lg flex items-center justify-between ${
                      selectedContact === contact.username
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                    onClick={() => setSelectedContact(contact.username)}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar
                        src={contact.pfpURL || "https://via.placeholder.com/40"}
                      />
                      <span className="text-left">{contact.username}</span>
                    </div>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePin(contact.username);
                      }}
                    >
                      <PushPinOutlinedIcon sx={{ color: "gray" }} />
                    </IconButton>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Chat Window */}
          <main className="flex-1 flex flex-col bg-gray-700 rounded-lg">
            {selectedContact ? (
              <>
                {/* Chat Header */}
                {/* Chat Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-600 bg-gray-800 rounded-t-lg">
                  <Avatar
                    src={
                      contactsData.filter(
                        (data) => data.username === selectedContact
                      )[0].pfpURL
                    }
                  />
                  <h2 className="text-xl font-bold">{selectedContact}</h2>
                  {/* <IconButton
    onClick={handleMenuOpen}
    aria-label="more options"
    aria-controls="menu"
    aria-haspopup="true"
  >
    <MoreVertIcon />
  </IconButton> */}
                  <Menu
                    id="menu"
                    anchorEl={menuAnchorEl}
                    open={Boolean(menuAnchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure you want to delete the conversation with ${selectedContact}?`
                          )
                        ) {
                          deleteContact(selectedContact);
                        }
                        handleMenuClose();
                      }}
                      style={{ color: "red" }}
                    >
                      Delete Conversation
                    </MenuItem>
                  </Menu>
                </div>

                {/* Messages List */}
                <div
                  className="flex-1 overflow-y-auto px-6 py-4 bg-gray-800"
                  style={{ maxHeight: "70vh", overflowY: "auto" }}
                >
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex flex-col mb-4 ${
                        msg.sendingUser === currentUsername
                          ? "items-end"
                          : "items-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs p-3 rounded-lg ${
                          msg.sendingUser === currentUsername
                            ? "bg-indigo-500 text-white"
                            : "bg-gray-600 text-gray-200"
                        }`}
                        style={{
                          maxWidth: "75%",
                          wordWrap: "break-word",
                          wordBreak: "break-word",
                          overflowWrap: "break-word",
                        }}
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

                {/* Message Input */}
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
                Select a friend to start chatting
              </div>
            )}
          </main>
        </div>
        {/* Add Search Modal */}
        <Dialog
          open={modalOpen}
          onClose={handleCloseModal}
          PaperProps={{
            style: {
              backgroundColor: "#1f2937", // Dark gray background
              color: "white", // White text
              borderRadius: "10px",
            },
          }}
        >
          <DialogTitle
            style={{ textAlign: "center", fontWeight: "bold", color: "white" }}
          >
            Add a Friend
          </DialogTitle>
          <DialogContent>
            <TextField
              placeholder="Search Users"
              fullWidth
              onChange={(e) => handleGlobalSearch(e.target.value)}
              InputProps={{
                style: {
                  backgroundColor: "#374151", // Slightly lighter gray
                  color: "white", // White text
                  borderRadius: "5px",
                },
              }}
            />
            <List>
              {globalSearchResults.map((user) => (
                <ListItem
                  key={user}
                  style={{
                    backgroundColor: "#374151", // Match list item to dark theme
                    borderRadius: "5px",
                    marginBottom: "8px",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: "#6b7280" }} />{" "}
                    {/* Match avatar to theme */}
                  </ListItemAvatar>
                  <ListItemText
                    primary={user}
                    style={{
                      color: "white",
                    }}
                  />
                  <Button
                    onClick={() => addNewContact(user)}
                    style={{
                      color: "white",
                      backgroundColor: "#4f46e5", // Purple button
                      textTransform: "none",
                      borderRadius: "5px",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#3b82f6")
                    } // Blue hover
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#4f46e5")
                    } // Revert hover
                  >
                    Add
                  </Button>
                </ListItem>
              ))}
            </List>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Messages;
