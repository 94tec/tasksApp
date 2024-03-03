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


import { 
    getAuth, onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, push, ref,
    get, child, query, orderByChild, equalTo
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
        const userTasksRef = ref(db, `users/${userId}/tasks`);
        console.log(userId);
        const databaseRef = ref(db, 'users/' + userId);
        get(databaseRef).then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            console.log("User data:", userData);
            const firstName = userData.firstname;
            const lastName = userData.lastname;
            console.log(firstName, lastName);

            //elements in your HTML with IDs "firstName" and "lastName"
            const firstNameElement = document.getElementById("userFirstName");
            const lastNameElement = document.getElementById("userLastName");
 
            // Set the text content of the elements to the fetched first name and last name
            firstNameElement.textContent = firstName;
            lastNameElement.textContent = lastName;
          } else {
            console.log("No data available for this user");
          }
        }).catch((error) => {
          console.error("Error fetching user data:", error);
        });

        // // Reference to the tasks node for the user
       const statusToQuery = 'On Progress'; // Corrected to match the status in the database
       const tasksRef = ref(db, `users/${userId}/tasks`);

       // Query to filter tasks where status is "On Progress"
       const ongoingTasksQuery = query(tasksRef, orderByChild('status'), equalTo(statusToQuery));

       // Retrieve data based on the query
       get(ongoingTasksQuery).then((snapshot) => {
           if (snapshot.exists()) {
            // Container element to hold the tasks
            const taskContainer = document.getElementById('task-container');
            // Clear previous results
            taskContainer.innerHTML = ''
               // Iterate through the snapshot and log or process each task
               snapshot.forEach((taskSnapshot) => {
                   const task = taskSnapshot.val();
                   console.log(task);
                   // Process the task data as needed
                   const taskElement = document.createElement('div');
                   taskElement.classList.add('task');
                   taskElement.innerHTML = `
                      <h3 class="task-title">${task.taskTitle}</h3>
                      <p class="task-description">${task.taskDescription}</p>
                      <p class = "endDate"><strong>Deadline:</strong> ${task.deadline}</p>
                      <p class = "status">${task.status}</p>
                    `;
                   taskContainer.appendChild(taskElement);
               });
           } else {
               console.log("No On Progress tasks found.");
           }
       }).catch((error) => {
           console.error("Error retrieving ongoing tasks: ", error);
      });
      // Fetch all tasks and display in the browser table
      // Fetch tasks to display in the slide widget
      get(userTasksRef)
      .then((snapshot) => {
        const slideContainer = document.getElementById('slide');
        let slidesHTML = ''; // Initialize a string to store HTML of all slides

        // Loop through the snapshot to generate slide HTML
        snapshot.forEach((childSnapshot) => {
          const task = childSnapshot.val();
          // Calculate time lapse
          const startDate = new Date(task.startDate);
          const deadline = new Date(task.deadline);
          const timeLapse = getTimeLapse(startDate, deadline);

          // Process each task here
          slidesHTML += `
            <div class="swiper-slide">
              <div class="cards">
                <p>Start Date: ${startDate.toLocaleString()}</p>
                <p>Deadline: ${deadline.toLocaleString()}</p>
                <!-- Display time lapse -->
                <div class="deadline-count-down">
                  <!-- Your countdown timer HTML here -->
                  <div id="time">
                    <div class="circle" style="--clr: #7f11c4;">
                        <svg>
                            <circle cx = "45" cy = "45" r = "45" id = "dd"></circle>
                        </svg>
                        <div id="days">${timeLapse.days}<br> <span>Days</span></div>
                    </div>
                    <div class="circle" style="--clr: #61d81c;">
                      <svg>
                        <circle  cx = "45" cy = "45" r = "45" id = "hh"></circle>
                      </svg>
                      <div id="hours">${timeLapse.hours} <br> <span>Hours</span></div>
                    </div>
                    <div class="circle" style="--clr: #0ef;">
                      <svg>
                        <circle  cx = "45" cy = "45" r = "45" id = "mm"></circle>
                      </svg>
                      <div id="minutes">${timeLapse.minutes}<br> <span>Minutes</span></div>
                    </div>
                    <div class="circle" style="--clr: #2987a3;">
                      <svg>
                        <circle  cx = "45" cy = "45" r = "45" id = "ss"></circle>
                      </svg>
                      <div id="seconds">${timeLapse.seconds} <br> <span>Seconds</span></div>
                    </div>
                  </div>                   
                </div>
                <div class="card-title">
                  <h4 class="id">Task ID</h4>
                  <h4 class="task-title">${task.taskTitle}</h4>
                </div>
                <div class="card-description">
                  <p>${task.taskDescription}</p>
                </div>
                <div class="card-action">
                  <p>${task.startDate}</p>
                  <p>${task.deadline}</p>
                  <input type="button" value="view" class="input">
                </div>
              </div>
            </div>`;
        });

        // Set the HTML of the slide container
        slideContainer.innerHTML = slidesHTML;

        // Initialize Swiper after adding slides
        const swiper = new Swiper('.swiper', {
          // Optional parameters
          direction: 'horizontal',
          loop: true,
          slidesPerView: 'auto',
          autoplay: {
          delay: 4000, // Auto slide after 4 seconds
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
        })
      })
      .catch((error) => {
        console.error("Error fetching tasks: ", error);
      });
      // Function to calculate time lapse between two dates
      function getTimeLapse(startDate, endDate) {
        // Calculate the difference in milliseconds
        const difference = endDate.getTime() - startDate.getTime();

        // Convert milliseconds into days, hours, minutes, and seconds
        const millisecondsPerSecond = 1000;
        const millisecondsPerMinute = millisecondsPerSecond * 60;
        const millisecondsPerHour = millisecondsPerMinute * 60;
        const millisecondsPerDay = millisecondsPerHour * 24;

        // Calculate the elapsed time
        const days = Math.floor(difference / millisecondsPerDay);
        const hours = Math.floor((difference % millisecondsPerDay) / millisecondsPerHour);
        const minutes = Math.floor((difference % millisecondsPerHour) / millisecondsPerMinute);
        const seconds = Math.floor((difference % millisecondsPerMinute) / millisecondsPerSecond);

        return {
          days: days,
          hours: hours,
          minutes: minutes,
          seconds: seconds
        };
      }
       // Fetch all tasks and display in the browser table
        get(userTasksRef).then((snapshot) => {
          const taskTableBody = document.getElementById('tasks-table-body');
          taskTableBody.innerHTML = ''; // Clear previous data
          snapshot.forEach((childSnapshot) => {
            const task = childSnapshot.val();
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
        }).catch((error) => {
           console.error("Error fetching tasks: ", error);
          });  
       } else {
         // User is signed out
         console.log("User is signed out");
       }
    });
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
  const addNewForm =  document.getElementById('new-task-form-btn');
  const hideForm = document.getElementById('close');
  addNewForm.addEventListener('click', () => {
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

  // Send task form data to the Firebase database
const addNewTask = document.querySelector('.form');
addNewTask.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get values from input fields
  const taskTitle = document.getElementById('task_title').value.trim();
  const taskDescription = document.getElementById('text_area').value.trim();
  const startDate = document.getElementById('startTime').value.trim();
  const deadline = document.getElementById('endTime').value.trim();

  // Get selected values from dropdowns
  const priority = document.querySelector('.select-menu:nth-child(1) #text').textContent.trim();
  const status = document.querySelector('.select-menu:nth-child(2)  #option-name').textContent.trim();

  // Check if any field is empty
  if (taskTitle === '' || taskDescription === '' || startDate === '' || deadline === '' || priority === '' || status === '') {
    console.error("All fields are required.");
    return; // Prevent further execution
  }

  // Parse dates
  const startingDate = new Date(startDate);
  const dueDate = new Date(deadline);

  // Validate dates
  if (isNaN(startingDate.getTime()) || isNaN(dueDate.getTime())) {
    console.error("Invalid date format.");
    return; // Prevent further execution
  }
  // Check if start date is after due date
  if (startingDate > dueDate) {
    console.error("Start date cannot be after due date.");
    return; // Prevent further execution
  }
  // Push data to Firebase database
  const user = auth.currentUser;
  const userTasksRef = ref(db, 'users/' + user.uid + '/tasks');

  // Construct date strings in ISO format
  const startDateStringISO = startingDate.toISOString();
  const deadlineStringISO = dueDate.toISOString();

  push(userTasksRef, {
    taskTitle: taskTitle,
    taskDescription: taskDescription,
    startDate: startDateStringISO,
    deadline: deadlineStringISO,
    priority: priority,
    status: status
  })
  .then(() => {
    console.log("Data successfully written to the database.");
    addNewTask.reset();
    hideTaskForm();
  })
  .catch((error) => {
    console.error("Error writing data to the database: ", error);
  });
});
