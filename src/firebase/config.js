// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDALGPpFhoDZ834xqTuOKDDARvLJ6vGQts",
    authDomain: "journal-app-f44ba.firebaseapp.com",
    projectId: "journal-app-f44ba",
    storageBucket: "journal-app-f44ba.appspot.com",
    messagingSenderId: "275885631426",
    appId: "1:275885631426:web:da7bf5092f32b5528c985b",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);
