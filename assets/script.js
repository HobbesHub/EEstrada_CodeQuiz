//Creatign a wrapper element to process all clicks on the page.
var wrapper = document.querySelector(".wrapper");
//start Button
var startBtn = null;
// variable for putting initial message with Start button and then the multiple choice questions dynamically
var initCard = document.querySelector("#init-card");
//Timer display
var timer = document.querySelector("#timerDisp");
//variable to to display result of each question as correct or wrong
var result = document.querySelector("#result");
//variable to store user entered initials
var initials = null;
//Variable to keep track of timer.  Each round get 75 seconds
var timeLeft = 75;
//Variable to keep track of number of questions
var numQues = 0;
//Variable to keep track of the score
var score = 0;
//Array to store (initials, score) pair in Local storage
var scoreList = [];

//array to store all the questions, theirs choices of answers and correct answer
var questionList = [
   // {ques:"Commonly used data types do NOT include: ", btn1:"1. strings", btn2:"2. boolean", btn3:"3. alerts", btn4:"4. numbers", ans:"3. alerts"},
    //YOUR CODE
   
        {
           ques: "Commonly used data types do NOT include:",
           btn1: "1. strings",
           btn2: "2. boolean",
           btn3: "3. alerts",
           btn4: "4. numbers",
           ans: "3. alerts" // Answer

        },
        // Add as many questions as needed
     
]

//Timer function  - it is executed when Start button is pressed
function startTimer() {
    //YOUR CODE
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

//Function to run the quiz
function runQuiz() {
    //YOUR CODE
        // Initialize variables to keep track of the current question and score
        var currentQuestionIndex = 0;
        var userScore = 0;
    
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
            // You can update your HTML to show the question and answer choices dynamically
    
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
                // Update your HTML to show this message
            } else {
                // Display a message indicating that the answer is wrong
                // Update your HTML to show this message
            }
    
            // Move to the next question
            currentQuestionIndex++;
    
            // Display the next question or end the quiz if all questions are answered
            displayQuestion();
        }
    
        // Start the quiz by displaying the first question
        displayQuestion();
      
}


// Function to save users score and initial - this is called when Timer is done or all the questions are done and timer is set to zero.
function saveResults() {
    
    //YOUR CODE

}

//Get the list of Initials and score from Local Storage to display high scores from previous runs
//if link = true, we need to create a display string for alert popup when View High Score lin is clicked
//If link = false, we need to createa string to display high score on the card in the apge.
function getScoreListString(link) {
    //get stored initial/score pair from local storage
    var storedList = JSON.parse(localStorage.getItem("scoreList"));
    var values = "";

    for (var i = 0; i < storedList.length; i++) {
        var y = i+1;
        if(!link)
         values += "<span>" + y + ". " + storedList[i].initials + " - " + storedList[i].score + "</span><br>";
        else
        values +=  y + ". " + storedList[i].initials + " - " + storedList[i].score + "<br>";

    }

    return values;
}

//Function to calculate if the user selected correct response
function getResults(btnValue) {
   
    //YOUR CODE
        // Get the current question object
        var currentQuestion = questionList[currentQuestionIndex];
        // Get the correct answer from the current question
        var correctAnswer = currentQuestion.ans;
    
        // Check if the selected answer matches the correct answer
        if (btnValue === correctAnswer) {
            return true; // The selected answer is correct
        } else {
            return false; // The selected answer is wrong
        }
}

//Function to show results list in the card on the page
function showResults() {

 //YOUR CODE
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

//main Event listener for warpper element - it will parse all the clicks for links and various buttons on the page
wrapper.addEventListener("click", function (event) {
    var element = event.target;
    var answer = false;
    console.log(element);
    event.preventDefault();

    if (element.innerHTML === "View High Scores") {  //View High Scores
        console.log("View high score clicked");

        //YOUR CODE

        alert(newValues);

    } else if (element.innerHTML === "Start") { //Start Button
        console.log("Start button clicked");

        //start the timer when start button is clicked
        startTimer();

    } else if (element.innerHTML === "Submit") { //Submit Button

        console.log("Submit clicked");

        //userScore object to store scores in local storage
        var userScore = {
            initials: initials.value.trim(),
            score: score
        };

        //add the latest userScore to the ScoreList
        scoreList[scoreList.length] = userScore;

        //weite scoreList to local storage
        localStorage.setItem("scoreList", JSON.stringify(scoreList));

        //show all the scores stored in local storage so far
        showResults();

    } else if (element.innerHTML === "Go Back") { //Go back

        console.log("Go Back clicked");

        //This will go back to the beginning and sets all the variables to their initial value before reloading the page

        //YOUR CODE
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

       location.reload();

    } else if (element.innerHTML === "Clear high Scores") {  //Clear High Score Button
 
        console.log("Clear High Score clicked");

       //empty out the scoreList
        scoreList.splice(0, scoreList.length);
        //store in local storage
        localStorage.setItem("scoreList", JSON.stringify(scoreList));
        //clear out the display on page
        initCard.innerHTML = "<b>High Scores:</b><br><span></span>\n <button id=\"goBack\" class=\"btn\">Go Back</button><button id=\"clearScores\" class=\"btn\">Clear High Scores</button>";

    } else if (element.innerHTML !== "Start") {       //Any of the Answer Button 

        console.log("One of the answer button clicked");

        //Return if all questions are done
        if(numQues === 5)
            return;
        
        //check if answer is correct or wrong
        answer = getResults(element.innerHTML);

        //answer is correct
        if (answer === true) {
            
            //YOUR CODE

        } else { //answer is wrong
           
            //YOUR CODE
            
        }

    } else {
        console.log("Ignore redundant clicks.");
    }
})


//Main fucntion
//It setups up the start message
//Also initialize the scoreList for the session with any initial/scores pairs stored in local storage from previous sessions
function init() {
    initCard.innerHTML = "Click Start button to start the timed quiz. Remember a wrong answer will detect time from the timer.<br><button id=\"start\" class\=\"btn\">Start</button>";
    startBtn = document.querySelector("#start");

    //get stored scores
    var storedList = JSON.parse(localStorage.getItem("scoreList"));
    if (storedList !== null) {
        scoreList = storedList;
    }
}

//Call init
init();

