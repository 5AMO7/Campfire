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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const database = getDatabase(app);
const auth = getAuth(app);


if (document.title === 'Campfire | Register') {
  const button = document.getElementById('signupBtn');

  document.getElementById('emailField').oninput = function() {
    document.getElementById("emailError").innerText = "";
  }
  document.getElementById('passField').oninput = function() {
    document.getElementById("passwordError").innerText = "";
  }
  document.getElementById('usernameField').oninput = function() {
    document.getElementById("usernameError").innerText = "";
  }

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
        var errorCode = error.code;
        // ..
        //Firebase: Error (auth/email-already-in-use).
        errorCode = errorCode.substring(5);
        errorCode = errorCode.replaceAll("-", " ");
        console.log(errorCode);

        switch(errorCode){
          case "invalid email": errorCode = "Please provide a valid E-mail";
            break;
          case "missing password": errorCode = "Please provide a Password";
            break;
          case "weak password": errorCode = "Password must be 6 characters long";
            break;
          case "email already in use": errorCode = "E-mail already in use";
            break;
          case "missing email": errorCode = "Please provide an E-mail";
        }
        
        if(errorCode.includes("E-mail")){
          document.getElementById('emailError').innerText = errorCode;
        }
        if(errorCode.includes("Password")){
          document.getElementById('passwordError').innerText = errorCode;
        }
      });
  });
}

if (document.title === 'Campfire | Login') {
  const loginButton = document.getElementById('loginBtn');

  document.getElementById('emailField').oninput = function() {
    document.getElementById("emailError").innerText = "";
  }
  document.getElementById('passField').oninput = function() {
    document.getElementById("passwordError").innerText = "";
  }

  loginButton.addEventListener('click',(e) => {
  var email = document.getElementById('emailField').value;
  var password = document.getElementById('passField').value;

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

    window.location.replace('../');
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;

    errorCode = errorCode.substring(5);
    errorCode = errorCode.replaceAll("-", " ");
    console.log(errorCode);

    switch(errorCode){
      case "invalid email": errorCode = "Please provide a valid E-mail";
        break;
      case "missing password": errorCode = "Please provide a Password";
        break;
      case "wrong password": errorCode = "Wrong Password";
    }
        
    if(errorCode.includes("E-mail")){
      document.getElementById('emailError').innerText = errorCode;
    }
    if(errorCode.includes("Password")){
      document.getElementById('passwordError').innerText = errorCode;
    }
  });
});
}

if (document.title === 'Campfire') {
  

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
