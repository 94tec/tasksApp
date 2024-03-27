window.addEventListener('load', () => {
    console.log('Window loaded successful');
})

const list = document.querySelectorAll('.list');
function activeLink () {
    list.forEach((item) =>
    item.classList.remove('active'));
    this.classList.add('active');
}
list.forEach((item) =>
item.addEventListener("click", activeLink));

//toggle js
const container = document.getElementById('login_container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', ()=>{
    console.log('active');
    container.classList.add("active");
});
loginBtn.addEventListener('click', ()=>{
    container.classList.remove("active");
});

const hideContainer= document.querySelector('.hide-btn');
const loginButton= document.getElementById('loginBtn');
const getStartedBtn = document.getElementById('get_started_btn');
const showLoginContainer = (event) => {
    event.preventDefault();
    container.classList.add('showContainer');
}
loginButton.addEventListener('click', showLoginContainer);
getStartedBtn.addEventListener('click', showLoginContainer);

hideContainer.addEventListener('click', () =>{
    container.classList.remove('showContainer');
});

// firebase Set up
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, set, ref,
    get, child
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import config from './config.js';
const firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: config.apiSecret,
    projectId: "taskmanager-346df",
    storageBucket: "taskmanager-346df.appspot.com",
    messagingSenderId: "593036447381",
    appId: "1:593036447381:web:0739ae07a5bf6f1cd2159c",
    measurementId: "G-WR7DT7B4SR"
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const auth = getAuth();
  const dbRef = ref(db);

//Sign up
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const firstName = signupForm['firstname'].value;
    const middleName = signupForm['middlename'].value;
    const lastName = signupForm['lastname'].value;
    const email = signupForm['email'].value;
    const password = signupForm['password'].value;

    createUserWithEmailAndPassword(auth, email, password)
    .then(cred =>{
        const user = cred.user;
        console.log(user);
        set(ref(db, 'users/' + user.uid), {
            firstname: firstName,
            middlename: middleName,
            lastname: lastName,
            email: email,
            password: password,
        })
        showMessageToTheUser('User Created Successful');
        signupForm.reset();
        toggleFunction();
    })
    .catch((error) => {
        showMessageToTheUser("Failed to create User contact your Adminstrator", true);
        console.log(error.code);
        console.log(error.message);
    })
})
// toggle function
function toggleFunction (){
    const container = document.querySelector('.container.active .sign-out');
    container.style. transform = 'translateX(100%)';
}
//login
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = loginForm['login_email'].value;
    const password = loginForm['login_password'].value;

    signInWithEmailAndPassword(auth, email, password)
    .then(cred =>{
        console.log(cred.user);

        get(child(dbRef, 'users/' + cred.user.uid))
        .then((snapshot) =>{
            if (snapshot.exists) {
                sessionStorage.setItem("user-info", JSON.stringify({
                    name: snapshot.val().name
                }))
                sessionStorage.setItem("user-creds", JSON.stringify(cred.user));
                console.log(snapshot.val().name);
                showMessageToTheUser('You have successfully Logged in');
                loginForm.reset();
                window.location.href = 'index.html';
            }
        })
    })
    .catch((error) => {
        showMessageToTheUser(error.message, true);
        console.log(error.code);
        console.log(error.message);
    })

})
function showMessageToTheUser(message, isError = false) {
    const toastElement = document.getElementById('toastMessage');
    if (toastElement === null) {
        console.error('toastMessage element not found!');
        return; // Exit the function early if the element is not found
    }
    toastElement.textContent = message;

    if (isError) {
        toastElement.style.backgroundColor = '#ff6347'; // Red color for error messages
    } else {
        toastElement.style.backgroundColor = '#28a745'; // Green color for success messages
    }

    // Show the toast message
    toastElement.style.opacity = 1;

    // Animate the toast message
    setTimeout(() => {
        toastElement.style.opacity = 0;
    }, 5000);
}


