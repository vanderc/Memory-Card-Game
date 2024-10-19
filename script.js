// Array of card values (each appearing twice for matching)
const cardsArray = [
    '🏄‍♂️', '🏄‍♂️',
    '🍌', '🍌',
    '🌊', '🌊',
    '🍒', '🍒',
    '😁', '😁',
    '🍉', '🍉',
    '🐉', '🐉',
    '🍓', '🍓'
];

// Variables to track the first and second selected cards
let firstCard = null;
let secondCard = null;
let lockBoard = false;
// function to shuffle the array randomly
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Function to create a card element
function createCard(cardValue) {
    const card = document.createElement('div');
    card.classList.add('card'); // add class for styling
    card.dataset.cardValue = cardValue; // store the card value in a data attribute

    // Create the front face of the card
    const cardFaceFront = document.createElement('div');
    cardFaceFront.classList.add('card-face', 'front'); // add classes for styling
    cardFaceFront.innerHTML = ''; // Front face is empty 

    // Create the back face of the card
    const cardFaceBack = document.createElement('div');
    cardFaceBack.classList.add('card-face', 'back'); // Add classes for styling
    cardFaceBack.innerHTML = cardValue; // Display the card value on the back face

    // Append the front and the back faces to the card
    card.appendChild(cardFaceFront);
    card.appendChild(cardFaceBack);
    
    // Add a click event listener to flip the card
    card.addEventListener('click', flipCard);
    
    return card;
}

// Function to handle card flipping logic
function flipCard() {
    // Prevents flipping if the cards are matched or locked.
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');

    // If no card has been selected yet set this as the first card.
    if (!firstCard) {
        firstCard = this;
        return;
    }

    // Otherwise set this as the second card and lock the board
    secondCard = this;
    lockBoard = true;

    // Check for a match between the two selected cards
    checkForMatch();
}

// Function to check if the two cards match
function checkForMatch() {
    const isMatch = firstCard.dataset.cardValue === secondCard.dataset.cardValue;
    isMatch ? resetCards() : unflipCards();
}

// Function to reset selected cards
function resetCards() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

// Function to unflip cards if they do not match
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetCards();
    }, 1000);
}

// Function to setup the game board.
function setupGame() {
    const gameBoard = document.getElementById('gameBoard');
    shuffle(cardsArray).forEach(cardValue => {
        const card = createCard(cardValue);
        gameBoard.appendChild(card);
    });
}

// Initialize the game setup
setupGame();
