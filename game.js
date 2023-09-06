//Creating a new array buttonColours and setting its value
var buttonColours = ["red", "blue", "green", "yellow"];
//Creating a new empty array gamePattern.
var gamePattern = [];

var userClickedPattern = [];

//To track if the game has started
var started = false;

//Current level of the game (before game start)
var level = 0;

//Keyboard event listener
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Button event listener
$(".btn").click(function () {
  //same id
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  /*
  Calling checkAnswer() after user chosed their answer and passing index 
  of last answer in the users sequence

   */
  checkAnswer(userClickedPattern.length - 1);
});

//
function checkAnswer(currentLevel) {
  //Checking if most recent user answer is the same as game pattern
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    //Checking if the sequence is finished
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");

    //Wrong sound
    playSound("wrong");

    //Adding class game-over
    $("body").addClass("game-over");

    //Updaing h1
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  //Resetting userClickedPattern to an emplty array after nextSequence is trigerred
  userClickedPattern = [];

  //Increasing the level of the game by 1
  level++;

  //Updaing the h1 according to level of the game
  $("#level-title").text("Level " + level);

  //Random Generator and Math.floor (0-3 range)
  var randomNumber = Math.floor(Math.random() * 4);

  //Assigning randonNumber to randomChooseColor
  var randomChosenColour = buttonColours[randomNumber];

  //Adding new randomChosenColor  in gamePattern array
  gamePattern.push(randomChosenColour);

  //Using jQuery to select the button with the same id as the randomChosenColour
  //Animation with fadeIn and fadeOut
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

//animatePress function
function animatePress(currentColor) {
  //Adding pressed class inside animatePress()
  $("#" + currentColor).addClass("pressed");
  //Removing pressed class
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Playing sound for the button
function playSound(name) {
  //dynamic name
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
