import { app } from '../firebase.js';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';
import { getFirestore, doc, setDoc} from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js'; 
import { getDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);

const signupButton = document.getElementById('signupBtn');

document.getElementById('emailField').oninput = function() {
document.getElementById("emailError").innerText = "";
}
document.getElementById('passField').oninput = function() {
document.getElementById("passwordError").innerText = "";
}
document.getElementById('usernameField').oninput = function() {
document.getElementById("usernameError").innerText = "";
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
    signupButton.disabled = true;

    var email = document.getElementById('emailField').value;
    var password = document.getElementById('passField').value;
    var username = document.getElementById('usernameField').value;
        
    localStorage.setItem("userExists", false);

    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // user.displayName = displayName;
        alert('user created');
        
        console.log(user);

        setDoc(doc(db, "users", user.uid),{
        uid: user.uid,
        displayName: username,
        email: email
        });

        updateProfile(user, {
            displayName: username
            }).then(() => {
            // Profile updated!
            console.log('username set!');
            // ...
            }).catch((error) => {
            // An error occurred
            console.log('username not set');
            console.log(error);
            // ...
            });

        // ...
    })
    .catch((error) => {
        signupButton.disabled = false;
        var errorCode = error.code;
        // ..
        //Firebase: Error (auth/email-already-in-use).
        console.log(errorCode);
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

signupButton.disabled = false;
