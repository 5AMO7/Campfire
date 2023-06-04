import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';

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

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
