const cards = document.querySelectorAll(".card-item");
let cardCount = 0;
let pause = false;
let isFirstFlipped = false;
let firstCard, secondCard;

function startGame() {
  reset();

  // Add event listeners for flipping each card item
  cards.forEach((card) => {
    card.addEventListener("click", flipCard);
  });
}

function flipCard() {
  if (pause) return;
  if (firstCard === this) return;

  this.classList.toggle("flip");

  if (!isFirstFlipped) {
    isFirstFlipped = true;
    firstCard = this;
  } else {
    isFirstFlipped = false;
    secondCard = this;
    isMatch();
  }
}

// Check if cards match
function isMatch() {
  countMoves();
  firstCard.dataset.name === secondCard.dataset.name ? cardsMatch() : cardsUnmatch();
}

let status = document.querySelector(".status");
function cardsMatch() {
  cardCount += 2;
  if (cardCount == cards.length) {
    clearInterval(interval);
    status.innerHTML += " - You Won!";
  }

  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  pause = isFirstFlipped = false;
  firstCard = secondCard = null;
}

function cardsUnmatch() {
  pause = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    pause = isFirstFlipped = false;
    firstCard = secondCard = null;

    pause = false;
  }, 1500);
}

function shuffleCards() {
  cards.forEach((card) => {
    card.classList.remove("flip");
    let randomPosition = Math.floor(Math.random() * cards.length);
    card.style.order = randomPosition;
  });
}

// Timer
let timer = document.querySelector(".timer");
var seconds = 0,
  minutes = 0;
var interval;

function startTimer() {
  interval = setInterval(() => {
    if (seconds == 60) {
      minutes++;
      seconds = 0;
    }
    timer.innerHTML = minutes + " mins " + seconds++ + " secs";
  }, 1000);
}

// Moves Counter
let movesCounter = document.querySelector(".moves");
let moves = 0;

function countMoves() {
  moves++;
  movesCounter.innerHTML = moves + " moves";

  if (moves == 1) {
    seconds = 0;
    minutes = 0;
    startTimer();
  }
}

// Reset
const resetButton = document.querySelector(".reset");

resetButton.addEventListener("click", startGame);

function reset() {
  timer.innerHTML = "";
  movesCounter.innerHTML = "";
  cardCount = seconds = minutes = moves = 0;
  shuffleCards();
  clearInterval(interval);
  pause = isFirstFlipped = false;
  firstCard = secondCard = null;
}

startGame();
