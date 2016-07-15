// Game Constructor
function Game(options) {
  this.flashCards = options.flashCards.map(function (cardData) {
    return new Card(cardData);
  }).shuffle();
  // currentCard set up
  this.currentCard;
  this.score = 0;

  this.getNextCard = function () {
    // pops card from flashCards and sets currentCard
    this.currentCard = this.flashCards.pop();
    return this.currentCard;
  }
  //evaluate if guess is correct
  this.guess = function (guess) {
    var answer = this.currentCard.back.toLowerCase();;
    var guessedRight = guess === answer;
    // scoring logic
    if (guessedRight) {
      this.score++;
    } else {
      this.score--;
      // add missed card back
      this.flashCards.push(this.currentCard);
      this.flashCards.shuffle();
    }

    return guessedRight;
  }
}
