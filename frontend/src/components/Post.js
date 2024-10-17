import React from "react";

export default function Post({ name='Deleted User' }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-2">
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-gray-400">Public</p>
      <div className="bg-gray-700 h-48 my-4 rounded-lg"></div>
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <button className="bg-gray-700 p-2 rounded-lg">Like</button>
          <button className="bg-gray-700 p-2 rounded-lg">Comment</button>
          <button className="bg-gray-700 p-2 rounded-lg">Share</button>
        </div>
        <button className="bg-gray-700 p-2 rounded-lg">Give Stars</button>
      </div>
    </div>
  );
}
