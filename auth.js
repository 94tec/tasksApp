import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, set, ref,
    get, child
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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
  const db = getDatabase(app);
  const auth = getAuth();
  const dbRef = ref(db);

//Sign up
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = signupForm['name'].value
    const email = signupForm['email'].value;
    const password = signupForm['password'].value;
    
    createUserWithEmailAndPassword(auth, email, password)
    .then(cred =>{
        const user = cred.user;
        console.log(user);
        set(ref(db, 'users/' + user.uid), {
            name: name,
            email: email
        })
        alert("User Created Successful");
    })
    .catch((error) => {
        alert("Failed to create User contact your Adminstrator");
        console.log(error.code);
        console.log(error.message);
    })
    
})

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
                console.log(cred.user.uid);
            }
        })
    })
    .catch((error) => {
        alert(error.message);
        console.log(error.code);
        console.log(error.message);
    })
    
})