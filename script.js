// CREATE GLOBAL VARIABLES

// pointers to DOM elements
// pointer to current view
// quiz questions
// current question index
// time left
// pointer to the interval
// high scores object - retrieve from localStorage

// if high scores object is null, set to empty list

// DEFINE FUNCTIONS

// Change view - for all but high scores!
    // Hide current view
    // Change current view pointer
    // Display new view

// Start the quiz
    // Set time left
    // Set current question index
    // Update question
    // Change to question view
    // Start the countdown interval

// Count down
    // Decrease time left by one
    // Update new time
    // If time left is zero:
        // Stop the interval
        // Show end screen

// Update question
    // Set question text to current question
    // Clear the answer list
    // For each answer:
        // Create li answer as button
        // Save index for that answer
        // Add li to the answers ol

// Check user's answer
    // Determine which answer was clicked

    // If user answer matches answer key:
        // Give feedback saying "Correct!"
        // Show next question
    // Otherwise:
        // Give feedback saying "Wrong!"
        // Process incorrect answer

// Give feedback
    // Set feedback text to message
    // Display feedback
    // Hide feedback and reset text after 1 second

// Process incorrect answer
    // If time left is more than 10:
        // Subtract 10 from time left
        // Increment question index
        // Update question
    // Otherwise:
        // Stop the interval
        // Set time left to zero
        // Display time left as zero
        // Show end screen

// Show end screen
    // Set final score text to time left
    // Change view to end screen

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

// When answer is chosen, check user's answer

// When user clicks submit, submit high score

// When user clicks view high scores, show high scores

// When user clicks to back, go back from high scores

// WHen user clicks clear high scores, clear high scores