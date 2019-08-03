// Temperature converter
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

//TODO List
let listItems = [];

function addItems(text) {
    const todo = {
        text,
        id: Date.now(),
        checked: false,
    };
    listItems.push(todo);
    
    const theList = document.querySelector('.todo-list');

    // append list items here
};

const form = document.querySelector('.todo-form');
form.addEventListener('submit', event => {
    event.preventDefault();
    const input = document.querySelector('.todo-input');
    const text = input.value.trim();
    if (text !== '') {
        addItems(text);
        input.value = '';
        input.focus();
    };
});