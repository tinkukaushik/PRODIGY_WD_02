// script.js

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0').slice(0, 2);
    return `${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function startStop() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10);
        startStopBtn.textContent = 'Pause';
        isRunning = true;
    } else {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
        isRunning = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00.00';
    elapsedTime = 0;
    startStopBtn.textContent = 'Start';
    isRunning = false;
    lapsList.innerHTML = '';
}

function lap() {
    if (isRunning) {
        const lapTime = document.createElement('li');
        lapTime.textContent = formatTime(elapsedTime);
        lapsList.appendChild(lapTime);
    }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
