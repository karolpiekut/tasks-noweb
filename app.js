const projectNameInput = document.querySelector("#projectName");
const projectDateInput = document.querySelector("#projectDate");
const projectStatusInput = document.querySelector("#projectStatus");
const addProjectButton = document.querySelector("#addProject");
const activeProjectsList = document.querySelector("#activeProjects");

const taskNameInput = document.querySelector("#taskName");
const taskDateInput = document.querySelector("#taskDate");
const taskStatusInput = document.querySelector("#taskStatus");
const addTaskButton = document.querySelector("#addTask");

let customTaskIndex = -1;
let customProjectIndex = -1;
let appStorage = localStorage.getItem("appStorage") ?
    JSON.parse(localStorage.getItem('appStorage')) : [];

function displayProjectList() {
    for (let i in appStorage){
        const projectItem = document.createElement("h5");
        projectItem.classList.add("projectListSelect");
        projectItem.innerText = appStorage[i].projectName;
        activeProjectsList.appendChild(projectItem);
    }
}

function Project(projectName, dueDate, status) {
    customProjectIndex++;
    let archiveStatus = 0;
    return {
        customProjectIndex,
        projectName,
        dueDate,
        status,
        archiveStatus,
        taskList: [],
    }
}

function createAProject() {
    if (projectNameInput.value === "") {
        alert("Please enter a valid name");
    } else {
        appStorage.push(Project(projectNameInput.value, projectDateInput.value, projectStatusInput.value));
        localStorage.setItem("appStorage", JSON.stringify(appStorage));
        createAProjectDom(projectNameInput.value);
        projectNameInput.value = "";
    }
}

function createAProjectDom(projectName) {
    const projectItem = document.createElement("h5");
    projectItem.classList.add("projectListSelect");
    projectItem.innerText = projectName;
    activeProjectsList.appendChild(projectItem);
}

function Task(taskName, date, status) {
    customTaskIndex++;
    return {
        customTaskIndex,
        taskName,
        date,
        status,
    }
}

function createATask() {
    //appStorage[projectId].taskList.push(Task(taskNameInput.value, taskDateInput.value, taskStatusInput.value));
    appStorage[0].taskList.push(Task(taskNameInput.value, taskDateInput.value, taskStatusInput.value));
    localStorage.setItem("appStorage", JSON.stringify(appStorage));
}

function removeTask(projectId, taskId) {
    appStorage[projectId].taskList.splice(taskId, 1);
    localStorage.setItem("appStorage", JSON.stringify(appStorage));
}

function removeProject(projectId) {
    appStorage.splice(projectId, 1);
    localStorage.setItem("appStorage", JSON.stringify(appStorage));
}

function amendProjectDetails(projectId, property, newValue) {
    appStorage[projectId][property] = newValue;
    localStorage.setItem("appStorage", JSON.stringify(appStorage));
}

function amendTaskDetails(projectId, taskId, property, newValue) {
    appStorage[projectId].taskList[taskId][property] = newValue;
    localStorage.setItem("appStorage", JSON.stringify(appStorage));
}

function clearLocalStorage() {
    localStorage.clear();
}

function openForm() {
    document.getElementById("projectEntry").style.display = "block";
}

function closeForm() {
    document.getElementById("projectEntry").style.display = "none";
}

displayProjectList()
addProjectButton.addEventListener("click", createAProject);
addTaskButton.addEventListener("click", createATask);

