import { auth } from '../firebase.js';
import { app } from '../firebase.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';
import { getFirestore, doc, getDoc} from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js'; 

const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {

    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;

        var usernameText = document.getElementById('profile-username');

        console.log(user);
        usernameText.innerHTML = user.displayName;
        // ...
    } else {
      // User is signed out
      // ...
    }
  });