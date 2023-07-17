import { auth } from '../firebase.js';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';


export const loginauth = auth;

const loginButton = document.getElementById('loginBtn');

document.getElementById('emailField').oninput = function() {
    document.getElementById("error").style.display = "none";
}

document.getElementById('passField').oninput = function() {
    document.getElementById("error").style.display = "none";
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

document.getElementById("exit").onclick = function(){
    document.getElementById("error").style.display = "none";
}
window.onclick = function(){
    document.getElementById("error").style.display = "none";
}


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

        document.getElementById("error").style.display = "block";
        document.getElementById("errorMSG").innerText = errorCode;
    });
}