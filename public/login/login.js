import { auth } from '../firebase.js';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';



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

    window.location.href = '../main/index.html';
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