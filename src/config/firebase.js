// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZNQGwEx7dGU_qUWP7oXvcu98O9VMUB5s",
  authDomain: "socialappreact-e1137.firebaseapp.com",
  projectId: "socialappreact-e1137",
  storageBucket: "socialappreact-e1137.firebasestorage.app",
  messagingSenderId: "690228363556",
  appId: "1:690228363556:web:ca6726005e3d64abdcf3b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)