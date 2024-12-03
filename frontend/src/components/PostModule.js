import { useState } from 'react';
import { doc, 
  updateDoc, 
  arrayUnion,
  getDocs,
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
    // if (typeof likeCount !== 'number' || isNaN(likeCount)){
    //   console.error("Invalid likeCount: ", likeCount);
    //   return;
    // }
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

  const handleSendComment = async (postId, name) => { //put comment request here
    console.log(postId, name)
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
        setComment("");
        const fetchedComments = await fetchAllComments();
        setPostedComments( fetchedComments);
        console.log("Comment added successfully to Firestore");
      }
      catch(error){
        console.error("Error adding comment: ", error);
      }
    }
  };

  const fetchAllComments = async()=>{
    try{
      const postCollection = collection(db,"posts");
      const querySnapshot = await getDocs(postCollection);
      console.log("Total posts fetched:", querySnapshot.docs.length);

      
      const comments = querySnapshot.docs.map((doc)=>({
        id: doc.id,
        ...doc.data(),
      }));

      return comments;
    }
    catch(error){
      console.error("Error fetching comments: ", error);
      return [];
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
