import { auth } from '../firebase.js';
import { app } from '../firebase.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';
import { getFirestore, doc, getDoc} from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js'; 

const db = getFirestore(app);

// --- Can delete ig ---
// var loaded = false;

// var randomLoaderLength = Math.floor(Math.random() * (1100 - 800) ) + 800;

// setTimeout(function(){
//   console.log("did the delay!");
//   document.getElementById("loader").style.visibility = "hidden";
// }, randomLoaderLength);

// ----

onAuthStateChanged(auth, (user) => {

    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;

        var usernameText = document.getElementById('profile-username');
        

        console.log(user);

        // usernameText.innerHTML = user.displayName;
        console.log(user.displayName);

        getDoc(doc(db, "users", user.uid)).then(docSnap => {
          if (docSnap.exists()) {
            
            console.log("Document data:", docSnap.data());
            usernameText.innerHTML = user.displayName;
            
            // --- Sets a delay for 20ms before removing the loader

            setTimeout(function(){
              document.getElementById("loader").style.visibility = "hidden";
            }, 20);

          } else {
            console.log("No such document!");
          }
        })
        // ...
    } else {
      // User is signed out
      // ...
    }
  });