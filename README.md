# Coding Quiz Challenge

This project is a web application that implements a timed multiple-choice quiz game. The user has 75 seconds to try to answer five questions. Wrong answers cause a penalty of 10 seconds, and the time remaining when the user finishes is the user's score. The user then submits their score to a high score table that is stored locally on the browser.

## Code Snippets

The focus of this project was manipulating the Document Object Model (DOM) using JavaScript in order to interact with and render the page as desired. As an example, the `renderHighScores` function shown below populates the ordered list `highScoresList` with the information from `highScoresArray` by first emptying any contents in `highScoresList`, and then, for each high score in the array, creating a new HTML element of the type `li`, setting the desired text content, and appending it to `highScoresList`.

```javascript
// Render high score list
function renderHighScores() {
    // Clear high scores
    highScoresList.innerHTML = "";
    
    // For each item in the high scores array:
    for (var i = 0; i < highScoresArray.length; i++) {
        // Create li
        var singleScore = document.createElement("li");
        // Set textContent to show initials and score
        singleScore.textContent = highScoresArray[i].initials + " – " + highScoresArray[i].score;
        // Add li to the high scores list
        highScoresList.appendChild(singleScore);
    }
}
```

## Demo

The GIF below demonstrates viewing and clearing the high score list, playing the game (including correct and incorrect answers), and submitting a high score.

![Demonstration of the application](demo.gif)

Visit the [deployed link](https://sierrachapman.github.io/password-generator/) to interact with the application.

## Built with

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Deployed Link

* [See Live Site](https://sierrachapman.github.io/code-quiz/)

## Authors

* **Sierra Chapman** 
    - [Portfolio Site](#)
    - [Github](https://github.com/SierraChapman)
    - [LinkedIn](https://www.linkedin.com/in/sierra-chapman)

## Acknowledgments

* The questions and answers used for the quiz were written by Trilogy Education Services, a 2U, Inc. Additionally, the look of the application was based on a design created by Trilogy Education Services.
* [W3Schools](https://www.w3schools.com/) was a valuable resource in creating this application.
* This application uses Eric Meyer's [reset CSS](https://meyerweb.com/eric/tools/css/reset/) stylesheet to improve consistency of CSS styling between browsers.