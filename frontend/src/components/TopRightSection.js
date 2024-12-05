import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext/index.js";
import { getUserDataByEmail } from "../hooks/hooks.js";

function TopRightSection({ setOpenModal }) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [user, setUser] = useState();

  const fetchUserData = async () => {
    try {
      const userData = await getUserDataByEmail(currentUser.email);
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleMessagesClick = () => {
    navigate("/messages");
  };

  return (
    <div className="flex justify-end mb-4 space-x-6 items-center">
      {/* Notification Icon
      <i className="fas fa-bell text-3xl text-gray-400 hover:text-white cursor-pointer shake"></i> */}

      {/* Message Icon */}
      <IconButton
        onClick={handleMessagesClick}
        sx={{ color: "rgb(156, 163, 175)" }}
      >
        <i className="fas fa-comments"></i>
      </IconButton>

      {/* + Button for creating a post */}
      {setOpenModal && (
        <IconButton
          onClick={() => setOpenModal(true)}
          sx={{ color: "rgb(156, 163, 175)" }}
        >
          <AddIcon fontSize="large" />
        </IconButton>
      )}

      {/* User Profile */}
      {user ? (
        <img
          src={user?.pfpURL || "https://via.placeholder.com/40"}
          alt="User Profile"
          className="rounded-full cursor-pointer"
          width="40px"
          onClick={() => navigate("/profile")}
        />
      ) : (
        <div>...</div>
      )}
    </div>
  );
}

export default TopRightSection;
