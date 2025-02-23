// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqAKNg5TQ7Dup9l96_SrzOF2_t46Xe0c0",
  authDomain: "q-production-e4848.firebaseapp.com",
  projectId: "q-production-e4848",
  storageBucket: "q-production-e4848.firebasestorage.app",
  messagingSenderId: "1004209252200",
  appId: "1:1004209252200:web:254c79d46e184a00af58dd",
  measurementId: "G-MC3HT5MY4V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);
export { db };