import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCNtW0n-Hefvxlhq1VeqhDvmhWQQIChSls",
    authDomain: "taskmanager-346df.firebaseapp.com",
    projectId: "taskmanager-346df",
    storageBucket: "taskmanager-346df.appspot.com",
    messagingSenderId: "593036447381",
    appId: "1:593036447381:web:0739ae07a5bf6f1cd2159c",
    measurementId: "G-WR7DT7B4SR"
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase();
  const auth = getAuth(app);

//Sign up
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = signupForm['name'].value;
    const email = signupForm['email'].value;
    const password = signupForm['password'].value;
    
    createUserWithEmailAndPassword(auth, email, password)
    .then(cred =>{
        console.log(cred.user);
    });
    
})