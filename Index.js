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
//api for fetching data from the db.json file
const gameappEndpoint = 'http://localhost:3000/questions';
console.log(gameappEndpoint); // testing to see if it works properly

let data = []; //array to shikilia the fetched questions and answers
let userAnswers = [];

function displayQuestion(index) {
    let myDiv = document.getElementById("root"); // the one in my html
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

    myDiv.innerHTML = qandA; // shows the questions and answers in the html file
}

function evaluateQuiz() {
    let results = [];
    for (let i = 0; i < data.length; i++) { //iterates through the data until all questions are seen
        let question = data[i];
        let selectedAnswer = userAnswers[i];
        let correctAnswer = question.answers.find(answer => answer.correct).text;
        results.push(selectedAnswer === correctAnswer); //checks if question is correct
    }
    return results;
}


function gameapp() {
    fetch(gameappEndpoint) //fetches from the one up there
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
    if (event.target.matches("input[name='answer']")) { //when the answer is selected the event listener starts working
        let selectedAnswer = document.querySelector("input[name='answer']:checked"); //checks if the answer is radio type
        if (selectedAnswer) {
            userAnswers.push(selectedAnswer.value);
            if (userAnswers.length < data.length) {
                displayQuestion(userAnswers.length); //valid answer = being pushed to an array the usedsmth
            } else {
                let quizResults = evaluateQuiz();
                let correctCount = quizResults.filter(result => result).length;
                let incorrectCount = data.length - correctCount; //when all questions are correct it checks the aanswees and displays it in the evaluate thing part
                let resultMessage = ` 
                    <p class="result-message">Quiz Results:</p>
                    <p class="result-message">Correct Answers: ${correctCount}</p>
                    <p class="result-message">Incorrect Answers: ${incorrectCount}</p>
                    <button id="playAgain">Play Again</button>
                `;
                document.getElementById("root").innerHTML = resultMessage;

                document.getElementById("playAgain").addEventListener("click", function () {
                    userAnswers = [];
                    gameapp(); //add event listeners to the button for it to start again
                });
            }
        }
    }
});


// Wait for the DOM content to be loaded before accessing elements
document.addEventListener("DOMContentLoaded", function () {
    gameapp(); // Call the function to fetch and display data
});

// Get references to the profile icon and the login container
const profileIcon = document.getElementById('profile');
const loginContainer = document.getElementById('loginContainer');

// Add event listener to the profile icon
profileIcon.addEventListener('click', function() {
  // Toggle the visibility of the login container
  loginContainer.style.display = loginContainer.style.display === 'block' ? 'none' : 'block';
});

// Close the login container when the user clicks on the close button
const closeButton = document.querySelector('.login-container .close');
closeButton.addEventListener('click', function() {
  loginContainer.style.display = 'none';
});

// Prevent form submission (for demonstration purposes)
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
});
// Prevent form submission (for demonstration purposes)
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Get the username from the input field
  const usernameInput = document.getElementById('username');
  const username = usernameInput.value.trim();
  
  // Hides the login container
  loginContainer.style.display = 'none';
});
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Gets the username from the input field
  const usernameInput = document.getElementById('username');
  const username = usernameInput.value.trim();
  // Displays an allert with the greeting messsage
 window.alert(`welcome ${username} to the GAMES APP`);
  // Hides the loggin container
  loginContainer.style.display = 'none';

  // Update the content of the profile icon with the logged-in username
  const loggedInUsername = document.getElementById('loggedInUsername');
  loggedInUsername.textContent = `${username}`;
});