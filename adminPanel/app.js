import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

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
const db = getFirestore(app);
const storage = getStorage();

window.onload = () => {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            location = "../index.html";
        } else {
        }
    });
}

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
    selectList.forEach((element) => {
        if (element.selectedIndex == 0) {
            swal("Error", "Please select every field", "error");
            flag = false
        } else {
            flag = true;
        }
    });
    flag ? closingModal('createClassComp') : false;

    if (flag) {
        (async () => {
            await addDoc(collection(db, "classes"), {
                classTiming: selectList[0][selectList[0].selectedIndex].value,
                scheduleOfClasses: selectList[1][selectList[1].selectedIndex].value,
                teacherName: selectList[2][selectList[2].selectedIndex].value,
                sectionName: selectList[3][selectList[3].selectedIndex].value,
                courseName: selectList[4][selectList[4].selectedIndex].value,
                batchNumber: selectList[5][selectList[5].selectedIndex].value,
            });
        })();
    }
}

// Submit data of new Student

const studentDataSubmit = async () => {
    const inputList = document.querySelectorAll(".studentCreateForm input");
    const selectList = document.querySelectorAll(".studentCreateForm select");
    let flag = false;
    inputList.forEach(element => {
        if (/^\s*$/.test(element.value)) {
            swal("Error", "Please input data in every field", "error");
            flag = false
        }
        else {
            flag = true;
        }
    });

    flag ? closingModal('createStudentComp') : false;

    const gettingImgSrc = await getImgIntoURL(inputList[5].files);
    console.log(gettingImgSrc);
    if (flag) {
        (async () => {
            await addDoc(collection(db, "students"), {
                studentName: inputList[0].value,
                fathernName: inputList[1].value,
                rollNumber: inputList[2].value,
                contactNumber: inputList[3].value,
                cnicNumber: inputList[4].value,
                picture: gettingImgSrc,
                courseName: selectList[0][selectList[0].selectedIndex].value,
                sectionName: selectList[1][selectList[1].selectedIndex].value,
            });
        })();
    }
}

const closingModal = (name) => {
    document.getElementsByClassName(`${name}`)[0].classList.add("hidden");
}





// Converting image into url

const getImgIntoURL = (file) => {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `images/${file.name}.png`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        break;
                    case 'storage/canceled':
                        break;
                    case 'storage/unknown':
                        break;
                }
                reject(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL)
                });
            }
        );
    })
}



window.closingModal = closingModal;
window.logOut = logOut;
window.classDataSubmit = classDataSubmit;
window.studentDataSubmit = studentDataSubmit;