// Load count from localStorage or start at 0
let count = Number(localStorage.getItem('count')) || 0;

// DOM Elements
const value = document.querySelector('#value');
const btns = document.querySelectorAll('.btn');
const incTimerEl = document.getElementById('inc-timer');
const decTimerEl = document.getElementById('dec-timer');
const speedSelect = document.querySelector('#speed-select'); // Optional: dropdown to select speed

// Track history
let countHistory = [count];

// Initial display
updateDisplay();

// Auto play variables
let autoIncRunning = false;
let autoDecRunning = false;
let incIntervalId, decIntervalId;
let incTimerInterval, decTimerInterval;
let incTimer = 0;
let decTimer = 0;

// Update displayed count and color
function updateDisplay() {
    value.textContent = count;

    if (count > 0) {
        value.style.color = "green";
        value.classList.add("green-glow");
        value.classList.remove("red-glow");
    } else if (count < 0) {
        value.style.color = "red";
        value.classList.add("red-glow");
        value.classList.remove("green-glow");
    } else {
        value.style.color = "black";
        value.classList.remove("green-glow", "red-glow");
    }

    // Animation pop effect
    value.classList.remove("pop");
    void value.offsetWidth;
    value.classList.add("pop");

    localStorage.setItem('count', count);
    countHistory.push(count);
}

// Add button listeners
btns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        const styles = event.currentTarget.classList;

        if (styles.contains('decrease')) {
            count--;
        } else if (styles.contains('increase')) {
            count++;
        } else if (styles.contains('reset')) {
            count = 0;
        }

        updateDisplay();
        playSound();
    });
});

// Auto Increase
function autoIncrease() {
    if (count < 100) {
        count++;
        updateDisplay();
        playSound();
    }
}

// Auto Decrease
function autoDecrease() {
    if (count > -100) {
        count--;
        updateDisplay();
        playSound();
    }
}

// Auto Play Increase toggle
function autoPlayIncrease() {
    const btn = document.querySelector('.js-auto-increase');
    const speed = Number(speedSelect.value || 1000);

    if (!autoIncRunning) {
        incIntervalId = setInterval(autoIncrease, speed);
        incTimerInterval = setInterval(() => {
            incTimer++;
            incTimerEl.textContent = `${incTimer}s`;
        }, 1000);

        autoIncRunning = true;
        btn.textContent = "Stop Auto-Increase";
    } else {
        clearInterval(incIntervalId);
        clearInterval(incTimerInterval);
        incTimer = 0;
        incTimerEl.textContent = `0s`;

        autoIncRunning = false;
        btn.textContent = "Start Auto-Increase";
    }
}

// Auto Play Decrease toggle
function autoPlayDecrease() {
    const btn = document.querySelector('.js-auto-decrease');
    const speed = Number(speedSelect?.value || 1000);

    if (!autoDecRunning) {
        decIntervalId = setInterval(autoDecrease, speed);
        decTimerInterval = setInterval(() => {
            decTimer++;
            decTimerEl.textContent = `${decTimer}s`;
        }, 1000);

        autoDecRunning = true;
        btn.textContent = "Stop Auto-Decrease";
    } else {
        clearInterval(decIntervalId);
        clearInterval(decTimerInterval);
        decTimer = 0;
        decTimerEl.textContent = `0s`;

        autoDecRunning = false;
        btn.textContent = "Start Auto-Decrease";
    }
}

// Export count history
function exportHistory() {
    const blob = new Blob([countHistory.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'count-history.txt';
    a.click();
    URL.revokeObjectURL(url);
}

// Optional: Play a simple beep
function playSound() {
    const audio = new Audio('https://www.soundjay.com/button/sounds/beep-07.mp3');
    audio.volume = 0.3;
    audio.play();
}

// Hook up auto buttons and export
document.querySelector('.js-auto-decrease').addEventListener('click', autoPlayDecrease);
document.querySelector('.js-auto-increase').addEventListener('click', autoPlayIncrease);
document.querySelector('.js-export-history').addEventListener('click', exportHistory);
