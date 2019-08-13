/***** Toggle sections *****/
const aboutMenu = document.getElementById('title'),
      clockMenu = document.getElementById('clock-menu'),
      weatherMenu = document.getElementById('weather-menu'),
      unitMenu = document.getElementById('unit-menu'),
      todoMenu = document.getElementById('todo-menu'),
      calculatorMenu = document.getElementById('calculator-menu'),
      aboutHandler = document.getElementsByClassName('about')[0],
      clockHandler = document.getElementsByClassName('clock-container')[0],
      locationHandler = document.getElementsByClassName('location')[0],
      weatherHandler = document.getElementsByClassName('weather')[0],
      unitHandler = document.getElementsByClassName('unit-convertor')[0],
      todoHandler = document.getElementsByClassName('todo')[0],
      calculatorHandler = document.getElementsByClassName('calculator')[0];

function hideAboutMenu() {
  if (aboutHandler.style.display === 'none') {
    aboutHandler.style.display = 'initial';
  };
  clockHandler.style.display = 'none';
  locationHandler.style.display = 'none';
  weatherHandler.style.display = 'none';
  unitHandler.style.display = 'none';
  todoHandler.style.display = 'none';
  calculatorHandler.style.display = 'none';
};

function hideClockMenu() {
  if (clockHandler.style.display === 'none') {
    clockHandler.style.display = 'initial';
  } else {
    clockHandler.style.display = 'none';
  };
  aboutHandler.style.display = 'none';
  locationHandler.style.display = 'none';
  weatherHandler.style.display = 'none';
  unitHandler.style.display = 'none';
  todoHandler.style.display = 'none';
  calculatorHandler.style.display = 'none';
};

function hideWeatherMenu() {
  if (locationHandler.style.display === 'none') {
    locationHandler.style.display = 'flex';
    } else {
    locationHandler.style.display = 'none';
    };
  if (weatherHandler.style.display === 'none') {
    weatherHandler.style.display = 'inline-block';
    } else {
    weatherHandler.style.display = 'none';
    };
  aboutHandler.style.display = 'none';
  clockHandler.style.display = 'none';
  unitHandler.style.display = 'none';
  todoHandler.style.display = 'none';
  calculatorHandler.style.display = 'none';
};

function hideUnitMenu() {
  if (unitHandler.style.display === 'none') {
    unitHandler.style.display = 'inline-block';
    } else {
    unitHandler.style.display = 'none';
    };
  aboutHandler.style.display = 'none';
  clockHandler.style.display = 'none';
  locationHandler.style.display = 'none';
  weatherHandler.style.display = 'none';
  todoHandler.style.display = 'none';
  calculatorHandler.style.display = 'none';
};

function hideTodoMenu() {
  if (todoHandler.style.display === 'none') {
    todoHandler.style.display = 'initial';
    } else {
    todoHandler.style.display = 'none';
    };
  aboutHandler.style.display = 'none';
  clockHandler.style.display = 'none';
  locationHandler.style.display = 'none';
  weatherHandler.style.display = 'none';
  unitHandler.style.display = 'none';
  calculatorHandler.style.display = 'none';
};

function hideCalculatorMenu() {
  if (calculatorHandler.style.display === 'none') {
    calculatorHandler.style.display = 'initial';
    } else {
    calculatorHandler.style.display = 'none';
    };
  aboutHandler.style.display = 'none';
  clockHandler.style.display = 'none';
  locationHandler.style.display = 'none';
  weatherHandler.style.display = 'none';
  unitHandler.style.display = 'none';
  todoHandler.style.display = 'none';
};

function hideShowMenus() {
  aboutMenu.addEventListener('click', hideAboutMenu);
  clockMenu.addEventListener('click', hideClockMenu);
  weatherMenu.addEventListener('click', hideWeatherMenu);
  unitMenu.addEventListener('click', hideUnitMenu);
  todoMenu.addEventListener('click', hideTodoMenu);
  calculatorMenu.addEventListener('click', hideCalculatorMenu);
};

hideShowMenus();

/***** Digital Clock *****/
function theClock() {
    const fullDate = new Date();
    let hours = fullDate.getHours();
    let minutes = fullDate.getMinutes();
    let seconds = fullDate.getSeconds();

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

   document.getElementById('hour').innerText = hours;
   document.getElementById('minute').innerText = ":" + minutes;
   document.getElementById('second').innerText = ":" + seconds;
};

setInterval(theClock, 100);

