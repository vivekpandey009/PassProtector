// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "auth-a2931.firebaseapp.com",
  projectId: "auth-a2931",
  storageBucket: "auth-a2931.appspot.com",
  messagingSenderId: "259422605590",
  appId: "1:259422605590:web:4b72f043a46b9bb7d4c037",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
