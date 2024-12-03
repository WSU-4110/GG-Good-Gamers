// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHPiqHJk7kB900yf1YjQrq4d9NSSQp-io",
  authDomain: "good-gamers.firebaseapp.com",
  projectId: "good-gamers",
  storageBucket: "good-gamers.appspot.com",
  messagingSenderId: "1082093821457",
  appId: "1:1082093821457:web:74959dd3489cfde1b15bb0",
  measurementId: "G-S5QCQZQEN5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Add Firestore initialization
const analytics = getAnalytics(app); // Initialize analytics

// Export only what's needed
export { app, auth, db }; // Export db for Firestore usage
