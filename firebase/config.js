// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCQTdNlCqSfZ2PBeXLT1HVVQMfscTax8Q",
  authDomain: "proyecto-blog-coder.firebaseapp.com",
  projectId: "proyecto-blog-coder",
  storageBucket: "proyecto-blog-coder.appspot.com",
  messagingSenderId: "396142933267",
  appId: "1:396142933267:web:74baed4c39efad793a16e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = initializeFirestore(app, {   experimentalForceLongPolling: true, }); 

export { db };

