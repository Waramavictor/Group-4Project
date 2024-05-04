document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById('startButton');
    const quizSection = document.getElementById('quiz');

    startButton.addEventListener('click', function () {
        // Show the quiz section when the button is clicked
        quizSection.classList.remove('hidden');
        // Smooth scroll to the quiz section
        quizSection.scrollIntoView({
            behavior: 'smooth'
        });

        // Here, you can call the function to start your quiz app
        gameapp();
    });
});



const gameappEndpoint = 'http://localhost:3000/questions';
console.log(gameappEndpoint);

let data = [];
let userAnswers = [];

function displayQuestion(index) {
    let myDiv = document.getElementById("root");
    let question = data[index];
    let answers = question.answers.map(answer => {
        return `<br><input class="answer-input" name='answer' type='radio' value='${answer.text}'> <label class="answer-label">${answer.text}</label>`;
    });

    let qandA = `
        <p class="question">${question.question}</p>
        <ul class="answers">
            ${answers.join('')}
        </ul>
    `;

    myDiv.innerHTML = qandA;
}

function evaluateQuiz() {
    let results = [];
    for (let i = 0; i < data.length; i++) {
        let question = data[i];
        let selectedAnswer = userAnswers[i];
        let correctAnswer = question.answers.find(answer => answer.correct).text;
        results.push(selectedAnswer === correctAnswer);
    }
    return results;
}


function gameapp() {
    fetch(gameappEndpoint)
        .then(response => response.json())
        .then(fetchedData => {
            data = fetchedData;
            displayQuestion(0);
        })
        .catch(error => {
            console.error('Error fetching the data', error);
        });

}
document.getElementById("root").addEventListener("change", function (event) {
    if (event.target.matches("input[name='answer']")) {
        let selectedAnswer = document.querySelector("input[name='answer']:checked");
        if (selectedAnswer) {
            userAnswers.push(selectedAnswer.value);
            if (userAnswers.length < data.length) {
                displayQuestion(userAnswers.length);
            } else {
                let quizResults = evaluateQuiz();
                let correctCount = quizResults.filter(result => result).length;
                let incorrectCount = data.length - correctCount;
                let resultMessage = `
                    <p class="result-message">Quiz Results:</p>
                    <p class="result-message">Correct Answers: ${correctCount}</p>
                    <p class="result-message">Incorrect Answers: ${incorrectCount}</p>
                    <button id="playAgain">Play Again</button>
                `;
                document.getElementById("root").innerHTML = resultMessage;

                document.getElementById("playAgain").addEventListener("click", function () {
                    userAnswers = [];
                    gameapp();
                });
            }
        }
    }
});


// Wait for the DOM content to be loaded before accessing elements
document.addEventListener("DOMContentLoaded", function () {
    gameapp(); // Call the function to fetch and display data
});