let currentSize = 1;
let dollsSizes = Array(7).fill(1);
let sizeToScale = {
  "1": 0.6,
  "2": 0.8,
  "3": 1,
  "4": 1.2
} 
let scaleToSize = {
  0.6: "1",
  0.8: "2",
  1: "3",
  1.2: "4"
} 

var endGameMenu;
var goodEnding;
var badEnding;
var objects = [];

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
  objects = [];
  
  currentSize = 1;

  for (let i = 0; i < 7; i++) {
    dollsSizes[i] = Math.floor(Math.random() * 4) + 1;
  }
    
  for (let i = 0; i < 7; i++) {
    if((i>2)&&(i<6)){
      const element = document.createElement('img');
        element.src = './images/matryoshka' + (Math.floor(Math.random() * 5)+1) + '.svg';
        element.id = i;
        element.className = 'doll';
        element.style.position = 'absolute';
        element.style.transform = `scale(${sizeToScale[i%4 + 1]})`;
        
        container.appendChild(element);
        objects.push(element);
        angleIncrement = (2 * Math.PI) / objects.length;

        element.addEventListener('dragstart', function(event) {
          event.dataTransfer.setData("size", scaleToSize[parseFloat(element.style.transform.split('(')[1]) || 1]);
          event.dataTransfer.setData("id", element.id);
    });
    }
    else{
        const element = document.createElement('img');
        element.src = './images/matryoshka' + (Math.floor(Math.random() * 5)+1) + '.svg';
        element.id = i;
        element.className = 'doll';
        element.style.position = 'absolute';
        element.style.transform = `scale(${sizeToScale[Math.floor(Math.random() * 4) + 1]})`;
        
        container.appendChild(element);
        objects.push(element);
        angleIncrement = (2 * Math.PI) / objects.length;

        element.addEventListener('dragstart', function(event) {
          event.dataTransfer.setData("size", scaleToSize[parseFloat(element.style.transform.split('(')[1]) || 1]);
          event.dataTransfer.setData("id", element.id);
    });
  }
  }
}

const centerX = 450;
const centerY = 150;
var angleIncrement = (2 * Math.PI) / 7;
let angle = 0;
const radius = 250;
const speed = 0.007;
function moveObjects() {
    for (let i = 0; i < objects.length; i++) {
        const x = centerX + 1.2 * radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        objects[i].style.left = x + 'px';
        objects[i].style.top = y + 'px';
        angle += angleIncrement;
    }
    angle += speed;
    requestAnimationFrame(moveObjects);
}
moveObjects();

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("id", event.target.id);
  event.dataTransfer.setData("size", scaleToSize[parseFloat(event.target.style.transform.split('(')[1]) || 1]);
}

function drop(event) {
  event.preventDefault();
  var size = event.dataTransfer.getData("size");
  var id = event.dataTransfer.getData("id");
  var draggedElement = document.getElementById(id);
  var dropZone = event.target;
  
  
  if (currentSize == size) {
    currentSize++;
    dropZone.parentNode.insertBefore(draggedElement, dropZone.parentNode.firstChild);
    draggedElement.style.left = null;
    draggedElement.style.top = null;
    draggedElement.style.zIndex = currentSize + 5;
    var index = objects.indexOf(draggedElement);
    if (index > -1) { 
      objects.splice(index, 1); 
    }
    angleIncrement = (2 * Math.PI) / objects.length;


    if(currentSize == 5){
      endGame('win');
    }
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