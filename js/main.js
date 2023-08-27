'use strict'

const headerImg = document.querySelector('.header-img');
const modeIcon = document.querySelector('.mode-icon');
const iconContainer = document.querySelector('.icon-container');
let taskDone = document.querySelectorAll('.task-done-text');
let tasksListContainer = document.querySelector('.tasks-list');
let tasksList = document.querySelectorAll('.tasks-list li');
let tasksListItems = document.querySelectorAll('.tasks-list li p');
const newCircles = document.querySelector('.new-circle');
let circles = '';
let checks = document.querySelectorAll('.check');
const taskInput = document.querySelector('#taskInput');
const filterListItems = document.querySelectorAll('.filter-list li');
let taskcounter = document.querySelector('.task-counter span');
let deleteButton = document.querySelectorAll('.cross');
const listCleaner = document.querySelector('.list-cleaner');
let displayCase = 'All';
let mode = 'light';
let cartoona = ``;
let tasks = []
let CompletedTasks = [];
let ActiveTasks = [];
let displayArr = [];

/* ------------------------------------------------- */
function displayTasks() {
    switch (displayCase) {
        case 'All':
            displayArr = tasks;
            break;
        case 'Active':
            displayArr = ActiveTasks;
            break;
        default:
            displayArr = CompletedTasks;
            break;
    }
    cartoona = ``;
    for (let i = 0; i < displayArr.length; i++) {
        let state = '';
        if (displayArr[i].iscompleted == '1') {
            state = 'done';
        }
        cartoona += `<li class="task ${state}" draggable="true">
        <div class="task-content d-flex align-items-center">
          <div class="circle task-done-circle">
            <img class="check" src="images/icon-check.svg">
          </div>
          <p class="task-done-text">${displayArr[i].title}</p>
          <img class="cross ms-auto me-3" src="images/icon-cross.svg">
        </div>`;
    }
    tasksListContainer.innerHTML = cartoona;
    circles = document.querySelectorAll('.circle');
    tasksList = document.querySelectorAll('.tasks-list li');
    tasksListItems = document.querySelectorAll('.tasks-list li p');
    checks = document.querySelectorAll('.check');
    tasksListContainer = document.querySelector('.tasks-list');
    deleteButton = document.querySelectorAll('.cross');
    for (let i = 0; i < tasksList.length; i++) {
        if (tasksList[i].classList.contains('done')) {
            tasksList[i].classList.add('done');
            circles[i].classList.add('task-done-circle');
            tasksListItems[i].classList.add('task-done-text');
            checks[i].classList.remove('d-none');
        }
        else {
            tasksList[i].classList.remove('done');
            circles[i].classList.remove('task-done-circle');
            tasksListItems[i].classList.remove('task-done-text');
            checks[i].classList.add('d-none');
        }
        fixdisplay();
    }
    counter();
    circlesEvent();
    deleteEvent();

}
//Dark and Light Mode
/* ------------------------------------------------- */
modeIcon.addEventListener('click', function () {
    let iconContainerStyle = window.getComputedStyle(iconContainer);
    if (iconContainerStyle.getPropertyValue('top') == '0px') {
        iconContainer.style.top = '-26px';
        if (screen.width < 768) {
            headerImg.style.cssText = 'background-image: url(images/bg-mobile-dark.jpg);';

        }
        else {
            headerImg.style.cssText = 'background-image: url(images/bg-desktop-dark.jpg);';

        }
        document.documentElement.style.setProperty('--body-color', 'hsl(235, 21%, 11%)');
        document.documentElement.style.setProperty('--main-color', 'hsl(235, 24%, 19%)');
        document.documentElement.style.setProperty('--dark-grayish-blue', 'hsl(234, 11%, 52%)');
        document.documentElement.style.setProperty('--light-grayish-blue', 'hsl(234, 39%, 85%)');
        document.documentElement.style.setProperty('--very-dark-grayish-blue', 'hsl(233, 14%, 35%)');
        document.documentElement.style.setProperty('--hover-color', 'hsl(236, 33%, 92%)');
        listModeChanger();
        for (let i = 0; i < circles.length; i++) {
            circles[i].style.cssText = 'border: 1px solid var(--very-dark-grayish-blue);';
        }
        newCircles.style.cssText = 'border: 1px solid var(--very-dark-grayish-blue);';

        mode = 'dark';
    }
    else {
        iconContainer.style.top = '0px';
        if (screen.width < 768) {
            headerImg.style.cssText = 'background-image: url(images/bg-mobile-light.jpg);';

        }
        else {
            headerImg.style.cssText = 'background-image: url(images/bg-desktop-light.jpg);';
        }

        document.documentElement.style.setProperty('--body-color', 'hsl(0, 0%, 98%)');
        document.documentElement.style.setProperty('--main-color', 'hsl(0, 0%, 98%)');
        document.documentElement.style.setProperty('--dark-grayish-blue', 'hsl(236, 9%, 61%)');
        document.documentElement.style.setProperty('--light-grayish-blue', 'hsl(233, 11%, 84%)');
        document.documentElement.style.setProperty('--very-dark-grayish-blue', 'hsl(235, 19%, 35%)');
        document.documentElement.style.setProperty('--hover-color', 'hsl(235, 19%, 35%)');
        listModeChanger();
        for (let i = 0; i < circles.length; i++) {
            circles[i].style.cssText = 'border: 1px solid var(--light-grayish-blue);';
        }
        newCircles.style.cssText = 'border: 1px solid var(--light-grayish-blue);';

        mode = 'light'
    }
});

