import "./App.css";
import '@fortawesome/fontawesome-free/css/all.min.css';


import React, { useState } from 'react';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        
        {/* Logo Placeholder */}
        <div className="mb-8">
          <h1 className="text-4xl text-green-500 font-bold">GG</h1>
        </div>

        {/* Login / Sign Up Tabs */}
        <div className="flex justify-between mb-8">
          <div
            onClick={() => setIsLogin(true)}
            className={`cursor-pointer text-lg font-semibold border-b-2 ${isLogin ? 'border-purple-500 text-white' : 'border-transparent text-gray-500'}`}
          >
            LOGIN
          </div>
          <div
            onClick={() => setIsLogin(false)}
            className={`cursor-pointer text-lg font-semibold border-b-2 ${!isLogin ? 'border-purple-500 text-white' : 'border-transparent text-gray-500'}`}
          >
            SIGN UP
          </div>
        </div>

        {isLogin ? (
  // Login Form with Icons
  <>
    {/* Email Input with Icon */}
    <div className="mb-4 relative">
      <input
        type="email"
        placeholder="Please Enter your Email"
        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <div className="absolute left-3 top-3 text-gray-400">
        <i className="fas fa-envelope"></i> {/* Email Icon */}
      </div>
    </div>

    {/* Password Input with Icon */}
    <div className="mb-4 relative">
      <input
        type="password"
        placeholder="Please Enter your Password"
        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <div className="absolute left-3 top-3 text-gray-400">
        <i className="fas fa-lock"></i> {/* Password Icon */}
      </div>
    </div>

    <div className="mb-6 text-right">
      <a href="#" className="text-purple-500 hover:underline">Forgot Password?</a>
    </div>

    <div className="mb-6">
      <button className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg">
        Login
      </button>
    </div>
  </>
        ) : (
          <>
            {/* New form with icons, DOB, and Gender */}
            <div className="mb-4 relative">
              <input
                type="text"
                placeholder="Please Enter your Username"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="absolute left-3 top-3 text-gray-400">
                <i className="fas fa-user"></i> {/* User Icon */}
              </div>
            </div>

            <div className="mb-4 relative">
              <input
                type="email"
                placeholder="Please Enter your Email"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />w13
              <div className="absolute left-3 top-3 text-gray-400">
                <i className="fas fa-envelope"></i> {/* Email Icon */}
              </div>
            </div>

            <div className="mb-4 relative">
              <input
                type="password"
                placeholder="Please Enter your Password"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="absolute left-3 top-3 text-gray-400">
                <i className="fas fa-lock"></i> {/* Password Icon */}
              </div>
            </div>

            {/* Date of Birth */}
            <div className="mb-4">
              <label className="text-gray-400 mb-2 block">Date of Birth</label>
              <div className="flex space-x-4">
                <select className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg">
                  <option value="" disabled selected>Day</option>
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                <select className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg">
                  <option value="" disabled selected>Month</option>
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, i) => (
                    <option key={i} value={month}>{month}</option>
                  ))}
                </select>
                <select className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg">
                  <option value="" disabled selected>Year</option>
                  {Array.from({ length: 100 }, (_, i) => (
                    <option key={i} value={2024 - i}>{2024 - i}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Gender Selection */}
            <div className="mb-4 relative">
              <select className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="" disabled selected>Select your Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
              <div className="absolute left-3 top-3 text-gray-400">
                <i className="fas fa-venus-mars"></i> {/* Gender Icon */}
              </div>
            </div>

            <div className="mb-6">
              <button className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg">
                Sign Up
              </button>
            </div>
          </>
        )}

        {/* Contact Us */}
        <div className="text-center">
          <a href="#" className="text-gray-400 hover:underline">Contact Us</a>
        </div>
      </div>
    </div>
  );
}

export default App;
