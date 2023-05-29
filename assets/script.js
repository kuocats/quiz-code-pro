//variables to connect HTML elements
var body = document.body;
var quiz = document.createElement("quiz-questions");
var infoEl = document.createElement("div");
var startquizDiv = document.createElement("startbutton");
var gameOver = document.createElement("endquiz");
var endGameBtn = document.createElement("EndPage");
var questionsEl = document.createElement("questions");
var highScorePlayer = document.createElement("playerName");
var officialScoreEl = document.createElement("FinalScore");
var submitFinalScorebtn = document.createElement("submitName");
var highscoreContainer = document.createElement("highscorePlacement");
var highScoreDiv = document.createElement("score-card");
var highscoreName = document.createElement("highScore-Name");
var highscoreResults = document.createElement("highScore-Results");



//h1E1.textContent = "Welcome to my page";



var testQuestions = [
    {
        question: "How many values can an Array hold?",
        choices: ["A. 10", "B. 1" , "C. As many as you want" , "D.0"],
        answer: "C",
    },
    {
        question: "What tool is used for writing data directly to the console?",
        choices: ["A. Console Logs", "B. Functions", "C. Iterations", "D. Conditional Statements"],
        answer: "A",
    },
    {
        question:"An if / else statement is enclosed inside  _____.",
        choices: ["A. Square Brackets" , "B. Quotes" , "C. Curly Brackets" , "D. Parentheses"],
        answer: "B",
    },
    {
        question:"A _____ is a series of characters and is surrounded by quotes.",
        choices: ["A. Boolean", "B. Variable", "C. Array", "D. String"],
        answer: "D",
    },
    {
        question:"Where in the Console is data saved from Local Storage?",
        choices: ["A. Application", "B. Performance", "C. Network", "D.Elements "],
        answer: "A",
    }
];


// variables for Quiz
var lastQuestionSection = testQuestions.length;
var currentQuestionSection = 0;
var score = 0;
var remainingTime = 61;
var timerInterval;
var correct;


//Function to display questions in an array
function beginQuiz(){
    donediv.style.display = "none";
    if (currentQuestionSection === lastQuestionSection){
        return finalScore();
    }
    var displayQuestion = testQuestions [currentQuestionSection];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

//Function to Start Quiz, display the Start Page
function startSection (){
    endquizDiv.style.display = "none";
    startquizDiv.style.display = "none";
    beginQuiz();

    timerInterval = setInterval(function(){
        remainingTime--;
        quizTimer.textContent = "Time Remaining: " + remainingTime;

        if (remainingTime === 0) {
            resetInterval (timerInterval);
            finalScore ();
        }
    }, 1000);
    quizBody.style.display = "block";       
}

//Function to display End Page for the end of the quiz
function finalScore(){
    quizBody.style.display = "none";
    endquizDiv.style.display = "flex";
    resetInterval(timerInterval);
    highScorePlayer.value = "";
    officialScoreEl.innerHTML = "You have reached the end of the quiz. You got " + score + "out of" + testQuestions.length + "right!";
}

// Saves the high score and adds to previous scores from Local Storage
submitFinalScorebtn.addEventListener("click", function highscore(){

    if (officialScoreEl.value === "") {
        alert ("Please Input Name");
        return false;
    }else{
        var previousPlayerScores = JSON.parse(localStorage.getItem("previousPlayScores")) || [];
        var currentPlayer = highscoreInputName.value.trim();
        var currentHighScore = {
            name: currentPlayer,
            score: score
        };

        endquizDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highScoreDiv.style.display = "block";
        endPage.style.display = "flex";

        previousPlayerScores.push(currentHighScore);
        localStorage.setItem("previousPlayerScores", JSON.stringify(previousPlayerScores));
        generateHighscore();    
    }
});

function generateHighscore(){
    highscoreName.innerHTML = "";
    highscoreResults.innerHTML = "";
    var highscores = JSON.parse(localstorage.getItem("previousPlayerScores")) || [];
    for (i=0; i<highscores.length; i++){
        var newPlayer = document.createElement("li");
        var newScore = document.createElement("li");
        newPlayer.textContent = highscores[i].name;
        newScore.textContent = highscores[i].score;
        highscoreName.appendChild(newPlayer);
        highscoreDisplay.appendChild(newScore);
    }
}

// Displays ONLY the high scores page
function highScoresList (){
    startquizDiv.style.display = "none";
    gameOver.style.display = "none";
    highscoreContainer.style.display = "flex";
    highScoreDiv.style.display = "block";
    
}

// Resets High Score Board
function clearScore (){
    window.localStorage.clear();
    highscoreName.textContent = "";
    highscoreResults.textContent = "";
}

// Checks User Response to Correct Answer
function checkAnswer (answer){
    correct = testQuestions[currentQuestionSection].correctAnswer;

    if (answer === correct && currentQuestionSection !==lastQuestionSection){
        score++;
        alert("Correct!");
        currentQuestionSection++;
        beginQuiz();
    }else if (answer !== correct && currentQuestionSection !==lastQuestionSection){
        alert("Try Again!");
        currentQuestionSection++;
        beginQuiz();
    }else{
        finalScore();
    }   
}

// Start the Quiz
startquizDiv.addEventListener("click",startSection);