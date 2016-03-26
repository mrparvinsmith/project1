$('.game-section').hide();
$('.tournament-setup').hide();
$('#next-game').hide();

var intervalId = '';

//Keeps track of games won in tournament
var playerOneTournamentScore = 0;
var playerTwoTournamentScore = 0;

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
  var cutDeck = function(){
    for(var i = 0; i < num; i++){
      playArray.push(fullArray[i]);
    }
  };
  cutDeck();

  //Shuffles cards put into playArray
  var shuffle = function() {
  var counter = playArray.length;
    while (counter > 0) {
       var index = Math.floor(Math.random() * counter);
       counter--;
       var temp = playArray[counter];
       playArray[counter] = playArray[index];
       playArray[index] = temp;
    }
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

  //Updates players with progress of tournament
  var tournamentCheck = function(){
    if(tournamentGoal > 1){
      if(playerOneTournamentScore === tournamentGoal){
        $('.tournament-score').html('Player 1 wins it all!!!<br>' + playerOneTournamentScore + ' to ' + playerTwoTournamentScore);
      } else if(playerTwoTournamentScore === tournamentGoal){
        $('.tournament-score').html('Player 2 wins it all!!!<br>' + playerTwoTournamentScore + ' to ' + playerOneTournamentScore);
      } else {
        $('.tournament-score').html('Player 1 games: ' + playerOneTournamentScore + '<br>Player 2 games: ' + playerTwoTournamentScore);
        $('#next-game').show();
      }
    }
  };

  //The 'next game' button takes players to the next game in the tournament
  $('#next-game').on('click', function(){
    gameReset();
    //calls 'num' from selection screen (line 221)
    startGame(num);
    showMistakes();
  });

  //Says who the winner is; blanks turn-display
  var announceWinner = function(){
    if(turnCount % 1 !== 0){
      $('.winner').text('You win!!!');
    } else if(playerOneMatched === playerTwoMatched){
      $('.winner').text('It\'s a tie!');
    } else if(playerTwoMatched > playerOneMatched){
      $('.winner').html('Player 2 wins!!!<br>' + playerTwoMatched + ' to ' + playerOneMatched);
      playerTwoTournamentScore++;
    } else if(playerOneMatched > playerTwoMatched){
      $('.winner').html('Player 1 wins!!!<br>' + playerOneMatched + ' to ' + playerTwoMatched);
      playerOneTournamentScore++;
    }
    clearInterval(intervalId);
    $('.turn-display').text('');
    tournamentCheck();
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
      setTimeout(function(){checkMatch();}, 1000);
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
      $('#mistake-counter-p1').text(player1mistakes);
      $('#mistake-counter-p2').text(player2mistakes);
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
    $('.mistake2p-1').html('Player 1 Mistakes: <span id="mistake-counter-p1">0</span>');
    $('.mistake2p-2').html('Player 2 Mistakes: <span id="mistake-counter-p2">0</span>');
  }
};

//Selects how many cards will be played; shows relevent fields, hides irrelevent ones
var num = 0;
$('.number').on('click',function(){
  num = $(this).text();
  $('.number').hide();
  $('h1').hide();
  $('p').hide();
  $('h3').hide();
  $('.tournament-setup').hide();
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
    $('#one-game').html('&#10003');
    $('#three-games').html('');
    $('#five-games').html('');
    $('#seven-games').html('');
    tournamentGoal = 1;
    $('.tournament-setup').hide();
  } else {
    $('#two-player').html('&#10003');
    $('#one-player').html('');
    turnCount = 1;
    $('.tournament-setup').show();
  }
});

//If tournament, select how many games
var tournamentGoal = 1;
$('.tournament-select').on('click', function(){
  if($(this).hasClass('best-of-one')){
    $('#one-game').html('&#10003');
    $('#three-games').html('');
    $('#five-games').html('');
    $('#seven-games').html('');
    tournamentGoal = 1;
  } else if($(this).hasClass('best-of-three')){
    $('#three-games').html('&#10003');
    $('#one-game').html('');
    $('#five-games').html('');
    $('#seven-games').html('');
    tournamentGoal = 2;
  } else if($(this).hasClass('best-of-five')){
    $('#five-games').html('&#10003');
    $('#one-game').html('');
    $('#three-games').html('');
    $('#seven-games').html('');
    tournamentGoal = 3;
  } else if($(this).hasClass('best-of-seven')){
    $('#seven-games').html('&#10003');
    $('#one-game').html('');
    $('#three-games').html('');
    $('#five-games').html('');
    tournamentGoal = 4;
  }
});

//Basic reset function to be used with either 'Reset' or 'Next Game' buttons
var gameReset = function(){
  $('.card').remove();
  $('.mistake').html('');
  $('.mistake2p-1').html('');
  $('.mistake2p-2').html('');
  $('.timer').html('');
  $('.winner').text('');
  $('.tournament-score').html('');
  $('#next-game').hide();
  intervalId = '';
};

//Reset button that clears everything
$('#reset').on('click', function(){
  clearInterval(intervalId);
  gameReset();
  playerOneTournamentScore = 0;
  playerTwoTournamentScore = 0;
  $('.turn-display').text('');
  $('.game-section').hide();
  $('h1').show();
  $('.number').show();
  $('h3').show();
  $('p').show();
  if(turnCount % 1 === 0){
    $('.tournament-setup').show();
  }
});
