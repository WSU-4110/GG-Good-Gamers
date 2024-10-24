import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Lounge from './pages/Lounge';
import { AuthProvider } from './contexts/authContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/lounge" element={<Lounge />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
