// ViewedPostPost.js (Child Component)
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function ViewedPost({
  name = "Clip Title",
  videoUrl,
  description = "This is a placeholder description for the clip. It provides details about the content of the video.",
  dateTime = new Date().toLocaleString(),
  onRemove, // Accept onRemove prop from the parent component
}) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-2 mx-5 my-5">
      <h3 className="text-2xl font-bold mb-2">{name}</h3>
      <div className="flex my-4">
        <div className="bg-gray-700 h-64 w-96 rounded-lg overflow-hidden">
          <video
            className="w-full h-full object-cover"
            controls
            src={videoUrl}
            onError={(e) => {
              e.target.src = "path/to/placeholder/video.mp4"; // Fallback URL for broken video
            }}
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="ml-5 flex-1">
          <p className="text-gray-300" style={{ fontSize: "20px" }}>
            {description}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-300">{dateTime}</span>
        <button
          className="bg-gray-700 p-2 rounded-lg flex items-center"
          onClick={onRemove} // Trigger onRemove when clicked
        >
          <FontAwesomeIcon icon={faTimes} className="mr-2" />
          Remove
        </button>
      </div>
    </div>
  );
}
