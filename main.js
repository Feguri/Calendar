const date = new Date();
let dataBase = {
  'adderShown': false,
}
let daySelected = date.getDate();
let taskNum = 1;

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
      days += `<div class="today here hover-day" id="calendar-day-${i}">${i}</div>`;
    } else {
      days += `<div id="calendar-day-${i}" class="hover-day">${i}</div>`;
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
      daySelected = day;
      let year = date.getFullYear();
      let ddWeek = getDayString(Number(year), getMonth(document.getElementById('month').innerHTML), day);

      if (previousDivId === undefined){
          previousDivId = this.id;
      } else {
        try {
          document.getElementById(previousDivId).style.backgroundColor = '#222227';
          document.getElementById(previousDivId).style.border = 'none';
          previousDivId = this.id;
        } catch(err){

        }

      }

      document.getElementById('date-date').innerHTML = `${ddWeek},  ${month} ${day} ${year}`;
      document.getElementById('date-in').innerHTML = `${ddWeek},  ${month} ${day} ${year}`;
      
      // This just solved 2 problems at the same time :O
      for (let el of document.getElementsByClassName('hover-day')){
        el.removeAttribute('style');
      }

      document.getElementById(this.id).style.backgroundColor = '#262626';
      document.getElementById(this.id).style.border = '0.2rem solid #777';


      for (let key in dataBase){

        if (dataBase[key][0] !== undefined){

            function renderSavedTasks(){
              let weekDaySelected = getDay(Number(year), getMonth(document.getElementById('month').innerHTML), day) - 1;

              for (let key in dataBase){
        
                if (dataBase[key][0] !== undefined){
        
                    let savedTextContent = dataBase[key][0];
                    let savedTime1 = dataBase[key][1];
                    let savedTime2 = dataBase[key][2];
                    let savedTaskNum = dataBase[key][3];
                    let savedColor = dataBase[key][4];
                    dataBase[key][5] = JSON.parse(localStorage.getItem(`weekly-schedule-${savedTaskNum}`));


                    if (dataBase[key][5][weekDaySelected] === undefined){
                      weekDaySelected = 6;
                    }

                    if (!dataBase[key][5][weekDaySelected]){
                      // console.log(dataBase[key][5]);
                      document.getElementById(`task-${savedTaskNum}`).style.display = 'none';
                    } else {
                      document.getElementById(`task-${savedTaskNum}`).style.display = 'block';
                    }

                    let month12 = firstThreeLetters(document.getElementById('month').innerHTML);
                    let day12 = daySelected;
                    let year12 = date.getFullYear();
                    let cdate12 = year + "/" + month + "/" + day;
                    if (dataBase[key][6] === cdate12){
                      document.getElementById(`task-${savedTaskNum}`).style.display = 'block';
                    }

        
                }
            } 
        
              function Delete(){
                try {
                  document.getElementById(`task-${extractNum(this.id)}`).remove();
                  delete dataBase[`day-${extractNum(this.id)}`];
                 } catch(err){
                  document.getElementById(`task-null`).remove();
                  delete dataBase[`day-null`];
                 }
              }
        
              for (let el of document.getElementsByClassName('delete')){
                  el.addEventListener('click', Delete);
              }
            }

            renderSavedTasks();
            

        }
    }
      
    };

    document.getElementById(`calendar-day-${num}`).addEventListener('click', changeDay);

    }
};

const changeBgColorBasedOnCurrentMonthOnTheCalendar = () => {
    document.getElementById('month-bg').style.backgroundColor = colorOfTheMonths[document.getElementById('month').innerHTML];
    document.querySelector('.header').style.backgroundColor = colorOfTheMonths[document.getElementById('month').innerHTML];
    
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

function addTask(){
    
    document.querySelector('.actual-tasks').innerHTML += `
        <div class="task-${taskNum} mb-6 task" id="task-${taskNum}">
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

    document.getElementById(String(taskNum)).style.padding = `${document.getElementById('size').value} 0px`;

    let currColor = 0;

    let color = `background-color: ${colors[currColor]}`;

    if(dataBase === null){
      dataBase = {};
    }

    let month = firstThreeLetters(document.getElementById('month').innerHTML);
    let day = daySelected;
    let year = date.getFullYear();
    let cdate = year + "/" + month + "/" + day;
    
    let size = document.getElementById('size').value

    // Very Important!
    dataBase[`day-${taskNum}`] = [taskInput, time1, time2, taskNum, color, daysOfTheWeekSelected, cdate, size];

    function Delete(){
      try {
        document.getElementById(`task-${extractNum(this.id)}`).remove();
        delete dataBase[`day-${extractNum(this.id)}`];
       } catch(err){
        document.getElementById(`task-null`).remove();
        delete dataBase[`day-null`];
       }
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

    localStorage.setItem(`weekly-schedule-${taskNum}`, JSON.stringify(daysOfTheWeekSelected));
    taskNum++;

    document.getElementById('tdd').style.display = 'none';
    dataBase['adderShown'] = false;

    console.log(dataBase);
}
document.getElementById('add-btn').addEventListener('click', addTask);

let adderShown = false;
function showAdder(){

        if (adderShown){
          document.getElementById('tdd').style.display = 'none';
          adderShown = false;
      } else {
          document.getElementById('tdd').style.display = 'block';
          adderShown = true;
      }
      
}
document.getElementById('adder').addEventListener('click', showAdder);

window.onbeforeunload = function(){
    localStorage.setItem('database', JSON.stringify(dataBase));
    localStorage.setItem('taskNum', JSON.stringify(taskNum));

    // Uncomment code below and reset browser to clear storage
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
            dataBase[key][5] = JSON.parse(localStorage.getItem(`weekly-schedule-${savedTaskNum}`));

            const hasWeeklySchedule = () => {
              for(let item of dataBase[key][5]){
                if (item){
                  return true;
                }
              }
              return false;
            }

            let month3 = firstThreeLetters(document.getElementById('month').innerHTML);
            let day3 = daySelected;
            let year3 = date.getFullYear();
            let cdate3 = year3 + "/" + month3 + "/" + day3;
            // This will prevent specific-day tasks from loading on reload. Still need to work on it.

            document.querySelector('.actual-tasks').innerHTML += `
            <div class="task-${savedTaskNum} mb-6 task" id="task-${savedTaskNum}">
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

            console.log(dataBase[key][7]);
            if (dataBase[key][7] !== undefined){
              document.getElementById(String(savedTaskNum)).style.padding = `${dataBase[key][7]} 0px`;
            }
            

        }
    }

      function Delete(){
         try {
          document.getElementById(`task-${extractNum(this.id)}`).remove();
          delete dataBase[`day-${extractNum(this.id)}`];
         } catch(err){
          document.getElementById(`task-null`).remove();
          delete dataBase[`day-null`];
         }

      }

      for (let el of document.getElementsByClassName('delete')){
          el.addEventListener('click', Delete);
      }
      
    }
    renderSavedTasks();
    for (let key in dataBase){
      let month4 = firstThreeLetters(document.getElementById('month').innerHTML);
      let day4 = daySelected;
      let year4 = date.getFullYear();
      let cdate4 = year4 + "/" + month4 + "/" + day4;
    
      if (dataBase[key][0] !== undefined){
        if (dataBase[key][6] !== cdate4){
          console.log(dataBase[key][6], cdate4, extractNum(key) );
          document.getElementById(`task-${extractNum(key)}`).style.display = 'none';
        }
      }
      

    }

}

