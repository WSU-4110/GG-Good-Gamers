import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { doSignOut } from '../firebase/auth';

function Sidebar({ activePage }) {
  const navigate = useNavigate();
  const { currentUser, userLoggedIn } = useAuth();
  const [activeMenu, setActiveMenu] = useState(activePage);

  const onSignOut = (e) => {
    setActiveMenu('logout');
    e.preventDefault();
    if (userLoggedIn) {
      doSignOut();
    }
  };

  useEffect(() => {
    if (!userLoggedIn) {
      navigate('/');
    }
  }, [userLoggedIn, currentUser, navigate]);

  return (
    <aside className="w-24 bg-gray-800 min-h-screen p-4 fixed flex flex-col items-center">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-green-500">GG</h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-6">
        <div
          className={`p-3 rounded-lg cursor-pointer flex justify-center items-center hover:bg-gray-700 transition-all ${
            activeMenu === 'home' ? 'bg-gray-700 text-purple-500' : 'text-gray-400'
          }`}
          onClick={() => {
            setActiveMenu('home');
            navigate('/home');
          }}
        >
          <i className="fas fa-home text-2xl transition-transform duration-300 transform hover:scale-125"></i>
        </div>

        <div
          className={`p-3 rounded-lg cursor-pointer flex justify-center items-center hover:bg-gray-700 transition-all ${
            activeMenu === 'explore' ? 'bg-gray-700 text-purple-500' : 'text-gray-400'
          }`}
          onClick={() => setActiveMenu('explore')}
        >
          <i className="fas fa-search text-2xl transition-transform duration-300 transform hover:scale-125"></i>
        </div>

        <div
          className={`p-3 rounded-lg cursor-pointer flex justify-center items-center hover:bg-gray-700 transition-all ${
            activeMenu === 'lounge' ? 'bg-gray-700 text-purple-500' : 'text-gray-400'
          }`}
          onClick={() => {
            setActiveMenu('lounge');
            navigate('/lounge'); // Navigate to the Lounge page
          }}
        >
          <i className="fas fa-couch text-2xl transition-transform duration-300 transform hover:scale-125"></i>
        </div>

        <div
          className={`p-3 rounded-lg cursor-pointer flex justify-center items-center hover:bg-gray-700 transition-all ${
            activeMenu === 'friends' ? 'bg-gray-700 text-purple-500' : 'text-gray-400'
          }`}
          onClick={() => setActiveMenu('friends')}
        >
          <i className="fas fa-user-friends text-2xl transition-transform duration-300 transform hover:scale-125"></i>
        </div>

        <div
          className={`p-3 rounded-lg cursor-pointer flex justify-center items-center hover:bg-gray-700 transition-all ${
            activeMenu === 'history' ? 'bg-gray-700 text-purple-500' : 'text-gray-400'
          }`}
          onClick={() => {
            setActiveMenu('history');
            navigate('/history');
          }}
        >
          <i className="fas fa-clock text-2xl transition-transform duration-300 transform hover:scale-125"></i>
        </div>

        <hr className="border-gray-600 my-4 w-full" />

        <div
          className={`p-3 rounded-lg cursor-pointer flex justify-center items-center hover:bg-gray-700 transition-all ${
            activeMenu === 'settings' ? 'bg-gray-700 text-purple-500' : 'text-gray-400'
          }`}
          onClick={() => setActiveMenu('settings')}
        >
          <i className="fas fa-cog text-2xl transition-transform duration-300 transform hover:scale-125"></i>
        </div>

        <div
          className={`p-3 mt-auto rounded-lg cursor-pointer flex justify-center items-center hover:bg-gray-700 transition-all ${
            activeMenu === 'logout' ? 'bg-gray-700 text-purple-500' : 'text-gray-400'
          }`}
          onClick={onSignOut}
        >
          <i className="fas fa-sign-out-alt text-2xl transition-transform duration-300 transform hover:scale-125"></i>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
