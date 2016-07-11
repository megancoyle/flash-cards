var game = new Game({
  flashCards: flashCards
});

$( document ).ready(function() {
  // user moves from title page to game page
  var $title = $("#title");
  var $card = $("#card");
  var $score = $("#score");
  var $message = $("#message");
  var $points = $(".points");

  // user clicks intro title to get started
  $title.on("click", showGameBoard);

  // first flash card is shown
  // with user input field and submit button
  function showGameBoard() {
    $title.remove();
    $score.show();
    // timer
    var sec = -1;
    function pad(val) { return val > 9 ? val : "0" + val; }
    setInterval(function () {
        $("#seconds").html(pad(++sec % 60));
        $("#minutes").html(pad(parseInt(sec / 60, 10) % 60));
        $("#hours").html(pad(parseInt(sec / 3600, 10)));
    }, 1000);
    $score.append("<p>Time: <span id='hours'>00</span>:<span id='minutes'>00</span>:<span id='seconds'>00</span></p></div>");

    // generate new card with info from flashCards array
    var card = game.getNextCard();
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
    var $userGuess = $guessInput.val().toLowerCase();;
    var $cardAnswer = $(".back").text();
    var $cardBack = $(".back");
    var $cardFront = $(".front");
    var $guessControls = $(".guess");
    var $controls = $("#controls");

    var guessedRight = game.guess($userGuess);
    if (guessedRight) {
      // add congrats message
      $message.show().html("<p class='correct'>You got it right!</p>")

      $points.text(game.score);
    } else {
      // if wrong, say sorry, incorrect
      $message.show().html("<p class='wrong'>Sorry, that wasn't right. Better luck next time!</p>")

      $points.text(game.score);
    }

    // after card is answered, display other side of flash card with answered
    $cardBack.show();
    $cardFront.hide();
    $guessControls.hide();
    $controls.html("<input class='next' type='button' value='On to the Next Question!' />");
    $(".next").on("click", nextCard)
  }

  function nextCard() {
    var card = game.getNextCard();

      if (card) {
        $("#card").replaceWith(template(card));
        $(".next").remove();
        $message.hide();
        var $guessSubmit = $(".guess-submit");
        $guessSubmit.on("click", guessAnswer);
        var $cardBack = $(".back");
        $cardBack.hide();
      } else {
        $message.hide();
        $("#controls").html("<input class='again' type='button' value='Play Again?' />");
        $(".again").on("click", function(){
          location.reload();
        });
        $("#card").html("game over");
      }
  }


  //Handlebars Template variables
  var source = $("#card-template").html();
  var template = Handlebars.compile(source);
});
