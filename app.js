document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Load tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${task}</span>
                <button class="delete-button" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(li);
        });

        // Add event listeners for delete buttons
        const deleteButtons = document.querySelectorAll(".delete-button");
        deleteButtons.forEach((button) => {
            button.addEventListener("click", deleteTask);
        });
    }

    // Function to add a new task
    function addTask() {
        const newTask = taskInput.value.trim();
        if (newTask !== "") {
            tasks.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskInput.value = "";
            renderTasks();
        }
    }

    // Function to delete a task
    function deleteTask(event) {
        const index = event.target.getAttribute("data-index");
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }

    // Event listener for adding a new task
    addTaskBtn.addEventListener("click", addTask);

    // Initial rendering of tasks
    renderTasks();
});
