const projectNameInput = document.querySelector("#projectName");
const projectDateInput = document.querySelector("#projectDate");
const projectStatusInput = document.querySelector("#projectStatus");
const addProjectButton = document.querySelector("#addProject");
const activeProjectsList = document.querySelector("#activeProjects");
const archiveProjects = document.querySelector("#archivedProjectsSelect");
const allProjectsSelect = document.querySelector("#allProjectsSelect");
const taskNameInput = document.querySelector("#taskName");
const taskDateInput = document.querySelector("#taskDate");
const taskStatusInput = document.querySelector("#taskStatus");
const addTaskButton = document.querySelector("#addTask");
const tasksDomContainer = document.querySelector("#tasksDOMContainer");
const projectHeaderH4 = document.querySelector("#selectedProjectName");
const archiveButton = document.querySelector("#archiveButton");
const projectStatusDisplayID = document.querySelector("#projectStatusDisplayID");
const projectDateId = document.querySelector("#projectDateId");
const amendProjectBtnConfirm = document.querySelector("#amendProjectBtnConfirm");
const projectNameAmendField = document.querySelector("#projectNameAmend");
const projectDateAmendField = document.querySelector("#projectDateAmend");
const projectStatusAmendField = document.querySelector("#projectStatusAmend");
const taskAddSection = document.querySelector("#taskEntry");

projectDateInput.valueAsDate = new Date();
taskDateInput.valueAsDate = new Date();


let appStorage = localStorage.getItem("appStorage") ? JSON.parse(localStorage.getItem("appStorage")) : [];

let customTaskIndex;
let customProjectIndex;


if (appStorage.length === 0) {
    customProjectIndex = -1;
    customTaskIndex = -1;
} else {
    customProjectIndex = appStorage[appStorage.length - 1].customProjectIndex;
    let tempTaskArray = [];
    for (let i in appStorage) {
        for (let j in appStorage[i].taskList) {
            tempTaskArray.push(appStorage[i].taskList[j].customTaskIndex);
        }
    }
    customTaskIndex = tempTaskArray[tempTaskArray.length - 1];
}

let projectSelectedState = "allProjectsSelect";

function displayProjectList() {
    for (let i in appStorage) {
        if (appStorage[i].archivedProjectsSelect !== 1) {
            const projectItem = document.createElement("h5");
            projectItem.classList.add("projectListSelect");
            projectItem.setAttribute("id", "p" + appStorage[i].customProjectIndex);
            projectItem.innerText = appStorage[i].projectName;
            activeProjectsList.appendChild(projectItem);
        }
    }
}

function Project(projectName, dueDate, status) {
    customProjectIndex++;
    let archiveStatus = 0;
    return {
        customProjectIndex, projectName, dueDate, status, archiveStatus, taskList: [],
    };
}

function createAProject() {
    if (projectNameInput.value === "") {
        alert("Please enter a valid name");
    } else {
        appStorage.push(Project(projectNameInput.value, projectDateInput.value, projectStatusInput.value,),);
        localStorage.setItem("appStorage", JSON.stringify(appStorage));
        createAProjectDom(projectNameInput.value);
        projectNameInput.value = "";
        document.getElementById("projectEntry").style.display = "none";
    }
}

function createAProjectDom(projectName) {
    const projectItem = document.createElement("h5");
    projectItem.classList.add("projectListSelect");
    projectItem.setAttribute("id", "p" + customProjectIndex);
    projectItem.innerText = projectName;
    activeProjectsList.appendChild(projectItem);
}

function changeArchiveStatus() {
    if (projectSelectedState === "allProjectsSelect" || projectSelectedState === "archivedProjectsSelect") {
        alert("please select a valid project (you can only archive projects)");
    } else {
        appStorage[projectSelectedState].archivedProjectsSelect = 1;
        localStorage.setItem("appStorage", JSON.stringify(appStorage));
        activeProjectsList.innerText = '';
        displayProjectList()
    }
}

