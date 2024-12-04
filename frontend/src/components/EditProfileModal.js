import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "../firebase/firebase";
import { storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const EditProfileModal = ({ open, onClose, email, refetch }) => {
  const [newPfpImage, setNewPfpImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const uploadImage = async (imageUuid) => {
    if (imageFile == null) return;
    const imageRef = ref(storage, `images/${imageUuid}`);
    await uploadBytes(imageRef, imageFile);
    const imageUrl = await getDownloadURL(imageRef);
    await onEditPfp(imageUrl);
    refetch().then(() => {
      alert("Image Uploaded");
    });
  };

  const onEditPfp = async (imageUrl) => {
    try {
      const usersCollection = collection(db, "users");
      const userQuery = query(usersCollection, where("email", "==", email));
      const querySnapshot = await getDocs(userQuery);

      if (querySnapshot.empty) {
        throw new Error("No user found with the given email.");
      }

      const userDoc = querySnapshot.docs[0];
      const userDocRef = doc(db, "users", userDoc.id);

      await updateDoc(userDocRef, { pfpURL: imageUrl });

      console.log("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error updating profile picture:", error);
      throw error;
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPfpImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleCreatePost = () => {
    const imageUuid = v4();
    uploadImage(imageUuid);
    setNewPfpImage(null);
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
          <Typography
            variant="h6"
            sx={{ mb: 4, fontWeight: "bold", flexGrow: 1 }}
          >
            Update your Profile Picture
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon sx={{ color: "#f5f5f5" }} />
          </IconButton>
        </div>

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
            Apply
          </Button>
        </div>

        {/* Image Preview */}
        {newPfpImage && (
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
              src={newPfpImage}
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

export default EditProfileModal;
