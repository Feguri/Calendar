const date = new Date();
let dataBase = {
  'adderShown': false,
}

// starting on monday
let daysOfTheWeekSelected = [false, false, false, false, false, false, false];

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
    console.log(str);
    for (let char of str){
      for (let num of nums){
        if (char === num){
          filteredStr += char;
        }
      }
    }
    return Number(filteredStr);
}

function firstThreeLetters(str){
  let final = '';
  for (let i = 0; i < 3; i++){
    if (i === 0){
      final += str[i].toUpperCase();
    } else {
      final += str[i];
    }
  }
  return final;
}

for (let dayOfTheWeek of document.getElementsByClassName('circle-week')){
  dayOfTheWeek.addEventListener('click', function(){

    if(daysOfTheWeekSelected[extractNum(this.id)]){

      dayOfTheWeek.style.backgroundColor = '#222227';
      dayOfTheWeek.style.color = 'white';
      daysOfTheWeekSelected[extractNum(this.id)] = false;

    } else {

      dayOfTheWeek.style.backgroundColor = 'white';
      dayOfTheWeek.style.color = 'black';
      daysOfTheWeekSelected[extractNum(this.id)] = true;
      
    }

  });
}

let previousDivId;
const renderCalendar = () => {
  function clearTasks(){

    for (let task of document.getElementsByClassName('actual-tasks')){
      task.remove();
    }

  }
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
  
  let toIterate = [];

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today here" id="calendar-day-${i}">${i}</div>`;
    } else {
      days += `<div id="calendar-day-${i}">${i}</div>`;
    }
    toIterate.push(i);
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }
  for(let num of toIterate){

    function changeDay(){

      // insert code here. also, load up current day based on local storage
      // oh and save the color of the task in local storage. it's nice.
      let month = firstThreeLetters(document.getElementById('month').innerHTML);
      let day = extractNum(this.id);
      let year = date.getFullYear();
      let ddWeek = getDayString(Number(year), getMonth(document.getElementById('month').innerHTML), day);

      if (previousDivId === undefined){
          previousDivId = this.id;
      } else {
          document.getElementById(previousDivId).style.backgroundColor = '#222227';
          document.getElementById(previousDivId).style.border = 'none';
          previousDivId = this.id;
      }

      document.getElementById('date-date').innerHTML = `${ddWeek},  ${month} ${day} ${year}`;
      document.getElementById('date-in').innerHTML = `${firstThreeLetters(ddWeek)} ${month} ${day} ${year}`;

      document.getElementById(this.id).style.backgroundColor = '#262626';
      document.getElementById(this.id).style.border = '0.2rem solid #777';
      clearTasks();
      renderSavedTasks();
      
      
    };

    document.getElementById(`calendar-day-${num}`).addEventListener('click', changeDay);

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

function getDay(y, m, d) {
  let h = new Date(y, --m, d);
  return h.getDay();
}
function getMonth(str){
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
  for (let month of months){
    if (str.toUpperCase() === month.toUpperCase()){
      return months.indexOf(month) + 1;
    }
  }
  return 0;
}

function getDayString(y, m, d) {
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let h = new Date(y, --m, d);
  return h && days[h.getDay()];
}
console.log(getDay(2020, 12, 19));

function addTask(){
    console.log(dataBase);


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

    let currColor = 0;

    let color = `background-color: ${colors[currColor]}`;

    if(dataBase === null){
      dataBase = {};
    }

    dataBase[`day-${taskNum}`] = [taskInput, time1, time2, taskNum, color, daysOfTheWeekSelected];


    function Delete(){
        document.getElementById(`task-${extractNum(this.id)}`).remove();
        delete dataBase[`day-${extractNum(this.id)}`];
    }
    

    function changeColor(e){

        document.getElementById(`time-${e.target.here}`).style.backgroundColor = colors[currColor];
        document.getElementById(`time-2-${e.target.here}`).style.backgroundColor = colors[currColor];
        document.getElementById(`tt-${e.target.here}`).style.borderLeft = `3px solid ${colors[currColor]}`;

        color = `background-color: ${colors[currColor]}`;

        dataBase[`day-${e.target.here}`][4] = color; 
        
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
    localStorage.setItem('database', JSON.stringify(dataBase));
    localStorage.setItem('taskNum', JSON.stringify(taskNum));

    // Uncomment code below to clear storage
    // localStorage.clear();
};

window.onload =  function(){


    let savedDataBase = JSON.parse(localStorage.getItem('database'));
    let savedTaskNum = JSON.parse(localStorage.getItem('taskNum'));
    
    if (dataBase !== null){
      dataBase = savedDataBase;
      taskNum = savedTaskNum;  
    }

    function renderSavedTasks(){
      for (let key in dataBase){

        if (dataBase[key][0] !== undefined){

            let savedTextContent = dataBase[key][0];
            let savedTime1 = dataBase[key][1];
            let savedTime2 = dataBase[key][2];
            let savedTaskNum = dataBase[key][3];
            let savedColor = dataBase[key][4];
            let daysOfTheWeek = dataBase[key][5];

            let day1 = extractNum(this.id);
            let year1 = date.getFullYear();
            let ddWeek1 = getDayString(Number(year1), getMonth(document.getElementById('month').innerHTML), day1);
            if (daysOfTheWeek[ddWeek1]){
              document.querySelector('.actual-tasks').innerHTML += `
              <div class="task-${savedTaskNum} mb-6" id="task-${savedTaskNum}">
                  <button class="delete is-large" id="delete-${savedTaskNum}"></button>
                  <div class="mb-5">
                      <span class="time is-size-5" id="time-${savedTaskNum}" style="${savedColor}">${savedTime1}</span>
                  </div>
                  <div class="text-task" id="tt-${savedTaskNum}">
                      <p id="${savedTaskNum}">${savedTextContent}</p>
          
                  </div>
                  <div class="bottom-time">
                      <span class="time is-size-5" id="time-2-${savedTaskNum}" style="${savedColor}">${savedTime2}</span>
                  </div>
              </div>`;
            }

        }
    }

      function Delete(){
          document.getElementById(`task-${extractNum(this.id)}`).remove();
          delete dataBase[`day-${extractNum(this.id)}`];
      }

      for (let el of document.getElementsByClassName('delete')){
          el.addEventListener('click', Delete);
      }
    }
    renderSavedTasks();

}