//FIX DO NOT REPEAT YOURSELF!!!!!!!!!!!

function displayArchivedProjects() {
    taskAddSection.style.display = "none";
    projectStatusDisplayID.innerHTML = "";
    projectDateId.innerHTML = "";
    for (let j in appStorage) {
        if (appStorage[j].archivedProjectsSelect === 1) {
            let projectRepeat = `<div class="archivedAllProjectHeader" id="archived${appStorage[j].customProjectIndex}">
                    <h5 class="projectListSelectInArchiveAll inAllArchive" id="${appStorage[j].customProjectIndex}">${appStorage[j].projectName}</h5>
                    <p id="projectStatusDisplayID">${appStorage[j].status}</p>
                    <time id="projectDateId" dateTime="2024-06-27">${appStorage[j].dueDate}</time></div>`
            for (let i in appStorage[j].taskList) {
                projectRepeat += `
                    <div class="individualTask" id=${appStorage[j].taskList[i].customTaskIndex}><p class="taskNameClass">${appStorage[j].taskList[i].taskName}</p>
                    <time class="taskDateClass" dateTime="2024-06-27">${appStorage[j].taskList[i].date}</time>
                    <p class="taskStatusClass">${appStorage[j].taskList[i].status}</p>
                    </div>
                    </div>
                    `
            }
            tasksDomContainer.insertAdjacentHTML("beforeend", projectRepeat);
        }
    }
}

function displayAllTasks() {
    taskAddSection.style.display = "none";
    projectStatusDisplayID.innerHTML = "";
    projectDateId.innerHTML = "";
    projectHeaderH4.innerText = "All Tasks";
    projectHeaderH4.style.borderRight = "none";
    for (let j in appStorage) {
        if (appStorage[j].archivedProjectsSelect !== 1) {
            let projectRepeat = `<div class="archivedAllProjectHeader" id="archived${appStorage[j].customProjectIndex}">
                    <h5 class="projectListSelectInArchiveAll inAllArchive" id="${appStorage[j].customProjectIndex}">${appStorage[j].projectName}</h5>
                    <p id="projectStatusDisplayID">${appStorage[j].status}</p>
                    <time id="projectDateId" dateTime="2024-06-27">${appStorage[j].dueDate}</time></div>`
            for (let i in appStorage[j].taskList) {
                projectRepeat += `
                    <div class="individualTask" id=${appStorage[j].taskList[i].customTaskIndex}><p class="taskNameClass">${appStorage[j].taskList[i].taskName}</p>
                    <time class="taskDateClass" dateTime="2024-06-27">${appStorage[j].taskList[i].date}</time>
                    <p class="taskStatusClass">${appStorage[j].taskList[i].status}</p>
                    </div>
                    </div>
                    `
            }
            tasksDomContainer.insertAdjacentHTML("beforeend", projectRepeat);
        }
    }
}

//FIX DO NOT REPEAT YOURSELF!!!!!!!!!!!

function displayTasksDom(selectedProject) {
    while (tasksDomContainer.hasChildNodes()) {
        tasksDomContainer.removeChild(tasksDomContainer.firstChild);
    }

    if (selectedProject === "allProjectsSelect") {
        displayAllTasks();
    } else if (selectedProject === "archivedProjectsSelect") {
        displayArchivedProjects();
    } else {
        for (let i in appStorage[selectedProject].taskList) {
            let taskRepeat = `<div class="individualTask" id=${appStorage[selectedProject].taskList[i].customTaskIndex}>
                <p class="taskNameClass">${appStorage[selectedProject].taskList[i].taskName}</p>
                <time class="taskDateClass" dateTime="2024-06-27">${appStorage[selectedProject].taskList[i].date}</time>
                <p class="taskStatusClass">${appStorage[selectedProject].taskList[i].status}</p>
                <div class="taskButtons">
                <button class="taskCompleteButtonClass"><?xml version="1.0" encoding="UTF-8"?>
                <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg" color="#FFFFFFFF">
                <path d="M5 13L9 17L19 7" stroke="#FFFFFFFF" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round"></path>
                </svg>
                </button>
                <button class="taskDeleteButtonClass"><?xml version="1.0" encoding="UTF-8"?>
                <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none"
            xmlns="http://www.w3.org/2000/svg" color="#FFFFFFFF">
                <path
            d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9"
            stroke="#FFFFFFFF" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round"></path>
                <path
            d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6"
            stroke="#FFFFFFFF" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round"></path>
                </svg>
                </button>
                </div>
                </div>`;
            tasksDomContainer.insertAdjacentHTML("beforeend", taskRepeat);
        }
    }
}

