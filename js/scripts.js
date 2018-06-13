var currentPlayer = new Player("Player One",0);
var playerOne = new Player("Player One",0);
var playerTwo = new Player("Player Two",1);

$(function(){
  $("#turn").text(currentPlayer.name);
  $("#btn-roll").click(function(){
    var temp = (Math.floor(Math.random()*6)+1)
    $("#dice").text(temp.toString());
    if(temp === 1)
    {
      currentPlayer.tempScore = 0;
      endTurn();
    }
    else
    {
      currentPlayer.tempScore += temp;
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
}

Player.prototype.calculateScore = function()
{
  this.totalScore += this.tempScore;
  this.tempScore = 0;
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
  $("#turn").text(currentPlayer.name);
}

function updateScore()
{
  $("#player-one").text(playerOne.totalScore);
  $("#player-two").text(playerTwo.totalScore);
}
