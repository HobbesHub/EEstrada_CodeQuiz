// Creating a wrapper element to process all clicks on the page.
var wrapper = document.querySelector(".wrapper");

// Start Button
var startBtn = document.querySelector("#start");

// Variable for putting the initial message with Start button and then the multiple choice questions dynamically
var initCard = document.querySelector("#init-card");

// Timer display
var timer = document.querySelector("#timerDisp");

// Variable to display the result of each question as correct or wrong
var result = document.querySelector("#result");

// Variable to store user-entered initials
var initials = document.querySelector("#initials"); // Assuming you have an input field with the id "initials"

// Variable to keep track of the timer. Each round gets 75 seconds
var timeLeft = 75;

// Variable to keep track of the number of questions
var numQues = 0;

// Variable to keep track of the score
var userScore = 0;

// Array to store (initials, score) pairs in Local Storage
var scoreList = [];

// Array to store all the questions, their choices of answers, and the correct answer
var questionList = [
    {
        ques: "Commonly used data types do NOT include:",
        btn1: "1. strings",
        btn2: "2. boolean",
        btn3: "3. alerts",
        btn4: "4. numbers",
        ans: "3. alerts" // Correct answer
    },
    // Add more questions here as needed
];

// Function to start the timer
function startTimer() {
    // Disable the "Start" button once the timer starts
    startBtn.disabled = true;

    // Create an interval that decrements the timer every second (1000 milliseconds)
    var timerInterval = setInterval(function () {
        // Update the timer display with the current timeLeft value
        timer.textContent = "Time: " + timeLeft;

        // Check if the timer has reached zero
        if (timeLeft <= 0) {
            clearInterval(timerInterval); // Stop the timer
            timer.textContent = "Time's up!";
            // Call the function to save results when time's up
            saveResults();
        } else {
            // Decrement the timer
            timeLeft--;
        }
    }, 1000); // Interval set to 1000 milliseconds (1 second)
}

// Function to run the quiz
function runQuiz() {
    // Initialize variables to keep track of the current question and score
    var currentQuestionIndex = 0;
    userScore = 0; // Initialize the user's score

    // Function to display the current question
    function displayQuestion() {
        // Check if all questions have been answered
        if (currentQuestionIndex >= questionList.length) {
            // Call a function to end the quiz (e.g., save results)
            // You may want to call saveResults() here
            return;
        }

        // Get the current question object
        var currentQuestion = questionList[currentQuestionIndex];

        // Display the question and answer choices
        // Update your HTML to show the question and answer choices dynamically
        // Example:
        // var questionElement = document.getElementById("question");
        // questionElement.textContent = currentQuestion.ques;
        // var answerButtons = document.querySelectorAll(".answer-button");
        // answerButtons[0].textContent = currentQuestion.btn1;
        // answerButtons[1].textContent = currentQuestion.btn2;
        // answerButtons[2].textContent = currentQuestion.btn3;
        // answerButtons[3].textContent = currentQuestion.btn4;
    }

    // Function to check the user's answer
    function checkAnswer(selectedAnswer) {
        var currentQuestion = questionList[currentQuestionIndex];
        var correctAnswer = currentQuestion.ans;

        // Compare the selected answer with the correct answer
        if (selectedAnswer === correctAnswer) {
            // Increment the user's score
            userScore++;

            // Display a message indicating that the answer is correct
            result.textContent = "Correct!"; // Update your HTML to display this feedback
        } else {
            // Display a message indicating that the answer is wrong
            result.textContent = "Wrong!"; // Update your HTML to display this feedback

            // If you want to deduct time from the timer for a wrong answer, you can do so here
            // For example, deduct 10 seconds (adjust as needed)
            timeLeft -= 10;
        }

        // Move to the next question
        currentQuestionIndex++;

        // Display the next question or end the quiz if all questions are answered
        displayQuestion();
    }

    // Start the quiz by displaying the first question
    displayQuestion();
}

// Function to save user's score and initials - this is called when the timer is done or all the questions are done and the timer is set to zero.
function saveResults() {
    // Create an object to store the user's score and initials
    var userScoreObj = {
        initials: initials.value.trim(),
        score: userScore
    };

    // Add the user's score to the scoreList array
    scoreList.push(userScoreObj);

    // Write scoreList to local storage
    localStorage.setItem("scoreList", JSON.stringify(scoreList));

    // Show the results to the user
    showResults();
}

// Function to display the high scores
function showResults() {
    // Display the user's score on the page
    result.textContent = "Your Score: " + userScore;

    // If you want to display high scores, you can use the getScoreListString function
    var highScoresList = getScoreListString(false); // Pass false to indicate you want to display high scores on the page
    // Display the high scores list in an element with an id (e.g., "highScoresListElement")
    var highScoresListElement = document.getElementById("highScoresListElement");
    if (highScoresListElement) {
        highScoresListElement.innerHTML = "<b>High Scores:</b><br>" + highScoresList;
    }
}

// Function to get a formatted string of high scores
function getScoreListString(link) {
    // Get stored initials/score pairs from local storage
    var storedList = JSON.parse(localStorage.getItem("scoreList"));
    var values = "";

    for (var i = 0; i < storedList.length; i++) {
        var y = i + 1;
        if (!link)
            values += "<span>" + y + ". " + storedList[i].initials + " - " + storedList[i].score + "</span><br>";
        else
            values += y + ". " + storedList[i].initials + " - " + storedList[i].score + "<br>";
    }

    return values;
}

// Main event listener for the wrapper element - it will parse all the clicks for links and various buttons on the page
wrapper.addEventListener("click", function (event) {
    var element = event.target;
    var answer = false;
    console.log(element);
    event.preventDefault();

    if (element.innerHTML === "View High Scores") {  // View High Scores
        console.log("View high score clicked");

        // Display high scores to the user
        showResults();
    } else if (element.innerHTML === "Start") { // Start Button
        console.log("Start button clicked");

        // Start the timer when the start button is clicked
        startTimer();
    } else if (element.innerHTML === "Submit") { // Submit Button
        console.log("Submit clicked");

        // Call the function to save results when the user submits
        saveResults();
    } else if (element.innerHTML === "Go Back") { // Go back
        console.log("Go Back clicked");

        // Reload the page to start over
        location.reload();
    } else if (element.innerHTML === "Clear High Scores") {  // Clear High Score Button
        console.log("Clear High Score clicked");

        // Empty out the scoreList
        scoreList = [];
        // Store in local storage
        localStorage.setItem("scoreList", JSON.stringify(scoreList));
        // Clear out the display on the page
        showResults();
    } else if (element.classList.contains("answer-button")) { // Any of the Answer Buttons
        console.log("One of the answer buttons clicked");

        // Return if all questions are done
        if (numQues === 5) {
            return;
        }

        // Check if the answer is correct or wrong
        answer = checkAnswer(element.textContent.trim());
    } else {
        console.log("Ignore redundant clicks.");
    }
});

// Main function
// It sets up the start message
// Also initializes the scoreList for the session with any initial/scores pairs stored in local storage from previous sessions
function init() {
    initCard.innerHTML = "Click Start button to start the timed quiz. Remember a wrong answer will deduct time from the timer.<br><button id=\"start\" class=\"btn\">Start</button>";
}

// Call init
init();