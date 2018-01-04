

const questions = [
  {
  question: "Who was the first explorer to sail to North America?",
  answers: {
  a: "Leif Erikson",
  b: "Christopher Columbus",
  c: "Amerigo Vespucci",
           },
  correctAnswer: 'a'
  },

  {
  question: "What disease crippled President Franklin D. Roosevelt and led him to help the nation find a cure?",
  answers: {
  a: "Cancer",
  b: "Meningitis",
  c:  "Polio",
           },
  correctAnswer: 'c'
  },

  {
  question: "What is the oldest US state?",
  answers: {
  a: "Rhode Island",
  b: "Massachussetts",
  c: "Delaware",
           },
  correctAnswer: 'c'
  },

  {
  question:"America&#039;s Strategic Defense System during the Cold War was nicknamed after this famous movie.",
  answers: {
  a: "Jaws",
  b: "Blade Runner",
  c: "Star Wars",
           },
  correctAnswer: 'c'
  },

  {
  question: "In what year did the Wall Street Crash take place?",
  answers: {
  a: "1929",
  b: "1932",
  c: "1925",
           },
  correctAnswer: 'a'
  },


];

//global variables

var score = 0;
var numCorrect = 0;
var numWrong = 0;
var numAnswers = 0;


// click listeners and parallax

window.onload = function() {
$('.parallax-window').parallax({imageSrc: "http://www.longviewschool.org/wp-content/uploads/2013/07/SigningConstitution.jpg"});
$("#submit").on("click", stop);
$("#reset").on("click", reset);
$("#runTrivia").on("click", start);
$("#time").text("02:00");
$( "#runTrivia" ).on( "click", makeTrivia)
};

// starts game up.

function makeTrivia (){

  //button starts game, hides itself.

  $('#runTrivia').hide();
  //container for questions to go to html
  const questionBank = [];


questions.forEach(function(questions, question) {
//Answer Bank
  const answers = [];
  showQuestion = questions.question;

  // takes question/answers from the bank and gives dom properties.


  for (letter in questions.answers) {
        answers.push(
          `<label><input type="radio" name="question${question}" value="${letter}" id="${question}" >
              ${letter} :
              ${questions.answers[letter]}
           </label>`
        );
      };

  questionBank.push(`<div class="slide">
            <div class="question"> ${questions.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`);
    });

    //sends to html
    $("#question").html(questionBank);
};




// happens on submit or on click submit. Takes the answer chouces and compares each against correct answer index.
// I wanted to use a forEach for checking correct/incorrect, but couldn't get it working in time.
//

function pullAnswers(){

  const userAnswers = [];
  const correctAnswers = [];
      $('input:checked').each(function(){
          userAnswers.push($(this).val());});


console.log(userAnswers);

 $("#answers").html('<p>Correct Answers: ' + numCorrect +'</p>' + '</p>Incorrect Answers: ' + numWrong + '</p>')


questions.forEach(function(questions, question) {
  const selector = `input[name=question${question}]:checked`;

  correctAnswers.push(questions.correctAnswer);
  // correctAnswers.push(questions.correctAnswer);

 });


 //for testing. Leaving in here for future work.
console.log(correctAnswers);




// for Loop for answer checking.
for (var i = 0; i < userAnswers.length; i++) {
if (userAnswers[i] === correctAnswers [i]){console.log("good"); score+= 1; numCorrect += 1; console.log(numCorrect);} else {
  numWrong += 1;
}};

//for testing. Leaving in here for future work.
console.log(score);
console.log(numCorrect);
console.log(numWrong);

$("#score").html("<h2>Score: " + Math.floor(score * 10)+"%" + "</h2>");
// console.log((score/5) * 100);
// $("#score").html("<button id=tryAgain>Try Again</button>");

$('.slide').hide();
$( "#submit" ).hide();
$("#time").text("Time Up!");
};


$( "#submit" ).on( "click", pullAnswers);
$("#runTrivia").on("click", makeTrivia);


// timer functions
    // there is still a problem when time runs out. The game ends, but the I can't seem to replace the text. (works for submit button but not timeout)
//

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
  pullAnswers();
  $("#time").text("Great Job!");
}

function count() {
  time--;
  var converted = timeConverter(time);
  $("#time").text(converted);
}

function timeConverter(t) {

  var minutes = Math.floor(t / 60);
  var seconds = t - (minutes * 60);

  if (minutes < 1 && seconds < 1)
  {
    stop();

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
