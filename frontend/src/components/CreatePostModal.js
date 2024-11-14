import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AxiosInstance from "./Axios";
import { useAuth } from "../contexts/authContext";

const CreatePostModal = ({ open, onClose, userName, refetch }) => {
  const [newPostText, setNewPostText] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);
  const [newFile, setNewFile] = useState(null);
  const { currentUser } = useAuth();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPostImage(URL.createObjectURL(file));
      setNewFile(file);
    }
  };

  const handleCreatePost = () => {
   AxiosInstance.post('post/',{
      user_id: 1,
      userName: currentUser.displayName,
      postDescription: newPostText || null,
      postContent: newFile || null,
      // postID: 1,
      comments: null,
      likeCount: 0,
      userPfp: currentUser.photoURL
      })

    setNewPostText("");
    setNewPostImage(null);
    refetch();
    onClose();
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
