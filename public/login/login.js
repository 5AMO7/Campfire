import { auth } from '../firebase.js';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';


export const loginauth = auth;

const loginButton = document.getElementById('loginBtn');

document.getElementById('emailField').oninput = function() {
    document.getElementById("emailError").innerText = "";
}

document.getElementById('passField').oninput = function() {
    document.getElementById("passwordError").innerText = "";
}

loginButton.addEventListener('click',(e) => {
    login();
});

document.querySelectorAll('input').forEach( el => {
    el.addEventListener('keydown', e => {
        if(e.code === "Enter") {
           login();
        }
    })
})

function login(){
    var email = document.getElementById('emailField').value;
    var password = document.getElementById('passField').value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        location.href = '../main/index.html';
        // ...
    })
    .catch((error) => {
        var errorCode = error.code;

        errorCode = errorCode.substring(5);
        errorCode = errorCode.replaceAll("-", " ");
        errorCode = errorCode.trim();

        switch(errorCode){
            case "invalid email": errorCode = "Please provide a valid E-mail";
            break;
            case "missing password": errorCode = "Please provide a Password";
            break;
            case "wrong password": errorCode = "Wrong Password";
            break;
            case "user not found": errorCode = "User not found";
            break;
        }
            
        if(errorCode.includes("E-mail") || errorCode.includes("User")){
            document.getElementById('emailError').innerText = errorCode;
        }
        if(errorCode.includes("Password")){
            document.getElementById('passwordError').innerText = errorCode;
        }
    });
}