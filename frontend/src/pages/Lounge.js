import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TopRightSection from '../components/TopRightSection';
import { useAuth } from '../contexts/authContext';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

// Mock Data
const communityData = [
  { id: 1, name: 'Valorant Strategies', description: 'Discuss all things Valorant here!' },
  { id: 2, name: 'Minecraft Builds', description: 'Share your favorite Minecraft builds and ideas.' },
  { id: 3, name: 'Apex Legends Squad', description: 'Find teammates and strategies for Apex Legends.' },
];

// Mock Chat Messages
const initialMessages = {
  1: [
    { user: 'Alice', content: 'Best agent for beginners?', timestamp: '2:00 PM' },
    { user: 'Bob', content: 'Definitely Phoenix!', timestamp: '2:01 PM' },
  ],
  2: [
    { user: 'Charlie', content: 'How do you make a hidden door with Redstone?', timestamp: '3:00 PM' },
  ],
  3: [
    { user: 'Eve', content: 'Who wants to squad up?', timestamp: '4:00 PM' },
  ],
};

function Lounge() {
  const { currentUser } = useAuth();
  const [activeMenu, setActiveMenu] = useState('lounge');
  const [communities] = useState(communityData);
  const [activeCommunity, setActiveCommunity] = useState(communities[0]);
  const [messages, setMessages] = useState(initialMessages[activeCommunity.id]);
  const [newMessage, setNewMessage] = useState('');

  // Handle switching communities
  const handleCommunityChange = (community) => {
    setActiveCommunity(community);
    setMessages(initialMessages[community.id] || []);
  };

  // Handle sending messages
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const updatedMessages = [
        ...messages,
        { user: currentUser.displayName || 'You', content: newMessage, timestamp: 'Now' },
      ];
      setMessages(updatedMessages);
      setNewMessage('');
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
          <TopRightSection setOpenModal={() => {}} currentUser={currentUser} />
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
                    activeCommunity.id === community.id ? 'bg-purple-500' : 'bg-gray-800 hover:bg-gray-700'
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
            <h2 className="text-2xl font-bold mb-4">{activeCommunity.name}</h2>

            {/* Chat Section */}
            <div className="flex-1 overflow-y-auto mb-4 bg-gray-700 p-4 rounded-lg">
              {messages.map((msg, index) => (
                <div key={index} className="mb-2">
                  <span className="font-bold">{msg.user}: </span>
                  <span>{msg.content}</span>
                  <span className="text-gray-400 text-sm ml-2">{msg.timestamp}</span>
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
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <IconButton
                onClick={handleSendMessage}
                sx={{ color: 'white', marginLeft: '8px' }}
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
