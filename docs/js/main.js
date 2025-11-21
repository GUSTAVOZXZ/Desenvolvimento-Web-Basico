const questions = [
    {
        question:  "Qual país possui o maior número de títulos da Copa do Mundo FIFA?",
        answers: [
            { id: 1, text: "Alemanhã", correct:false },
            { id: 2, text: "Argentina", correct:false },
            { id: 3, text: "Brasil", correct:true },
            { id: 4, text: "Itáia", correct:false },
        ]
    },

    {
        question:  "Quem é o maior artilheiro da história da UEFA Champions League (considerando apenas a fase de grupos até a final)?",
        answers: [
            { id: 1, text: "Lionel Messi", correct:false },
            { id: 2, text: "Robert Lewandowski", correct:false },
            { id: 3, text: "Raúl Gonzáles", correct:false },
            { id: 4, text: "Cristiano Ronaldo", correct:true },
        ]
    },

    {
        question:  "Qual clube europeu é conhecido pelo apelido de 'Os Merengues'?",
        answers: [
            { id: 1, text: "Paris Saint-Germain", correct:false },
            { id: 2, text: "FC Barcelona", correct:false },
            { id: 3, text: "Real Madrid", correct:true },
            { id: 4, text: "Manchester United", correct:false },
        ]
    },

    {
        question:  "Em que ano a seleção brasileira conquistou seu primeiro título da Copa do Mundo?",
        answers: [
            { id: 1, text: "1962", correct:false },
            { id: 2, text: "1958", correct:true },
            { id: 3, text: "1970", correct:false },
            { id: 4, text: "1950", correct:false },
        ]
    },

    {
        question:  "Qual dos seguintes estádios está localizado na cidade de Milão e é a casa de dois grandes clubes italianos?",
        answers: [
            { id: 1, text: "Allianz Arena", correct:false },
            { id: 2, text: "Old Trafford", correct:false },
            { id: 3, text: "Estádio Olímpico de Roma", correct:false },
            { id: 4, text: "San Siro", correct:true },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextbtn = document.getElementById("next-btn");
const quizForm = document.getElementById("quiz-form");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz()
{
    currentQuestionIndex = 0;
    score = 0;
    nextbtn.innerHTML = "ENVIAR"; 
    nextbtn.removeEventListener('click', handleNextButton);
    nextbtn.addEventListener('click', handleNextButton);
    showQuestion();
}

function resetState()
{
    nextbtn.style.display = "block";
    
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function showQuestion()
{
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const answerDiv = document.createElement("div");
        answerDiv.classList.add("respostas");

        const answerLabel = document.createElement("label");
        answerLabel.htmlFor = `q${currentQuestionIndex}-answer${answer.id}`; 

        const radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.name = "question-option"; 
        radioInput.id = `q${currentQuestionIndex}-answer${answer.id}`; 
        radioInput.classList.add("btn");
        
        if (answer.correct) {
            radioInput.dataset.correct = answer.correct;
        }

        answerLabel.appendChild(radioInput);
        
        answerLabel.append(answer.text); 

        answerDiv.appendChild(answerLabel);

        answerButtonsElement.appendChild(answerDiv);
    });
}

function handleNextButton() {
    const selectedInput = document.querySelector('input[name="question-option"]:checked');

    if (nextbtn.innerHTML === "ENVIAR") {
        if (selectedInput) {
            checkAnswer(selectedInput);
        } else {
            alert("Por favor, selecione uma resposta antes de enviar!");
        }
    } 
    else {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            nextbtn.innerHTML = "ENVIAR";
            showQuestion();
        } else {
            showScore();
        }
    }
}

function checkAnswer(selectedInput) {
    const isCorrect = selectedInput.dataset.correct === "true";
    
    const allOptions = document.querySelectorAll('input[name="question-option"]');
    allOptions.forEach(input => {
        input.disabled = true;
        const parentDiv = input.closest('.respostas');
        
        if (input.dataset.correct === "true") {
            parentDiv.style.backgroundColor = "lightgreen"; 
        } else if (input === selectedInput) {
            parentDiv.style.backgroundColor = "lightcoral"; 
        }
    });

    if (isCorrect) {
        score++;
    }

    if (currentQuestionIndex < questions.length - 1) {
        nextbtn.innerHTML = "Próxima Pergunta";
    } else {
        nextbtn.innerHTML = "Ver Resultado";
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Você finalizou o Quiz! Você acertou ${score} de ${questions.length} perguntas!`;
    nextbtn.innerHTML = "JOGAR NOVAMENTE";
    nextbtn.style.display = "block";

    nextbtn.removeEventListener('click', handleNextButton);
    nextbtn.addEventListener('click', startQuiz); 
}

startQuiz();