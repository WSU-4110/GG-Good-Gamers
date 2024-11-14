import React, { useState } from 'react';
import conversations from './conversations.json';
import Sidebar from '../components/Sidebar';
import TopRightSection from '../components/TopRightSection';
import { IconButton, TextField, Avatar, Badge } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PhotoIcon from '@mui/icons-material/Photo';
import SearchIcon from '@mui/icons-material/Search';
import PushPinIcon from '@mui/icons-material/PushPin';
import ChatIcon from '@mui/icons-material/Chat';
import StarIcon from '@mui/icons-material/Star';
const initialMessages = conversations.conversations; 


const individualContacts = Object.keys(conversations.conversations.individual).map((name, index) => ({
    id: index + 1,
    name,
    avatar: 'https://via.placeholder.com/40',
    lastMessage: conversations.conversations.individual[name].slice(-1)[0].content,
    isPinned: false,
    isOnline: Math.random() > 0.5
  }));
  
  const groupChats = Object.keys(conversations.conversations.group).map((name, index) => ({
    id: individualContacts.length + index + 1,
    name,
    avatar: 'https://via.placeholder.com/40',
    lastMessage: conversations.conversations.group[name].slice(-1)[0].content,
    isPinned: false,
    isOnline: true, // Set to true since it's a group chat
  }));
  
  const contacts = [...individualContacts, ...groupChats];
  

