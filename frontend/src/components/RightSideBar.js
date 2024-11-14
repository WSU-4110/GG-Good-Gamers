import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPauseCircle } from "@fortawesome/free-solid-svg-icons";

export default function HistoryRidebar() {
  return (
    <div className="bg-gray-800 text-white p-6 w-96 space-y-4" style={{ marginTop: '25%', marginLeft: '1%' }}> {/* Increased width from w-80 to w-96 */}
      <button className="w-full bg-gray-700 p-3 rounded-lg text-left">
        <FontAwesomeIcon icon={faTrash} className="mr-2" />
        Clear all history
      </button>
      <button className="w-full bg-gray-700 p-3 rounded-lg text-left">
        <FontAwesomeIcon icon={faPauseCircle} className="mr-2" />
        Pause history
      </button>
    </div>
  );
}