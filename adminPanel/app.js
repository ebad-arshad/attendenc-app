import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

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
    if (!user) {
        location = "../index.html";
    } else {
    }
});

// Log Out function

const logOut = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });

}

// Opening createClassBtn 

const createClassBtn = document.getElementById("createClassBtn");
createClassBtn.addEventListener("click", () => {
    document.getElementsByClassName("createClassComp")[0].classList.remove("hidden");
})

// Opening createStudentBtn

const createStudentBtn = document.getElementById("createStudentBtn");
createStudentBtn.addEventListener("click", () => {
    document.getElementsByClassName("createStudentComp")[0].classList.remove("hidden");
})


// Submit data of new Class 

const classDataSubmit = () => {
    const selectList = document.querySelectorAll(".classCreateForm select");
    let flag = false;
    selectList.forEach(element => {
        if (element.selectedIndex == 0) {
            swal("Error", "Please select every field", "error");
            flag = false
        } else {
            flag = true;
        }
    });
    flag ? closingModal('createClassComp') : false;
}

// Submit data of new Student

const studentDataSubmit = () => {
    const inputList = document.querySelectorAll(".studentCreateForm input");
    let flag = false;
    inputList.forEach(element => {
        if (/^\s*$/.test(element.value)) {
            swal("Error", "Please input data in every field", "error");
            flag = false
        } else {
            flag = true;
        }
    });
    flag ? closingModal('createStudentComp') : false;
}

const closingModal = (name) => {
    console.log(document.getElementsByClassName(`${name}`)[0].classList.add("hidden"));
}

window.closingModal = closingModal;
window.logOut = logOut;
window.classDataSubmit = classDataSubmit;
window.studentDataSubmit = studentDataSubmit;