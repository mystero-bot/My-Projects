//set initial count
let count = Number(localStorage.getItem('count')) || 0;

// select value and buttons
const value = document.querySelector('#value');
const btns = document.querySelectorAll('.btn');
const incTimerEl = document.getElementById('inc-timer');
const decTimerEl = document.getElementById('dec-timer');
const speedSelect = document.querySelector('#speed-select');

updatedDisplay();

btns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        let styles = event.currentTarget.classList;
        if (styles.contains('decrease')) {
            count--;
        } else if (styles.contains('increase')) {
            count++;
        } else if (styles.contains('reset')) {
            count = 0;
        }
        console.log(styles)

        updatedDisplay();
       
    })
})


// Auto play variables
let autoIncRunning = false;
let autoDecRunning = false;
let incIntervalId, decIntervalId;
let incTimerInterval, decTimerInterval;
let incTimer = 0;
let decTimer = 0;


function autoPlayDecrease() {
    const btn = document.querySelector('.js-auto-decrease');
    const speed = Number(speedSelect.value || 1000)

    if (!autoDecRunning) {
        decIntervalId = setInterval(() => {
            autoDecrease()
        }, speed);
        decTimerInterval = setInterval(() => {
            decTimer++;
            decTimerEl.textContent = `${decTimer}s`
        }, 1000);
       

        autoDecRunning = true;
        btn.textContent = "Stop Auto-Decrease";
    } else {
        clearInterval(decIntervalId);
        clearInterval(decTimerInterval);
        decTimer = 0;
        decTimerEl.textContent = `0s`

        autoDecRunning = false;
        btn.textContent = "Start Auto-Decrease"
    }
}



function autoPlayIncrease() {
    const btn2 = document.querySelector('.js-auto-increase');
    const speed = Number(speedSelect.value || 1000)

    if(!autoIncRunning ) {
        incIntervalId = setInterval(() => {
            autoIncrease()
        },speed)
        incTimerInterval = setInterval(() => {
            incTimer++
            incTimerEl.textContent = `${incTimer++}s`
        },1000)

        autoIncRunning = true;
        btn2.textContent = "Stop-Auto-Increase"
        

    } else {
        clearInterval(incIntervalId)
        clearInterval(incTimerInterval)

        incTimer = 0;
        incTimerEl.textContent = `0s`

        autoIncRunning = false;
        btn2.textContent = "Start Auto-Increase"
        
        
    }
}

document.querySelector('.js-auto-decrease').addEventListener('click', () => {
    autoPlayDecrease();
})

document.querySelector('.js-auto-increase').addEventListener('click', () => {
    autoPlayIncrease();
})



function autoDecrease() {
    count--
    updatedDisplay();

}

function autoIncrease() {
    count++
    updatedDisplay();
}

function updatedDisplay() {
    value.textContent = count;

    if (count > 0) {
        value.style.color = "green"
    } else if (count < 0) {
        value.style.color = "red"
    } else {
        value.style.color = "black"
    }

    localStorage.setItem('count', count);
}