import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Lounge from './pages/Lounge';
import Messages from './pages/Messages'; 
import { AuthProvider } from './contexts/authContext';
import './App.css';
import History from './pages/History';

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
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
