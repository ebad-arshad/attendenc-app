import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDwCWxd2M5NdD7idagpOIqczYxL8RodCds",
    authDomain: "test-38127.firebaseapp.com",
    projectId: "test-38127",
    storageBucket: "test-38127.appspot.com",
    messagingSenderId: "1021886461867",
    appId: "1:1021886461867:web:b325ddfc2aa2ac8d8104ee"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.onload = onAuthStateChanged(auth, (user) => {
    if (user) {
        location = "adminPanel/index.html";
    } else {
    }
});


// Login Function

const email = document.getElementById("email");
const password = document.getElementById("password");

const loginBtn = () => {
    event.preventDefault();

    const regexForEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regexForPassword = /^(?=.*\d{1})(?=.*[a-z]{1})(?=.*[A-Z]{1})(?=.*[!@#$%^&*{|}?~_=+.-]{1})(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/;
    if (regexForEmail.test(email.value)) {
        if (regexForPassword.test(password.value)) {

            signInWithEmailAndPassword(auth, email.value, password.value)
                .then((userCredential) => {
                    location = "adminPanel/index.html";
                })
                .catch((error) => {
                    error.message === "Firebase: Error (auth/invalid-email)." ? swal("User not Found", "Please input correct email", "error") : swal("Password is Incorrect", "Please input correct password", "error");
                });
        } else {
            swal("Password is Incorrect", "Please input correct password", "error")
        }
    } else {
        swal("User not Found", "Please input correct email", "error")
    }
}

window.loginBtn = loginBtn;