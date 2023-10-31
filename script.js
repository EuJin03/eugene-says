var gamePattern = [];
var userClickedPattern = [];
var colors = ['red', 'green', 'blue', 'yellow'];
var started = !1;
var level = 0;

function sequence() {
  userClickedPattern = [];
  level++;
  $('h1').text('level ' + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = colors[randomNumber];
  var randomPanel = $('#' + randomColor);
  gamePattern.push(randomColor + ' ');

  randomPanel.fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
  console.log(gamePattern);
}

$(document).on('keypress', function (e) {
  if (!started) {
    sequence();
    $('h1').text('level ' + level);
    started = !0
  }
})

function compareAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log('success');
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        sequence()
      }, 1000);
      $('#high-score').show();
      var hiScore = gamePattern.length;
      $('#high-score').text('High Score: ' + hiScore);
    }
  } else {
    console.log('wrong');
    playSound('wrong');
    animateGameOver();
    startOver()
  }
}
$('.panel').on('click', function (evt) {
  var clickedColor = evt.target.id;
  userClickedPattern.push(clickedColor + ' ');
  playSound(clickedColor);
  animateButton(clickedColor);
  compareAnswer(userClickedPattern.length - 1)
})

function playSound(currentKey) {
  var audio = new Audio('sounds/' + currentKey + '.mp3')
  audio.play()
}

function animateButton(currentButton) {
  $('#' + currentButton).addClass('pressed')
  setTimeout(function () {
    $('#' + currentButton).removeClass('pressed')
  }, 100)
}

function animateGameOver() {
  $('h1').text('Game Over! Press Any Key To Restart.')
  $('body').addClass('game-over')
  setTimeout(function () {
    $('body').removeClass('game-over')
  }, 200)
}

function startOver() {
  gamePattern = [];
  level = 0;
  started = !1
}
$('#high-score').hide();

function highScore(score) {}
$('.down').hide();
$('.up').on('click', function () {
  $('.container-fluid').slideUp();
  $('.down').show()
})

$('.down').on('click', function () {
  $('.container-fluid').slideDown();
  $('.down').hide()
})
$('.form-control').on('keyup', function (e) {
  $('#center').text('Hi, ' + e.target.value)
})
$('#hint-content').hide();
$('#hint').on('click', function () {
  gamePattern.forEach(function() {
    $('#hint-content').html(gamePattern);
  })
  $('#hint-content').slideDown();
  setTimeout(function () {
    $('#hint-content').slideUp()
  }, 3000)
})

