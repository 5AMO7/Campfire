import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js';
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

console.log('entered in the js file');

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const database = getDatabase(app);
const auth = getAuth(app);


if (document.title == 'Campfire | Register') {
  const button = document.getElementById('signupBtn');

  button.addEventListener('click',(e) => {
    var email = document.getElementById('emailField').value;
    var password = document.getElementById('passField').value;
    var username = document.getElementById('usernameField').value;
  
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      alert('user created');
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
  });
}

if (document.title == 'Campfire | Login') {
  const loginButton = document.getElementById('loginBtn');

  loginButton.addEventListener('click',(e) => {
  var email = document.getElementById('emailField').value;
  var password = document.getElementById('passField').value;

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

    alert('user logged in');

    window.location.replace('../');

    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert(errorMessage);
  });
});
}

if (document.title == 'Campfire') {
  

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;

      var emailText = document.getElementById('userEmail');
      
  emailText.innerHTML = uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
}
