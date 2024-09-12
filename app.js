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
const tasksDOMContainer = document.querySelector("#tasksDOMContainer");
const taskNameAmendField = document.querySelector("#taskNameAmend");
const taskDateAmendField = document.querySelector("#taskDateAmend");
const taskStatusAmendField = document.querySelector("#taskStatusAmend");
const confirmAmendTaskButton = document.querySelector("#amendTaskBtnConfirm");


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
                    <button class="taskCompleteButtonClass taskButtonsSelector" id=c${appStorage[selectedProject].taskList[i].customTaskIndex}>done</button>
                    <button class="taskAmendButtonClass taskButtonsSelector"  id=a${appStorage[selectedProject].taskList[i].customTaskIndex}>amend</button>
                    <button class="taskDeleteButtonClass taskButtonsSelector" id=d${appStorage[selectedProject].taskList[i].customTaskIndex}>delete</button>
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
                <button class="taskCompleteButtonClass taskButtonsSelector" id=c${customTaskIndex}>done</button>
                <button class="taskAmendButtonClass taskButtonsSelector" id=a$${customTaskIndex}>amend</button>
                <button class="taskDeleteButtonClass taskButtonsSelector" id=d$${customTaskIndex}>delete</button>
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


function amendTask(taskId) {
    for (let i in appStorage[projectSelectedState].taskList) {
        if (Number(taskId) === appStorage[projectSelectedState].taskList[i].customTaskIndex) {
            document.getElementById("taskAmendEntry").style.display = "block";
            console.log(appStorage[projectSelectedState].taskList[i]);
            taskNameAmendField.value = appStorage[projectSelectedState].taskList[i].taskName;
            taskDateAmendField.value = appStorage[projectSelectedState].taskList[i].date;
            taskStatusAmendField.value = appStorage[projectSelectedState].taskList[i].status;
            confirmAmendTaskButton.addEventListener("click", function () {
                appStorage[projectSelectedState].taskList[i].taskName = taskNameAmendField.value;
                appStorage[projectSelectedState].taskList[i].date = taskDateAmendField.value;
                appStorage[projectSelectedState].taskList[i].status = taskStatusAmendField.value;
                localStorage.setItem("appStorage", JSON.stringify(appStorage));
                displayTasksDom(projectSelectedState);
                closeAmendTaskForm()
            })
        }
    }

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

function closeAmendTaskForm() {
    document.getElementById("taskAmendEntry").style.display = "none";
}

//alert("please use it in full screen, I am too lazy to add media queries for now :)")

displayProjectList();
displayAllTasks();

addProjectButton.addEventListener("click", createAProject);
addTaskButton.addEventListener("click", createATask);

activeProjectsList.addEventListener("click", function (event) {
    if (!event.target.classList.contains("projectListSelect")) return;
    taskAddSection.style.display = "flex";
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

tasksDOMContainer.addEventListener("click", function (event) {
    if (!event.target.classList.contains("taskButtonsSelector")) return;
    if (Array.from(event.target.id)[0] === "c") {
        console.log("done");
    } else if (Array.from(event.target.id)[0] === "a") {
        amendTask(event.target.id.slice(1))
    } else if (Array.from(event.target.id)[0] === "d") {
        console.log("delete");
    }
})


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