var id = 0;
var indexWords = 0;
var indexNums = 0;
var resultMap = {};
var left = document.getElementById('left');
let mousePos = {x: undefined, y: undefined};

function processString() {
  var inputString = document.getElementById('inputString').value;
  var wordsAndNumbers = inputString.split('-');
  var words = wordsAndNumbers.filter(item => isNaN(item));
  var numbers = wordsAndNumbers.filter(item => !isNaN(item));
  words.sort();
  numbers.sort(function(a, b) {
    return a - b;
  });
// заполняем массив со словами
  words.forEach(function(word) {
    resultMap['a' + (indexWords + 1)] = word;
    indexWords++;
  });
  // заполняем массив с числами
  numbers.forEach(function(number) {
    resultMap['n' + (indexNums + 1)] = number;
    indexNums++;
  });

  var draggableContainer = document.getElementById('draggable-container');
  draggableContainer.innerHTML = '';
  Object.keys(resultMap).forEach(function(key) {
      var draggableBlock = createDraggableBlock(key + " " + resultMap[key]);
      draggableContainer.appendChild(draggableBlock);
    
  });
}
// создает блоки для перетаскивания
function createDraggableBlock(text) {
  var draggableBlock = document.createElement('div');
  draggableBlock.className = 'draggable';
  draggableBlock.draggable = true;
  draggableBlock.textContent = text;
  draggableBlock.setAttribute('id', "item" + id);
  id+=1;
  draggableBlock.addEventListener('dragstart', function(event) {
    event.dataTransfer.setData("text", draggableBlock.id);
  });
  return draggableBlock;
}


function allowDrop(event) {
  event.preventDefault();
  mousePos = {x: event.pageX - 30, y: event.pageY - 180};
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}
// функция для перетаскивания блоков
function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  var draggedElement = document.getElementById(data);
  var dropZone = event.target;
  var leftZone = document.getElementById("left");

  if (dropZone.classList.contains("block")) {
    if(dropZone.classList.contains("left")){
        draggedElement.style.position = 'absolute';
        draggedElement.style.left = mousePos.x.toString() + 'px';
        draggedElement.style.top = mousePos.y.toString() + 'px';
    }
    else{
        draggedElement.style.position = 'relative';
        draggedElement.style.left = 0;
        draggedElement.style.top = 0;
    }
    dropZone.appendChild(draggedElement);
// добавляем слово или число в начало, если оно было передвинуто
  if (draggedElement.classList.contains("draggable")) {
      dropZone.insertBefore(draggedElement, dropZone.firstChild);
    }
    var topText = document.getElementById('top-text');
    topText.innerText = '';
    var children = leftZone.children;
    for(var i = 0; i < children.length; i++){
      topText.innerText += '\u00a0';
      topText.innerText += resultMap[children[i].innerText.split(' ')[0]];
    }
  }
  
}