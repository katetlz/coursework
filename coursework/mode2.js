let dollsNames = ["Даша", "Маша", "Ксюша", "Катя"];
let dollsColors = ["Красный", "Зеленый", "Желтый", "Фиолетовый", "Синий"];

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
  "1":"фиолетовая",
  "2": "зеленая",
  "3": "синяя",
  "4": "красная",
  "5": "желтая"
};

const container = document.getElementById('container');
var endGameMenu;
var goodEnding;
var badEnding;
let gameId = 0;

function setupGame(){
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
    const element = document.createElement('img');
    var color = (Math.floor(Math.random() * 5)+1);
    element.src = './images/matryoshka' + color + '.svg';
    element.id = i;
    element.textContent = dollsNames[Math.floor(Math.random() * 4)];
    element.className = 'doll';
    container.appendChild(element);

    if(correctAns.includes(element.textContent) || correctAns.includes(color)){
      correctAmount++;
    }
    console.log(correctAmount);

    element.addEventListener('mousedown', function(event) {
      let name = element.textContent;
      let color = parseInt(element.src.split('matryoshka')[1]);
      console.log(color);

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