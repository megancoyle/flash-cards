// function to shuffle through arrays every time game is played
Array.prototype.shuffle = function() {
  var i = this.length, j, temp;
  if ( i == 0 ) return this;
  while ( --i ) {
     j = Math.floor( Math.random() * ( i + 1 ) );
     temp = this[i];
     this[i] = this[j];
     this[j] = temp;
  }
  return this;
}

$( document ).ready(function() {
  // user moves from title page to game page
  var $title = $("#title");
  var $card = $("#card");
  var $score = $("#score");
  var $message = $("#message");

  // user clicks intro title to get started
  $title.on("click", showGameBoard);

  // array of objects with information to pull for flash cards
  var flashCards = [
    { title: "Title 1",
      front: "Here's the filler text 1",
      back: "answer 1"},
    { title: "Title 2",
      front: "here's the filler text 2",
      back: "answer 2"},
    { title: "Title 3",
      front: "here's the filler text 3",
      back: "answer 3"},
    { title: "Title 4",
      front: "here's the filler text 4",
      back: "answer 4"}
  ].shuffle();

  // first flash card is shown
  // with user input field and submit button
  function showGameBoard() {
    $title.remove();
    $score.show();
    // generate new card with info from flashCards array
    var card = new Card(flashCards.pop());
    $("body").append(template(card));
    var $guessSubmit = $(".guess-submit");
    $guessSubmit.on("click", guessAnswer);
    var $cardBack = $(".back");
    $cardBack.hide();

  }

  // on click of submit, user input is evaluated
  // if matches answer string
  function guessAnswer(e) {
    e.preventDefault();
    var $guessInput = $(".guess-input");
    var $userGuess = $guessInput.val();
    var $cardAnswer = $(".back").text();
    var $cardBack = $(".back");
    var $cardFront = $(".front");

    if ($userGuess == $cardAnswer) {
      $message.show().html("<p class='correct'>You got it right!</p>")
      $cardBack.show();
      $cardFront.hide();
    } else {
      $message.show().html("<p class='wrong'>Sorry, that wasn't right. Better luck next time!</p>")
      $cardBack.show();
      $cardFront.hide();
    }
  }

  //Handlebars Template variables
  var source = $("#card-template").html();
  var template = Handlebars.compile(source);

  // set up variables
  // keep score
  // number card that user is on
  // array of possible cards to choose from


      // add point to user's score
      // add congrats message

  // if wrong, say sorry, incorrect

  // after card is answered, display other side of flash card with answered
});
