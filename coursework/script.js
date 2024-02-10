let userInput = document.getElementById('inputString');
var playersLeaderboard = JSON.parse(localStorage.getItem('PlayersLeaderboard')) || {};
var id = Object.keys(playersLeaderboard).pop() || 0;
// var username = '';

let timer;
let seconds = 50;
let score = 100;

const timerText = document.getElementById('timer');

function updateTimer() {
  if (seconds > 0) {
    seconds--;
    score -= 2;
  } else {
    clearInterval(timer);
      endGame('lose');
  }
  timerText.textContent = 'Время: ' + padZero(seconds);
}

timer = setInterval(updateTimer, 1000);
seconds = 50;

function padZero(value) {
  return value < 10 ? '0' + value : value;
}

function loadGame(mode){
  sessionStorage.setItem('currentPlayer', userInput.value || "Неизвестный игрок");
  location.href = mode;
}

function setTimer(){
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
  seconds = 50;
  score = 100;
}

function endScore(){
  playersLeaderboard = JSON.parse(localStorage.getItem('PlayersLeaderboard')) || {};
  document.querySelector('.points').innerText = "Ваш счет: " + score;
  document.querySelector('.time').innerText = "Ваше время: " + seconds;
  id++;
  playersLeaderboard[sessionStorage.getItem('currentPlayer')] = score;
  localStorage.setItem('PlayersLeaderboard', JSON.stringify(playersLeaderboard));
  clearInterval(timer);
}
