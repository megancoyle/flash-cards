$( document ).ready(function() {
  // user moves from title page to game page
  var $title = $("#title");
  var $card = $("#card");
  var $score = $("#score");

  $title.on("click", showGameBoard);

  function showGameBoard() {
    $title.remove();
    $card.show();
    $score.show();
  }

  //Handlebars Template variables
  var source = $("#card-template").html();
  var template = Handlebars.compile(source);

  // set up variables
  // keep score
  // number card that user is on
  // array of possible cards to choose from
  // function to shuffle through arrays every time game is played

  // user clicks intro title to get started
  // first flash card is shown
  // with user input field and submit button

  // on click of submit, user input is evaluated
  // if matches answer string
      // add point to user's score
      // add congrats message

  // if wrong, say sorry, incorrect

  // after card is answered, display other side of flash card with answered
});
