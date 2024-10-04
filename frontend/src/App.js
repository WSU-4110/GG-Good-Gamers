import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login"; // Assuming Login.js is in the 'pages' folder
import Home from "./pages/Home"; // Assuming Home.js is in the 'pages' folder
import "./App.css"; // Global styles
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
