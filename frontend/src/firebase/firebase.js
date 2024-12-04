// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHPiqHJk7kB900yf1YjQrq4d9NSSQp-io",
  authDomain: "good-gamers.firebaseapp.com",
  projectId: "good-gamers",
  storageBucket: "good-gamers.firebasestorage.app",
  messagingSenderId: "1082093821457",
  appId: "1:1082093821457:web:74959dd3489cfde1b15bb0",
  measurementId: "G-S5QCQZQEN5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore properly

export { app, auth, storage, analytics }; // Added `db` to named exports
export default db