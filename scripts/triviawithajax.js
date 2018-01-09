

$( "#runTrivia" ).on( "click", trivia);

function trivia(){
//start timer
start();
//hide begin button.
$('#runTrivia').hide();
$('.instructions').hide();
//show submit button.
$('#submit').show();

//globals:
var questionCount = 0;

var queryURL = "https://opentdb.com/api.php?amount=10&category=23&difficulty=easy";

answerKey = [];
questionHolder = [];

//appends question number to dom.
$("#counter").text("Question " + (questionCount + 1) + "/10");

//AJAX call to get my questions drom Open triviaDB.
    $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

    //data holders.
    var questionBank = response.results;
    var answerBank = [];

    //show the fist question abd submit button.
    $( "form" ).first().show();
    $("#submit").show();

    //assembling 10 questions.
     for (var i = 0; i < questionBank.length; i++) {

        var questionStem = questionBank[i].question;
        var correct = questionBank[i].correct_answer;
        var answers = questionBank[i].incorrect_answers;

        var question = $("<form class = 'form-horizonal'>").text(questionStem).attr({class: "question"}).attr({id: i});
        $("#triviaContainer").append(question);

        questionHolder.push("<p class='answerKey'>" + questionStem + '<br>' + "<p style='color:green'>" + correct);
        answers.push(correct);
        answerBank.push(answers);
        shuffle(answers);
        answerKey.push(correct);

        //assembling the radios.
        for (var e = 0; e < answers.length; e++) {
          answer = answers[e]
          var li = $('<label class= "answer">' + '<input type="radio" name = "question" value =' + answer +  '> ' + answer + '</label>')
          $(question).append(li);
        }

    //Initially hides all questions once they are put on dom.
        question.hide();
        // answerBank.length = 0;
    };
    console.log(questionHolder);

//show first question.
$( "form" ).first().show();



//shuffles order of answers.
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  };

  return array;
};
});

//building the show/hide question on submit function.

$("#submit").on("click", toggleHide);

function toggleHide() {

$( "form:visible" ).next().show();
$( "form:visible" ).first().hide();
questionCount += 1;
console.log(answerKey);
console.log(questionCount);
$("#counter").text("Question " + (questionCount + 1) + "/10");
if (questionCount === 10){
  pullAnswers();

}
}

//setting up score keeping.

var score = 0;
var numCorrect = 0;
var numWrong = 0;
var numAnswers = 0;


function pullAnswers(){
//when last question is submitted (if statement in toggle/hide):
$(".question").hide();
$("#counter").hide();
$("#submit").hide();
//freeze time.
stop();


  const userAnswers = [];
  const gotRight = [];
  const gotWrong = [];

  //submitted answers.
      $('input:checked').each(function(){
        if (null) {
        }
          userAnswers.push($(this).val());});

  for (var i = 0; i < 10; i++) {
    if (userAnswers[i] === answerKey[i]){
      console.log("good"); score+= 1; numCorrect += 1;
      gotRight.push((i + 1) + ": " + userAnswers[i]);
    }

    else {
      console.log("bad"); numWrong += 1;
      gotWrong.push((i + 1) + ": " + userAnswers[i]);
    }

  }

//append score to dom.
      var scoreBox = $("<div id = '#score'>").html("<h2>Score: " + Math.floor(score * 10)+"%" + "</h2>");

      scoreBox.prepend("<h1>Good Job!</h1>");
      scoreBox.append("<h3>Correct Answers: " + numCorrect + "</h3>" + "<p>" + gotRight + "<p>")
      scoreBox.append("<h3>Incorrect Answers: " + numWrong + "</h3>" + "<p>" + gotWrong + "<p>");
      scoreBox.append("<h3>Answer Key</h3>" + questionHolder);
      $("#triviaContainer").append(scoreBox);


};


//Timer function


var intervalId;

//prevents the clock from being sped up unnecessarily
var clockRunning = false;

var time = 120;

function reset() {
  time = 120;
  $("#time").text("02:00");
}


function start() {
  intervalId = setInterval(count, 1000);
  clockRunning = true;
}

function stop() {
  console.log("stopping");
  clockRunning = false;
  clearInterval(intervalId);
}

function count() {
  time--;
  var converted = timeConverter(time);
  $("#time").text('Time Left ' + converted);
}

function timeConverter(t) {

  var minutes = Math.floor(t / 60);
  var seconds = t - (minutes * 60);

  if (minutes < 1 && seconds < 1)
  {
    stop();
    pullAnswers();

    // seconds = "000" + seconds;
  }
  if (seconds < 10) {
   seconds = "0" + seconds;
  }
  if (minutes < 1) {
    minutes = "00";
  }
  return minutes + ":" + seconds;
}

};
