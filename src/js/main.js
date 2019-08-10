/***** Weather *****/
window.addEventListener('load', () => {
    let longitude;
    let latitude;
    let temperatureDescription = document.querySelector('.weather-description');
    let temperatureDegree = document.querySelector('.weather-degree');
    let locationT = document.querySelector('.location-timezone');
    let degreeSection = document.querySelector('.weather');
    let degreeSpan = document.querySelector('.weather-unit')


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const API = `${proxy}https://api.darksky.net/forecast/ec1df8487dd99e172a69dc18ab26306a/${latitude},${longitude}`;
            
            fetch(API).then(response => {
                return response.json();
            })
            .then(data => {
                const {temperature, summary, icon} = data.currently;
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationT.textContent = data.timezone;
                let toCelsius = (temperature - 32) * (5/9)
                setIcons(icon, document.querySelector('.icon'));

                degreeSection.addEventListener('click', () => {
                    if (degreeSpan.textContent === "F"){
                        degreeSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(toCelsius);
                    } else {
                        degreeSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                })
            });
        });

    } else {
        h1.textContent = "enable your location to see your current weather"
    }
    function setIcons(icon, iconID) {
        const skycons = new Skycons({color:"black"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});

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

/***** Unit Converter *****/
const centimeters = document.querySelector('.centimeters > input');
const meters = document.querySelector('.meters > input');
const feet = document.querySelector('.feet > input');
const inches = document.querySelector('.inches > input');
const kilometers = document.querySelector('.kilometers > input');
const miles = document.querySelector('.miles > input');

function centimetersToUnit() {
    const cmData = centimeters.value;
    const mtData = (cmData/100);
    const ftData = (cmData/30.48);
    const inchData = (cmData/2.54);
    const kmData = (cmData/100000);
    const mlData = (cmData/160934.4);
    meters.value = mtData;
    feet.value = Math.round(ftData*100)/100;
    inches.value = Math.round(inchData*100)/100;
    kilometers.value = kmData;
    miles.value = Math.round(mlData*10000)/10000;
};

function metersToUnit() {
    const mtData = meters.value;
    const cmData = (mtData*100);
    const ftData = (mtData*3.281);
    const inchData = (mtData*39.3701);
    const kmData = (mtData/1000);
    const mlData = (mtData/1609.344);
    centimeters.value = cmData;
    feet.value = ftData;
    inches.value = Math.round(inchData*100)/100;
    kilometers.value = kmData;
    miles.value = Math.round(mlData*10000)/10000;
};

function feetToUnit() {
    const ftData = feet.value;
    const cmData = (ftData*30.48);
    const mtData = (ftData/3.281);
    const inchData = (ftData*12);
    const kmData = (ftData/3280.84);
    const mlData = (ftData/5280);
    centimeters.value = cmData;
    meters.value = Math.round(mtData*100)/100;
    inches.value = Math.round(inchData*100)/100;
    kilometers.value = Math.round(kmData*10000)/10000;
    miles.value = Math.round(mlData*10000)/10000;
};

function inchesToUnit() {
    const inchData = inches.value;
    const cmData = (inchData*2.54);
    const mtData = (inchData/39.3701);
    const ftData = (inchData/12);
    const kmData = (inchData/39370.079);
    const mlData = (inchData/63360);
    centimeters.value = Math.round(cmData*100)/100;
    meters.value = Math.round(mtData*100)/100;
    feet.value = Math.round(ftData*100)/100;
    kilometers.value = Math.round(kmData*10000)/10000;
    miles.value = Math.round(mlData*10000)/10000;
};

function kilometersToUnit() {
    const kmData = kilometers.value;
    const cmData = kmData*100000;
    const mtData = kmData*1000;
    const ftData = kmData*3280.84;
    const inchData = kmData*39370.079;
    const mlData = kmData/1.609;
    centimeters.value = cmData;
    meters.value = mtData;
    feet.value = ftData;
    inches.value = Math.round(inchData*100)/100;
    miles.value = Math.round(mlData*100)/100;
};

function milesToUnit() {
    const mlData = miles.value;
    const cmData = mlData*160934.4;
    const mtData = mlData*1609.344;
    const ftData = mlData*5280;
    const inchData = mlData*63360;
    const kmData = mlData*1.609;
    centimeters.value = cmData;
    meters.value = Math.round(mtData*100)/100;
    feet.value = ftData;
    inches.value = inchData;
    kilometers.value = Math.round(kmData*100)/100;
};

function converter() {
    centimeters.addEventListener('input', centimetersToUnit);
    meters.addEventListener('input', metersToUnit);
    feet.addEventListener('input', feetToUnit);
    inches.addEventListener('input', inchesToUnit);
    kilometers.addEventListener('input', kilometersToUnit);
    miles.addEventListener('input', milesToUnit);
};

converter();

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

/***** Calculator *****/
let calculatorScreen = document.querySelector('.screen');

document.addEventListener('click', function(event) {
    if (!event.target.matches('.btn')) return;
    event.preventDefault();
    let calculatorContent = event.target.innerHTML;
    calculatorScreen.innerText = calculatorContent;
}, false);