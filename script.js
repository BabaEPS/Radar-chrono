
let startTime = null;
let running = false;

const button = document.getElementById('startStopBtn');
const distanceInput = document.getElementById('distance');
const vitesseDisplay = document.getElementById('vitesseDisplay');
const historyList = document.getElementById('historyList');

button.addEventListener('click', () => {
  const distance = parseFloat(distanceInput.value);

  if (isNaN(distance) || distance <= 0) {
    alert("Veuillez entrer une distance valide.");
    return;
  }

  if (!running) {
    startTime = new Date();
    running = true;
    button.textContent = "Stop";
    button.classList.add("stop");
    vitesseDisplay.textContent = "Chrono en cours...";
  } else {
    const endTime = new Date();
    const timeInSeconds = (endTime - startTime) / 1000;
    const speed = (distance / timeInSeconds) * 3.6;

    const resultText = `Vitesse : ${speed.toFixed(2)} km/h`;
    vitesseDisplay.textContent = resultText;

    saveResult(speed.toFixed(2));
    updateHistory();

    running = false;
    button.textContent = "Start";
    button.classList.remove("stop");
  }
});

function saveResult(speed) {
  const results = JSON.parse(localStorage.getItem('results') || '[]');
  results.unshift({ speed, date: new Date().toLocaleString() });
  localStorage.setItem('results', JSON.stringify(results));
}

function updateHistory() {
  const results = JSON.parse(localStorage.getItem('results') || '[]');
  historyList.innerHTML = results.map(res =>
    `<li>${res.date} : ${res.speed} km/h</li>`
  ).join('');
}

updateHistory();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
