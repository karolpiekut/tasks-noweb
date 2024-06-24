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

function createAProject(projectNameInput, projectDateInput, projectStatusInput) {
    appStorage.push(Project(projectNameInput, projectDateInput, projectStatusInput));
    localStorage.setItem("appStorage", JSON.stringify(appStorage));
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

function createATask(taskId, taskNameInput, taskTextInput, taskDateInput, taskStatusInput) {
    appStorage[taskId].taskList.push(Task(taskNameInput, taskTextInput, taskDateInput, taskStatusInput));
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

