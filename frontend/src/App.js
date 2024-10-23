import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login"; 
import Home from "./pages/Home"; 
import "./App.css"; 
import { AuthProvider, useAuth } from "./contexts/authContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Route for Login Page */}
            <Route path="/" element={<Login />} />

            {/* Route for Home Page */}
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
