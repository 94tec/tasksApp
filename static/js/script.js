document.addEventListener('DOMContentLoaded', function() {
  const swiper = new Swiper('.swiper', {
      // Optional parameters
      loop: true,
      slidesPerView: 'auto',
      autoplay: {
          delay: 4000, // Auto slide after 5 seconds
      },
       // Slide transition effect
       effect: 'fade', // Change the effect to your desired animation type
        
       // Fade effect specific options
       fadeEffect: {
           crossFade: true // Enable cross-fade animation
       },
      // If we need pagination
      pagination: {
          el: '.swiper-pagination',
          clickable: true,
      },
      
      // If we need navigation buttons
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
      
      // If we need scrollbar
      scrollbar: {
          el: '.swiper-scrollbar',
      },
  });
});

import { 
    getAuth, onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, set, ref,
    get, child
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
// import config from "./config";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 // script.js
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

const list = document.querySelectorAll('.list');
function activeLink () {
    list.forEach((item) => 
    item.classList.remove('active'));
    this.classList.add('active');
}
list.forEach((item) =>
item.addEventListener("click", activeLink));
  function showToast(message) {
    var toast = document.getElementById("toast");
    var toastMessage = document.getElementById("toast-message");
    toastMessage.innerText = message;
    toast.style.opacity = 1;
    setTimeout(function(){
        toast.style.opacity = 0;
    }, 5000); // Adjust the duration of the toast
  }
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
  function login() {
    // Your login logic here
    // Assume login is successful
    showToast("Login successful! Welcome");
  }

  function logout() {
    signOut(auth).then(() => {
        // Sign-out successful
        showToast("Logout successful!");
    }).catch((error) => {
        // An error happened
        console.error(error);
        showToast("Error logging out.");
    });
  }
  function updateUI(user) {
    const isLoggedIn = document.querySelector('.profile');
    const unauthenticatedContent = document.getElementById('unauthenticated-content');

    if (user) {
        // User is authenticated
        isLoggedIn.style.display = 'block';
        login();
    } else {
        // User is not authenticated
        isLoggedIn.style.display = 'none';
    }
  }
  onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, fetch first name and last name from database
        const userId = user.uid;
        console.log(userId);
        const databaseRef = ref(db, 'users/' + userId);
        get(databaseRef).then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            const firstName = userData.firstname;
            const lastName = userData.lastname;
            console.log(firstName, lastName);
            displayUserInfo(firstName, lastName);
            console.log("User data:", userData);
          } else {
            console.log("No data available for this user");
          }
        }).catch((error) => {
          console.error("Error fetching user data:", error);
        });

        
        // Reference to the tasks of the current user
        //  const userTasksRef = ref(db, `users/${userId}/tasks`);
  
       // Fetch tasks
        get(databaseRef).then((snapshot) => {
          const taskTableBody = document.getElementById('tasks-table-body');
          taskTableBody.innerHTML = ''; // Clear previous data
          snapshot.forEach((childSnapshot) => {
            const task = childSnapshot.val();
            console.log(task.taskTitle);
            // Process each task here
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${task.taskTitle}</td>
              <td>${task.taskDescription}</td>
              <td>${task.startDate}</td>
              <td>${task.deadline}</td>
              <td>${task.priority}</td>
              <td>${task.status}</td>
            `;
            taskTableBody.appendChild(row);
          });
        })  
       } else {
         // User is signed out
         console.log("User is signed out");
       }
      // updateUI(user);
    });
    function displayUserInfo(firstName, lastName) {
      const userInfoContainer = document.getElementById('user');
      userInfoContainer.innerHTML = `${firstName} ${lastName}`;
    }


  // Get all elements with class "selection"
  const selectionElements = document.querySelectorAll('.selection');

  // Add click event listener to each selection element
  selectionElements.forEach((element, index) => {
      element.addEventListener('click', () => {
          // Get the text content of the span with class "selected-link"
          const selectedLinkText = element.querySelector('.selected-link').textContent;

          // Log the text content
          console.log(`Selection ${index + 1}: ${selectedLinkText}`);

          // Perform actions based on the selected link
          switch (selectedLinkText) {
              case 'Edit Profile':
                  // Handle Edit Profile action
                  console.log('Edit Profile selected.');
                  break;
              case 'Settings':
                  // Handle Settings action
                  console.log('Settings selected.');
                  break;
              case 'Logout':
                  // Handle Logout action
                  //Sign out user
                  signOut(auth)
                    .then(() => {
                      // Sign-out successful.
                      console.log("User signed out successfully.");
                    })
                    .catch((error) => {
                      // An error happened.
                      console.error("Error signing out:", error);
                    });
                    console.log('Logout selected.');
                    window.location.href = 'login.html'
                  break;
              default:
                  // Handle other actions
                  break;
          }
      });
  });

  // Showing add new task form
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
  const backgroundFade = document.getElementById('fade');
  const taskForm = document.getElementById('taskForm');

  const hideTaskForm = () => {
    taskForm.classList.remove('showTaskForm');
    backgroundFade.style.display = 'block';
  }
  hideForm.addEventListener('click', hideTaskForm);

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
      set(ref(db, 'users/' + user.uid + '/tasks'), {
          taskTitle: taskTitle,
          taskDescription: taskDescription,
          startDate: startDate,
          deadline: deadline,
          priority: priority,
          status: status
      })
      .then(function() {
        console.log("Data successfully written to the database.");
        addNewTask.reset();
        hideTaskForm();
    })
    .catch(function(error) {
        console.error("Error writing data to the database: ", error);
    });
      
  });

  function addTaskToTheTable() {
      // Get the table
    var taskNo = 0;
    var tbody = document.getElementById('table-data');

    let trow = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    let td6 = document.createElement('td');
    let td7 = document.createElement('td');

    td1.innerHTML = (++taskNo);
    td2.innerHTML = (td2);
    td3.innerHTML = (td3);
    td4.innerHTML = (td4);
    td5.innerHTML = (td5);
    td6.innerHTML = (td6);
    td7.innerHTML = (td7);

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);

    tbody.appendChild(trow);
  }

  function addTasksToTheTable(task){
    var taskNo = 0;
    var tbody = document.getElementById('table-data');
    tbody.innerHTML = "";
    task.forEach(element => {
      addTaskToTheTable(element.taskTitle, element.taskDescription, element.startDate, element.deadline, element.priority, element.status);
    });

  }

  // function getTasks(){
  //   let userId = auth.currentUser.uid;
  //   const dbref = ref(db);
  //   get(child(dbref, `users/${userId}/tasks`))
  //     .then((snapshot) => {
  //       const taskTableBody = document.getElementById('task-table');
  //       taskTableBody.innerHTML = ''; // Clear previous data
  //       var tasks = [];
  //       snapshot.forEach(childSnapshot => {
  //         const task = childSnapshot.val();
  //         // tasks.push(childSnapshot.val());
  //         const row = document.createElement('tr');
  //         row.innerHTML = `
  //           <td>${task.taskTitle}</td>
  //           <td>${task.taskDescription}</td>
  //           <td>${task.startDate}</td>
  //           <td>${task.deadline}</td>
  //           <td>${task.priority}</td>
  //           <td>${task.status}</td>
  //         `;
  //         taskTableBody.appendChild(row);

  //         console.log(`${task.taskTitle}`);


  //       });
  //       // addTasksToTheTable(tasks);
  //       console.log('tasks: ', tasks);
        
        
  //     })
  // }
















