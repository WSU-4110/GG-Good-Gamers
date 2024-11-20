import React from 'react';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import '../App.css';
import usePostModule from './PostModule.js';

export default function Post({ name = "Deleted User", image, text, profilePicture }) {
  const {
    liked,
    favorited,
    commentVisible,
    setCommentVisible,
    comment,
    postedComments,
    handleLikeClick,
    handleFavoriteClick,
    handleCommentChange,
    handleSendComment,
  } = usePostModule();

  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-2">
      {/* Name and Profile Picture */}
      <div className="flex items-center mb-4">
        <img
          src={profilePicture || 'https://via.placeholder.com/40'}
          alt="Profile"
          className="rounded-full mr-4"
          width="40"
        />
        <h3 className="text-xl font-semibold">{name}</h3>
      </div>

      {/* Image with improved styling */}
      {image && (
        <div className="w-full h-72 bg-gray-700 rounded-lg overflow-hidden my-4">
          <img src={image} alt="Uploaded" className="w-full h-full object-contain" />
        </div>
      )}

      {/* Post Text with username before caption */}
      <div className="text-left mb-2">
        <p className="text-white">
          <span className="font-semibold mr-2">{name}</span> {text}
        </p>
      </div>

      {/* Icons (Like, Comment, Share, Bookmark) */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-4">
          <IconButton onClick={handleLikeClick} sx={{ color: liked ? '#9b5de5' : 'white' }}>
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton
            onClick={() => setCommentVisible(!commentVisible)}
            sx={{ color: 'white' }}
          >
            <CommentIcon />
          </IconButton>
          <IconButton sx={{ color: 'white' }}>
            <ShareIcon />
          </IconButton>
        </div>

        {/* Favorite Button aligned to the right */}
        <IconButton onClick={handleFavoriteClick} sx={{ color: favorited ? '#9b5de5' : 'white' }}>
          {favorited ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
      </div>

      {/* Comments Section */}
      {commentVisible && (
        <div className="mt-4">
          {postedComments.length > 0 && (
            <div className="mb-4">
              {postedComments.map((c, idx) => (
                <p key={idx} className="text-left text-white">
                  <span className="font-semibold">{c.name}</span> {c.text}
                </p>
              ))}
            </div>
          )}
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={comment}
              onChange={handleCommentChange}
              placeholder="Post a comment..."
              className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendComment(name);
                }
              }}
            />
            <IconButton onClick={() => handleSendComment(name)} sx={{ color: 'white' }}>
              <SendIcon />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
}