function listModeChanger() {
    switch (mode) {
        case 'light':
            for (let i = 0; i < tasksList.length; i++) {
                tasksListItems[i].style.cssText = 'color: var(--light-grayish-blue);';
                taskInput.style.cssText = 'color: var(--light-grayish-blue);';
                tasksList[i].style.cssText = 'border-bottom: 1px solid var(--sec-very-dark-grayish-blue);';
            }
            taskDone.forEach(task => {
                task.style.cssText = 'color: var(--very-dark-grayish-blue) !important;';
            });
            break;

        default:
            for (let i = 0; i < tasksList.length; i++) {
                tasksListItems[i].style.cssText = 'var(--very-dark-grayish-blue);';
                taskInput.style.cssText = 'color: var(--very-dark-grayish-blue);';
                tasksList[i].style.cssText = 'border-bottom: 1px solid var(--very-light-grayish-blue);';
            }
            taskDone.forEach(task => {
                task.style.cssText = 'color: var(--light-grayish-blue) !important;';
            });
            break;
    }
}
/* ------------------------------------------------- */

//Reordring the list using Darg & Drop
/* ------------------------------------------------- */
// tasksList.forEach(task => {
//     task.addEventListener('dragstart', () => {
//         task.classList.add('dragging');
//     });
//     task.addEventListener('dragend', () => {
//         task.classList.remove('dragging');
//     });
// });
// const initOrdring = (e) => {
//     e.preventDefault();

//     //Select dragging task
//     const draggingTask = tasksListContainer.querySelector('.dragging');

//     //Select all tasks except dragging and convert the nodelist to arry
//     const siblings = [...tasksListContainer.querySelectorAll('.tasks-list li:not(.dragging)')];

//     // Finding the sibling after which the dragging item should be placed
//     let nextSibling = siblings.find(sibling => {
//         if (e.clientY <= 220) {
//             return siblings[0];
//         } else {
//             return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;

//         }
//     });

//     // Inserting the dragging item before the found sibling
//     tasksListContainer.insertBefore(draggingTask, nextSibling);
// }
// tasksListContainer.addEventListener('dragover', initOrdring);
// tasksListContainer.addEventListener('dragenter', (e) => {
//     e.preventDefault();
// });
/* ------------------------------------------------- */

/* ------------------------------------------------- */
function circlesEvent() {
    for (let i = 0; i < circles.length; i++) {
        circles[i].addEventListener('click', () => {
            let state = '';
            if (tasksList[i].classList.contains('done')) {
                tasksList[i].classList.remove('done');
                circles[i].classList.remove('task-done-circle');
                tasksListItems[i].classList.remove('task-done-text');
                checks[i].classList.add('d-none');
                state = '0'
            }
            else {
                tasksList[i].classList.add('done');
                circles[i].classList.add('task-done-circle');
                tasksListItems[i].classList.add('task-done-text');
                checks[i].classList.remove('d-none');
                state = '1'
            }
            fixdisplay();
            counter();
            taskDataEditor(displayArr[i].id, displayArr[i].title, state);
        });
    };
}
function fixdisplay() {
    taskDone = document.querySelectorAll('.task-done-text');
    if (mode == 'dark') {
        for (let i = 0; i < tasksList.length; i++) {
            tasksListItems[i].style.cssText = 'color: var(--light-grayish-blue);';
        }
        taskDone.forEach(task => {
            task.style.cssText = 'color: var(--very-dark-grayish-blue) !important;';
        });
    }
    else {
        for (let i = 0; i < tasksList.length; i++) {
            tasksListItems[i].style.cssText = 'var(--very-dark-grayish-blue);';
        }
        taskDone.forEach(task => {
            task.style.cssText = 'color: var(--light-grayish-blue) !important;';
        });
    }
}

