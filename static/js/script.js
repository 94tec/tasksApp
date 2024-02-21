import { 
    getAuth, onAuthStateChanged
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

//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//         // User is signed in, you can access user info here
//         const userCredentials = {
//             uid: user.uid,
//             email: user.email,
//             displayName: user.displayName,
//         // Add other user info properties here if needed
//         };
//         console.log(userCredentials);
          
//     } else {
//         // User is signed out
//         console.log('User is signed out');
//     } 
// });

onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, fetch first name and last name from database
      const userId = user.uid;
      const databaseRef = ref(db, 'users/' + userId);
      get(databaseRef).then((snapshot) => {
        if (snapshot.exists()) {
          let userDisplayName = document.getElementById('user')
          const userData = snapshot.val();
          const firstName = userData.firstname;
          const lastName = userData.lastname;
          console.log(firstName, lastName);
          displayUserInfo(firstName, lastName);
        } else {
          console.log("No data available for this user");
        }
      }).catch((error) => {
        console.error("Error fetching user data:", error);
      });
    } else {
      // User is signed out
      console.log("User is signed out");
    }
  });
  function displayUserInfo(firstName, lastName) {
    const userInfoContainer = document.getElementById('user');
    userInfoContainer.innerHTML = `${firstName} ${lastName}`;
  }
const list = document.querySelectorAll('.list');
function activeLink () {
    list.forEach((item) => 
    item.classList.remove('active'));
    this.classList.add('active');
}
list.forEach((item) =>
item.addEventListener("click", activeLink));

// Js Date and time
const currentTime = () => {
    const current_time = document.getElementById("current_time");
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    let full_time = `${hours}:${minutes}:${seconds} `;
    current_time.innerText = full_time;

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const current_date = document.getElementById("current_date");
    let year = date.getFullYear();
    let month = months[date.getMonth()];
    let day = date.getDate();

    let cal = `${month}, ${day}  ${year} `;
    current_date.innerText = cal;
};
currentTime();
setInterval(currentTime, 1000);
setInterval(currentTime, 1000);
// set up count down js

let days = document.getElementById('days');
let hours = document.getElementById('hours');
let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');

let dd = document.getElementById('dd')
let hh = document.getElementById('hh')
let mm = document.getElementById('mm')
let ss = document.getElementById('ss')

let endDate = '03/09/2024 01:00';

let x = setInterval(function() {
    let now = new Date(endDate).getTime();
    let countDown = new Date().getTime();
    let distance = now - countDown;

    // calculations
    let d = Math.floor(distance / (1000 * 60 * 60 * 24));
    let h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let m = Math.floor((distance % (1000 * 60 * 60 )) / (1000 * 60));
    let s = Math.floor((distance % (1000 * 60)) / (1000));

    // outpputs
    days.innerHTML = d + "<br> <span>Days</span>";
    hours.innerHTML = h + "<br> <span>Hours</span>";
    minutes.innerHTML = m + "<br> <span>Minutes</span>";
    seconds.innerHTML = s + "<br> <span>Seconds</span>";

    // animate stroke
    dd.style.strokeDashoffset = 285 - (285 * d) / 365;
    hh.style.strokeDashoffset = 285 - (285 * h) / 24;
    mm.style.strokeDashoffset = 285 - (285 * m) / 60;
    ss.style.strokeDashoffset = 285 - (285 * s) / 60;
    
})

 //add new form js
 const selectBtn = document.getElementById('select-btn');
 const text = document.getElementById('text');
 const option = document.getElementsByClassName('option');

 selectBtn.addEventListener('click',() => {
     selectBtn.classList.toggle('active');
 });
 let options = [];
 for(options of option) {
     options.onclick = function() {
         text.innerHTML = this.textContent;
         selectBtn.classList.remove('active');
     }
 }
 //option button 2
 const select_btn = document.getElementById('select_btn');
 const selection = document.getElementById('option-name');
 const select = document.getElementById('statusOption');

 select_btn.addEventListener('click',() => {
     select_btn.classList.toggle('active');
 });
 let selects = [];
 for(selects of statusOption) {
     selects.onclick = function() {
         selection.innerHTML = this.textContent;
         select_btn.classList.remove('active');
     }
}

// Showind add new task form
const addTaskForm =  document.getElementById('show-add-form');
const addNewForm =  document.getElementById('new-task-form-btn');
const hideForm = document.getElementById('close');
addTaskForm.addEventListener('click', () => {
    console.log('Add new task');
});

const showTaskForm = (e) => {
    e.preventDefault();
    const backgroundFade = document.getElementById('fade');
    const taskForm = document.getElementById('taskForm');
    taskForm.classList.add('showTaskForm');
    backgroundFade.style.display = 'none';
    console.log('new form');
};
addNewForm.addEventListener('click', showTaskForm);

hideForm.addEventListener('click', () => {
    const backgroundFade = document.getElementById('fade');
    const taskForm = document.getElementById('taskForm');
    taskForm.classList.remove('showTaskForm');
    backgroundFade.style.display = 'block';
});

// send task form data to the firebase database

const addNewTask = document.querySelector('.form');
addNewTask.addEventListener('submit', (event)=>{
    event.preventDefault();

        // Get values from input fields
        var taskTitle = document.getElementById('task_title').value;
        var taskDescription = document.getElementById('text_area').value;
        var startDate = document.getElementById('startTime').value;
        var deadline = document.getElementById('endTime').value;

        // Get selected values from dropdowns
        var priority = document.querySelector('.select-menu:nth-child(1) #text').textContent;
        var status = document.querySelector('.select-menu:nth-child(2)  #option-name').textContent;

        // Output the values (you can modify this according to your needs)
        console.log('Task Title:', taskTitle);
        console.log('Task Description:', taskDescription);
        console.log('Start Date:', startDate);
        console.log('Deadline:', deadline);
        console.log('Priority:', priority);
        console.log('Status:', status);

     // Push data to Firebase database
     const user = auth.currentUser;
     set(ref(db, 'tasks' + user.uid), {
        taskTitle: taskTitle,
        taskDescription: taskDescription,
        startDate: startDate,
        deadline: deadline,
        priority: priority,
        status: status
     })
     console.log("Data successfully sent to Firebase!");
});
