const Messages = () => {
  const [activeMenu, setActiveMenu] = useState('messages');
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [messages, setMessages] = useState(conversations.conversations.individual[selectedContact.name] || []);
  const [newMessage, setNewMessage] = useState('');
  const [pinnedContacts, setPinnedContacts] = useState(contacts.filter(contact => contact.isPinned));
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleContactChange = (contact) => {
    setSelectedContact(contact);
    if (contact.name in conversations.conversations.individual) {
      setMessages(conversations.conversations.individual[contact.name]);
    } else if (groupChats.some(group => group.name === contact.name)) {
      setMessages(conversations.conversations.group[contact.name]);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const updatedMessages = [...messages, { user: 'You', content: newMessage, timestamp: 'Now' }];
      setMessages(updatedMessages);
      setNewMessage('');
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedMessages = [
        ...messages,
        { user: 'You', content: `Sent a photo: ${file.name}`, timestamp: 'Now', isPhoto: true },
      ];
      setMessages(updatedMessages);
    }
  };

  const handlePinContact = (contact) => {
    contact.isPinned = !contact.isPinned;
    const updatedPinnedContacts = contacts.filter(c => c.isPinned);
    setPinnedContacts(updatedPinnedContacts);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = contacts.filter(contact =>
        contact.name.toLowerCase().includes(query.toLowerCase()) ||
        initialMessages[contact.id]?.some(msg => msg.content.toLowerCase().includes(query.toLowerCase()))
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* TopRightSection */}
        <div className="flex justify-end p-4">
          <TopRightSection setOpenModal={() => {}} />
        </div>

        {/* Messages Content */}
        <div className="flex-1 flex px-8 pb-8 space-x-4">
          {/* Contacts List with Search, Pinning, and Sections */}
          <aside className="w-1/4 p-4 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Messages</h2>
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
                      <SearchIcon sx={{ color: 'rgb(156, 163, 175)' }} />
                    </IconButton>
                  ),
                  className: 'bg-gray-700 text-white rounded-lg',
                }}
              />
            </div>

            {/* Pinned Contacts Section */}
            {/* Pinned Contacts Section */}
{pinnedContacts.length > 0 && (
  <div className="mb-4">
    <div className="flex items-center space-x-2 text-gray-300 text-md font-semibold mb-2">
      <StarIcon sx={{ color: 'rgb(156, 163, 175)' }} />
      <span>Pinned</span>
    </div>
    <ul className="space-y-4">
      {pinnedContacts.map((contact) => (
        <li
          key={contact.id}
          className={`p-4 rounded-lg cursor-pointer flex items-center space-x-3 ${
            selectedContact.id === contact.id ? 'bg-indigo-600 text-white' : 'bg-gray-700 hover:bg-gray-600'
          }`}
          onClick={() => handleContactChange(contact)}
        >
          <Badge
            overlap="circle"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            color="success"
            variant="dot"
            invisible={!contact.isOnline}
          >
            <Avatar src={contact.avatar} />
          </Badge>
          <div className="flex-1 text-left">
            <h3 className="text-lg font-semibold">{contact.name}</h3>
            <p className="text-gray-300 text-sm">{contact.lastMessage}</p>
          </div>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handlePinContact(contact);
            }}
          >
            <PushPinIcon sx={{ color: contact.isPinned ? 'red' : 'rgb(156, 163, 175)' }} />
          </IconButton>
        </li>
      ))}
    </ul>
  </div>
)}


            {/* All Messages Section */}
            <div className="mb-4">
              <div className="flex items-center space-x-2 text-gray-300 text-md font-semibold mb-2">
                <ChatIcon sx={{ color: 'rgb(156, 163, 175)' }} />
                <span>All Messages</span>
              </div>
              <ul className="space-y-4">
                {contacts
                  .filter((contact) => !contact.isPinned)
                  .map((contact) => (
                    <li
                      key={contact.id}
                      className={`p-4 rounded-lg cursor-pointer flex items-center space-x-3 ${
                        selectedContact.id === contact.id ? 'bg-indigo-600 text-white' : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                      onClick={() => handleContactChange(contact)}
                    >
                      <Badge
                        overlap="circle"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        color="success"
                        variant="dot"
                        invisible={!contact.isOnline}
                      >
                        <Avatar src={contact.avatar} />
                      </Badge>
                      <div className="flex-1 text-left">
                        <h3 className="text-lg font-semibold">{contact.name}</h3>
                        <p className="text-gray-300 text-sm">{contact.lastMessage}</p>
                      </div>
                      <IconButton onClick={(e) => { e.stopPropagation(); handlePinContact(contact); }}>
                        <PushPinIcon sx={{ color: 'rgb(156, 163, 175)' }} />
                      </IconButton>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>

          {/* Chat Window */}
          <main className="flex-1 flex flex-col bg-gray-700 rounded-lg">
            {/* Chat Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-600 bg-gray-800 rounded-t-lg">
              <Avatar src={selectedContact.avatar} />
              <h2 className="text-xl font-bold">{selectedContact.name}</h2>
            </div>

            {/* Messages Container with Independent Scroll */}
            <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-800"
  style={{ maxHeight: '70vh', overflowY: 'auto' }}>
  {messages.map((msg, index) => (
    <div key={index} className={`flex flex-col mb-4 ${msg.user === 'You' ? 'items-end' : 'items-start'}`}>
      <div className={`max-w-xs p-3 rounded-lg ${msg.user === 'You' ? 'bg-indigo-500 text-white' : 'bg-gray-600 text-gray-200'}`}>
        <p className="font-semibold text-sm text-left">{msg.user}</p> {/* User name */}
        <p className="text-left">{msg.content}</p> {/* Message content */}
      </div>
      <p className="text-xs mt-1 text-gray-300">{msg.timestamp}</p> {/* Timestamp positioned outside */}
    </div>
  ))}
</div>





            {/* Chat input section */}
            <div className="flex items-center p-4 border-t border-gray-600 bg-gray-800">
              <TextField
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                variant="outlined"
                fullWidth
                InputProps={{
                  className: 'bg-gray-700 text-white rounded-lg',
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <IconButton onClick={handleSendMessage}>
                <SendIcon sx={{ color: 'rgb(156, 163, 175)' }} />
              </IconButton>
              <IconButton component="label">
                <PhotoIcon sx={{ color: 'rgb(156, 163, 175)' }} />
                <input type="file" hidden onChange={handleFileUpload} />
              </IconButton>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Messages;
