let inputField = document.querySelector(".input-field input");
let addTaskBtn = document.querySelector("#btn");
let tasksContainer = document.querySelector(".tasks-container");
let itemsCounter = document.querySelector(".filter-container p");
let filters = document.getElementsByTagName("h4");
let filterStatus = "all";
let colorMode = document.querySelector(".dark-light-mode");
let body = document.querySelector("body");
let backgroundImg = document.querySelector(".background-img img");
let root = document.documentElement;
let colorType = colorMode.classList;

let tasks = [];

itemsCounter.textContent = `Total Items ${tasks.length}`;

inputField.focus();

// getting the theme if located in localStorage
if (localStorage.getItem("mode")) {
  colorType.replace(colorType.item(1), localStorage.getItem("mode"));
}

// getting the theme from localStorage
currentMode(colorType, root, backgroundImg, colorMode);

// changing the theme and updating it to localStorage
colorMode.addEventListener("click", (_) =>
  darkLightMode(colorType, root, backgroundImg, colorMode)
);

// checking and getting the array of tasks and filterStatus from the localStorage
if (getLocalStorage()) {
  tasks = getLocalStorage();
  filterStatus = localStorage.getItem("filterStatus");
  updateUi(tasks, tasksContainer, itemsCounter, filterStatus, filters);
} else {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

inputField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    let userInput = inputField.value;
    if (userInput.length > 0) {
      addTask(
        userInput,
        tasks,
        tasksContainer,
        itemsCounter,
        filterStatus,
        filters
      );
      inputField.value = "";
      itemsCounter.textContent = `Total Items ${tasks.length}`;
    }
  }
});

addTaskBtn.addEventListener("click", function (e) {
  let userInput = inputField.value;
  if (userInput.length > 0) {
    addTask(
      userInput,
      tasks,
      tasksContainer,
      itemsCounter,
      filterStatus,
      filters
    );
    inputField.value = "";
  }
});

document.addEventListener("click", (e) => {
  let taskTarget = e.target;

  if (taskTarget.classList.contains("all")) {
    filterStatus = "all";
    showAllTasks(filters, tasks, filterStatus);
  } else if (taskTarget.classList.contains("active")) {
    // Shows all pending tasks
    filterStatus = "active";
    filterTasks(filters, tasks, "pending", filterStatus);
  } else if (taskTarget.classList.contains("complete")) {
    // Shows all completed tasks
    filterStatus = "complete";
    filterTasks(filters, tasks, "completed", filterStatus);
  }

  // Delete Task
  if (taskTarget.classList.contains("delete")) {
    removeTask(
      taskTarget,
      tasks,
      tasksContainer,
      itemsCounter,
      filterStatus,
      filters
    );
  }

  // Edit Task
  if (taskTarget.classList.contains("edit")) {
    editTask(
      taskTarget,
      tasks,
      tasksContainer,
      itemsCounter,
      filterStatus,
      filters
    );
  }

  // mark as complete or pending
  if (
    taskTarget.classList.contains("circle") ||
    taskTarget.classList.contains("circle-parent")
  ) {
    markCompleteOrPending(taskTarget, tasks);
    updateFilters(filterStatus, filters, tasks);
  }
});
