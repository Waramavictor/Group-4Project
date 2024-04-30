const questions = [
    {
        question: "What's the largest country in the world?",
        answers: [
            { text: "Kenya", correct: false },
            { text: "Netherlands", correct: false },
            { text: "Russia", correct: true },
            { text: "Algeria", correct: false },
            { text: "Tanzania", correct: false },
        ],
    },
    {
        question: "What do you call a person that came before  another ancestor?",
        answers: [
            { text: "Stunner", correct: false },
            { text: "Gunner", correct: false },
            { text: "Forester", correct: false },
            { text: "Forerunner", correct: true },
            { text: "Inheritor", correct: false },
        ],

    },


    {
        question: "Which among these is not a musical instrument?",
        answers: [
            { text: "Trumpet", correct: false },
            { text: "Guitar", correct: false },
            { text: "Jerrycan", correct: true },
            { text: "Piano", correct: false },
            { text: "Xylophone", correct: false },
        ],

    },
    {
        question: "How many are in a pair of dice?",
        answers: [
            { text: "32", correct: false },
            { text: "42", correct: true },
            { text: "10", correct: false },
            { text: "50", correct: false },
            { text: "12", correct: false },
        ],
    },

    {
        question: "What is the second letter in the greek alphabet?",
        answers: [
            { text: "Beta", correct: true },
            { text: "Omega", correct: false },
            { text: "Sigma", correct: false },
            { text: "Alpha", correct: false },
            { text: "Simp", correct: false },
        ],
    },

    {
        question: "Who's the current primeminister of the UK?",
        answers: [
            { text: "Barris Johnson", correct: false },
            { text: "Tony Blaire", correct: false },
            { text: "John Mejja", correct: false },
            { text: "Teresa Mei", correct: false },
            { text: "Rishy Sunack", correct: true },
        ],
    }, {
        question: "In which year did the Titanic sink?",
        answers: [
            { text: "1971", correct: false },
            { text: "1915", correct: false },
            { text: "1912", correct: true },
            { text: "1909", correct: false },
            { text: "1989", correct: false },
        ],
    },

    {
        question: "Where is the strongest human muscle located?",
        answers: [
            { text: "Arm", correct: false },
            { text: "Jaw", correct: true },
            { text: "Leg", correct: false },
            { text: "Abdomen", correct: false },
            { text: "Spine", correct: false },
        
        ],
    },

    {
        question: "Who starred in the movies Saturday night and fever?",
        answers: [
            { text: "Tim Rod", correct: false },
            { text: "Bruce Willis", correct: false },
            { text: "Samuel.L Jackson", correct: false },
            { text: "John Travoldon", correct: true },
            { text: "Michael B. Jordan", correct: false },
        ],
    },

    {
        question: "Who are the defending chammpions of the NBA?",
        answers: [
            { text: "Chicago Bulls", correct: false },
            { text: "Denver Nuggets", correct: true },
            { text: "Boston Celtics", correct: false },
            { text: "Los Angeles Lakers", correct: false },
            { text: "Philadelphia 76ers", correct: false },
        ],
    },

    {
        question: "How many hearts does an octupus have?",
        answers: [
            { text: "8", correct: false },
            { text: "5", correct: false },
            { text: "4", correct: false },
            { text: "1", correct: false },
            { text: "3", correct: true },
            

        ],
    },

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }


}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    }
    );
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore()
    }
}
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton()
    } else {
        startQuiz()
    }
})

startQuiz();