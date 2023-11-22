const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
const body = document.querySelector("body");

startBtn.addEventListener('click', onClickStart);
stopBtn.addEventListener('click', onClickStop);

let timerId = null;

function onClickStart() {
    timerId = setInterval(getBgColor, 1000); 
    startBtn.toggleAttribute('disabled');
};

function onClickStop() {
clearInterval(timerId); 
 startBtn.removeAttribute('disabled');    
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

function getBgColor() {
  body.style.backgroundColor = getRandomHexColor();
};