for (let i = 0; i < filterListItems.length; i++) {
    filterListItems[i].addEventListener('click', () => {
        displayArr = [];
        if (filterListItems[i].classList.contains('All')) {
            // displayTasks(tasks);
            displayArr = tasks;
            displayCase = 'All';
            displayTasks();
            for (let j = 0; j < filterListItems.length; j++) {
                if (filterListItems[j].classList.contains('All')) {
                    filterListItems[j].classList.add('active-text');
                }
                else {
                    filterListItems[j].classList.remove('active-text');
                }
            }
        }
        else if (filterListItems[i].classList.contains('Active')) {
            // displayTasks(ActiveTasks);
            displayArr = ActiveTasks;
            displayCase = 'Active';
            displayTasks();
            for (let j = 0; j < filterListItems.length; j++) {
                if (filterListItems[j].classList.contains('Active')) {
                    filterListItems[j].classList.add('active-text');
                }
                else {
                    filterListItems[j].classList.remove('active-text');
                }
            }
        }
        else {
            // displayTasks(CompletedTasks);
            displayArr = CompletedTasks;
            displayCase = 'Completed';
            displayTasks();
            for (let j = 0; j < filterListItems.length; j++) {
                if (filterListItems[j].classList.contains('Completed')) {
                    filterListItems[j].classList.add('active-text');
                }
                else {
                    filterListItems[j].classList.remove('active-text');
                }
            }
        }
    })
}
function filterTasks() {
    ActiveTasks = [];
    CompletedTasks = [];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].iscompleted == '0') {
            ActiveTasks.push(tasks[i]);
        }
        else {
            CompletedTasks.push(tasks[i]);
        }
    }
}
/* ------------------------------------------------- */
function counter() {
    taskcounter.innerHTML = [...tasksListContainer.querySelectorAll('.tasks-list li:not(.done)')].length
}
/* ------------------------------------------------- */
taskInput.addEventListener('keyup', function (e) {
    if (e.key == 'Enter') {
        let newTask = taskInput.value;
        taskInput.value = '';
        postTask(newTask);
    }
})
/* ------------------------------------------------- */
function deleteEvent() {
    for (let i = 0; i < deleteButton.length; i++) {
        deleteButton[i].addEventListener('click', () => {
            deleteTask(displayArr[i].id);
        })
    }
}
/* ------------------------------------------------- */
listCleaner.addEventListener('click', () => {
    deleteAllCompleted();
})
/* ------------------------------------------------- */

async function getTasks() {
    displayArr = [];
    let response = await fetch('https://eslam.amadagency.net/api/v1/todo');
    let finalResponse = await response.json();
    tasks = finalResponse.data;
    displayArr = tasks;
}
async function postTask(newTask) {
    let response = await fetch('https://eslam.amadagency.net/api/v1/todo', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTask }),
    });
    initialization();
}
async function taskDataEditor(id, taskTitle, state) {
    let response = await fetch(`https://eslam.amadagency.net/api/v1/todo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: taskTitle,
            iscompleted: state
        }),
    });
    initialization();
}
async function deleteTask(id) {
    await fetch(`https://eslam.amadagency.net/api/v1/todo/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
    initialization();
}
async function deleteAllCompleted() {
    for (let i = 0; i < CompletedTasks.length; i++) {
        await fetch(`https://eslam.amadagency.net/api/v1/todo/${CompletedTasks[i].id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
    }
    initialization();
}
/* ------------------------------------------------- */
async function initialization() {
    await getTasks();
    filterTasks();
    displayTasks();
};
initialization();
