var intervalId = '';

var turnCount = 1.5;
//Only shows turn if two-player
var showTurn = function(){
  if(turnCount % 1 === 0){
    if(turnCount % 2 === 0){
      $('.turn-display').text('Current turn: Player 2');
    } else {
      $('.turn-display').text('Current turn: Player 1');
    }
  }
};

var startGame = function(num){
  //Determines how many cards are used in play
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

  //The timer
  var time = 0;
  var showTime = function(){
    $('.timer').text(time + ' seconds');
  };
  showTime();
  var startTimer = function(){
    if(intervalId === ''){
      intervalId = setInterval(function(){
        time++;
        showTime();
      }, 1000);
    }
  };

  var firstCard = '';
  var secondCard = '';
  var playerOneMatched = 0;
  var playerTwoMatched = 0;

  //Award cards to player
  var givePoints = function(){
    if(turnCount % 2 === 0){
      playerTwoMatched++;
    } else {
      playerOneMatched++;
    }
  };

  //Says who the winner is; blanks turn-display
  var announceWinner = function(){
    if(turnCount % 1 !== 0){
      $('.winner').text('You win!!!');
    } else if(playerOneMatched === playerTwoMatched){
      $('.winner').text('It\'s a tie!');
    } else if(playerTwoMatched > playerOneMatched){
      $('.winner').html('Player 2 wins!!!<br>' + playerTwoMatched + ' to ' + playerOneMatched);
    } else if(playerOneMatched > playerTwoMatched){
      $('.winner').html('Player 1 wins!!!<br>' + playerOneMatched + ' to ' + playerTwoMatched);
    }
    clearInterval(intervalId);
    $('.turn-display').text('');
    document.querySelector("#win-noise").play();
  };

  //Checks to see if two cards match
  var checkMatch = function(){
    if(firstCard.textContent === secondCard.textContent){
      //If cards match, assign '.matched' class
      $(firstCard).addClass('matched');
      $(secondCard).addClass('matched');
      givePoints();
      document.querySelector("#match-noise").play();
      turnCount++;
      showTurn();
      var totalMatched = 2 * (playerOneMatched + playerTwoMatched);
      //If all cards are '.matched', declare winner
      if(totalMatched === playArray.length){
        announceWinner();
      }
    } else {
      //If cards don't match, hides both cards again
      $(firstCard).addClass('hidden');
      $(secondCard).addClass('hidden');
      //Increase mistake counter
      if(turnCount % 1 !== 0){
        mistakeNum++;
      } else if(turnCount % 2 === 0){
        player2mistakes++;
      } else {
        player1mistakes++;
      }
      document.querySelector("#wrong-noise").play();
      mistakeCounter();
      turnCount++;
      showTurn();
    }
    firstCard = '';
    secondCard = '';
  };

  //On click, remove '.hidden' class; only hidden are clickable
  $('.card').on('click', function(){
    document.querySelector("#click-noise").play();
    if(firstCard === '' && $(this).hasClass('hidden')){
      $(this).removeClass('hidden');
      firstCard = this;
    } else if (secondCard === '' && $(this).hasClass('hidden')){
      $(this).removeClass('hidden');
      secondCard = this;
      setTimeout(function(){checkMatch()}, 1000);
    }
    startTimer();
  });

  //Mistake counter
  var mistakeNum = 0;
  var player1mistakes = 0;
  var player2mistakes = 0;
  var mistakeCounter = function(){
    if(turnCount % 1 !== 0){
      $('#mistake-counter').text(mistakeNum);
    } else if(turnCount % 1 === 0){
      $('#mistake-counterP1').text(player1mistakes);
      $('#mistake-counterP2').text(player2mistakes);
    }
  };
  mistakeCounter();
  showTurn();
};

//Displays the mistake fields
var showMistakes = function(){
  if(turnCount % 1 !== 0){
    $('.mistake').html('Mistakes: <span id="mistake-counter">0</span>');
  } else if(turnCount % 1 === 0){
    $('.mistake2P-1').html('Player 1 Mistakes: <span id="mistake-counterP1">0</span>');
    $('.mistake2P-2').html('Player 2 Mistakes: <span id="mistake-counterP2">0</span>');
  }
};

//Selects how many cards will be played; shows relevent fields, hides irrelevent ones
$('.number').on('click',function(){
  var num = $(this).text();
  $('.number').hide();
  $('h1').hide();
  $('p').hide();
  $('h3').hide();
  $('.game-section').show();
  showMistakes();
  startGame(num);
});

//Selects number of players; default is one
$('p').on('click', function(){
  if($(this).hasClass('one')){
    $('#one-player').html('&#10003');
    $('#two-player').html('');
    turnCount = 1.5;
  } else {
    $('#two-player').html('&#10003');
    $('#one-player').html('');
    turnCount = 1;
  }
});

//Reset button that clears everything
$('#reset').on('click', function(){
  $('.card').remove();
  $('.mistake').html('');
  $('.mistake2P-1').html('');
  $('.mistake2P-2').html('');
  clearInterval(intervalId);
  intervalId = '';
  $('.timer').html('');
  $('.winner').text('');
  $('.turn-display').text('');
  $('.game-section').hide();
  $('h1').show();
  $('.number').show();
  $('h3').show();
  $('p').show();
});
