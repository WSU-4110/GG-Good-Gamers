// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const db = getFirestore(app);

export { app, auth, analytics, storage };
export default db;
