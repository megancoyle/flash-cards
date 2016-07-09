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
  }

  //Handlebars Template variables
  var source = $("#card-template").html();
  var template = Handlebars.compile(source);

  // set up variables
  // keep score
  // number card that user is on
  // array of possible cards to choose from

  // on click of submit, user input is evaluated
  // if matches answer string
      // add point to user's score
      // add congrats message

  // if wrong, say sorry, incorrect

  // after card is answered, display other side of flash card with answered
});
