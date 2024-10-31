import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Lounge from './pages/Lounge';
import './App.css';
import Login from "./pages/Login"; // Assuming Login.js is in the 'pages' folder
import Home from "./pages/Home"; // Assuming Home.js is in the 'pages' folder
import History from "./pages/History";
import "./App.css"; // Global styles
import { AuthProvider, useAuth } from "./contexts/authContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/lounge" element={<Lounge />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
