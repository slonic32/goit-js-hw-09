const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
let timerId;

buttonStart.addEventListener('click', startChangingColor);
buttonStop.addEventListener('click', stopChangingColor);

function startChangingColor() {
  buttonStart.disabled = true;
  timerId = setInterval(setColor, 1000);
}

function stopChangingColor() {
  clearInterval(timerId);
  buttonStart.disabled = false;
}

function setColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
