import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js'; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDHEb3lZ6LzN3-v-z0tE8ZDwIHkyLFV4rg",
  authDomain: "campfire-messenger.firebaseapp.com",
  // databaseURL: "https://campfire-messenger-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "campfire-messenger",
  storageBucket: "campfire-messenger.appspot.com",
  messagingSenderId: "310827928971",
  appId: "1:310827928971:web:8a2faf780ddfc16f75b38e",
  measurementId: "G-BHJKMF349R"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

const db = getFirestore(app);


if (document.title === 'Campfire | Register') {
  const signupButton = document.getElementById('signupBtn');

  document.getElementById('emailField').oninput = function() {
    document.getElementById("emailError").innerText = "";
  }
  document.getElementById('passField').oninput = function() {
    document.getElementById("passwordError").innerText = "";
  }

  document.getElementById('confirmPassField').oninput = function() {

    if (document.getElementById('confirmPassField').value !== document.getElementById('passField').value) {
      document.getElementById("passwordMatchingError").innerText = "Passwords do not match";
      document.getElementById("signupBtn").disabled = true;
    }
    else {
      document.getElementById("passwordMatchingError").innerText = "";
      document.getElementById("signupBtn").disabled = false;
    }
  }

  signupButton.addEventListener('click',(e) => {
    var email = document.getElementById('emailField').value;
    var password = document.getElementById('passField').value;
    var displayName = document.getElementById('usernameField').value;
      
      const res = createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        user.displayName = displayName;
        alert('user created');
        
        console.log(user);
        console.log(user.uid)

        setDoc(doc(db, "users", user.uid),{
          uid: user.uid,
          displayName: displayName,
          email: email
        });

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
