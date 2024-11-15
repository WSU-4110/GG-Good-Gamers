import React from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

function TopRightSection({ setOpenModal, currentUser }) {
  const navigate = useNavigate();

  const handleMessagesClick = () => {
    navigate('/messages');
  };

  return (
    <div className="flex justify-end mb-4 space-x-6 items-center">
      {/* Notification Icon */}
      <i className="fas fa-bell text-3xl text-gray-400 hover:text-white cursor-pointer shake"></i>

      {/* Message Icon */}
      <IconButton onClick={handleMessagesClick} sx={{ color: 'rgb(156, 163, 175)' }}>
        <i className="fas fa-comments"></i>
      </IconButton>

      {/* + Button for creating a post */}
      <IconButton onClick={() => setOpenModal(true)} sx={{ color: 'rgb(156, 163, 175)' }}>
        <AddIcon fontSize="large" />
      </IconButton>

      {/* User Profile */}
      {currentUser ? (
        <img
          src={currentUser?.photoURL || 'https://via.placeholder.com/40'}
          alt="User Profile"
          className="rounded-full cursor-pointer"
          width="40px"
          onClick={() => navigate('/profile')}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default TopRightSection;
