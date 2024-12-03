import { useState } from 'react';
import { doc, 
  updateDoc, 
  arrayUnion,
  getDoc,
  collection } from "firebase/firestore";
import db from "../firebase/firebase";
import { IconButton, 
  Typography } from "@mui/material";
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
  //const [posts, setPosts] = useState([]);
  const [likeCount, setLikeCount] = useState(0);


  const handleLikeClick = async(postId, likeCount) => {
    try{
      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, {likeCount});
      console.log("Successfully updated likeCount: ", likeCount);
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

  const handleSendComment = async (postId, senderName) => { //put comment request here
    if (comment.trim()) {
      try{
        const user = await getUserDataByEmail(currentUser.email);
        const postRef = doc(db,"posts", postId);
        const newComment = {
          username: user.username,
          text : comment,
          createdAt: new Date().toISOString(),
        };
        await updateDoc(postRef, {comments: arrayUnion({newComment}),
        });
        setComment("");
        fetchAllComments(postId);
        console.log("Comment added successfully to Firestore");
      }
      catch(error){
        console.error("Error adding comment: ", error);
      }
    }
  };

  const fetchAllComments = async(postId)=>{
    try{
      const commentRef = doc(db,"posts", postId);
      const commentSnap = await getDoc(commentRef);
      if(commentSnap.exists()){
        const commentData = commentSnap.data();
        setPostedComments(commentData.comments || []);
        console.log("Comments fetched successfully");
      }
      else{
        console.error("Post not found");
      }
    }
    catch(error){
      console.error("Error fetching comments: ", error);
    }
  };

  return {
    liked, //booloean value to check if you have liked already.
    setLiked,
    handleLikeClick,
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
