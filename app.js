const taskListUl = document.querySelector("#taskList");
const addTaskButton = document.querySelector("#addTask");
const taskNameInput = document.querySelector("#taskName");
let tasksArray = localStorage.getItem("tasks") ?
JSON.parse(localStorage.getItem('tasks')) : [];
console.log(tasksArray);

tasksArray.forEach(addDomTask);

function addDomTask(value) {
   let listItem = document.createElement("li");
   listItem.textContent = value;
   taskListUl.appendChild(listItem);
}

function createATask() {
    tasksArray.push(taskNameInput.value);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    addDomTask(taskNameInput.value);
    taskNameInput.value = "";
}

addTaskButton.addEventListener("click", createATask);

