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
import usePostModule from './PostModule';
import { useNavigate } from 'react-router-dom';

export default function Post({ name = "Deleted User", image, text, profilePicture }) {
  const {
    // Indicates if the post has been liked by the user (Boolean)
    liked, 

    // Indicates if the post has been favorited (Boolean)
    favorited, 

    // Controls visibility of the comment section (Boolean)
    commentVisible, 

    // Function to toggle the visibility of the comment section
    setCommentVisible, 

    // Stores the current value of the comment input field (String)
    comment, 

    // Array of comments already posted on the post
    postedComments, 

    // Function to handle the "like" button click event
    handleLikeClick, 

    // Function to handle the "favorite" button click event
    handleFavoriteClick, 

    // Function to update the comment input field as the user types
    handleCommentChange, 

    // Function to submit a new comment when the user presses Enter or clicks send
    handleSendComment, 
  } = usePostModule();

  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-2">
      {/* Name and Profile Picture */}
      <div className="flex items-center mb-4" onClick={() => navigate(`/profile?username=${name}`)}>
        <img
          src={profilePicture || 'https://via.placeholder.com/40'}
          alt="Profile"
          className="cursor-pointer rounded-full mr-4"
          width="40"
        />
        <h3 className="cursor-pointer text-xl font-semibold">{name}</h3>
      </div>

      {/* Displays an image if one is provided */}
      {image && (
        <div className="w-full h-72 bg-gray-700 rounded-lg overflow-hidden my-4">
          <img src={image} alt="Uploaded" className="w-full h-full object-contain" />
        </div>
      )}

      {/* Displays the text content of the post */}
      <div className="text-left mb-2">
        <p className="text-white">
          <span className="font-semibold mr-2">{name}</span> {text}
        </p>
      </div>

      {/* Action buttons (like, comment, share, favorite) */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-4">
          {/* Like button: Toggles `liked` state */}
          <IconButton
            onClick={handleLikeClick}
            sx={{ color: liked ? '#9b5de5' : 'white' }}
            aria-label="like"
          >
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>

          {/* Comment button: Toggles `commentVisible` state */}
          <IconButton
            onClick={() => setCommentVisible(!commentVisible)}
            sx={{ color: 'white' }}
            aria-label="comment"
          >
            <CommentIcon />
          </IconButton>

          {/* Share button: Placeholder, no functionality yet */}
          <IconButton
            sx={{ color: 'white' }}
            aria-label="share"
          >
            <ShareIcon />
          </IconButton>
        </div>

        {/* Favorite button: Toggles `favorited` state */}
        <IconButton
          onClick={handleFavoriteClick}
          sx={{ color: favorited ? '#9b5de5' : 'white' }}
          aria-label="favorite"
        >
          {favorited ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
      </div>

      {/* Comment section */}
      {commentVisible && (
        <div className="mt-4">
          {/* List of existing comments */}
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
            {/* Input for typing a new comment */}
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
            {/* Button to send the comment */}
            <IconButton
              onClick={() => handleSendComment(name)}
              sx={{ color: 'white' }}
              aria-label="send comment"
            >
              <SendIcon />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
}
