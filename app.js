const projectNameInput = document.querySelector("#projectName");
const projectDateInput = document.querySelector("#projectDate");
const projectStatusInput = document.querySelector("#projectStatus");
const addProjectButton = document.querySelector("#addProject");

const taskNameInput = document.querySelector("#taskName");
const taskDateInput = document.querySelector("#taskDate");
const taskStatusInput = document.querySelector("#taskStatus");
const addTaskButton = document.querySelector("#addTask");

let customTaskIndex = -1;
let customProjectIndex = -1;
let appStorage = localStorage.getItem("appStorage") ?
    JSON.parse(localStorage.getItem('appStorage')) : [];

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

function createAProject() {
    appStorage.push(Project(projectNameInput.value, projectDateInput.value, projectStatusInput.value));
    localStorage.setItem("appStorage", JSON.stringify(appStorage));
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

addProjectButton.addEventListener("click", createAProject);
addTaskButton.addEventListener("click", createATask);

