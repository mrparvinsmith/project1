//Determines how many cards are used in play; currently set as 16
var playArray = [];
var fullArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10,];
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
     var temp = array[counter];
     array[counter] = array[index];
     array[index] = temp;
  }
};

//Create rows and columns with shuffled cards

//On click, assign cards '.flipped' class
  //Prevent more than 2 cards being flipped
//If cards don't match, remove '.flipped' class from both cards
  //Increase mistake counter
//If cards match, assign '.matched' class
  //If all cards are '.matched', declare winner

//Mistake counter

//Make a reset button that clears everything
