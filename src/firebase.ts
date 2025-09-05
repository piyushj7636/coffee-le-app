// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjCRNDE2yd6C9sY_RmugdeperpWUGNNU0",
  authDomain: "coffee-le-b3081.firebaseapp.com",
  projectId: "coffee-le-b3081",
  storageBucket: "coffee-le-b3081.firebasestorage.app",
  messagingSenderId: "112008801600",
  appId: "1:112008801600:web:af02c80b7b62c9fc445ea5",
  measurementId: "G-K79P0JWYM9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);