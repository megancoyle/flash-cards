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
  var $points = $(".points");
  var score = 0;

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
      back: "answer 4"},
    { title: "Title 5",
      front: "here's the filler text 5",
      back: "answer 5"},
    { title: "Title 6",
      front: "here's the filler text 6",
      back: "answer 6"}
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
    var $guessControls = $(".guess");
    var $controls = $("#controls");

    if ($userGuess == $cardAnswer) {
      // add congrats message
      $message.show().html("<p class='correct'>You got it right!</p>")
      score = score + 1;
      $points.text(score);
    } else {
      // if wrong, say sorry, incorrect
      $message.show().html("<p class='wrong'>Sorry, that wasn't right. Better luck next time!</p>")
      score = score - 1;
      $points.text(score);
    }
    // after card is answered, display other side of flash card with answered
    $cardBack.show();
    $cardFront.hide();
    $guessControls.hide();
    $controls.html("<input class='next' type='button' value='On to the Next Question!' />");
    $(".next").on("click", nextCard);
    // for (i = 0; i < 5; i++) {
    //   // show button to move to next card
    //   $controls.html("<input class='next' type='button' value='On to the Next Question!' />")
    //   $(".next").on("click", nextCard);
    //   if (i == 4) {
    //     $message.hide();
    //     $controls.html("<input class='play-again' type='button' value='Play Again?' />")
    //   }
    // }
  }

  function nextCard() {
    var card = new Card(flashCards.pop());
    $("#card").replaceWith(template(card));
    $(".next").remove();
    $message.hide();
    var $guessSubmit = $(".guess-submit");
    $guessSubmit.on("click", guessAnswer);
    var $cardBack = $(".back");
    $cardBack.hide();
  }

  //Handlebars Template variables
  var source = $("#card-template").html();
  var template = Handlebars.compile(source);

  // set up variables
  // keep score
  // number card that user is on

      // add point to user's score

});
