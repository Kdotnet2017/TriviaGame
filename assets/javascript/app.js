var questionCount = 0;
var gameId;
var timeId;
var correctAnswer = 0;
var wrongAnswer = 0;
var unAnswered = 0;


$(document).ready(function () {

    var mainBody = $("#mainbody");
    mainBody.html("<button class='btn btn-primary btn-lg start' id='start'>Start</button>");
    $("#start").click(startGame);


    /*
        $("#start").on("click",function(){
            timer.startTimer();
          //  console.log("startGame()");
            renderQuestion(questionCount);
            */
    /*
}); */
});
function startGame() {
        gameId = setInterval(nextQuestion, 30000);
        timer.startTimer();
        renderQuestion(questionCount);
}
function stopGame() {
    clearInterval(gameId);
}
function nextQuestion() {
    
        questionCount++;
        if (questionCount < arrQuestionObject.length) {
            renderQuestion(questionCount);
        }
        else {
            questionCount = 0;
            endOfGame();
            timer.stopTimer();
            stopGame();
            console.log("end of array");
            //  startGame();
        }
   
}
var timer = {
    time: 30,
    startTimer: function () {
            timeId = setInterval(timer.countTimer, 1000);
    },
    countTimer: function () {
        timer.time--;
        if (timer.time > 0) {
            $("#timer").text(timer.time);
        }
        else if(timer.time==0) {
            timer.stopTimer();
            stopGame();
            outOfTime(questionCount)
            setTimeout(function () {
                nextQuestion();
                timer.resetTimer();
               // startGame();
            }, 5000);
            //  timer.resetTimer();
        }
    },
    resetTimer: function () {
        timer.time = 30;
        $("#timer").text(timer.time);
        timer.startTimer();
    },
    stopTimer: function () {
        clearInterval(timeId);
    }
}

function endOfGame() {
    createTimer();
  //  timer.stopTimer();
    var mainBody = $("#mainbody");
    var result = "<h1>All done, here is how you did.</h1><h1>Correct Answers: " + correctAnswer + "</h1>";
    result += "<h1>Incorrect Answers: " + wrongAnswer + "</h1><h1>Unanswered: " + unAnswered + "</h1>";
    mainBody.append(result);
    mainBody.append("<button class='btn btn-primary btn-lg startover' id='startover'>Start Over</button>");
    correctAnswer = 0;
    wrongAnswer = 0;
    unAnswered = 0;
    setTimeout(function () {
       
        timer.resetTimer();
        //startGame();
    }, 5000)
    console.log("why again????");
    $("#startover").click(startGame);
}



function outOfTime(questionCount) {
    unAnswered++;
    console.log("unAnswered: "+unAnswered);
    createTimer();
    var mainBody = $("#mainbody");
    var answer = "<p class='result-outoftime'>Out of Time!</p>"
    mainBody.append(answer);
    var answerIx = arrQuestionObject[questionCount].answerIndex;
    var cortAnswer = "<p class='answers'>The Correct Answer was: " + arrQuestionObject[questionCount].answers[answerIx] + "</p>"
    mainBody.append(cortAnswer);
    renderImage(questionCount);
}

function renderImage(questionCount) {
    var mainBody = $("#mainbody");
    var image = "<img class='image' src='" + arrQuestionObject[questionCount].image + "' alt=''>";
    mainBody.append(image);
}
function createResult(questionCount, userAnswer) {
    if (userAnswer == arrQuestionObject[questionCount].answerIndex) {
       this.correctAnswer++;
        console.log("correctAnswer: "+correctAnswer);
        createTimer();
        var mainBody = $("#mainbody");
        var answer = "<p class='result-correct'>Correct!</p>"
        mainBody.append(answer);
        renderImage(questionCount);
    }
    else {
        this.wrongAnswer++;
        console.log("wrongAnswer: "+this.wrongAnswer);
        createTimer();
        var mainBody = $("#mainbody");
        var answer = "<p class='result-wrong'>Nope!</p>"
        mainBody.append(answer);
        var answerIx = arrQuestionObject[questionCount].answerIndex;
        var cortAnswer = "<p class='answers'>The Correct Answer was: " + arrQuestionObject[questionCount].answers[answerIx] + "</p>"
        mainBody.append(cortAnswer);
        renderImage(questionCount);
    }
    setTimeout(function () {
        nextQuestion();
        timer.resetTimer();
        //startGame();
    }, 5000)
}

function createTimer() {
    var mainBody = $("#mainbody");
    mainBody.html("");
    mainBody.addClass("mainbody");
    mainBody.html("<h3>Time Remaining: <span id='timer'></span> Seconds</h3>")
    $("#timer").text(timer.time);
}
function createQuestion(questionId) {
    var mainBody = $("#mainbody");
    var question = "<h4 class='question'>" + arrQuestionObject[questionId].title + "</h4>"
    mainBody.append(question)
}
function createAnswers(questionId) {
    var mainBody = $("#mainbody");
    var answer = "<div class='btn-group-vertical'><button class='btn btn-default answers' value='0'>" + arrQuestionObject[questionId].answers[0] + "</button><button  class='btn btn-default answers' value='1'>" + arrQuestionObject[questionId].answers[1] + "</button><button  class='btn btn-default answers' value='2'>" + arrQuestionObject[questionId].answers[2] + "</button><button  class='btn btn-default answers' value='3'>" + arrQuestionObject[questionId].answers[3] + "</button></div>";
    mainBody.append(answer);
}
function renderQuestion(questionCount) {
    createTimer();
    createQuestion(questionCount);
    createAnswers(questionCount);
    $(".answers").on("click", function () {
        var answer = $(this).attr("value");
        timer.stopTimer();
        stopGame();
        createResult(questionCount, answer);
    });
}


var arrQuestionObject = [{
    "title": "What is the capital of Canada?",
    "answers": ["Quebec", "Vancouver", "Ottawa", "Toronto"],
    "answerIndex": 2,
    "image": "assets/images/canada.png"
},
{
    "title": "What is the capital of Argentina?",
    "answers": ["Buenos Aires", "Chaco", "Río Negro", "	San Luis"],
    "answerIndex": 0,
    "image": "assets/images/Argentina.png"
},
{
    "title": "What is the capital of Ireland?",
    "answers": ["Munster", "Leinster", "Gaillimh", "Dublin"],
    "answerIndex": 3,
    "image": "assets/images/Ireland.png"
}]