var startGame = function(num){
  //Determines how many cards are used in play; currently set as 16
  var playArray = [];
  var fullArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12];
  var numOfCards = num;
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

  //Makes a card in each row
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

  var firstCard = '';
  var secondCard = '';
  var totalMatched = 0;

  var checkMatch = function(){
    if(firstCard.textContent === secondCard.textContent){
      //If cards match, assign '.matched' class
      $(firstCard).addClass('matched');
      $(secondCard).addClass('matched');
      totalMatched += 2;
      //If all cards are '.matched', declare winner
      if(totalMatched === playArray.length){
        $('.winner').show();
      }
    } else {
      //If cards don't match, hides both cards again
      $(firstCard).addClass('hidden');
      $(secondCard).addClass('hidden');
      //Increase mistake counter
      mistakeNum++;
      mistakeCounter();
    }
    firstCard = '';
    secondCard = '';
  };

  //On click, remove '.hidden' class; only hidden are clickable
  $('.card').on('click', function(){
    console.log('clicking');
    if(firstCard === '' && $(this).hasClass('hidden')){
      $(this).removeClass('hidden');
      firstCard = this;
    } else if (secondCard === '' && $(this).hasClass('hidden')){
      $(this).removeClass('hidden');
      secondCard = this;
      setTimeout(function(){checkMatch()}, 1000);
    }
  });

  //Mistake counter
  var mistakeNum = 0;
  var mistakeCounter = function(){
    $('#mistake-counter').text(mistakeNum);
  };
  mistakeCounter();
};
// startGame(12);
$('.mistake').hide();
$('.winner').hide();

$('.number').on('click',function(){
  var num = $(this).text();
  $('.number').hide();
  $('h1').hide();
  $('.mistake').show();
  $('.game-section').show();
  startGame(num);
});

//Reset button that clears everything
$('#reset').on('click', function(){
  $('.card').remove();
  // makeBoard();
  // totalMatched = 0;
  // mistakeNum = 0;
  // mistakeCounter();
  $('.mistake').hide();
  $('.winner').hide();
  $('.game-section').hide();
  $('h1').show();
  $('.number').show();
});
