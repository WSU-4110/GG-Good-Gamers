import { useState } from 'react';
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import db from "../firebase/firebase";
import { IconButton, Typography } from "@mui/material";
import React from "react";
import { useAuth } from '../contexts/authContext';
import { getUserDataByEmail } from '../hooks/hooks';



const usePostModule = () => {
  const { currentUser } = useAuth();
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [commentVisible, setCommentVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [postedComments, setPostedComments] = useState([]);

  const handleLikeClick = async(postId, currentLikeCount) => {
    const newLikeCount = liked ? currentLikeCount - 1 : currentLikeCount + 1;
    setLiked((prev) => !prev);
    //display likeCount and increment db
    try{
      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, {likeCount : newLikeCount});
    } 
    catch(error){
      console.error("Error updating like count: ", error);
    }
  };

  const handleFavoriteClick = () => {
    setFavorited((prev) => !prev);
  };

  const handleCommentChange = (e) => { //LOOK HERE
    setComment(e.target.value);
  };

  const handleSendComment = async (postId, name) => { //put comment request here
    if (comment) {
      try{
        const user = await getUserDataByEmail(currentUser.email);
        const postRef = doc(db,"posts", postId);
        await updateDoc(postRef, {
          comments: arrayUnion({
            username: user.username,
            text: comment,
            createdAt: new Date(),
          }),
        });
        setPostedComments([...postedComments, { name, text: comment }]);
        setComment("");
        console.log("Comment added successfully to Firestore");
      }
      catch(error){
        console.error("Error adding comment: ", error);
      }
    }
  };

  return {
    liked, //booloean value to check if you have liked already.
    favorited,
    commentVisible,
    setCommentVisible,
    comment,
    postedComments,
    handleLikeClick,
    handleFavoriteClick,
    handleCommentChange,
    handleSendComment,
  };
};

export default usePostModule;
