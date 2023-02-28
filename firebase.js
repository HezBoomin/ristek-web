// Import the functions you need from the SDKs you need
import {initializeApp, getApp, getApps} from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "chan-45419.firebaseapp.com",
    projectId: "chan-45419",
    storageBucket: "chan-45419.appspot.com",
    messagingSenderId: "881881192789",
    appId: "1:881881192789:web:9cc669e2331160a98577dc",
    measurementId: "G-C4JH7TT5X8",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage();
const auth = getAuth();

export {app, db, storage, auth};