function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

let idInterval = null;

btnStart.addEventListener('click', () => {
  btnDisabled();
  idInterval = setInterval(() => {
    const color = getRandomHexColor();
    document.body.style.backgroundColor = `${color}`;
  }, 1000);
});
btnStop.addEventListener('click', () => {
  clearInterval(idInterval);
  btnDisabled();
});

function btnDisabled() {
  if (!btnStart.disabled) {
    btnStart.disabled = true;
    btnStop.disabled = false;
  } else {
    btnStart.disabled = false;
    btnStop.disabled = true;
  }
}