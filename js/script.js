const cards = document.querySelectorAll(".card-item");
let pause = false;

let isFirstFlipped = false;
let firstCard, secondCard;

// Add event listeners for flipping each card item
cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

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
  firstCard.dataset.name === secondCard.dataset.name ? cardsMatch() : cardsUnmatch();
}

function cardsMatch() {
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
