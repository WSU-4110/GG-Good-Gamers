import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import '../App.css';

export default function Post({ name = "Deleted User", image, text, profilePicture }) {
  const [liked, setLiked] = useState(false); // State for like button
  const [favorited, setFavorited] = useState(false); // State for favorite button
  const [commentVisible, setCommentVisible] = useState(false); // State for comment visibility
  const [comment, setComment] = useState(""); // State for comment input
  const [postedComments, setPostedComments] = useState([]); // State for all posted comments

  const handleLikeClick = () => {
    setLiked((prev) => !prev); // Toggle liked state
  };

  const handleFavoriteClick = () => {
    setFavorited((prev) => !prev); // Toggle favorite state
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value); // Update comment input
  };

  const handleSendComment = () => {
    if (comment) {
      setPostedComments([...postedComments, { name, text: comment }]); // Add new comment to the list
      setComment(""); // Clear comment after sending
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-2">
      {/* Name and Profile Picture */}
      <div className="flex items-center mb-4">
        <img
          src={profilePicture || "https://via.placeholder.com/40"} // Use profile picture or placeholder
          alt="Profile"
          className="rounded-full mr-4"
          width={"40px"}
        />
        <h3 className="text-xl font-semibold">{name}</h3>
      </div>

      {/* Image */}
      {image && <img src={image} alt="Uploaded" className="my-4 rounded-lg" />}

      {/* Post Text with username before caption */}
      <div className="text-left mb-2">
        <p className="text-white">
          <span className="font-semibold mr-2">{name}</span> {text}
        </p>
      </div>

      {/* Icons (Like, Comment, Share, Bookmark) */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-4">
          <IconButton onClick={handleLikeClick} sx={{ color: liked ? "#9b5de5" : "white" }}>
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton onClick={() => setCommentVisible(!commentVisible)} sx={{ color: "white" }}>
            <CommentIcon />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <ShareIcon />
          </IconButton>
        </div>

        {/* Favorite Button aligned to the right */}
        <IconButton onClick={handleFavoriteClick} sx={{ color: favorited ? "#9b5de5" : "white" }}>
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
                if (e.key === "Enter") {
                  handleSendComment();
                }
              }}
            />
            <IconButton onClick={handleSendComment} sx={{ color: "white" }}>
              <SendIcon />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
}
