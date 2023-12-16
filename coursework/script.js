let userInput = document.getElementById('inputString');

let timer;
let seconds = 45;

document.addEventListener('DOMContentLoaded', function() {
    const againButton = document.getElementById('againButton');
    const timerText = document.getElementById('timer');
  
    function updateTimer() {
      if (seconds > 0) {
        seconds--;
      } else {
        clearInterval(timer);
          endGame('lose');
      }
      timerText.textContent = 'Время: ' + padZero(seconds);
    }

    timer = setInterval(updateTimer, 1000);
      seconds = 45;
  
    function padZero(value) {
      return value < 10 ? '0' + value : value;
    }
  
    againButton.addEventListener('click', function() {
      clearInterval(timer);
      timer = setInterval(updateTimer, 1000);
      seconds = 45;
      setupGame();
    });
  });

function loadGame(mode){
  sessionStorage.setItem('currentPlayer', userInput.value || "Неизвестный игрок");
  location.href = mode;
}

// function setEndButton(){
//   document.getElementById('againButtonEnd').addEventListener('click', function() {
//     clearInterval(timer);
//     timer = setInterval(updateTimer, 1000);
//     seconds = 45;
//     setupGame();
//   });
// }