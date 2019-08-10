/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, endGame, diceHistory, finalScore;
init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (!endGame){
        // Get a random number between 1 and 6
        var diceNumber1 = Math.floor(Math.random() * 6) + 1;
        var diceNumber2 = Math.floor(Math.random() * 6) + 1;

        var lengthDistory = diceHistory.length        
        // Update scores
        if (diceNumber1 == 1 && diceNumber2 == 1){
            switchPlayer();
        }else if (lengthDistory >=2){
            if (diceHistory[lengthDistory - 1] == 6 && diceHistory[lengthDistory - 2] == 6) {
                scores[activePlayer] = 0;
                document.querySelectorAll('.player-score')[activePlayer].textContent = scores[activePlayer];
                switchPlayer();
            }else{
                updateCurrentScore(diceNumber1,diceNumber2);
            };
        }else if (diceNumber1 == diceNumber2){
            switchPlayer();
        }else{
            updateCurrentScore(diceNumber1, diceNumber2);
        };
    };
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (!endGame){
        scores[activePlayer] += roundScore
        document.querySelectorAll('.player-score')[activePlayer].textContent = scores[activePlayer];
        // Check if total score is final score
        input = document.querySelector('.final-score').value;
        if (input) {
            finalScore = input;
        } else {
            finalScore = 100;
        }
        if (scores[activePlayer] >= finalScore){
            // Update for winner
            document.querySelector('.player-0-panel').classList.remove('active');
            document.querySelector('.player-1-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelectorAll('.player-name')[activePlayer].textContent = 'Winner';
            document.querySelectorAll('.player-current-score')[activePlayer].textContent = 0;
            // Reset image
            document.querySelectorAll('.dice')[0].style.display = 'none';
            document.querySelectorAll('.dice')[1].style.display = 'none';

            // End game
            endGame = true;
        }else {
            // Update the player score
            switchPlayer();
        };
    };
});

document.querySelector('.btn-new').addEventListener('click', init);

function switchPlayer() {
    // Reset image
    document.querySelectorAll('.dice')[0].style.display = 'none';
    document.querySelectorAll('.dice')[1].style.display = 'none';

    // Set roundScore to zero
    roundScore = 0;

    // Set current score to zero
    document.querySelectorAll('.player-current-score')[activePlayer].textContent = roundScore;

    // Set diceHistory empty
    diceHistory = [];
    
    // Change active player
    activePlayer == 0 ? activePlayer = 1: activePlayer = 0;

    // Update the view when switching player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
};

function init() {
    // Init variables
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    diceHistory = [];
    endGame = false;

    // Update content
    document.querySelectorAll('.player-name')[0].textContent = 'Player 1';
    document.querySelectorAll('.player-name')[1].textContent = 'Player 2';
    document.querySelectorAll('.player-score')[0].textContent = 0;
    document.querySelectorAll('.player-score')[1].textContent = 0;
    document.querySelectorAll('.player-current-score')[0].textContent = 0;
    document.querySelectorAll('.player-current-score')[1].textContent = 0;

    // Update style
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');

    // Reset image
    document.querySelectorAll('.dice')[0].style.display = 'none';
    document.querySelectorAll('.dice')[1].style.display = 'none';
};

function updateCurrentScore(diceNumber1, diceNumber2){
    // Display the result of the dice in current score
    roundScore+=(diceNumber1 + diceNumber2);
    document.querySelectorAll('.player-current-score')[activePlayer].textContent = roundScore;

    // Update dicehistory
    diceHistory.push(diceNumber1);

    // Change the the image of dice
    document.querySelectorAll('.dice')[0].style.display = 'block';
    document.querySelectorAll('.dice')[0].src = 'dice-' + diceNumber1 + '.png';
    document.querySelectorAll('.dice')[1].style.display = 'block';
    document.querySelectorAll('.dice')[1].src = 'dice-' + diceNumber2 + '.png';
}
