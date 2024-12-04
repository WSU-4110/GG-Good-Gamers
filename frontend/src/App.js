import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.js';
import Home from './pages/Home.js';
import Lounge from './pages/Lounge.js';
import Messages from './pages/Messages.js'; 
import './App.css';
import History from "./pages/History.js";
import "./App.css"; // Global styles
import { AuthProvider, useAuth } from "./contexts/authContext/index.js";
import Profile from './pages/Profile.js';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/lounge" element={<Lounge />} />
            <Route path="/messages" element={<Messages />} /> 
            <Route path="/history" element={<History />} /> 
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
