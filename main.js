const date = new Date();

let dataBase = {
    'adderShown': false
}


const colorOfTheMonths = {
    "January": '#673ab7',
    "February": '#52417c',
    "March": '#4ac3536b',
    "April": 'rgb(63 81 181 / 25%)',
    "May": '#00ff3736',
    "June": 'rgb(15 128 142)',
    "July": '#0e617a',
    "August": '#004d40',
    "September": '#a0591c',
    "October": '#ff3b3b57',
    "November": '#151515',
    "December": '#3f51b5',
}
const colors = ['#673ab7', '#52417c', '#4ac3536b', 'rgb(63 81 181 / 25%)', '#00ff3736', 'rgb(15 128 142)', '#0e617a', '#004d40', '#a0591c', '#ff3b3b57', '#151515','#3f51b5']

function extractNum(str) {
    let nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    let filteredStr = '';
    for (let char of str){
      for (let num of nums){
        if (char === num){
          filteredStr += char;
        }
      }
    }
    return Number(filteredStr);
}

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  for (let el of document.getElementsByClassName('current-date')) {
    el.innerHTML = new Date().toDateString();
  }  

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today here">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }
};

const changeBgColorBasedOnCurrentMonthOnTheCalendar = () => {
    document.getElementById('month-bg').style.backgroundColor = colorOfTheMonths[document.getElementById('month').innerHTML];
    
}

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();

  changeBgColorBasedOnCurrentMonthOnTheCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
  
  changeBgColorBasedOnCurrentMonthOnTheCalendar();
});

renderCalendar();
document.getElementsByClassName('here')[0].style.backgroundColor = colorOfTheMonths[document.getElementById('month').innerHTML];

let taskNum = 1;

function addTask(){
    document.querySelector('.actual-tasks').innerHTML += `
        <div class="task-${taskNum} mb-6" id="task-${taskNum}">
            <button class="delete is-large" id="delete-${taskNum}"></button>
            <div class="mb-5">
                <span class="time is-size-5" id="time-${taskNum}"></span>
            </div>
            <div class="text-task" id="tt-${taskNum}">
                <p id="${taskNum}"></p>

            </div>
            <div class="bottom-time">
                <span class="time is-size-5" id="time-2-${taskNum}"></span>
            </div>
        </div>`;
    taskInput = document.getElementById('task-name').value;

    time1 = document.getElementById('from').value;
    time2 = document.getElementById('to').value;
    document.getElementById(taskNum).innerHTML = taskInput;
    document.getElementById(`time-${taskNum}`).innerHTML = time1;
    document.getElementById(`time-2-${taskNum}`).innerHTML = time2;

    function Delete(){
        document.getElementById(`${this.id}`).remove();
    }
    
    let currColor = 0;
    function changeColor(e){

        document.getElementById(`time-${e.target.here}`).style.backgroundColor = colors[currColor];
        document.getElementById(`time-2-${e.target.here}`).style.backgroundColor = colors[currColor];
        document.getElementById(`tt-${e.target.here}`).style.borderLeft = `3px solid ${colors[currColor]}`;

        currColor++;
        if (currColor === 12){
            currColor = 0;
        }
    }

    for (let el of document.getElementsByClassName('delete')){
        el.addEventListener('click', Delete);
    }
    document.getElementById(`delete-${taskNum}`).id = `task-${taskNum}`;

    document.getElementById(`time-${taskNum}`).addEventListener('click', changeColor);
    document.getElementById(`time-2-${taskNum}`).addEventListener('click', changeColor);

    
    document.getElementById(`time-${taskNum}`).here = taskNum;
    document.getElementById(`time-2-${taskNum}`).here = taskNum;

    taskNum++;

    document.getElementById('tdd').style.display = 'none';
    dataBase['adderShown'] = false;
}
document.getElementById('add-btn').addEventListener('click', addTask);


function showAdder(){
    if (dataBase['adderShown']){
        document.getElementById('tdd').style.display = 'none';
        dataBase['adderShown'] = false;
    } else {
        document.getElementById('tdd').style.display = 'block';
        dataBase['adderShown'] = true;
    }
    
}
document.getElementById('adder').addEventListener('click', showAdder);

window.onbeforeunload = function(){
    localStorage.setItem('actual-tasks', JSON.stringify(document.querySelector('.actual-tasks').children));

};
window.onload =  function(){
    let savedTasks = JSON.parse(localStorage.getItem('actual-tasks'));
    
    // em vez de tasknum use info pega na localStorage
    document.querySelector('.actual-tasks').innerHTML += `
    <div class="task-${taskNum} mb-6" id="task-${taskNum}">
        <button class="delete is-large" id="delete-${taskNum}"></button>
        <div class="mb-5">
            <span class="time is-size-5" id="time-${taskNum}"></span>
        </div>
        <div class="text-task" id="tt-${taskNum}">
            <p id="${taskNum}">sd</p>

        </div>
        <div class="bottom-time">
            <span class="time is-size-5" id="time-2-${taskNum}"></span>
        </div>
    </div>`;
}