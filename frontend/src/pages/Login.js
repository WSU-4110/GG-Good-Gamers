import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import Button from "@mui/material/Button";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";
import AxiosInstance from "../components/Axios";

function Login() {
  const navigate = useNavigate();
  const { userLoggedIn, currentUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isLogin, setIsLogin] = useState(true);

  const onSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await doSignInWithEmailAndPassword(email, password);
    }
  };

  const onGoogleSignin = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch((err) => {
        setIsSigningIn(false);
      });
    }
  };

  const onSignUp = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      await doCreateUserWithEmailAndPassword(email, password);
    }
    // AxiosInstance.post('user/',{
    //   id = 
    //   userEmail = 
    //   screenName = 
    //   userName =
    //   userPassword = 
    //   userGender = 
    //   userDOB = 
    //   docAcct = 
    //   isAdmin = 
    //   isBanned =
    // }
  };

  useEffect(() => {
    userLoggedIn && navigate("/home");
  }, [userLoggedIn]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-none relative">
        {" "}
        {/* Removed shadow */}
        {/* Logo Placeholder */}
        <div className="absolute top-4 left-4">
          <h1 className="text-4xl text-green-500 font-bold">GG</h1>
        </div>
        {/* Login / Sign Up Tabs */}
        <div className="flex justify-between mb-8 mt-12">
          <div
            onClick={() => setIsLogin(true)}
            className={`cursor-pointer text-lg font-semibold border-b-2 ${
              isLogin
                ? "border-purple-500 text-white"
                : "border-transparent text-gray-500"
            }`}
          >
            LOGIN
          </div>
          <div
            onClick={() => setIsLogin(false)}
            className={`cursor-pointer text-lg font-semibold border-b-2 ${
              !isLogin
                ? "border-purple-500 text-white"
                : "border-transparent text-gray-500"
            }`}
          >
            SIGN UP
          </div>
        </div>
        {isLogin ? (
          <>
            {/* Email Input */}
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

            {/* Password Input */}
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

            {/* Forgot Password */}
            <div className="mb-6 text-right">
              <a href="/#" className="text-purple-500 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <div className="mb-2">
              <button className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg">
                Login
              </button>
            </div>
            <p className="text-gray-400">or</p>
            <div className="mb-6">
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  marginTop: 1,
                  paddingY: 1,
                  textTransform: "none",
                }}
                onClick={onGoogleSignin}
              >
                <i className="fa-brands fa-google"></i> {/* Password Icon */}
                <p className="ml-4">Login with Google</p>
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Username Input */}
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

            {/* Email Input */}
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

            {/* Password Input */}
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
                  <option value="" disabled selected>
                    Day
                  </option>
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg">
                  <option value="" disabled selected>
                    Month
                  </option>
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((month, i) => (
                    <option key={i} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <select className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg">
                  <option value="" disabled selected>
                    Year
                  </option>
                  {Array.from({ length: 100 }, (_, i) => (
                    <option key={i} value={2024 - i}>
                      {2024 - i}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Gender Selection */}
            <div className="mb-4 relative">
              <select className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="" disabled selected>
                  Select your Gender
                </option>
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
          <a href="/#" className="text-gray-400 hover:underline">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
