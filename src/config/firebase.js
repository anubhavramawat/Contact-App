// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpetSQz88o1leHUBt6qwvBWcquOaQL110",
  authDomain: "contact-app-5fc4d.firebaseapp.com",
  projectId: "contact-app-5fc4d",
  storageBucket: "contact-app-5fc4d.appspot.com",
  messagingSenderId: "887647581796",
  appId: "1:887647581796:web:d56f55efeea99d795d5171"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);