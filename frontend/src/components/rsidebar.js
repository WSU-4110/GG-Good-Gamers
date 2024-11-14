import React from "react";

export default function Rsidebar ({ currentuser }){
    return(
        <aside className="w-1/4 bg-gray-900 p-4 min-h-screen space-y-8">
        {/* Top-right section (on top of Suggested for You) */}
        <div className="flex justify-end mb-4 space-x-6">
          {" "}
          {/* Top-right section */}
          {/* Notification Icon with shake effect on hover */}
          <i className="fas fa-bell text-3xl text-gray-400 hover:text-white cursor-pointer shake"></i>
          {/* Messages Icon */}
          <i className="fas fa-comments text-3xl text-gray-400 hover:text-white cursor-pointer"></i>
          {/* Profile Icon */}
          <div className="flex flex-col items-center justify-center">
            <img
              referrerPolicy="no-referrer"
              src={currentuser?.photoURL || "https://via.placeholder.com/40"}
              alt="User Profile"
              className="rounded-full cursor-pointer"
              width={"40px"}
            />
            <p className="mt-2">{currentuser?.displayName}</p>
          </div>
        </div>

        {/* Suggested for You */}
        <div className="bg-gray-800 p-6 rounded-lg mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Suggested for You</h2>
            <i className="fas fa-ellipsis-h text-gray-400"></i>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-gray-700 p-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Faraz Tariq"
                  className="rounded-full"
                />
                <div>
                  <p className="font-bold">Faraz Tariq</p>
                  <p className="text-gray-400 text-sm">Super Active</p>
                </div>
              </div>
              <button className="bg-purple-500 px-3 py-1 rounded-lg">
                Follow
              </button>
            </div>
            <div className="flex justify-between items-center bg-gray-700 p-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Tina Tzoo"
                  className="rounded-full"
                />
                <div>
                  <p className="font-bold">Tina Tzoo</p>
                  <p className="text-gray-400 text-sm">Super Active</p>
                </div>
              </div>
              <button className="bg-purple-500 px-3 py-1 rounded-lg">
                Follow
              </button>
            </div>
            <div className="flex justify-between items-center bg-gray-700 p-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <img
                  src="https://via.placeholder.com/40"
                  alt="MKBHD"
                  className="rounded-full"
                />
                <div>
                  <p className="font-bold">MKBHD</p>
                  <p className="text-gray-400 text-sm">Super Active</p>
                </div>
              </div>
              <button className="bg-purple-500 px-3 py-1 rounded-lg">
                Follow
              </button>
            </div>
          </div>
        </div>

        {/* Live Chat */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Live Chat</h2>
            <button className="bg-gray-700 px-2 py-1 rounded-lg">
              Add Group
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-gray-700 p-2 rounded-lg">
              <div>BigDaddy</div>
              <div>2h ago</div>
            </div>
            <div className="flex justify-between items-center bg-gray-700 p-2 rounded-lg">
              <div>NoobPlayer69</div>
              <div>2h ago</div>
            </div>
          </div>
        </div>
      </aside>
    );

}