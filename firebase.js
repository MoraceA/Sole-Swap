// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyDFyBtrCITLqt5lsYWvdVDTwy8ZPCPPKFU",
  authDomain: "soleswap-d3aac.firebaseapp.com",
  projectId: "soleswap-d3aac",
  storageBucket: "soleswap-d3aac.appspot.com",
  messagingSenderId: "1053504941619",
  appId: "1:1053504941619:web:4b6bd561c4404d815ffd46",
  measurementId: "G-F2NVZ4K2PR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {app, analytics, auth}