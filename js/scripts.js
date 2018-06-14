var currentPlayer = new Player("Player One",0);
var playerOne = new Player("Player One",0);
var playerTwo = new Player("Player Two",1);

$(function(){
  $("#turn").text(currentPlayer.name);
  updateScore();
  $("#btn-roll").click(function(){
    var temp = (Math.floor(Math.random()*6)+1)
    $("#dice").text(temp.toString());
    currentPlayer.dieRollCounter++;
    if(temp === 1)
    {
      currentPlayer.tempScore = 0;
      alert(currentPlayer.name+"'s turn is over.");
      endTurn();

    }
    else
    {
      currentPlayer.tempScore += temp;
      if((currentPlayer.tempScore + currentPlayer.totalScore)>=100)
      {
        alert("You Won");
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

function Player(playerName,uid)
{
  this.name = playerName;
  this.id = uid;
  this.tempScore = 0;
  this.totalScore = 0;
  //Used for Ai
  this.confidence = 5;
  this.rollsPerTurn = 2;
  this.dieRollCounter = 0;
}

Player.prototype.calculateScore = function()
{
  this.totalScore += this.tempScore;
  this.tempScore = 0;
}

Player.prototype.aiConCheck = function(opponentScore)
{
  if(opponentScore > this.totalScore)
  {
    this.confidence++;
    if(opponentScore-this.totalScore>=30)
    {
      this.confidence++;
    }
  }
  else
  {
    this.confidence--;
  }

  if(this.confidence > 10)
  {
    this.confidence = 10;
  }
  else if(this.confidence < 1){
    this.confidence =1;
  }
}

Player.prototype.choice = function(opponentScore)
{
  this.aiConCheck(opponentScore);

}

function endTurn()
{
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
