var currentPlayer = new Player("Player One",0,false);
var playerOne = new Player("Player One",0,false);
var playerTwo = new Player("Player Two",1,true);
var opponentsScore = 0;

$(function(){
  $("#turn").text(currentPlayer.name);
  currentPlayer = playerOne;
  updateScore();
  $("#btn-roll").click(function(){
    currentPlayer.dieRollCounter++;
    var rollNumber = 0;
    if(currentPlayer.aiEnabled)
    {
      var tempScore = 0;
      var rollCounter =0;
      var aiRolls = currentPlayer.choice();
      while (rollNumber !=1 && (rollCounter <= aiRolls))
      {
        rollNumber = roll(6);
        if(rollNumber != 1)
        {
          console.log(rollNumber);
          continueTurn(rollNumber)
        }
        rollCounter++;
      }

      if(rollNumber === 1)
      {
        console.log("Test 1");
        endTurn();
      }
      else
      {
        console.log("Test 2");
        currentPlayer.calculateScore();
        endTurn();
      }
    }
    else
    {
      rollNumber = roll(6);
      $("#dice").text(rollNumber.toString());
      if(rollNumber === 1)
      {
        endTurn();
      }
      else
      {
        continueTurn(rollNumber);
      }
    }

    $("#score").text(currentPlayer.tempScore.toString());
  });

  $("#btn-hold").click(function()
  {
    currentPlayer.calculateScore();
    endTurn();
  });
});

function Player(playerName,uid,ai)
{
  this.name = playerName;
  this.id = uid;
  this.tempScore = 0;
  this.totalScore = 0;
  //Used for Ai
  this.confidence = 5;
  this.dieRollCounter = 0;
  this.aiEnabled = ai;
}

Player.prototype.calculateScore = function()
{
  this.totalScore += this.tempScore;
  this.tempScore = 0;
}

Player.prototype.aiConCheck = function()
{
  if(opponentsScore >= this.totalScore)
  {
    this.confidence++;
    if(opponentsScore-this.totalScore>=30)
    {
      this.confidence++;
    }
  }
  else if(opponentsScore < (this.totalScore-25))
  {
    this.confidence--;
  }

  if(this.confidence > 10)
  {
    this.confidence = 10;
  }
  else if(this.confidence < 1){
    this.confidence = 1;
  }
}

Player.prototype.choice = function()
{
  //this.aiConCheck();
  var con = this.confidence;
  var rolls = 2;
  if(con > 9)
  {
    rolls = 6;
  }
  else if(con > 7)
  {
    rolls = 4;
  }
  else if(con > 5)
  {
    rolls = 3;
  }
  else if(con > 3)
  {
    rolls = 2;
  }
  else
  {
    rolls = 1;
  }
  return rolls;
}

function endTurn()
{
  currentPlayer.tempScore = 0;
  alert(currentPlayer.name+"'s turn is over.");
  opponentsScore = currentPlayer.totalScore;
  if(currentPlayer.id === 0)
  {
    playerOne = currentPlayer;
  }
  else
  {
    playerTwo = currentPlayer;
  }
  $("#dice").text("1");
  $("#score").text("0");
  startTurn();
  updateScore();
  currentPlayer.aiConCheck();
  currentPlayer.choice();
}

function startTurn()
{
  if(currentPlayer.id === 0)
  {
    currentPlayer = playerTwo;
  }
  else
  {
    currentPlayer = playerOne;
  }
  currentPlayer.dieRollCounter = 0;
  $("#turn").text(currentPlayer.name);
}

function updateScore()
{
  $("#player-one").text(playerOne.totalScore);
  $("#player-two").text(playerTwo.totalScore);
}

function continueTurn(rollNumber)
{
  currentPlayer.tempScore += rollNumber;
  if((currentPlayer.tempScore + currentPlayer.totalScore)>=100)
  {
    alert("You Won");
  }
}

function roll(diceSides)
{
  return (Math.floor(Math.random()*diceSides)+1)
}
