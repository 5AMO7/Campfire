// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHEb3lZ6LzN3-v-z0tE8ZDwIHkyLFV4rg",
  authDomain: "campfire-messenger.firebaseapp.com",
  databaseURL: "https://campfire-messenger-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "campfire-messenger",
  storageBucket: "campfire-messenger.appspot.com",
  messagingSenderId: "310827928971",
  appId: "1:310827928971:web:8a2faf780ddfc16f75b38e",
  measurementId: "G-BHJKMF349R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);