/***** Weather *****/
window.addEventListener('load', () => {
    let longitude;
    let latitude;
    let temperatureDescription = document.querySelector('.weather-description');
    let temperatureDegree = document.querySelector('.weather-degree');
    let locationT = document.querySelector('.location-timezone');
    let degreeSection = document.querySelector('.weather');
    let degreeSpan = document.querySelector('.weather-unit');

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
                temperatureDegree.textContent = `${temperature}`;
                temperatureDescription.textContent = summary;
                locationT.textContent = data.timezone;
                let toCelsius = (temperature - 32) * (5/9)
                setIcons(icon, document.querySelector('.icon'));

                degreeSection.addEventListener('click', () => {
                    if (degreeSpan.textContent === "°F"){
                        degreeSpan.textContent = "°C";
                        temperatureDegree.textContent = Math.floor(toCelsius);
                    } else {
                        degreeSpan.textContent = "°F";
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

function loadEvents() {
    document.querySelector('.todo-form').addEventListener('submit', submit);
    document.querySelector('#clear-list').addEventListener('click', clearList);
    document.querySelector('.list-container').addEventListener('click', deleteOrTick);
};

function submit(event) {
    event.preventDefault();
    let taskList;
    let input = document.querySelector('.todo-form > input');
    if (input.value != '')
    addTask(input.value);
    input.value = '';
};

function addTask(task) {
    let ul = document.querySelector('.list-container');
    let li = document.createElement('li');
    li.innerHTML = `<span class="delete">×</span><input type="checkbox"><label>${task}</label>`;
    ul.appendChild(li);
    document.querySelector('.tasksBoard').style.display = 'block';
};

function clearList(event) {
    let ul = document.querySelector('.list-container').innerHTML = '';
};

function deleteOrTick(event) {
    if (event.target.className == 'delete')
    deleteTask(event);
    else {
    tickTask(event);
    };
};

function deleteTask(event) {
    let remove = event.target.parentNode;
    let parentNode = remove.parentNode;
    parentNode.removeChild(remove);
};

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
window.onload = function() {
    let buttons = document.getElementsByTagName('span');
    let result = document.querySelectorAll('.result p')[0];
    let clear = document.getElementsByClassName('clear')[0];
    let equation = [];
    let orange = false;

    for (var i = 0; i < buttons.length; i += 1) {
      if (buttons[i].innerHTML === '=') {
        buttons[i].addEventListener("click", calculate(i));
      } else if (buttons[i].innerHTML === '+/-') {
        buttons[i].addEventListener("click", invert(i));
      } else if (buttons[i].innerHTML === '%') {
        buttons[i].addEventListener("click", percent(i));
      } else if (buttons[i].innerHTML === 'AC') {
        equation = [];
      } else {
        buttons[i].addEventListener("click", addValue(i));
      };
    };

    clear.onclick = function() {
        result.innerHTML = '';
        equation = [];
        orange = false;
    };

    function addValue(i) {
      return function() {
        if (buttons[i].innerHTML === '÷') {
          clicked(this);
          changeOperators('/');
        } else if (buttons[i].innerHTML === 'x') {
          clicked(this);
          changeOperators('*');
        } else if (buttons[i].innerHTML === '+') {
          clicked(this);
          changeOperators('+');
        } else if (buttons[i].innerHTML === '-') {
          clicked(this);
          changeOperators('-');
        } else {
          removeClicked();
          if (checkType(equation[equation.length - 1])) {
            equation = [];
            equation.push(buttons[i].innerHTML);
            orange = true;
          } else {
            equation.push(buttons[i].innerHTML);
          }
          if (orange) {
            result.innerHTML = buttons[i].innerHTML;
          } else {
            result.innerHTML += buttons[i].innerHTML;
          }
          orange = false;
        }
      };
    }

    function clicked(i) {
      removeClicked(i);
      i.classList.add('clicked');
    }

    function removeClicked(i) {
      var elems = document.querySelectorAll(".clicked");
      [].forEach.call(elems, function(el) {
        el.classList.remove("clicked");
      });
    }

    function calculate(i) {
      return function() {
        if (equation.length == 0) {
          return;
        } else {
          var answer = eval(equation.join(''));
          if (answer % 1 === 0) {
            result.innerHTML = answer;
          } else {
            result.innerHTML = answer.toFixed(4);
          }
          equation = [];
          equation.push(answer);
          orange = false;
        }
      };
    }

    function invert(i) {
      return function() {
        if (equation.length == 0) {
          return;
        } else {
          var number = result.innerHTML;
          addToOperations(number);
          var invert = number * -1;
          equation.push(invert);
          result.innerHTML = invert;
        }
      }
    }

    function percent(i) {
      return function() {
        var number = result.innerHTML;
        addToOperations(number);
        var percent = number * 0.01;
        equation.push(percent);
        result.innerHTML = percent.toFixed(2);
      }
    }

    function changeOperators(str) {
      if (!orange) {
        equation.push(str);
        orange = true;
      } else {
        equation.pop();
        equation.push(str);
      }
    }

    function checkType(v) {
      if (typeof v == 'string') {
        return false;
      } else if (typeof v == 'number') {
        return true;
      }
    }

    function addToOperations(number) {
      var arr = number.split('');
      for (i = 0; i < arr.length; i++) {
        equation.pop();
      }
    }
  };