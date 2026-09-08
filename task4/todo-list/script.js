const taskInput =
    document.getElementById("taskInput");

const addBtn =
    document.getElementById("addBtn");

const taskList =
    document.getElementById("taskList");

const emptyMessage =
    document.getElementById("emptyMessage");

const clearBtn =
    document.getElementById("clearBtn");


let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];


let currentFilter = "all";


// Save tasks to localStorage

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// Display tasks

function displayTasks() {

    taskList.innerHTML = "";


    let filteredTasks = tasks.filter(function(task) {

        if (currentFilter === "completed") {

            return task.completed;

        }

        if (currentFilter === "pending") {

            return !task.completed;

        }

        return true;

    });


    if (filteredTasks.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

    }


    filteredTasks.forEach(function(task) {

        const li =
            document.createElement("li");

        li.className = "task";


        if (task.completed) {

            li.classList.add("completed");

        }


        li.innerHTML = `

            <input
                type="checkbox"
                ${task.completed ? "checked" : ""}
            >

            <span>${task.text}</span>

            <button class="edit">
                Edit
            </button>

            <button class="delete">
                Delete
            </button>

        `;


        // Complete task

        li.querySelector("input")
            .addEventListener("change", function() {

                task.completed =
                    !task.completed;

                saveTasks();

                displayTasks();

            });


        // Delete task

        li.querySelector(".delete")
            .addEventListener("click", function() {

                tasks =
                    tasks.filter(function(item) {

                        return item.id !== task.id;

                    });

                saveTasks();

                displayTasks();

            });


        // Edit task

        li.querySelector(".edit")
            .addEventListener("click", function() {

                const newText =
                    prompt(
                        "Edit task:",
                        task.text
                    );


                if (
                    newText &&
                    newText.trim() !== ""
                ) {

                    task.text =
                        newText.trim();

                    saveTasks();

                    displayTasks();

                }

            });


        taskList.appendChild(li);

    });

}


// Add task

function addTask() {

    const text =
        taskInput.value.trim();


    if (text === "") {

        alert("Please enter a task.");

        return;

    }


    const task = {

        id: Date.now(),

        text: text,

        completed: false

    };


    tasks.push(task);


    saveTasks();


    taskInput.value = "";


    displayTasks();

}


// Add button

addBtn.addEventListener(
    "click",
    addTask
);


// Press Enter

taskInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            addTask();

        }

    }
);


// Filters

const filterButtons =
    document.querySelectorAll(".filter");


filterButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            currentFilter =
                button.dataset.filter;


            filterButtons.forEach(
                function(btn) {

                    btn.classList.remove("active");

                }
            );


            button.classList.add("active");


            displayTasks();

        }
    );

});


// Clear all tasks

clearBtn.addEventListener(
    "click",
    function() {

        if (tasks.length === 0) {

            return;

        }


        const confirmDelete =
            confirm(
                "Are you sure you want to delete all tasks?"
            );


        if (confirmDelete) {

            tasks = [];

            saveTasks();

            displayTasks();

        }

    }
);


// Load tasks when page opens

displayTasks();