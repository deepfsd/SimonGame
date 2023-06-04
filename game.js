// alert("Javascript Ready");

var buttonColour = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function()
{
    if(!started)
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

});



function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomButtonColour = buttonColour[randomNumber];

    gamePattern.push(randomButtonColour);

    // console.log(gamePattern);

    $("#" + randomButtonColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomButtonColour);
}


function playSound(name) {
    this.name = name;
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour)
{
    var currentColour = currentColour;
    $("#"+currentColour).addClass("pressed");

    setTimeout(function()
    {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel)
{
    
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        console.log("success");

        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function()
            {
                nextSequence();
            },1000);
        }
    }
    else
    {
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(function()
        {
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startover();
    }
}

function startover()
{
    level = 0;
    gamePattern = [];
    started = false;
}