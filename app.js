const taskList = document.querySelector("#taskList");

//project selectors
const projectNameInput = document.querySelector("#projectName");
const projectDateInput = document.querySelector("#projectDate");
const projectStatusInput = document.querySelector("#projectStatus");
const addProjectButton = document.querySelector("#addProject");

//task selectors
const taskNameInput = document.querySelector("#taskName");
const taskTextInput = document.querySelector("#taskText");
const taskDateInput = document.querySelector("#taskDate");
const taskStatusInput = document.querySelector("#taskStatus");
const addTaskButton = document.querySelector("#addTask");

const clearLocalStorageButton = document.querySelector("#clearLocalStorage");

//---------------------------------------------------------------------------

let customTaskIndex = -1;

let tasksArray = localStorage.getItem("tasks") ?
    JSON.parse(localStorage.getItem('tasks')) : [];
console.table(tasksArray);

tasksArray.forEach((item) => addDomTask(item.projectName, item.taskName, item.text, item.date, item.status));

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

function createProject(projectName, dueDate, status) {
    return {
        projectName,
        dueDate,
        status,
        taskList: [],
    }
}

function addTask(taskName, text, date, status) {
    customTaskIndex++;
    return {
        customTaskIndex,
        taskName,
        text,
        date,
        status,
    }
}

function addDomTask(projectName, taskName, text, date, status) {
    //console.log(projectName);
   taskList.appendChild(createATaskDiv(projectName, taskName, text, date, status))
}


function createATask() {
    let tempTask = Task(projectNameInput.value, taskNameInput.value, taskTextInput.value, taskDateInput.value, taskStatusInput.value);

    tasksArray.push(tempTask);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    addDomTask(projectNameInput.value, taskNameInput.value, taskTextInput.value, taskDateInput.value, taskStatusInput.value);
    taskNameInput.value = "";
}


function createAProject() {
    let tempProject = createProject(projectNameInput.value, projectDateInput.value, projectStatusInput.value);
    tasksArray.push(tempProject);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    projectNameInput.value = "";
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
