const taskList = document.querySelector("#taskList");

//project selectors
const projectNameInput = document.querySelector("#projectName");
const projectDateInput = document.querySelector("#projectDate");
const projectStatusInput = document.querySelector("#projectStatus");
const availableProjects = document.querySelector("#availableProjects");

//task selectors
const taskNameInput = document.querySelector("#taskName");
const taskTextInput = document.querySelector("#taskText");
const taskDateInput = document.querySelector("#taskDate");
const taskStatusInput = document.querySelector("#taskStatus");

//button selectors
const addProjectButton = document.querySelector("#addProject");
const addTaskButton = document.querySelector("#addTask");
const clearLocalStorageButton = document.querySelector("#clearLocalStorage");

//---------------------------------------------------------------------------
let customTaskIndex = -1;
let customProjectIndex = -1;

let appStorage = localStorage.getItem("appStorage") ?
    JSON.parse(localStorage.getItem('appStorage')) : [];

//------------------------DOM------------------------
// for (let i in appStorage) {
//     let nameOption = document.createElement("option");
//     nameOption.value = appStorage[i].projectName;
//     availableProjects.appendChild(nameOption);
// }

appStorage.forEach((item) => addDomTask(item.projectName, item.taskName, item.text, item.date, item.status));
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

//------------------------BACK-----------------------

function Project(projectName, dueDate, status) {
    customProjectIndex++;
    return {
        customProjectIndex,
        projectName,
        dueDate,
        status,
        taskList: [],
    }
}

function Task(taskName, text, date, status) {
    customTaskIndex++;
    return {
        customTaskIndex,
        taskName,
        text,
        date,
        status,
    }
}

function createAProject() {
    appStorage.push(Project(projectNameInput.value, projectDateInput.value, projectStatusInput.value));
    localStorage.setItem("appStorage", JSON.stringify(appStorage));
    projectNameInput.value = "";
}

function createATask() {
    appStorage[0].taskList.push(Task(taskNameInput.value, taskTextInput.value, taskDateInput.value, taskStatusInput.value));
    localStorage.setItem("appStorage", JSON.stringify(appStorage));
    addDomTask(projectNameInput.value, taskNameInput.value, taskTextInput.value, taskDateInput.value, taskStatusInput.value);
    taskNameInput.value = "";
}

function clearLocalStorage() {
    localStorage.clear();
    taskList.textContent = "";
}
addTaskButton.addEventListener("click", createATask);
addProjectButton.addEventListener("click", createAProject);
clearLocalStorageButton.addEventListener("click", clearLocalStorage);

// function removeTask(array, taskId) {
//     return array.splice(taskId, 1);
// }
