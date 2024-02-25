if (snapshot.exists()) {
    // Handle task data
    const tasks = snapshot.val();
    console.log(tasks);
    // Process tasks here
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${tasks.taskTitle}</td>
      <td>${tasks.taskDescription}</td>
      <td>${tasks.startDate}</td>
      <td>${tasks.deadline}</td>
      <td>${tasks.priority}</td>
      <td>${tasks.status}</td>
 `;
 taskTableBody.appendChild(row);
  
 console.log(`${tasks.taskTitle}`);

  } else {
    console.log("No tasks found for the user.");
  }
