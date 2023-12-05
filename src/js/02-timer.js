import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputDate = document.querySelector('input#datetime-picker');
const buttonStart = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    console.log(selectedDate);
    checkDate();
  },
};

let timerID;
let selectedDate;

changeStyle();
buttonStart.disabled = true;

flatpickr(inputDate, options);

buttonStart.addEventListener('click', startCount);

function changeStyle() {
  const divTimer = document.querySelector('div.timer');
  const divFields = document.querySelectorAll('div.field');
  divTimer.style.display = 'flex';
  divTimer.style.gap = '10px';
  console.log(divFields);
  [...divFields].forEach(divField => {
    divField.style.display = 'flex';
    divField.style.flexDirection = 'column';
    console.log(divField.firstChild);
    divField.children[0].style.fontSize = '24px';
    divField.children[0].style.margin = 'auto';
    divField.children[1].style.fontSize = '14px';
    divField.children[1].style.margin = 'auto';
  });
}

function checkDate() {
  const currentDate = new Date();
  if (selectedDate <= currentDate) {
    buttonStart.disabled = true;
    Notify.failure('Please choose a date in the future');
  } else {
    buttonStart.disabled = false;
  }
}

function startCount() {
  buttonStart.disabled = true;
  timerID = setInterval(printTime, 1000);
}

function stopCount() {
  clearInterval(timerID);
  days.textContent = 0;
  hours.textContent = 0;
  minutes.textContent = 0;
  seconds.textContent = 0;
}

function printTime() {
  const currentDate = new Date();
  if (selectedDate - currentDate <= 0) {
    stopCount();
  } else {
    const time = convertMs(selectedDate - currentDate);
    days.textContent = addLeadingZero(time.days.toString());
    hours.textContent = addLeadingZero(time.hours.toString());
    minutes.textContent = addLeadingZero(time.minutes.toString());
    seconds.textContent = addLeadingZero(time.seconds.toString());
  }
}

function addLeadingZero(value) {
  return value.padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
