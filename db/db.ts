// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCZfJhNxF_x7imTj-WQujPjwj7er3M83zU",
  authDomain: "exemplary-datum-375814.firebaseapp.com",
  databaseURL: "https://exemplary-datum-375814-default-rtdb.firebaseio.com",
  projectId: "exemplary-datum-375814",
  storageBucket: "exemplary-datum-375814.appspot.com",
  messagingSenderId: "1016768828015",
  appId: "1:1016768828015:web:7c24d049e474329d76b39a",
  measurementId: "G-22HRCYGB0M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();

// const analytics = getAnalytics(app);
