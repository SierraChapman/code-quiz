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
// pointer to the interval
var interval;
// high scores object - retrieve from localStorage

// if high scores object is null, set to empty list

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
    interval = setInterval(countOneSec, 1000);
}

// Count down
function countOneSec() {
    // Decrease time left by one
    timeLeft--;
    // Update new time
    timeDisplay.firstElementChild.textContent = timeLeft;
    // If time left is zero (or somehow less):
    if (timeLeft <= 0) {
        // Stop the interval
        clearInterval(interval);
        // Show end screen
        timeLeft = 0;
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
        // Proceed to end screen
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
    // Set feedback text to message
    feedbackDisplay.textContent = feedbackMessage;
    // Display feedback
    feedbackDisplay.className = "";
    // Hide feedback and reset text after 1.5 seconds
    setTimeout(function() {
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
        // Stop the interval
        clearInterval(interval);
        // Set time left to zero
        timeLeft = 0;
        // Display time left as zero
        timeDisplay.firstElementChild.textContent = 0;
        // Show end screen
        endGame();
    }
    
}

// Show end screen
function endGame() {
    // Set final score text to time left
    // Change view to end screen
}

// Submit high score
    // Create object for this score
    // If no initials given, use "unknown"

    // Determine rank
    // Splice into proper place
    // Save new high scores to localStorage

// Determine rank
    // For each item in the high scores array:
        // If user high score is greater or equal
            // Current index is index for insertion
    // If insertion index is null:
        // Set equal to length of array
    // return rank

// Show high scores
    // Render high score list
    // Hide current view
    // Make header invisible
    // Display high score view

// Render high score list
    // For each item in the high scores array:
        // Create li
        // Set textContent to show initials and score
        // Add li to the high scores list

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

// When user clicks submit, submit high score

// When user clicks view high scores, show high scores

// When user clicks to back, go back from high scores

// WHen user clicks clear high scores, clear high scores