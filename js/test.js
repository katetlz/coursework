"use strict";
const $ = document.querySelector.bind(document);
const quiz = $(".quiz");
const warning = $(".warning");
const btnNext = document.querySelector(".quiz__next-btn");
let count = 0;
//массив для записи ответов
const M = questions.length, N = 2; 
var arrAnswers = new Array(M);           
 for (var i = 0; i < M; i++) {
     arrAnswers[i] = new Array(N);        
 }

let userScore = 0; // правильные ответы пользователя

// проверяем существование переменной и длина массива больше 0
if (typeof questions !== 'undefined' && questions.length > 0) {
    quiz.classList.remove('hidden');
    shuffle(questions);
     for (i = 0; i < M; i++){
         arrAnswers[i][0] = questions[i].answer;
     }
    showQuestions(count);
} else {
    warning.classlist.remove('hidden'); // появляется предупреждение
}

btnNext.addEventListener('click', nextQuestion);



// показываем вопрос из массива
function showQuestions(index){
    const title = $(".quiz__title");
    const list = $(".quiz__list");
    const total = $(".quiz__total");
    let progress = $(".quiz__progress-inner");

    shuffle(questions[index].options);
    title.innerHTML = `${index + 1}. ${questions[index].question}`; // перезаписывает значение
    list.innerHTML = ''; // очистили блок, после чего можно добавить новый вопрос
    questions[index].options.forEach(item => {
        const text = `<li class = "quiz__option">${item}</li>`;
        list.insertAdjacentHTML("beforeend", text);
    });

    const options = list.querySelectorAll(".quiz__option");
    
    options.forEach(item => item.setAttribute("onclick", "optionSelected(this)"));

    total.innerHTML = `${index + 1} из ${questions.length}`;
    progress.style.width = `${Math.round(((index + 1)/ questions.length) * 100)}%`;
    

}

// выбор ответа
function optionSelected(answer) {
    const userAnswer = answer.textContent;
    const userHint = questions[count].hint;
    const correctAnswer = questions[count].answer;
    const options = document.querySelectorAll(".quiz__option");
    const iconCorrect = "<span'>&#9989;</span>";
    const iconIncorrect = "<span'>&#10060;</span>";
    answer.classList.add("selected");

    if (userAnswer == correctAnswer){
        userScore+=1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", userHint);
        answer.insertAdjacentHTML("beforeend", iconCorrect);
        arrAnswers[count][1] = 1;
        setTimeout(()=>{answer.classList.add("moving")}, 4500);
        options.forEach(item =>{
            if(item!=answer){
                setTimeout(()=>{
                    item.classList.add("moving");
                }, 2000);
            }
        })
        
    } else{
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", iconIncorrect);
        arrAnswers[count][1] = 0;
        options.forEach(item =>{
            setTimeout(() =>{
                item.classList.add("moving");
            }, 2000);
        }
    );
    }
    
    options.forEach(item => item.classList.add("disabled"));
}

function questionSelected(question){
    const options = document.querySelectorAll(".result__option");
    const arr = arrAnswers;
    for (var i = 0; i < questions.length; i++){
             if (options[i] == question){
                 options[i].insertAdjacentHTML("beforeend", arr[i][0]);
             }else{
                options[i].insertAdjacentHTML("beforeend", ' ');

             }
        }
}


// появление следующего вопроса
function nextQuestion(){
    const option = $(".quiz__option");
    const result = $(".result");
    const resultText = $(".result__text");
    const list = $(".result__list");
    const iconCorrect = "<span'>&#9989;</span>";
    const iconIncorrect = "<span'>&#10060;</span>";
    const arr = arrAnswers;

    if((count + 1)== questions.length && option.classList.contains('disabled')){
        result.classList.remove('hidden');
        quiz.classList.add('hidden');
        resultText.innerHTML = `Количество правильных ответов: ${userScore} из ${questions.length}`;
        list.innerHTML = ''; // очистили блок, после чего можно добавить новый вопрос
        for (var i = 0; i < questions.length; i++){
            if(arr[i][1]==1){
                const text = `<li class = "result__option">${i+1}. ${questions[i].question} ${iconCorrect}</li>`;
                list.insertAdjacentHTML("beforeend", text);
            }else{
                const text = `<li class = "result__option">${i+1}. ${questions[i].question} ${iconIncorrect}</li>`;
                list.insertAdjacentHTML("beforeend", text);
            }
        }  
        const options = document.querySelectorAll(".result__option");
        options.forEach(item => item.setAttribute("onclick", "questionSelected(this)"));
        // for (var i = 0; i < questions.length; i++){
        //     if (options[i] == questions[i].question){
        //         options.insertAdjacentHTML("onclick", "beforeend", arr[i][0])
        //     }
        // }
    
        // options.forEach(item => item.addEventListener("onclick", () => {
        //     item.classList.add("selected");
        //     for (var i = 0; i < questions.length; i++){
        //         if(options[i] == item){
        //             item.insertAdjacentHTML("beforeend",  arrAnswers[i][0]);
        //         } else{
                    
        //         }
        //     }
        // }));
        return;
        
    }

    // проверяем, был ли выбран ответ в предыдущем вопросе
    if (option.classList.contains('disabled')){
        count++;
        showQuestions(count);
    } else {
        alert('Вы еще не ответили на вопрос! Сначала выберите ответ, а затем переходите к следующему вопросу');
    }
}

// функция для перемешивания вопросов с помощью алгоритма Фишера — Йетса. 
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

