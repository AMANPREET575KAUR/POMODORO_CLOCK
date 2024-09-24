// Get necessary elements
const timerDisplay = document.getElementById('timer');
const sessionTimeDisplay = document.getElementById('session-time');
const breakTimeDisplay = document.getElementById('break-time');
const sessionIncrease = document.getElementById('session-increase');
const sessionDecrease = document.getElementById('session-decrease');
const breakIncrease = document.getElementById('break-increase');
const breakDecrease = document.getElementById('break-decrease');
const startButton = document.getElementById('start-btn');
const resetButton = document.getElementById('reset-btn');

let sessionTime = 25; // in minutes
let breakTime = 5; // in minutes
let timeRemaining = sessionTime * 60; // in seconds
let isSession = true; // To track if it's session or break time
let interval = null;
let isRunning = false;

// Update the timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Update the session and break time displays
function updateTimeDisplays() {
    sessionTimeDisplay.textContent = sessionTime;
    breakTimeDisplay.textContent = breakTime;
}

// Start the timer
function startTimer() {
    interval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();

        // Check if time has run out
        if (timeRemaining === 0) {
            isSession = !isSession;
            timeRemaining = (isSession ? sessionTime : breakTime) * 60;
            alert(isSession ? "Session Time!" : "Break Time!");
        }
    }, 1000);
}

// Stop the timer
function stopTimer() {
    clearInterval(interval);
    interval = null;
    isRunning = false;
}

// Reset the timer
function resetTimer() {
    stopTimer();
    sessionTime = 25;
    breakTime = 5;
    isSession = true;
    timeRemaining = sessionTime * 60;
    updateTimerDisplay();
    updateTimeDisplays();
    enableButtons();
}

// Disable the session and break time controls while the timer is running
function disableButtons() {
    sessionIncrease.disabled = true;
    sessionDecrease.disabled = true;
    breakIncrease.disabled = true;
    breakDecrease.disabled = true;
}

// Enable the session and break time controls when the timer is reset or stopped
function enableButtons() {
    sessionIncrease.disabled = false;
    sessionDecrease.disabled = false;
    breakIncrease.disabled = false;
    breakDecrease.disabled = false;
}

// Event listeners for the session and break time controls
sessionIncrease.addEventListener('click', () => {
    if (!isRunning) {
        sessionTime++;
        timeRemaining = sessionTime * 60;
        updateTimeDisplays();
        updateTimerDisplay();
    }
});

sessionDecrease.addEventListener('click', () => {
    if (sessionTime > 1 && !isRunning) {
        sessionTime--;
        timeRemaining = sessionTime * 60;
        updateTimeDisplays();
        updateTimerDisplay();
    }
});

breakIncrease.addEventListener('click', () => {
    if (!isRunning) {
        breakTime++;
        updateTimeDisplays();
    }
});

breakDecrease.addEventListener('click', () => {
    if (breakTime > 1 && !isRunning) {
        breakTime--;
        updateTimeDisplays();
    }
});

// Start and Reset button event listeners
startButton.addEventListener('click', () => {
    if (!isRunning) {
        disableButtons();
        isRunning = true;
        startTimer();
    }
});

resetButton.addEventListener('click', resetTimer);

// Initial display setup
updateTimerDisplay();
updateTimeDisplays();
