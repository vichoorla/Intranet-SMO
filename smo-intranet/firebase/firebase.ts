// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxWpuWa5RjNsBmyMLpWnUX5nIcITQmQJk",
  authDomain: "intranet-smo.firebaseapp.com",
  projectId: "intranet-smo",
  storageBucket: "intranet-smo.firebasestorage.app",
  messagingSenderId: "432462016275",
  appId: "1:432462016275:web:28d2a470da7c245c4934e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

console.log("Firebase initialized successfully");