let dollsNames = ["Даша", "Маша", "Ксюша", "Катя"];

let questions = [
  {
    "question": "Собери всех матрешек с косынкой красного цвета как можно быстрее!",
    "correctAnswer": "Красный"
  },
  {
    "question": "Собери всех матрешек с именем Маша как можно быстрее!",
    "correctAnswer": "Маша"
  },
  {
    "question": "Собери всех матрешек с косынкой зеленого цвета или именем Даша как можно быстрее!",
    "correctAnswer": "Зеленый Даша"
  }
];
let numsToColors = {
  "1":"Фиолетовый",
  "2": "Зеленый",
  "3": "Синий",
  "4": "Красный",
  "5": "Желтый"
};

const container = document.getElementById('container');
var endGameMenu;
var goodEnding;
var badEnding;
let gameId = 0;

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
  gameId = Math.floor(Math.random() * 3);
  document.getElementById('text-top').textContent = questions[gameId].question;
  let correctAns = questions[gameId].correctAnswer;
  let correctAmount = 0;
  let curAnswers = 0;


  for (let i = 0; i < 7; i++) {
    const element = document.createElement('div');
    const image = document.createElement('img');
    const nameTag = document.createElement('p');
    var color = (Math.floor(Math.random() * 5)+1);
    image.src = './images/matryoshka' + color + '.svg';
    element.id = i;
    element.className = 'doll';
    container.appendChild(element);
    element.appendChild(image);
    nameTag.textContent = dollsNames[Math.floor(Math.random() * 4)];
    nameTag.style.textAlign = 'center';
    element.appendChild(nameTag);

    
    if(correctAns.includes(element.lastChild.textContent) || correctAns.includes(numsToColors[color])){
      correctAmount++;
    }

    element.addEventListener('mousedown', function(event) {
      let name = element.lastChild.textContent;
      let color = parseInt(element.firstChild.src.split('matryoshka')[1]);
      

      if(correctAns.includes(name) || correctAns.includes(numsToColors[color])){
        curAnswers++;
        element.parentNode.removeChild(element);
        if(curAnswers == correctAmount){
          endGame('win');
        }
      }

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