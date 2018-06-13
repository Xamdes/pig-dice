$(function(){
  $("#turn").text("Player 1");



});

function Player()
{
  this.tempScore = 0;
  this.totalScore = 0;
}

Player.prototype.calculateScore = function()
{
  this.totalScore += this.tempScore;
}
