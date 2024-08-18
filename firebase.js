// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZCPplWjaSPc4sA3b-2xLWZpg2TRJWB2Q",
  authDomain: "flashcard-saas-ea516.firebaseapp.com",
  projectId: "flashcard-saas-ea516",
  storageBucket: "flashcard-saas-ea516.appspot.com",
  messagingSenderId: "206592934265",
  appId: "1:206592934265:web:9fa0fa5e5f8b0772d76fa8",
  measurementId: "G-Z79D2GCNZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };