// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWyp1BdbRUO0XoHBQe-8x-tu_sJdhhhYE",
  authDomain: "imerse-a4a50.firebaseapp.com",
  projectId: "imerse-a4a50",
  storageBucket: "imerse-a4a50.firebasestorage.app",
  messagingSenderId: "202233089836",
  appId: "1:202233089836:web:aa785d9dc497f57632a689",
  measurementId: "G-M9DL4NZRB8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
