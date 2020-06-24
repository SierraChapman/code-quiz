// CREATE GLOBAL VARIABLES

// pointers to DOM elements
var highScoresLink = document.getElementById("high-scores-link");
var timeDisplay = document.getElementById("time");
var startView = document.getElementById("start-screen");
var startButton = document.getElementById("start-button");
var questionView = document.getElementById("question-view");
var questionDisplay = document.getElementById("question");
var answersDisplay = document.getElementById("answers");
var feedbackDisplay = document.getElementById("feedback");
var finalScoreDisplay = document.getElementById("final-score");
var endView = document.getElementById("end-screen");
var submitButton = document.getElementById("submit-button");
var initialsInput = document.getElementById("initials-input");
var header = document.querySelector("header");
var highScoresView = document.getElementById("high-scores-view");
// pointer to current view
var currentView = startView;
// quiz questions
var questionsArray = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: ["strings", "booleans", "alerts", "numbers"],
        correct: "2"
    },
    {
        question: "The condition in an if / else statement is enclosed within _____.",
        answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
        correct: "2"
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correct: "3"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        answers: ["commas", "curly brackets", "quotes", "parentheses"],
        correct: "2"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        correct: "3"
    },
];
// current question index
var currentQuestion;
// time left
var timeLeft;
// pointer to the interval responsible for the timer
var timerInterval;
// pointer to timeout for displaying feedback
var feedbackTimeout;
// high scores object - retrieve from localStorage
var highScoresArray = JSON.parse(localStorage.getItem("highScores"));
// if high scores object is null, set to empty list
if (highScoresArray === null) {
    highScoresArray = [];
}
// DEFINE FUNCTIONS

// Change view - for all but high scores!
function changeView(newView) {
    // Hide current view
    currentView.className = "display-none";
    // Change current view pointer
    currentView = newView;
    // Display new view
    newView.className = "";
}

// TO ADD: PREPARE THE QUIZ

// Start the quiz
function startQuiz() {
    // Set time left
    timeLeft = 75;
    // Set current question index
    currentQuestion = 0;
    // Update question
    updateQuestion();
    // Change to question view
    changeView(questionView);
    // Start the countdown interval
    timeDisplay.firstElementChild.textContent = timeLeft;
    timerInterval = setInterval(countOneSec, 1000);
}

// Count down
function countOneSec() {
    // Decrease time left by one
    timeLeft--;
    // Update new time
    timeDisplay.firstElementChild.textContent = timeLeft;
    // If time left is zero (or somehow less):
    if (timeLeft <= 0) {
        // End the game
        endGame();
    }
}

// Update question
function updateQuestion() {
    // Set question text to current question
    questionDisplay.textContent = questionsArray[currentQuestion].question;
    // Clear the answer list
    answersDisplay.innerHTML = "";
    // For each answer:
    for (var i = 0; i < questionsArray[currentQuestion].answers.length; i++) {
        // Create li answer
        var answerElement = document.createElement("li");
        // Set inner HTML, including text, button tag, and index for that answer
        answerElement.innerHTML = '<button value="' + i + '">' + (i + 1) + '. ' + questionsArray[currentQuestion].answers[i] + '</button>';
        // Add li to the answers ol
        answersDisplay.appendChild(answerElement);
    }
}

// Proceed to next question
function goToNextQuestion() {
    // Increment currentQuestion by one
    currentQuestion++;
    // If currentQuestion is greater than or equal to the number of questions:
    if (currentQuestion >= questionsArray.length) {
        // End the game
        endGame();
    } else {
        // Update question
        updateQuestion();
    }
}

// Check user's answer
function checkAnswer(event) {
    // If a button was clicked
    if (event.target.matches("button")) {
        // Determine which answer was clicked
        var userAnswer = event.target.value;
        console.log(userAnswer)

        // If user answer matches answer key:
        if (userAnswer === questionsArray[currentQuestion].correct) {
            // Give feedback saying "Correct!"
            showFeedback("Correct!");
            // Proceed to next question
            goToNextQuestion();
        } else {
            // Give feedback saying "Wrong!"
            showFeedback("Wrong!");
            // Process incorrect answer
            processWrongAnswer();
        }
    }
}

// Give feedback
function showFeedback(feedbackMessage) {
    // Stop any active timouts for feedback
    clearTimeout(feedbackTimeout);
    // Set feedback text to message
    feedbackDisplay.textContent = feedbackMessage;
    // Display feedback
    feedbackDisplay.className = "";
    // Hide feedback and reset text after 1.5 seconds
    feedbackTimeout = setTimeout(function() {
        feedbackDisplay.className="display-none";
    }, 1500)
}

// Process incorrect answer
function processWrongAnswer() {
    // Subtract 10 seconds
    timeLeft -= 10;
    // If time left is more than 0:
    if (timeLeft > 0) {
        // Update time display
        timeDisplay.firstElementChild.textContent = timeLeft;
        // Proceed to next question
        goToNextQuestion();
    } else {
        // End the game
        endGame();
    }
    
}

// TO ADD: SHOW DIFFERENT END SCREEN IF DIDN'T FINISH

// End the game and show end screen
function endGame() {
    // Stop the interval
    clearInterval(timerInterval);
    // Make sure time left is not negative
    if (timeLeft < 0) {
        timeLeft = 0;
        timeDisplay.firstElementChild.textContent = 0;
    }
    // Set final score text to time left
    finalScoreDisplay.textContent = timeLeft;
    // Change view to end screen
    changeView(endView)
}

// Submit high score
function submitScore(event) {
    event.preventDefault();

    // Check that initials were entered
    if (initialsInput.value === "") {
        alert("Enter your initials.");
        return;
    }

    // Create object for this score
    var newScore = {
        initials: initialsInput.value,
        score: timeLeft
    }

    // Determine rank
    var rank = determineRank(newScore);
    // Splice into proper place
    highScoresArray.splice(rank, 0, newScore);
    // Save new high scores to localStorage
    localStorage.setItem("highScores", JSON.stringify(highScoresArray));

    // Go to high scores page
    goToHighScores();

    // Clear input field
    initialsInput.value = "";
}

// Determine rank
function determineRank(scoreObject) {
    var i;
    // For each item in the high scores array:
    for (i = 0; i < highScoresArray.length; i++) {
        // If user high score is greater or equal
        if (scoreObject.score >= highScoresArray[i].score) {
            // Current index is index for insertion
            break;
        }
    }
    // If new score is the lowest score, i will be highScoresArray.length
    return i;
}

// Show high scores
function goToHighScores() {
    // Render high score list
    renderHighScores();
    // Hide current view
    currentView.className = "display-none";
    // Make header invisible
    header.className = "invisible";
    // Display high score view
    highScoresView.className = "";
}

// Render high score list
function renderHighScores() {
    // For each item in the high scores array:
        // Create li
        // Set textContent to show initials and score
        // Add li to the high scores list
}

// Go back from high scores
    // Hide high score view
    // Make header visible
    // Display current view

// Clear high scores
    // Delete high scores from localStorage
    // Set high scores array to empty list
    // Delete HTML contents of high scores list

// CREATE EVENT LISTENERS

// When start button is clicked, start the quiz
startButton.addEventListener("click", startQuiz);

// When answer is chosen, check user's answer
answersDisplay.addEventListener("click", checkAnswer)

// When user clicks submit, submit score to high scores
submitButton.addEventListener("click", submitScore)

// When user clicks view high scores, show high scores

// When user clicks to back, go back from high scores

// WHen user clicks clear high scores, clear high scores