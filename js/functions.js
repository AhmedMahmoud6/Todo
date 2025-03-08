taskIdCounter = 0;

function addTask(
  userInput,
  tasksArr,
  tasksContainer,
  itemsCounter,
  filterStatus,
  filters
) {
  let taskObj = {
    id: ++taskIdCounter,
    title: userInput,
    status: "pending",
  };

  tasksArr.push(taskObj);
  localStorage.setItem("tasks", JSON.stringify(tasksArr));

  // tasksArr.forEach((e) => {
  //   localStorage.setItem(`task${taskIdCounter}`, JSON.stringify(e));
  // });

  updateUi(tasksArr, tasksContainer, itemsCounter, filterStatus, filters);
}

function removeTask(
  targetTask,
  tasksArr,
  tasksContainer,
  itemsCounter,
  filterStatus,
  filters
) {
  let taskId = targetTask.id;

  let taskIndex = tasksArr.findIndex((ele) => ele.id == taskId);

  if (taskIndex != -1) {
    tasksArr.splice(taskIndex, 1);
  }
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
  updateUi(tasksArr, tasksContainer, itemsCounter, filterStatus, filters);
}

function editTask(
  targetTask,
  tasksArr,
  tasksContainer,
  itemsCounter,
  filterStatus,
  filters
) {
  let taskParent = targetTask.closest(".task-parent");
  let taskId = targetTask.id;
  let taskText = taskParent.querySelector(".task p");

  let input = document.createElement("input");
  input.type = "text";
  input.value = taskText.textContent;
  input.classList.add("edit-input");

  taskText.replaceWith(input);
  input.focus();

  // update the text in UI and the tasks array
  function saveEdit() {
    let updatedText = input.value.trim();
    if (updatedText.length > 0) {
      let taskIndex = tasksArr.findIndex((task) => task.id == taskId);
      if (taskIndex !== -1) {
        tasksArr[taskIndex].title = updatedText;
      }
    }
    localStorage.setItem("tasks", JSON.stringify(tasksArr));
    updateUi(tasksArr, tasksContainer, itemsCounter, filterStatus, filters);
  }

  input.addEventListener("blur", saveEdit);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") saveEdit();
  });
}

function updateUi(
  tasksArr,
  tasksContainer,
  itemsCounter,
  filterStatus,
  filters
) {
  tasksContainer.innerHTML = "";
  itemsCounter.textContent = `Total Items ${tasks.length}`;
  tasksArr.forEach((element) => {
    let newTaskParent = document.createElement("div");
    newTaskParent.setAttribute("class", "task-parent");
    newTaskParent.setAttribute("id", element.id);
    newTaskParent.setAttribute("status", element.status);

    let circleParent = document.createElement("div");
    circleParent.setAttribute("class", "circle-parent");
    circleParent.setAttribute("id", element.id);

    let circleSpan = document.createElement("span");
    circleSpan.setAttribute("class", "circle");
    circleSpan.setAttribute("id", element.id);
    circleParent.appendChild(circleSpan);

    let newTask = document.createElement("div");
    newTask.setAttribute("class", "task");

    let newTaskP = document.createElement("p");
    newTaskP.setAttribute("title", element.title);
    newTaskP.textContent = element.title;

    let options = document.createElement("div");
    options.setAttribute("class", "options");

    let editOption = document.createElement("span");
    let deleteOption = document.createElement("span");
    editOption.setAttribute("class", "edit");
    editOption.setAttribute("id", element.id);
    deleteOption.setAttribute("class", "delete");
    deleteOption.setAttribute("id", element.id);

    options.append(editOption, deleteOption);

    newTask.append(newTaskP, options);

    newTaskParent.append(circleParent, newTask);

    tasksContainer.appendChild(newTaskParent);

    updateFilters(filterStatus, filters, tasksArr);
  });
}

function markCompleteOrPending(targetTask, tasksArr) {
  let taskParent = targetTask.closest(".task-parent");
  let taskId = targetTask.id;

  let taskIndex = tasksArr.findIndex((task) => task.id == taskId);

  if (taskIndex !== -1) {
    tasksArr[taskIndex].status =
      tasksArr[taskIndex].status === "pending" ? "completed" : "pending";
    taskParent.setAttribute("status", tasksArr[taskIndex].status);
  }

  localStorage.setItem("tasks", JSON.stringify(tasksArr));
}

function getLocalStorage() {
  let storedTasks = localStorage.getItem("tasks");

  if (storedTasks) {
    storedTasks = JSON.parse(storedTasks);
    return storedTasks;
  }
}

function darkLightMode(colorType, root, backgroundImg, colorMode) {
  if (colorType.item(1) == "dark") {
    // light mode
    root.style.setProperty("--body-color", "#fafafa");
    root.style.setProperty("--tasks-color", "#f1f1f1");
    root.style.setProperty("--text-color", "hsl(0, 0.00%, 0.00%)");
    backgroundImg.src = "images/bg-desktop-light.jpg";
    colorMode.classList.remove("dark");
    colorMode.classList.add("light");
    localStorage.setItem("mode", "light");
    colorType.replace(colorType.item(1), localStorage.getItem("mode"));
  } else {
    // dark mode
    root.style.setProperty("--body-color", "hsl(235, 21%, 11%)");
    root.style.setProperty("--tasks-color", "hsl(235, 24%, 19%)");
    root.style.setProperty("--text-color", "hsl(236, 33%, 92%)");
    backgroundImg.src = "images/bg-desktop-dark.jpg";
    colorMode.classList.remove("light");
    colorMode.classList.add("dark");
    localStorage.setItem("mode", "dark");
    colorType.replace(colorType.item(1), localStorage.getItem("mode"));
  }
}

function currentMode(colorType, root, backgroundImg, colorMode) {
  if (colorType.item(1) == "light") {
    // light mode
    root.style.setProperty("--body-color", "#fafafa");
    root.style.setProperty("--tasks-color", "#f1f1f1");
    root.style.setProperty("--text-color", "hsl(0, 0.00%, 0.00%)");
    backgroundImg.src = "images/bg-desktop-light.jpg";
    colorMode.classList.remove("dark");
    colorMode.classList.add("light");
    localStorage.setItem("mode", "light");
    colorType.replace(colorType.item(1), localStorage.getItem("mode"));
  } else {
    // dark mode
    root.style.setProperty("--body-color", "hsl(235, 21%, 11%)");
    root.style.setProperty("--tasks-color", "hsl(235, 24%, 19%)");
    root.style.setProperty("--text-color", "hsl(236, 33%, 92%)");
    backgroundImg.src = "images/bg-desktop-dark.jpg";
    colorMode.classList.remove("light");
    colorMode.classList.add("dark");
    localStorage.setItem("mode", "dark");
    colorType.replace(colorType.item(1), localStorage.getItem("mode"));
  }
}
