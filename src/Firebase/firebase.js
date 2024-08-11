// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGagEdQVaxHk2Tv9GWDnly8Dl9YCmtxKU",
  authDomain: "new1-31820.firebaseapp.com",
  projectId: "new1-31820",
  storageBucket: "new1-31820.appspot.com",
  messagingSenderId: "256178050279",
  appId: "1:256178050279:web:f9673beb93b0195e627e42",
  measurementId: "G-W0W73D1FMG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
