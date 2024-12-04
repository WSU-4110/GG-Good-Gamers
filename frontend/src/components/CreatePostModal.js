import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import db from "../firebase/firebase";
import { storage } from "../firebase/firebase";
import { ref, uploadBytes } from "firebase/storage"
import { v4 } from 'uuid';

const CreatePostModal = ({ open, onClose, email, setRefetchPosts }) => {
  const [newPostText, setNewPostText] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const uploadImage = (imageUuid) => {
    if (imageFile == null) return;
    const imageRef = ref(storage, `images/${imageUuid}`);
    uploadBytes(imageRef, imageFile).then(() => {
      alert("Image Uploaded")
    })
  }

  const onCreatePost = async (imageUuid) => {
    // const docRef = doc(db, "posts", id);
    // const payload = {
    //   userRef: `user/${'mohue'}`,
    //   text: newPostText
    // }
    // await setDoc(docRef, payload);

    const usersCollection = collection(db, "users"); //user db
    const userQuery = query(usersCollection, where("email", "==", email)); //asks
    const querySnapshot = await getDocs(userQuery); //returns array of all user info
    const userDoc = querySnapshot.docs[0];  //pulls first user by email

    const collectionRef = collection(db, "posts");
    const userRef = doc(db, "users", userDoc.id);
    const payload = { 
      userRef: userRef,
      text: newPostText,
      createdAt: new Date(),
      imageId: imageUuid,
      likeCount: 0,
      comments:[],
    };
    await addDoc(collectionRef, payload);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPostImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleCreatePost = () => {
    const imageUuid = v4();
    uploadImage(imageUuid);
    onCreatePost(imageUuid);
    setNewPostText("");
    setNewPostImage(null);
    onClose();
    setRefetchPosts(refetchPosts => !refetchPosts)
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#252526",
          boxShadow: 24,
          p: 3,
          width: 500,
          borderRadius: "12px",
          textAlign: "center",
          color: "#f5f5f5",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", flexGrow: 1 }}>
            Create a Post
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon sx={{ color: "#f5f5f5" }} />
          </IconButton>
        </div>

        {/* Text Field */}
        <TextField
          fullWidth
          multiline
          placeholder="What's on your mind?"
          variant="outlined"
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
          sx={{
            mt: 2,
            mb: 2,
            bgcolor: "#333",
            borderRadius: "8px",
            input: {
              color: "#f5f5f5", // Change text color to white
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#555" },
              "&:hover fieldset": { borderColor: "#777" },
              "&.Mui-focused fieldset": { borderColor: "#8a2be2" },
            },
          }}
        />

        {/* Buttons Container */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          {/* Upload Image Button */}
          <Button
            variant="contained"
            component="label"
            sx={{
              backgroundColor: "#8a2be2", // Purple color
              color: "#f5f5f5",
              borderRadius: "20px",
              py: 1.2,
              px: 3,
              "&:hover": {
                backgroundColor: "#7326b1", // Darker purple on hover
              },
            }}
          >
            Upload Image
            <input type="file" hidden onChange={handleImageChange} />
          </Button>

          {/* Post Button */}
          <Button
            variant="contained"
            onClick={handleCreatePost}
            sx={{
              backgroundColor: "#8a2be2", // Purple color
              color: "#fff",
              borderRadius: "20px",
              py: 1.2,
              px: 4,
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#7326b1", // Darker purple on hover
              },
            }}
          >
            Post
          </Button>
        </div>

        {/* Image Preview */}
        {newPostImage && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor: "#333",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <img
              src={newPostImage}
              alt="Preview"
              style={{
                borderRadius: "8px",
                maxWidth: "100%",
                maxHeight: "200px",
              }}
            />
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default CreatePostModal;
