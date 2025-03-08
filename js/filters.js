function showAllTasks(filters, tasksArr, filterStatus) {
  for (let i of filters) i.classList.remove("focus");
  localStorage.setItem("filterStatus", filterStatus);
  let filterElement = document.querySelector(`.${filterStatus}`);

  filterElement.classList.add("focus");
  tasksArr.forEach((e) => {
    let taskId = e.id;
    let taskParent = document.getElementById(taskId);

    if (taskParent) {
      taskParent.style.display = "flex";
    }
  });
}

function filterTasks(filters, tasksArr, status, filterStatus) {
  for (let i of filters) i.classList.remove("focus");

  localStorage.setItem("filterStatus", filterStatus);
  let filterElement = document.querySelector(`.${filterStatus}`);

  filterElement.classList.add("focus");

  tasksArr.forEach((e) => {
    let taskId = e.id;
    let taskParent = document.getElementById(taskId);

    if (taskParent) {
      e.status == status
        ? (taskParent.style.display = "flex")
        : (taskParent.style.display = "none");
    }
  });
}

function updateFilters(filterStatus, filters, tasksArr) {
  if (filterStatus == "all") showAllTasks(filters, tasksArr, filterStatus);
  else if (filterStatus == "active")
    filterTasks(filters, tasksArr, "pending", filterStatus);
  else if (filterStatus == "complete")
    filterTasks(filters, tasksArr, "completed", filterStatus);
}
