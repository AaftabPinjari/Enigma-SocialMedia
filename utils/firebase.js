// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCsmdk4yCmPinb2a6C6IPNTPYznLbNMbls",
    authDomain: "enigma-4fb9a.firebaseapp.com",
    projectId: "enigma-4fb9a",
    storageBucket: "enigma-4fb9a.appspot.com",
    messagingSenderId: "1077586539631",
    appId: "1:1077586539631:web:09b80e04a5b36d2aa1c99a",
    measurementId: "G-YRNPBXQW3V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
// const analytics = getAnalytics(app);