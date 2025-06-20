// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWyp1BdbRUO0XoHBQe-8x-tu_sJdhhhYE",
  authDomain: "imerse-a4a50.firebaseapp.com",
  projectId: "imerse-a4a50",
  storageBucket: "imerse-a4a50.firebasestorage.app",
  messagingSenderId: "202233089836",
  appId: "1:202233089836:web:aa785d9dc497f57632a689",
  measurementId: "G-M9DL4NZRB8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
