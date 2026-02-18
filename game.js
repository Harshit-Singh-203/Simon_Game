var gamePattern=[];
var userClickPattern=[];
var level=0;
//Sound Player
  function playSound(name){
   const audio = new Audio('./sounds/'+name+'.mp3');
   audio.play();
  }
//Animation Press
  function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
   setTimeout(function () {
   $("."+currentColor).removeClass("pressed");
   }, 100);
  }
//Checking The keypress or to Start the game
$(document).on("keydown",function ()
{ 
  if(level===0)
  newSequence();
});
$("button").click(function ()
{ 
  if(level===0)
  newSequence();
});
//Fetching a new color from 4 set of colors
function newSequence()
{ 
   $("h1").text("Level "+level);
   var randomNumber=Math.floor(Math.random()*4);
   var buttonColor=["red","blue","green","yellow"];
   var randomChosenColor=buttonColor[randomNumber];
   //Creating a new Pattern
   gamePattern.push(randomChosenColor);
   //Animation and Sound of button for Chosen Color
   playSound(randomChosenColor);
   $("."+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
   level++;
}
//CHECKING USER CLICKS
  $(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickPattern.length-1);
  })
 function checkAnswer(currentLevel){
   if(userClickPattern[currentLevel]===gamePattern[currentLevel])
   {
    console.log("success")
     if(currentLevel===gamePattern.length-1)
     {
      //Empty the user Pattern and calling a new Sequence
      userClickPattern=[];
      setTimeout(function () {
     newSequence();
      }, 1000);
     }
    }
    else
    {
      console.log("fail")
       const audio = new Audio('./sounds/wrong.mp3');
       audio.play();
       $("body").addClass("game-over");
        setTimeout(function () {
        $("body").removeClass("game-over");
      }, 1000);
       $("h1").text("Game Over, Level Reached: "+level+" Restart");
       //Start over
           gamePattern=[];
           userClickPattern=[];
           level=0;
    }
 }
  
