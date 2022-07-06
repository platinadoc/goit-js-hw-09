// Документация
import flatpickr from 'flatpickr';
// Стили дополнение
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStart = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const inputEl = document.querySelector('#datetime-picker');

let selected = null;
btnStart.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selected = selectedDates[0].getTime();

    if (selected < new Date()) {
      Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
      return;
    }
    btnStart.disabled = false;
  },
};
function addZero(value) {
  return String(value).padStart(2, '0');
}
const foo = () => {
  const fr = setInterval(() => {
    inputEl.disabled = true;
    btnStart.disabled = true;
    const diff = selected - Date.now();
    console.log(diff);
    if (diff < 1000) {
      clearInterval(fr);
      inputEl.disabled = false;
      btnStart.disabled = true;
    }
    const { days, hours, minutes, seconds } = convertMs(diff);
    daysEl.textContent = addZero(days);
    hoursEl.textContent = addZero(hours);
    minutesEl.textContent = addZero(minutes);
    secondsEl.textContent = addZero(seconds);
  }, 1000);
};
let calendar = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

btnStart.addEventListener('click', foo);