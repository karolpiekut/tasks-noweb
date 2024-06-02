const taskList = document.querySelector("#taskList");
const addTaskButton = document.querySelector("#addTask");
const taskNameInput = document.querySelector("#taskName");
const projectNameInput = document.querySelector("#projectName");
const taskTextInput = document.querySelector("#taskText");
const taskDateInput = document.querySelector("#taskDate");
const taskStatusInput = document.querySelector("#taskStatus");
const clearLocalStorageButton = document.querySelector("#clearLocalStorage");
let customTaskIndex = -1;

let tasksArray = localStorage.getItem("tasks") ?
JSON.parse(localStorage.getItem('tasks')) : [];
console.table(tasksArray);

function Task(projectName, taskName, text, date, status) {
    customTaskIndex++;
    return {
        customTaskIndex,
        projectName,
        taskName,
        text,
        date,
        status,
    }
}

tasksArray.forEach(addDomTask);

function createATaskDiv(projectName, taskName, text, date, status) {
    const taskDiv = document.createElement('div');
    taskDiv.setAttribute('id', `taskID_${customTaskIndex}`);
    taskDiv.setAttribute('class', 'task');

    const projectNameText = document.createElement('h3');
    projectNameText.setAttribute('class', 'projectName');
    projectNameText.innerText = projectName;

    const taskNameText = document.createElement('h2');
    taskNameText.setAttribute('class', 'taskName');
    taskNameText.innerText = taskName;

    const textName = document.createElement('p');
    textName.setAttribute('class', 'textName');
    textName.innerText = text;

    const dateNameText = document.createElement('p');
    dateNameText.setAttribute('class', 'dateName');
    dateNameText.innerText = date;

    const statusNameText = document.createElement('p');
    statusNameText.setAttribute('class', 'statusName');
    statusNameText.innerText = status;

    const deleteTaskBtn = document.createElement('button');
    deleteTaskBtn.setAttribute('class', 'deleteTaskBtn');
    deleteTaskBtn.setAttribute('id', `delButtonID_${customTaskIndex}`)
    deleteTaskBtn.innerText = 'delete';

    taskDiv.appendChild(projectNameText);
    taskDiv.appendChild(taskNameText);
    taskDiv.appendChild(textName);
    taskDiv.appendChild(dateNameText);

    taskDiv.appendChild(statusNameText);
    taskDiv.appendChild(deleteTaskBtn);

    return taskDiv;
}



function addDomTask(projectName, taskName, text, date, status) {
   taskList.appendChild(createATaskDiv(projectName, taskName, text, date, status))
}

function createATask() {
    let tempTask = Task(projectNameInput.value, taskNameInput.value, taskTextInput.value, taskDateInput.value, taskStatusInput.value);

    tasksArray.push(tempTask);
    //tasksArray.push(taskNameInput.value);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    addDomTask(projectNameInput.value, taskNameInput.value, taskTextInput.value, taskDateInput.value, taskStatusInput.value);
    taskNameInput.value = "";
}

function clearLocalStorage() {
    localStorage.clear();
    taskList.textContent = "";
}

addTaskButton.addEventListener("click", createATask);

clearLocalStorageButton.addEventListener("click", clearLocalStorage);

