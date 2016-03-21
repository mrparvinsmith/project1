//Determines how many cards are used in play; currently set as 16
var playArray = [];
var fullArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12];
var numOfCards = 16;
var cutDeck = function(){
  for(var i = 0; i < numOfCards; i++){
    playArray.push(fullArray[i]);
  }
};
cutDeck();

//Shuffles cards put into playArray
var counter = playArray.length;
var shuffle = function() {
  while (counter > 0) {
     var index = Math.floor(Math.random() * counter);
     counter--;
     var temp = playArray[counter];
     playArray[counter] = playArray[index];
     playArray[index] = temp;
  }
  counter = playArray.length;
};

//Create rows and columns with shuffled cards
var makeBoard = function(){
  shuffle();
  for(var i = 0; i < (playArray.length - 3); i += 4){
    var $card1 = $('<div>');
    $card1.addClass('hidden card');
    $card1.text(playArray[i]);
    $('.top').append($card1);
    var $card2 = $('<div>');
    $card2.addClass('hidden card');
    $card2.text(playArray[i + 1]);
    $('.mid-top').append($card2);
    var $card3 = $('<div>');
    $card3.addClass('hidden card');
    $card3.text(playArray[i + 2]);
    $('.mid-bottom').append($card3);
    var $card4 = $('<div>');
    $card4.addClass('hidden card');
    $card4.text(playArray[i + 3]);
    $('.bottom').append($card4);
  }
};
makeBoard();

//On click, assign cards '.flipped' class
  //Prevent more than 2 cards being flipped
//If cards don't match, remove '.flipped' class from both cards
  //Increase mistake counter
//If cards match, assign '.matched' class
  //If all cards are '.matched', declare winner

//Mistake counter
var mistakeNum = 0;
var mistakeCounter = function(){
  $('#mistake-counter').text(mistakeNum);
};

//Reset button that clears everything
$('#reset').on('click', function(){
  $('.card').remove();
  makeBoard();
  alert('Board has been reset');
});
