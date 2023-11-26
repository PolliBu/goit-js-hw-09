import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const selectors = {
    dateTime: document.querySelector('#datetime-picker'),
    dataStart: document.querySelector('[data-start]'),
    dataDays: document.querySelector('[data-days]'),
    dataHours: document.querySelector('[data-hours]'),
    dataMinutes: document.querySelector('[data-minutes]'),
    dataSeconds: document.querySelector('[data-seconds]'), 
    timer: document.querySelector('.timer')
}

selectors.timer.style.display = 'flex';
selectors.timer.style.gap = '25px';

selectors.dataStart.disabled = true;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] > new Date) {
         selectors.dataStart.disabled = false; 
        } else {
            selectors.dataStart.disabled = true;  
            Notify.failure('Please choose a date in the future');   
        }
  },
};

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

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

selectors.dataStart.addEventListener('click', onClick);

function onClick() {
  const selectDate = flat.selectedDates[0];
  timerId = setInterval(() => {
    const startTime = new Date();
    const count = selectDate - startTime;
    selectors.dataStart.disabled = true;
     if (count < 0) {
       clearInterval(timerId);
       return;
    }
    updateTime(convertMs(count));
 }, 1000);
}

function updateTime({ days, hours, minutes, seconds }) {
    selectors.dataDays.textContent = addLeadingZero(days);
    selectors.dataHours.textContent = addLeadingZero(hours);
    selectors.dataMinutes.textContent = addLeadingZero(minutes);
     selectors.dataSeconds.textContent = addLeadingZero(seconds);
};

const flat = flatpickr(selectors.dateTime, options);




