// Attach click event listener to navigation links
const listItems = document.querySelectorAll('.navigation ul li');
listItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove 'active' class from all list items
        listItems.forEach(li => li.classList.remove('active'));
        // Add 'active' class to the clicked list item
        item.classList.add('active');
    });
});
function showToast(message) {
  var toast = document.getElementById("toast");
  var toastMessage = document.getElementById("toast-message");
  toastMessage.innerText = message;
  toast.style.opacity = 1;
    setTimeout(function(){
      toast.style.opacity = 0;
    }, 3000); // Adjust the duration of the toast
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
import { getDatabase, push, ref,remove,set,update,
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


  function login(email, password) {
    // Your login logic here
    // Assume login is successful
    showToast("Login successful! Welcome");
  }
  login();

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
       const statusToQuery = 'In Progress'; // Corrected to match the status in the database
       const tasksRef = ref(db, `users/${userId}/tasks`);

       // Query to filter tasks where status is "On Progress"
       const ongoingTasksQuery = query(tasksRef, orderByChild('status'), equalTo(statusToQuery));

       // Retrieve data based on the query
       get(ongoingTasksQuery).then((snapshot) => {
          const totalTasks = snapshot.size;
          const userOngoingTasks = document.getElementById('ongoingTasks');
          userOngoingTasks.textContent = totalTasks.toString();
          console.log("ongoing tasks", totalTasks)
           if (snapshot.exists()) {
            // Container element to hold the tasks
            const taskContainer = document.getElementById('task-container');
            // Clear previous results
            taskContainer.innerHTML = ''
               // Iterate through the snapshot and log or process each task
               snapshot.forEach((taskSnapshot) => {
                   const task = taskSnapshot.val();
                   const deadline = new Date(task.deadline);
                   console.log(task);
                   // Process the task data as needed
                   const taskElement = document.createElement('div');
                   taskElement.classList.add('task');
                   taskElement.innerHTML = `
                      <h3 class="task-title">${task.taskTitle}</h3>
                      <p class="task-description">${task.taskDescription}</p>
                      <p class = "endDate"><strong>Deadline:</strong> ${deadline.toLocaleString().substring(0, deadline.toLocaleString().length - 6)}</p>
                      <p class = "status">${task.status}</p>
                    `;
                   taskContainer.appendChild(taskElement);
               });
           } else {
               console.log("No In Progress tasks found...");
               const taskContainer = document.getElementById('task-container');
               // Clear previous results
               taskContainer.innerHTML = ''
               const nilOngoingTask = document.createElement('div');
               nilOngoingTask.classList.add('on-progress-nil');
               nilOngoingTask.innerHTML = 'No In Progress Tasks Found add some to display';
               taskContainer.appendChild(nilOngoingTask);
           }
       }).catch((error) => {
           console.error("Error retrieving ongoing tasks: ", error);
      });
      // Fetch tasks to display in the slide widget
      get(userTasksRef)
      .then((snapshot) => {
        const slideContainer = document.getElementById('slide');
        let slidesHTML = ''; // Initialize a string to store HTML of all slides

        // Loop through the snapshot to generate slide HTML
        if(snapshot.exists()){
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
                <div class = "taskDates">
                  <p>Start Date: ${startDate.toLocaleString().substring(0, startDate.toLocaleString().length - 6)}</p>
                  <p>Deadline: ${deadline.toLocaleString().substring(0, deadline.toLocaleString().length - 6)}</p>
                </div>
                <!-- Display time lapse -->
                <p class = "count-down-header"> Task Time Lapse</p>
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
                  <h4 class="id">${childSnapshot.key}</h4>
                  <h4 class="task-title">${task.taskTitle}</h4>
                </div>
                <div class="card-description">
                  <p>${task.taskDescription}</p>
                </div>
                <div class="card-action">
                  <p>${task.status}</p>
                  <input type="button" value="view" class="input">
                </div>
                </div>
              </div>`;
          });
          document.addEventListener('DOMContentLoaded', () => {
            // Animate the dashoffset for each circle element
            animateDashOffset('dd', startDate, deadline);
            animateDashOffset('hh', startDate, deadline);
            animateDashOffset('mm', startDate, deadline);
            animateDashOffset('ss', startDate, deadline);
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
          delay: 6000, // Auto slide after 4 seconds
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
      }else {
        console.log('no tasks available');
        const noTasks = document.createElement('div');
        noTasks.classList.add('nilTask');
        noTasks.innerHTML = 'No tasks available Please add your tasks';
        slideContainer.appendChild(noTasks); // Append the noTasks element to the document body
      }

      }).catch((error) => {
          console.error("Error fetching tasks: ", error);
        });
      function animateDashOffset(circleId, startDate, deadline) {
        const circle = document.getElementById(circleId);
        if (!circle) {
            console.error(`Circle element with ID '${circleId}' not found.`);
            return;
        }
        const length = circle.getTotalLength();
        const elapsedTime = (new Date()).getTime() - startDate.getTime(); // Current time - start time
        const progress = elapsedTime / (deadline.getTime() - startDate.getTime());
        const dashoffset = length * (1 - progress);
        circle.style.strokeDashoffset = dashoffset;
        const color = getColor(progress); // Get color based on progress
        const dasharray = length + ' ' + length;
        circle.style.strokeDasharray = dasharray;
        circle.style.strokeDashoffset = dashoffset;

      };
      function getColor(progress) {
        // Define colors for different progress values
        const colors = [
            '#7f11c4',
            '#61d81c',
            '#0ef',
            '#2987a3',
        ];
        // Calculate color index based on progress
        const colorIndex = Math.floor(progress * (colors.length - 1));
        return colors[colorIndex];
    }
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
          const totalTasks = snapshot.size;
          const usertotalTasks = document.getElementById('totalTasks');
          usertotalTasks.textContent = totalTasks.toString();
          console.log("Total tasks", totalTasks)
          const taskTableBody = document.getElementById('tasks-table-body');
          taskTableBody.innerHTML = ''; // Clear previous data
          let index = 1;
          if(snapshot.exists()){
            snapshot.forEach((childSnapshot) => {
              const task = childSnapshot.val();
              // Calculate time lapse
              const startDate = new Date(task.startDate);
              const deadline = new Date(task.deadline);
              // Process each task here
              const row = document.createElement('tr');
              row.innerHTML = `
                <td>${index}</td>
                <td>${childSnapshot.key}</td>
                <td>${task.taskTitle}</td>
                <td>${task.taskDescription}</td>
                <td>${task.priority}</td>
                <td>${startDate.toLocaleString().substring(0, startDate.toLocaleString().length - 6)}</td>
                <td>${deadline.toLocaleString().substring(0, deadline.toLocaleString().length - 6)}</td>
                <td class = "task-status">${task.status}</td>
                <td>
                  <div><ion-icon name="trash-outline" id = "deleteTaskBtn"></ion-icon>
                    <ion-icon name="create-outline" id = "editTaskBtn"></ion-icon>
                    <ion-icon name="eye-outline" id = "startTaskBtn"></ion-icon>
                  </div>
                </td>
              `;
              row.setAttribute('data-task-key', childSnapshot.key);
              row.querySelectorAll('td').forEach(td => {
                td.style.width = '100%';
              });
              taskTableBody.appendChild(row);
              index++;
            });
          }else{
             // If there are no tasks
              const row = document.createElement('tr');
              row.innerHTML = '<td colspan="8">No tasks available</td>'; // Colspan to span across all columns
              row.querySelectorAll('td').forEach(td => {
                td.style.width = '100%';
                td.style.textAlign = 'center';
              });
              taskTableBody.appendChild(row);
          }
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
    location.reload();
    document.getElementById('home').scrollIntoView();
  })
  .catch((error) => {
    console.error("Error writing data to the database: ", error);
  });
});
document.addEventListener('DOMContentLoaded', function() {
  // Listen for changes in authentication state
  onAuthStateChanged(auth, function(user) {
    if (user) {
      const userId = user.uid;
      const tasksRef = ref(db, `users/${userId}/tasks`);
      // Add event listener to the table body and listen for clicks on the delete icon
      const taskTableBody = document.getElementById('tasks-table-body');
      taskTableBody.addEventListener('click', function(event) {
          // Check if the clicked element is the delete icon
          if (event.target && event.target.id === 'deleteTaskBtn') {
              console.log('Delete button clicked');
              // Get the task key from the parent row
              const row = event.target.closest('tr');
              const taskKey = row.getAttribute('data-task-key');

              const confirmationForm = document.getElementById('deleteConfirmationForm');
              confirmationForm.style.display = 'block'
              // Use the task key to create a reference to the specific task in the database
              // Event listener for the confirm deletion button
              document.getElementById('confirmDeleteBtn').addEventListener('click', function() {
                // Use the task key to create a reference to the specific task in the database
                const taskRef = child(tasksRef, taskKey);
                remove(taskRef)
                    .then(() => {
                        console.log('Task deleted successfully');
                        // Optionally, remove the row from the table
                        row.remove();
                        // Hide the confirmation form
                        confirmationForm.style.display = 'none';
                    })
                    .catch(error => {
                        console.error('Error deleting task:', error);
                        // Hide the confirmation form
                        confirmationForm.style.display = 'none';
                    });
            });

  // Event listener for the cancel button
  document.getElementById('cancelDeleteBtn').addEventListener('click', function() {
      // Hide the confirmation form
      confirmationForm.style.display = 'none';
  });
          }else if(event.target && event.target.id === 'editTaskBtn') {
              console.log('Edit button clicked');
              // Get the task key from the parent row
              const row = event.target.closest('tr');
              const taskKey = row.getAttribute('data-task-key');
              // Retrieve the task data from the database
              const taskRef = child(tasksRef, taskKey);
              get(taskRef).then((snapshot) => {
                  const taskData = snapshot.val();
                  const taskKey = snapshot.key;
                  // Call the function to display the edit form with the task data
                  console.log(taskData);
                  displayEditForm(taskData, taskKey);
              }).catch((error) => {
                  console.error('Error getting task data:', error);
              });
          }else if(event.target && event.target.id === 'startTaskBtn') {
            const row = event.target.closest('tr');
              const taskKey = row.getAttribute('data-task-key');
              // Retrieve the task data from the database
              const taskRef = child(tasksRef, taskKey);
              get(taskRef).then((snapshot) => {
                  const taskData = snapshot.val();
                  const taskKey = snapshot.key;
                  // Call the function to display the edit form with the task data
                  console.log(taskData);
                  displayStartTaskForm(taskData, taskKey);
                  startTaskBtnClickHandler();
              }).catch((error) => {
                  console.error('Error getting task data:', error);
              });
          }
      })
    } else {
      console.log('No user is currently signed in.');
    }
  });
});
// Function to display the edit form with the task data
function displayEditForm(taskData, taskKey) {
  const editFormContainer = document.querySelector('.edit-form-container');
  const taskIdInput = editFormContainer.querySelector('#task-Id');
  const taskNameInput = editFormContainer.querySelector('#task-name');
  const taskDescriptionInput = editFormContainer.querySelector('#task-description');
  const taskStartTimeInput = editFormContainer.querySelector('#task-start-time');
  const taskDueTimeInput = editFormContainer.querySelector('#task-due-time');

  taskIdInput.value = taskKey;
  taskNameInput.value = taskData.taskTitle;
  taskDescriptionInput.value = taskData.taskDescription;
  taskStartTimeInput.value = taskData.startDate;
  taskDueTimeInput.value = taskData.deadline;

  taskIdInput.disabled = true;
  taskStartTimeInput.disabled = true;
  taskDueTimeInput.disabled = true;

  editFormContainer.style.display = 'block';

  const editForm = editFormContainer.querySelector('form');
  editForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const updatedTaskData = {
          taskTitle: taskNameInput.value,
          taskDescription: taskDescriptionInput.value,
          startDate: taskStartTimeInput.value,
          deadline: taskDueTimeInput.value
          // Add other properties as needed
      };
      updateTask(taskKey, updatedTaskData);
  });

  const closeButton = editFormContainer.querySelector('#closeBtn');
  closeButton.addEventListener('click', function() {
      editFormContainer.style.display = 'none';
  });
}

function updateTask(taskKey, updatedTaskData) {
  const userId = auth.currentUser.uid;
  const taskRef = ref(db, `users/${userId}/tasks/${taskKey}`);
  // Retrieve the existing task data
  get(taskRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        // Get the existing data
        const existingData = snapshot.val();

        // Merge updated fields with existing data
        const mergedData = { ...existingData, ...updatedTaskData }
        // Update the task data with merged data
        set(taskRef, mergedData)
          .then(() => {
            console.log('Task data updated successfully');
            // Optionally provide user feedback here
            document.getElementById('startTaskPopupConfirmation').style.visibility = 'hidden';
            location.reload();
          })
          .catch((error) => {
            console.error('Error updating task data:', error);
            // Handle error if needed, e.g., display an error message to the user
          });
      } else {
        console.error('Task does not exist');
        // Handle the case where the task does not exist
      }
    })
    .catch((error) => {
      console.error('Error retrieving task data:', error);
      // Handle error if needed
    });
}
function displayStartTaskForm(taskData, taskKey) {
  const startTaskFormContainer = document.querySelector('.edit-form-container-2');
  const taskIdInput = startTaskFormContainer.querySelector('#task-Id');
  const taskStartTimeInput = startTaskFormContainer.querySelector('#task-start-time');
  const taskDueTimeInput = startTaskFormContainer.querySelector('#task-due-time');

  taskIdInput.value = taskKey;
  const timeZone = 'Africa/Nairobi';
  const currentDateTime = new Date().toLocaleString('en-US', {timeZone:  timeZone, hour12: false}).slice(0, 16);
  taskStartTimeInput.value = currentDateTime;
  taskDueTimeInput.value = taskData.deadline;

  taskIdInput.disabled = true;
  taskStartTimeInput.disabled = true;

  const startTaskForm = startTaskFormContainer.querySelector('#start-task-form');
  startTaskForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const updatedTaskData = {
          deadline: taskDueTimeInput.value,
          startDate: taskStartTimeInput.value
          // Add other properties as needed
      };
      startTask(taskKey, updatedTaskData);
  });

  const closeButton = document.querySelector('#closeBtn');
  closeButton.addEventListener('click', function() {
    startTaskFormContainer.style.display = 'none';
  });
}
function startTask(taskKey, updatedTaskData) {
  const userId = auth.currentUser.uid;
  const taskRef = ref(db, `users/${userId}/tasks/${taskKey}`);
  // Retrieve the existing task data
  get(taskRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        // Get the existing data
        const existingData = snapshot.val();

        // Merge updated fields with existing data
        const mergedData = { ...existingData, ...updatedTaskData };
         // Parse dates
         const startingDate = new Date(mergedData.startDate);
         const dueDate = new Date(mergedData.deadline);
 
         // Validate dates
         if (isNaN(startingDate.getTime()) || isNaN(dueDate.getTime())) {
           console.error("Invalid date format.");
           return; // Prevent further execution
         }
         // Check if start date is after due date
         if (startingDate > dueDate) {
          showToast("Start date cannot be after due date.");
           return; // Prevent further execution
         }
          if (startingDate <= dueDate) {
            // Update the task data with merged data
            set(taskRef, { ...mergedData, status: 'In Progress'})
              .then(() => {
                console.log('Task status updated successfully');
                document.getElementById('startTaskPopupConfirmation').style.visibility = 'hidden';
                // Optionally provide user feedback here
                console.log("Updated: " + taskRef);
              })
              .catch((error) => {
                console.error('Error updating task data:', error);
                // Handle error if needed, e.g., display an error message to the user
              });
            }
          } else {
            console.error('Task does not exist');
            // Handle the case where the task does not exist
          }
        })
        .catch((error) => {
          console.error('Error retrieving task data:', error);
          // Handle error if needed
        });
      
}
function startTaskBtnClickHandler() {
  // Show confirmation popup
  document.getElementById('startTaskPopupConfirmation').style.visibility = 'visible';

  document.getElementById('cancelBtn').addEventListener('click', function() {
  // Hide the popup if cancel is clicked
  document.getElementById('startTaskPopupConfirmation').style.visibility = 'hidden';
  });
}










