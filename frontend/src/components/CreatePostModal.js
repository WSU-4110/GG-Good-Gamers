import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  IconButton,
  Typography,
  CardMedia,
  Card,
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
import db from "../firebase/firebase.js";
import { storage } from "../firebase/firebase.js";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const CreatePostModal = ({ open, onClose, email, setRefetchPosts }) => {
  const [newPostText, setNewPostText] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);
  const [postUploading, setPostUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const uploadImage = (mediaUuid) => {
    if (imageFile == null) return;
    const imageRef = ref(storage, `images/${mediaUuid}`);

    setPostUploading(true);
    uploadBytes(imageRef, imageFile)
      .then(() => {
        alert("Image Uploaded");
        setPostUploading(false);
      })
      .catch((error) => {
        alert("Error uploading image:", error);
        setPostUploading(false);
      });
  };

  const onCreatePost = async (mediaUuid) => {
    if (!imageFile) return;

    const fileType = imageFile.type;
    const mediaType = fileType.startsWith("image/") ? "image" : "video";

    const usersCollection = collection(db, "users"); //user db
    const userQuery = query(usersCollection, where("email", "==", email)); //asks
    const querySnapshot = await getDocs(userQuery); //returns array of all user info
    const userDoc = querySnapshot.docs[0]; //pulls first user by email

    const collectionRef = collection(db, "posts");
    const userRef = doc(db, "users", userDoc.id);
    const payload = {
      userRef: userRef,
      text: newPostText,
      createdAt: new Date(),
      mediaId: mediaUuid,
      mediaType,
      likeCount: 0,
      comments: [],
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
    const mediaUuid = v4();
    uploadImage(mediaUuid);
    onCreatePost(mediaUuid);
    setNewPostText("");
    setNewPostImage(null);
    onClose();
    setRefetchPosts((refetchPosts) => !refetchPosts);
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
            {imageFile.type.startsWith("image/") ? (
              <Card
                sx={{
                  width: "100%",
                  height: 400,
                  backgroundColor: "gray",
                  borderRadius: 2,
                  overflow: "hidden",
                  my: 2,
                }}
              >
                <CardMedia
                  component="img"
                  image={newPostImage}
                  alt="Uploaded"
                  sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </Card>
            ) : (
              <Card
                sx={{
                  width: "100%",
                  height: 400,
                  backgroundColor: "gray",
                  borderRadius: 2,
                  overflow: "hidden",
                  my: 2,
                }}
              >
                <CardMedia
                  component="video"
                  src={newPostImage}
                  controls
                  sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </Card>
            )}
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default CreatePostModal;
