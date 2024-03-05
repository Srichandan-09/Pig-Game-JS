'use strict';

// Buttons
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

// Continue Playing
let playing = true;

// Dice Image
const dice = document.querySelector('.dice');

// Total Score Holder
let totalScoreArray = [0, 0];

// Current Score Counter
let currentScore = 0;

// Current Player
let activeUser = 0;

// Player 1 and Player 2
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

// Switching Player Function

const switchPlayer = function () {
  // Switching to next Player
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');

  // Changing current score to 0
  currentScore = 0;
  document.getElementById(`current--${activeUser}`).textContent = currentScore;

  // Changing the active user
  activeUser = Number(!activeUser && 1); // activeUser = activeUser === 0 ? 1 : 0;
};

// Rolling the Dice

btnRoll.addEventListener('click', function () {
  if (playing) {
    // Random Number on dice
    const randDice = Math.floor(Math.random() * 6 + 1);

    // Displaying Dice image
    dice.src = `/images/dice-${randDice}.png`;
    dice.classList.remove('hidden');

    // Check whether 1 is rolled

    if (randDice !== 1) {
      // Adding to current score
      currentScore += randDice;

      // Current score display of Player 1 or Player 2
      document.getElementById(`current--${activeUser}`).textContent =
        currentScore;
    } else {
      // Switching to next Player
      switchPlayer();
    }
  }
});

// Holding the score

btnHold.addEventListener('click', function () {
  if (playing) {
    // Storing current score to the total score array
    totalScoreArray[activeUser] += currentScore;

    // Total score display of player 1 or player 2
    document.getElementById(`score--${activeUser}`).textContent =
      totalScoreArray[activeUser];

    // Check if total score is 100
    if (totalScoreArray[activeUser] >= 50) {
      // Stop Playing
      playing = false;

      // Displaying the winner
      const winner = document.querySelector(`.player--${activeUser}`);
      winner.classList.remove('player--active');
      winner.classList.add('player--winner');

      // Changing current score to 0
      document.getElementById(`current--${activeUser}`).textContent = 0;

      // Removing the Dice image
      dice.classList.add('hidden');
    } else {
      // Switching to next Player
      switchPlayer();
    }
  }
});

// New Game

btnNew.addEventListener('click', function () {
  // Continue Playing
  playing = true;

  // Removing winner
  const winner = document.querySelector(`.player--${activeUser}`);
  winner.classList.remove('player--winner');

  // Setting the total score of both player to 0
  totalScoreArray = [0, 0];
  const clearTotalScore = document.querySelectorAll('.score');
  for (let i = 0; i < clearTotalScore.length; i++) {
    clearTotalScore[i].textContent = 0;
  }

  // Setting current score of both players to 0
  currentScore = 0;
  const clearCurrentScore = document.querySelectorAll('.current-score');
  for (let i = 0; i < clearCurrentScore.length; i++) {
    clearCurrentScore[i].textContent = currentScore;
  }

  // Removing Dice Image
  dice.classList.add('hidden');

  // Switching back to Player 1
  activeUser = 0;
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
});
