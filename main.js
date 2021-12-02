const date = new Date();

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