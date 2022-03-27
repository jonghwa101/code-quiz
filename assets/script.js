const startButtonEl = document.getElementById('start-btn');
const startDivEl = document.getElementById('start');
const questionContainerEl = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultEl = document.getElementById('result');
const formEl = document.getElementById('highscore');
const timer = document.getElementById('timer');
let timeSecond = 60;
let countingDown = true;

function countdown() {
    const countdown = setInterval(() => {
        if (countingDown) {
            timeSecond--;
        }
        timer.innerHTML = timeSecond
        if (timeSecond <= 0) {
            clearInterval(countdown)
        }
    }, 1000)
}

let currentQuestionIndex = 0

startButtonEl.addEventListener('click', startGame);

function startGame() {
    countdown();
    startDivEl.style.display = 'none';
    questionContainerEl.classList.remove('hide')
    showQuestion(currentQuestionIndex)
}

function showQuestion(questionIndex) {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
    questionElement.innerText = questions[questionIndex].question
    questionElement.id = questionIndex;
    let currentQuestion = questions[questionIndex]
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        button.classList.add('btn-primary')
        button.classList.add('btn-lg')
        button.dataset.correct = answer.correct
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = JSON.parse(selectedButton.dataset.correct)
    setStatusClass(selectedButton, correct)
    currentQuestionIndex++
    if (currentQuestionIndex === questions.length || timeSecond === 0) {
        
        endQuiz()
    }else {
        showQuestion(currentQuestionIndex)
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct){
        resultEl.classList.remove('hide')
        resultEl.innerHTML = "Correct"
    }else{
        resultEl.classList.remove('hide')
        resultEl.innerHTML = "Wrong"
        timeSecond = timeSecond - 10
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function endQuiz() {
    questionContainerEl.classList.add('hide')
    resultEl.classList.add('hide')
    formEl.classList.remove('hide')
    countingDown = false
}


const questions = [
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Computer Style Source", correct: false },
            { text: "Cascading Style Sheet", correct: true },
            { text: "Color Sample Sheet", correct: false },
            { text: "None of the above", correct: false },
        ]
    }, {
        question: "In CSS how do you call an id?",
        answers: [
            { text: "id", correct: false },
            { text: ".", correct: false },
            { text: "#", correct: true },
            { text: "None of the above", correct: false },
        ],
    },  {
        question: "In CSS how do you call a class?",
        answers: [
            { text: ".", correct: true },
            { text: "class", correct: false },
            { text: "#", correct: false },
            { text: "None of the above", correct: false },
        ]
    },  {
        question: "In CSS what does * select?",
        answers: [
            { text: "head", correct: false },
            { text: "body", correct: false },
            { text: "footer", correct: false },
            { text: "None of the above", correct: true },
        ]
    }
]