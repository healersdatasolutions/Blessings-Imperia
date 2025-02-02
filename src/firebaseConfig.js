// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth to manage authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvmR2oHx-ynxBunRKXbZXM_c0p7P9PJ1o",
  authDomain: "blessings-197f1.firebaseapp.com",
  projectId: "blessings-197f1",
  storageBucket: "blessings-197f1.firebasestorage.app",
  messagingSenderId: "184058828678",
  appId: "1:184058828678:web:b553f96e35dde3c4707e07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
const auth = getAuth(app);
export { auth }; // Export the auth object for use in other parts of your app
