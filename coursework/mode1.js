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

document.addEventListener('DOMContentLoaded', function() {
  setupGame();
});

function setupGame(){
  endGameMenu =  document.getElementById('end-game-menu');
  goodEnding = document.getElementById('good_ending');
  badEnding = document.getElementById('bad_ending');
  endGameMenu.style.display = 'none';

  const existingElements = document.querySelectorAll('.doll');
  existingElements.forEach(element => element.remove());
  
  currentSize = 1;

  for (let i = 0; i < 7; i++) {
    dollsSizes[i] = Math.floor(Math.random() * 4) + 1;
  }
    
  for (let i = 0; i < 7; i++) {
    const element = document.createElement('img');
    element.src = './images/matryoshka' + (Math.floor(Math.random() * 5)+1) + '.svg';
    element.id = i;
    element.className = 'doll';
    element.style.transform = `scale(${sizeToScale[Math.floor(Math.random() * 4) + 1]})`;
    
    container.appendChild(element);

    element.addEventListener('dragstart', function(event) {
      event.dataTransfer.setData("size", scaleToSize[parseFloat(element.style.transform.split('(')[1]) || 1]);
      event.dataTransfer.setData("id", element.id);
    });
  }
}

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
    draggedElement.classList.add("pos");
    currentSize++;
    // if(dropZone.parentNode.firstChild.classList.contains("doll")){
    //   dropZone.parentNode.remove(dropZone.parentNode.firstChild);
    // }
    dropZone.parentNode.insertBefore(draggedElement, dropZone.parentNode.firstChild);
    draggedElement.style.zIndex = currentSize + 5;


    if(currentSize == 5){
      endGame('win');
    }
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