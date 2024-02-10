let questions = [
  {
    "example": "./images/example1.svg",
    "correctAnswer": [3,4,1,2]
  },
  {
    "example": "./images/example2.svg",
    "correctAnswer": [4,3,2,1]
  },
  {
    "example": "./images/example3.svg",
    "correctAnswer": [1,3,2,4]
  },
  {
    "example": "./images/example4.svg",
    "correctAnswer": [1,3,4,2]
  }
];

let dollsSizes = Array(4).fill(3);

const container = document.getElementById('container');
const example = document.getElementById('example');


let gameId = 0;

let correctAns = Array(4).fill(0);
var endGameMenu;
var goodEnding;
var badEnding;

document.addEventListener('DOMContentLoaded', function() {
  setupGame();
});

function setupGame(){
  setTimer();
  endGameMenu =  document.getElementById('end-game-menu');
  goodEnding = document.getElementById('good_ending');
  badEnding = document.getElementById('bad_ending');
  endGameMenu.style.display = 'none';

  const existingElements = document.querySelectorAll('.doll');
  existingElements.forEach(element => element.remove());

  dollsSizes = Array(4).fill(3);
  gameId = Math.floor(Math.random() * 4);
  correctAns = questions[gameId].correctAnswer;
  example.src = questions[gameId].example; 

  for (let i = 0; i < 4; i++) {
    const element = document.createElement('img');
    element.src = './images/matryoshka' + (Math.floor(Math.random() * 5)+1) + '.svg';
    element.id = i;
    element.className = 'doll';
    container.appendChild(element);

    element.addEventListener('mousedown', function(event) {
      let scaleValue = parseFloat(element.style.transform.split('(')[1]) || 1;
      let index = parseInt(element.id);

      if (event.button === 0) {
        if(dollsSizes[index] < 4){
          dollsSizes[index]++;
          scaleValue += 0.2;
        }
      } else if (event.button === 2) {
        if(dollsSizes[index] > 1){
          dollsSizes[index]--;
          scaleValue -= 0.2;
        }
      }
      let flag = true;
      for(let j = 0; j < 4; j++){
        if(dollsSizes[j] != correctAns[j]){
          flag = false;
        }
      }
      if(flag){
        endGame('win');
      }
      element.style.transform = `scale(${scaleValue})`;
    });
  }
}

function endGame(mode){
  endScore();
  endGameMenu.style.display = 'block';
  if(mode == 'win'){
    badEnding.style.display = 'none';
    goodEnding.style.display = 'block';
  }
  else if(mode == 'lose'){
    badEnding.style.display = 'block';
    goodEnding.style.display = 'none';
  }
}