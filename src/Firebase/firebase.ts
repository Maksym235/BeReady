// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBNOhb-i6W2kZSePc1OryISav2SVluSjM",
  authDomain: "beready-c6af3.firebaseapp.com",
  projectId: "beready-c6af3",
  storageBucket: "beready-c6af3.appspot.com",
  messagingSenderId: "584887735373",
  appId: "1:584887735373:web:bf51f077d9a73fabbf3804",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const googleAuthProvider = new GoogleAuthProvider();
export const facebookAuthProvider = new FacebookAuthProvider();
