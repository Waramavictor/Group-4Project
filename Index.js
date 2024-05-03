const gameappEndpoint = 'http://localhost:3000/questions';
console.log(gameappEndpoint); 

let data = [];
let userAnswers = [];

function displayQuestion(index) {
    let myDiv = document.getElementById("root");
    let question = data[index];
    let answers = question.answers.map(answer => {
        return `<br><input name='answer' type='radio' value='${answer.text}'> ${answer.text}`;
    });

    let qandA = `
        <p>${question.question}</p>
        ${answers.join('')}
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

document.getElementById("root").addEventListener("change", function(event) {
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
                    <p>Quiz Results:</p>
                    <p>Correct Answers: ${correctCount}</p>
                    <p>Incorrect Answers: ${incorrectCount}</p>
                    <button id="playAgain">Play Again</button>
                `;
                document.getElementById("root").innerHTML = resultMessage;

                document.getElementById("playAgain").addEventListener("click", function() {
                    userAnswers = [];
                    displayQuestion(0);
                });
            }
        }
    }
});

// Wait for the DOM content to be loaded before accessing elements
document.addEventListener("DOMContentLoaded", function() {
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
   window.alert(`welcome ${username} to K QUIZ`);
    // Hides the login container
    loginContainer.style.display = 'none';
  
    // Update the content of the profile icon with the logged-in username
    const loggedInUsername = document.getElementById('loggedInUsername');
    loggedInUsername.textContent = `${username}`;
  });
