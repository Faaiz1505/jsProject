document.addEventListener("DOMContentLoaded", function () {
  // Wait for the DOM to load before running the script
  const todoInput = document.getElementById("todo-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Get tasks from local storage and parse it to JSON, if it's null, set it to an empty array

  tasks.forEach((task) => renderTask(task)); // Render each task from the tasks array and pass it to the renderTask function

  addTaskBtn.addEventListener("click", () => {
    const tasktext = todoInput.value.trim(); // Remove whitespace from the input after the user clicks the button

    if (tasktext === "") return; // If the input is empty, do nothing

    const newtask = {
      id: Date.now(),
      text: tasktext,
      completed: false,
    }; // Create a new task object
    tasks.push(newtask);
    saveTasks(); // Save tasks to local storage
    renderTask(newtask); // Render the new task
    todoInput.value = ""; // Clear the input field
    console.log(tasks); // Debugging to see the tasks array
  });

  function renderTask(task) {
    //console.log(task.text); // Debugging to see the task text
    const li = document.createElement("li"); // Create a new list item element for each task
    li.setAttribute("data-id", task.id); // Set the data-id attribute to the task id

    if (task.completed) li.classList.add("completed"); // If the task is completed, add the completed class to the list item

    li.innerHTML = `
    <span>${task.text}</span>
    <button>Delete</button>`; // Set the inner HTML of the list item

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return; // If the target element is a button, do nothing
      task.completed = !task.completed; // Toggle the completed property of the task object when the list item is clicked
      li.classList.toggle("completed"); // Toggle the completed class of the list item
      saveTasks(); // Save tasks to local storage
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); // prevent toggling the completed class when the button is clicked
      tasks = tasks.filter((t) => t.id !== task.id); // Filter out the task from the tasks array
      li.remove(); // Remove the list item from the DOM
      saveTasks(); // Save tasks to local storage
    });

    todoList.appendChild(li); // Append the list item to the todo list
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } // Save tasks to local storage and stringify it
}); // End of DOMContentLoaded event listener
