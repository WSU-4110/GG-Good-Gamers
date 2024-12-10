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
  Backdrop,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
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

    setPostUploading(true); // Start spinner
    return uploadBytes(imageRef, imageFile)
      .then(() => {
        alert("File Uploaded");
      })
      .catch((error) => {
        alert("Error uploading file:", error);
      });
  };

  const onCreatePost = async (mediaUuid) => {
    let fileType;
    let mediaType = "text";
    if (imageFile) {
      fileType = imageFile.type;
      mediaType = fileType.startsWith("image/") ? "image" : "video";
    }

    const usersCollection = collection(db, "users");
    const userQuery = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(userQuery);
    const userDoc = querySnapshot.docs[0];

    const collectionRef = collection(db, "posts");
    const userRef = doc(db, "users", userDoc.id);
    const payload = {
      userRef: userRef,
      text: newPostText,
      createdAt: new Date(),
      mediaId: mediaType !== "text" ? mediaUuid : null,
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

  const handleCreatePost = async () => {
    const mediaUuid = v4();
    try {
      await uploadImage(mediaUuid);
      await onCreatePost(mediaUuid)
        .then(() => {
          alert("Post Uploaded");
        })
        .catch((error) => {
          alert("Error uploading post:", error);
        });
      setNewPostText("");
      setNewPostImage(null);
      setRefetchPosts((refetchPosts) => !refetchPosts);
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setPostUploading(false); // Stop spinner
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        if (!postUploading) onClose();
      }}
    >
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
        <Backdrop
          sx={{
            borderRadius: "12px",
            color: "#fff",
            zIndex: (theme) => theme.zIndex.modal + 1,
          }}
          open={postUploading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

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
              color: "#f5f5f5",
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
          <Button
            variant="contained"
            component="label"
            sx={{
              backgroundColor: "#8a2be2",
              color: "#f5f5f5",
              borderRadius: "20px",
              py: 1.2,
              px: 3,
              "&:hover": { backgroundColor: "#7326b1" },
            }}
          >
            Upload File
            <input type="file" hidden onChange={handleImageChange} />
          </Button>

          <Button
            variant="contained"
            onClick={handleCreatePost}
            disabled={postUploading}
            sx={{
              backgroundColor: postUploading ? "#555" : "#8a2be2",
              color: "#fff",
              borderRadius: "20px",
              py: 1.2,
              px: 4,
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: postUploading ? "#555" : "#7326b1",
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
            <Card
              sx={{
                width: "100%",
                height: 400,
                backgroundColor: "black",
                borderRadius: 2,
                overflow: "hidden",
                my: 2,
              }}
            >
              <CardMedia
                component={
                  imageFile.type.startsWith("image/") ? "img" : "video"
                }
                image={newPostImage}
                controls={!imageFile.type.startsWith("image/")}
                alt="Uploaded"
                sx={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </Card>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default CreatePostModal;
