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
  var $guessInput;
  var $userGuess;

  // user clicks intro title to get started
  $title.on("click", showGameBoard);

  // first flash card is shown with user input field and submit button
  function showGameBoard() {
    $("body").css("background-image", "url(images/desk-darker.jpg)");
    $title.remove();
    $score.show();
    // timer
    var sec = 0;
    function pad(val) { return val > 9 ? val : "0" + val; }
    setInterval(function () {
        $("#seconds").html(pad(++sec % 60));
        $("#minutes").html(pad(parseInt(sec / 60, 10) % 60));
        $("#hours").html(pad(parseInt(sec / 3600, 10)));
    }, 1000);
    $score.append("<p>Time: <span id='hours'>00</span> : <span id='minutes'>00</span> : <span id='seconds'>00</span></p></div>");

    // generate new card with info from flashCards array
    var card = game.getNextCard();
    $("body").append(template(card));
    var $guessSubmit = $(".guess-submit");
    var $cardBack = $(".back");
    $(".guess-input").focus();
    var $backInput = $(".back-input");
    $cardBack.hide();
    $backInput.hide();
    $guessSubmit.on("click", guessAnswer);
    $(".front").on("click", guessAnswer);
    if ($cardBack.attr("display", "none")) {
      // keypress to card back
      $("input").keypress(function (e) {
        if (e.keyCode == '13') {
            guessAnswer();
        }
      });
    }
  }

  // on click of submit, user input is evaluated
  function guessAnswer() {
    $guessInput = $(".guess-input");
    $userGuess = $guessInput.val().toLowerCase();
    var $cardAnswer = $(".back").text();
    var $cardBack = $(".back");
    var $cardFront = $(".front");
    var $guessControls = $(".guess");
    var $controls = $("#controls");
    var $frontInput = $(".front-input");
    var $backInput = $(".back-input");
    // if user input matches answer string
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

    // after card is answered, display other side of flash card with answer
    $cardBack.show();
    $backInput.show();
    $cardFront.hide();
    $frontInput.hide();
    $(".next").on("click", nextCard);
    $(".back").on("click", nextCard);
  }

  // getting each card in the game
  function nextCard() {
    var card = game.getNextCard();
    var $controls = $("#controls");
      if (card) {
        $("#card-container").replaceWith(template(card));
        // cursor automatically in input field
        $(".guess-input").focus();
        $message.hide();
        var $guessSubmit = $(".guess-submit");
        $guessSubmit.on("click", guessAnswer);
        $(".front").on("click", guessAnswer);
        var $cardBack = $(".back");
        var $backInput = $(".back-input");
        $cardBack.hide();
        $backInput.hide();
        if ($cardBack.attr("display", "none")) {
          // keypress enter in input to view the back of the card
          $("input").keypress(function (e) {
            if (e.keyCode == '13') {
                guessAnswer();
            }
          });
        }
      } else {
        // when last card is answered
        $message.hide();
        $controls.remove();
        $("#card-container").append("<div id='controls'><input class='again' type='button' value='Play Again?' /></div>");
        $(".again").on("click", function(){
          location.reload();
        });
        $("#card").html("<h4 class='over'>Game Over</h4>");
      }
  }

  //Handlebars Template variables
  var source = $("#card-template").html();
  var template = Handlebars.compile(source);
});
