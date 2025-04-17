// Initialize score from local storage
let score = JSON.parse(localStorage.getItem('scores')) || {
    wins: 0 , draws: 0 , losses:0 }

    // Update scoreboard
updateScoreEl();

let isAutoPlaying = false
let intervalId;


function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
        const playerMove = pickComputermove();
        playGame(playerMove)}, 1000) 
        isAutoPlaying = true;

    } else {
        clearInterval(intervalId)
        isAutoPlaying = false;
    }
}

function playGame (playerMove) {
    const computerMove = pickComputermove();

    let result = ''

    if (playerMove === 'scissors') {
        
        if (computerMove === 'paper') {
            result = 'You win.';
        } else if (computerMove === 'scissors') {
            result = 'Draw.'
        } else if (computerMove === 'rock') {
            result = 'You lose.'
        }

    } else if (playerMove === 'paper') {
        if (computerMove === 'paper') {
            result = 'Draw.'
        } else if (computerMove === 'scissors') {
            result = 'You lose.'
        } else if (computerMove === 'rock') {
            result = 'You win.'
        }

    } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Draw.'
        } else if (computerMove === 'paper') {
            result = 'You lose.'
        } else if (computerMove === 'scissors') {
            result = 'You win.'
        }
    }

    if (result === 'You win.') {
        score.wins += 1;
    } else if (result === 'You lose.') {
        score.losses += 1;
    } else if (result === "Draw.") {
        score.draws += 1;
    }

     // Save updated score to local storage
    localStorage.setItem('scores', JSON.stringify(score));

      // Update scoreboard
    updateScoreEl();

     // Update results on the page
    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-move').innerHTML = `
        You <img src="images/${playerMove}-emoji.png" class="move-icon">
        vs
        Computer <img src="images/${computerMove}-emoji.png" class="move-icon">
    `;
  

}

function updateScoreEl() {
    document.querySelector('.js-score').innerHTML = `wins: ${score.wins}, losses: ${score.losses}, draws: ${score.draws}`
}

// resets the score
function resetScore() {
    score = {wins:0, draws:0, losses:0}
    localStorage.setItem('scores', JSON.stringify(score));

    // Clear result and move display
    document.querySelector('.js-result').innerHTML = '';
    document.querySelector('.js-move').innerHTML = '';
    updateScoreEl()
}

// the computerMove
function pickComputermove() {
    const randomNumber = Math.random()

    let computerMove = ''

    if (randomNumber  >= 0 && randomNumber < 1/3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
        computerMove = 'paper';
    } else if (randomNumber >= 2/3 && randomNumber < 1) {
        computerMove = 'scissors';
    }

    return computerMove;
}