function Task(taskName, date, status) {
    customTaskIndex++;
    return {
        customTaskIndex, taskName, date, status,
    };
}

function createATask() {
    if (projectSelectedState === "allProjectsSelect" || projectSelectedState === "archivedProjectsSelect") {
        alert("please select a valid project (you can only set tasks against projects)");
    } else {
        appStorage[projectSelectedState].taskList.push(Task(taskNameInput.value, taskDateInput.value, taskStatusInput.value),);
        localStorage.setItem("appStorage", JSON.stringify(appStorage));

        let taskRepeat = `<div class="individualTask" id=${customTaskIndex}>
        <p class="taskNameClass">${taskNameInput.value}</p>
        <time class="taskDateClass" dateTime="2024-06-27">${taskDateInput.value}</time>
        <p class="taskStatusClass">${taskStatusInput.value}</p>
        <div class="taskButtons">
        <button class="taskCompleteButtonClass"><?xml version="1.0" encoding="UTF-8"?>
        <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg" color="#FFFFFFFF">
        <path d="M5 13L9 17L19 7" stroke="#FFFFFFFF" stroke-width="1.5" stroke-linecap="round"
    stroke-linejoin="round"></path>
        </svg>
        </button>
        <button class="taskDeleteButtonClass"><?xml version="1.0" encoding="UTF-8"?>
        <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none"
    xmlns="http://www.w3.org/2000/svg" color="#FFFFFFFF">
        <path
    d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9"
    stroke="#FFFFFFFF" stroke-width="1.5" stroke-linecap="round"
    stroke-linejoin="round"></path>
        <path
    d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6"
    stroke="#FFFFFFFF" stroke-width="1.5" stroke-linecap="round"
    stroke-linejoin="round"></path>
        </svg>
        </button>
        </div>
        </div>`;
        tasksDomContainer.insertAdjacentHTML("beforeend", taskRepeat);
        taskNameInput.value = "";
        taskDateInput.valueAsDate = new Date();
        taskStatusInput.value = "to-do";
    }
}

//RE-USE ADD PROJECT WINDOW!!!!!!!!!
function amendProjectDetails() {
    if (projectSelectedState === "allProjectsSelect" || projectSelectedState === "archivedProjectsSelect") {
        alert("please select a valid project (you can only amend projects)");
    } else {
        if (projectNameAmendField.value === "" || projectDateAmendField.value === "") {
            alert("please input the correct value (no blanks)");
        }
        appStorage[projectSelectedState].projectName = projectNameAmendField.value;
        appStorage[projectSelectedState].dueDate = projectDateAmendField.value;
        appStorage[projectSelectedState].status = projectStatusAmendField.value;
        localStorage.setItem("appStorage", JSON.stringify(appStorage));
        projectHeaderH4.innerText = appStorage[projectSelectedState].projectName;
        projectStatusDisplayID.innerText = appStorage[projectSelectedState].status;
        projectDateId.innerText = appStorage[projectSelectedState].dueDate;
        while (activeProjectsList.hasChildNodes()) {
            activeProjectsList.removeChild(activeProjectsList.firstChild);
        }
        displayProjectList();
        document.getElementById("projectAmendEntry").style.display = "none";
    }
}


