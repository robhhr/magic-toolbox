/***** Temperature converter *****/
const celsiusData = document.querySelector('.celsius > input');
const fahrenheitData = document.querySelector('.fahrenheit > input');

function roundNumber(num) {
    return Math.round(num * 100)/100;
}

function celsiusToFahrenheit() {
    const celsiusTemperature = parseFloat(celsiusData.value);
    const fahrenheitTemperature = (celsiusTemperature * (9/5)) + 32;
    fahrenheitData.value = roundNumber(fahrenheitTemperature);
}

function fahrenheitToCelsius() {
    const fahrenheitTemperature = parseFloat(fahrenheitData.value);
    const celsiusTemperature = (fahrenheitTemperature - 32) * (5/9);
    celsiusData.value = roundNumber(celsiusTemperature);
}

function temperature() {
    celsiusData.addEventListener('input', celsiusToFahrenheit);
    fahrenheitData.addEventListener('input', fahrenheitToCelsius);
}

temperature();

/***** TODO List *****/
loadEvents();
// load every event in the page
function loadEvents() {
    document.querySelector('.todo-form').addEventListener('submit', submit);
    document.querySelector('#clear-list').addEventListener('click', clearList);
    document.querySelector('.list-container').addEventListener('click', deleteOrTick);
};

// submit data function
function submit(event) {
    event.preventDefault();
    let taskList;
    let input = document.querySelector('.todo-form > input');
    if (input.value != '')
    addTask(input.value);
    input.value = '';
};

// add tasks
function addTask(task) {
    let ul = document.querySelector('.list-container');
    let li = document.createElement('li');
    li.innerHTML = `<span class="delete">×</span><input type="checkbox"><label>${task}</label>`;
    ul.appendChild(li);
    document.querySelector('.tasksBoard').style.display = 'block';
};

// clear the list
function clearList(event) {
    let ul = document.querySelector('.list-container').innerHTML = '';
};

// deleteTick
function deleteOrTick(event) {
    if (event.target.className == 'delete')
    deleteTask(event);
    else {
    tickTask(event);
    };
};

// delete task
function deleteTask(event) {
    let remove = event.target.parentNode;
    let parentNode = remove.parentNode;
    parentNode.removeChild(remove);
};

// tick a task
function tickTask(event){
    const task = event.target.nextSibling;
    if (event.target.checked) {
    task.style.textDecoration = "line-through";
    task.style.color = "#ff0000";
    } else {
    task.style.textDecoration = "none";
    task.style.color = "#2f4f4f";
    };
};