function amendTask() {
    //
// for (let i in deleteButtons){
//     deleteButtons[i].addEventListener("click", deleteIndividualTask);
// }
//deleteButtons[0].addEventListener("click", deleteIndividualTask);

// window.addEventListener("DOMContentLoaded", (event) => {
//   const el = document.querySelectorAll(".taskDeleteButtonClass");
//   for (let i in el) {
//     if (el[i]) {
//       el.addEventListener("click", deleteIndividualTask, false);
//     }
//   }
// });
}

function deleteIndividualTask() {
    console.log(this);
}

function removeTaskInStorage(projectId, taskId) {
    appStorage[projectId].taskList.splice(taskId, 1);
    localStorage.setItem("appStorage", JSON.stringify(appStorage));
}

function amendTaskDetailsInStorage(projectId, taskId, property, newValue) {
    appStorage[projectId].taskList[taskId][property] = newValue;
    localStorage.setItem("appStorage", JSON.stringify(appStorage));
}

//fix with two functions max

function openForm() {
    document.getElementById("projectEntry").style.display = "block";
}

function closeForm() {
    document.getElementById("projectEntry").style.display = "none";
}

function openAmendForm() {
    if (projectSelectedState === "allProjectsSelect" || projectSelectedState === "archivedProjectsSelect") {
        alert("please select a valid project (you can only amend projects)");
    } else {
        projectNameAmendField.value = appStorage[projectSelectedState].projectName;
        projectDateAmendField.value = appStorage[projectSelectedState].dueDate;
        projectStatusAmendField.value = appStorage[projectSelectedState].status;
        document.getElementById("projectAmendEntry").style.display = "block";
    }
}

function closeAmendForm() {
    document.getElementById("projectAmendEntry").style.display = "none";
}

//alert("please use it in full screen, I am too lazy to add media queries for now :)")

displayProjectList();
displayAllTasks();

addProjectButton.addEventListener("click", createAProject);
addTaskButton.addEventListener("click", createATask);

activeProjectsList.addEventListener("click", function (event) {
    taskAddSection.style.display = "flex";
    if (!event.target.classList.contains("projectListSelect")) return;
    projectSelectedState = event.target.id.slice(1);
    displayTasksDom(projectSelectedState);
    projectHeaderH4.innerText = appStorage[projectSelectedState].projectName;
    projectStatusDisplayID.innerText = appStorage[projectSelectedState].status;
    projectDateId.innerText = appStorage[projectSelectedState].dueDate;
    projectHeaderH4.style.borderRight = "1px solid black";
    projectHeaderH4.style.paddingRight = "10px";
    projectNameAmendField.value = appStorage[projectSelectedState].projectName;
    projectDateAmendField.value = appStorage[projectSelectedState].dueDate;
    projectStatusAmendField.value = appStorage[projectSelectedState].status;

});

archiveProjects.addEventListener("click", function (event) {
    projectSelectedState = event.target.id;
    displayTasksDom(projectSelectedState);
    projectHeaderH4.innerText = "Archive";
    projectHeaderH4.style.borderRight = "none";
});

allProjectsSelect.addEventListener("click", function (event) {
    projectSelectedState = event.target.id;
    displayTasksDom(projectSelectedState);
    projectHeaderH4.innerText = "All Tasks";
    projectHeaderH4.style.borderRight = "none";
});

archiveButton.addEventListener("click", changeArchiveStatus);

amendProjectBtnConfirm.addEventListener("click", amendProjectDetails);

///////////////////////////////////////////////////future refactor/////////////////////////////////////////////////////

// function clearLocalStorage() {
//     localStorage.clear();
// }
// function removeProjectInStorage(projectId) {
//     appStorage.splice(projectId, 1);
//     localStorage.setItem("appStorage", JSON.stringify(appStorage));
// }

// function amendProjectDetailsInStorage(projectId, property, newValue) {
//     appStorage[projectId][property] = newValue;
//     localStorage.setItem("appStorage", JSON.stringify(appStorage));
// }