var newQuestion;
var answers;
var theAnswer;
var userChoice;
var gifResponse;
var questionIndex;
var timeLeft = 30;
var correctCount = 0;
var incorrectCount = 0;
var questionArray = [
    question1 = new MakeQuestions ("Where does Santa\'s sleigh crash?", [answer1 = "Central Park", answer2 = "Prospect Park", answer3 = "The Artic Circle", answer4 = "Midtown Manhattan"], "Central Park", "assets/images/ninny.gif"),
    question2 = new MakeQuestions ("How many cookies does Buddy shove into the VCR?", [answer1 = "19", answer2 = "11", answer3 = "15", answer4 = "17"], "11", "assets/images/cookies.gif"),
    question3 = new MakeQuestions ("Which of these is not an elf food group?", [answer1 = "Chocolate", answer2 = "Candy", answer3 = "Candy Canes", answer4 = "Syrup"], "Chocolate", "assets/images/food.gif"),
    question4 = new MakeQuestions ("What\'s the name of the department store where Jovie works?", [answer1 = "Kimble\'s", answer2 = "Gimble\'s", answer3 = "Toyland", answer4 = "Macy\'s"], "Gimble\'s", "assets/images/smile.gif"),
    question5 = new MakeQuestions ("Where does Buddy get his name?", [answer1 = "His father", answer2 = "He\'s friendly", answer3 = "His diaper brand", answer4 = "He names himself"], "His diaper brand", "assets/images/color.gif"),
    question6 = new MakeQuestions ("Ming Ming, a lead elf toybuilder, also starred in what other Christmas classic?", [answer1 = "A Christmas Carol", answer2 = "Home Alone 2", answer3 = "White Christmas", answer4 = "A Christmas Story"], "A Christmas Story", "assets/images/revolve.gif"),
    question7 = new MakeQuestions ("Where do Buddy and Jovie kiss for the first time?", [answer1 = "Central Park", answer2 = "Columbus Circle", answer3 = "Gimbel's", answer4 = "Rockefeller Center"], "Rockefeller Center", "assets/images/hop.gif"),
    question8 = new MakeQuestions ("Where does Buddy's dad work?", [answer1 = "Empire State Building", answer2 = "Chrysler Building", answer3 = "World Trade Center", answer4 = "Flatiron Building"], "Empire State Building", "assets/images/empire.gif"),
    question9 = new MakeQuestions ("Which Ray's pizza is the real Ray's pizza?", [answer1 = "Across from Sbarro", answer2 = "Down by Brooklyn Bridge", answer3 = "Midtown", answer4 = "on 11th Street"], "on 11th Street", "assets/images/nutcracker.gif"),
    question0 = new MakeQuestions ("What animal does Buddy try to hug on his way to New York City?", [answer1 = "Raccoon", answer2 = "Dog", answer3 = "Squirrel", answer4 = "Badger"], "Raccoon", "assets/images/raccoon.gif"),
    question11 = new MakeQuestions ("What kind of business does Walter Hobbs work in?", [answer1 = "Publishing", answer2 = "Advertising", answer3 = "Accounting", answer4 = "Music"], "Publishing", "assets/images/escalate.gif"),
    question12 = new MakeQuestions ("What is Buddy's stepbrother\'s name?", [answer1 = "Kevin", answer2 = "Nick", answer3 = "Sam", answer4 = "Michael"], "Michael", "assets/images/jackbox.gif"),
    question13 = new MakeQuestions ("What does fake Santa smell like?", [answer1 = "Beer and regret", answer2 = "Beef and cheese", answer3 = "Smoke and lies", answer4 = "Whiskey"], "Beef and cheese", "assets/images/beef.gif"),
    question14 = new MakeQuestions ("What does Buddy build with wood from the entertainment center?", [answer1 = "A hat rack", answer2 = "A frame", answer3 = "A wreath", answer4 = "A rocking horse"], "A Rocking Horse", "assets/images/lies.gif"),
    question15 = new MakeQuestions ("What age did Papa Elf become a master tinkerer?", [answer1 = "380", answer2 = "450", answer3 = "100", answer4 = "490"], "490", "assets/images/papa.gif"),
    question16 = new MakeQuestions ("What temperature does Miles Finch request for the inside of his limo?", [answer1 = "72 degrees", answer2 = "71 degrees", answer3 = "68 degrees", answer4 = "98 degrees"], "71 degrees", "assets/images/kicked.gif"),
    question17 = new MakeQuestions ("Which police force pursues Santa and Buddy in their sleigh?", [answer1 = "The NYPD", answer2 = "The Cops", answer3 = "The Central Park Rangers", answer4 = "The Brooklyn PD"], "The Central Park Rangers", "assets/images/sing.gif"),
    question18 = new MakeQuestions ("Which of these landmarks isn\'t included in Buddy\'s journey to NYC?", [answer1 = "The Candy Cane Forest", answer2 = "The Chocolate Fudge Mire", answer3 = "The Lincoln Tunnel", answer4 = "Sea of Swirly Twirly Gum Drops"], "The Chocolate Fudge Mire", "assets/images/gumdrops.gif"),
]

function MakeQuestions (question, answers, solution, gif) {
    this.question = question;
    this.answers = answers;
    this.solution = solution;
    this.gif = gif;
}

//choose a random question and fill global variables with question data
var randomQuestion = function () {
    var randomNumber = Math.floor(Math.random() * questionArray.length);
    for (var i in questionArray) {
        if (randomNumber == i) {
            newQuestion = questionArray[i].question;
            answers = questionArray[i].answers;
            theAnswer = questionArray[i].solution;
            gifResponse = questionArray[i].gif;
            questionIndex = i;
        }
    }
}

//eliminate apostrophes and spaces to help compare solution and answers
var classify = function (answer) {
    var noSpace = answer.replace(/\s+/g, '');
    var noApost = noSpace.replace("'", '');
    var lowerCase = noApost.toLowerCase();
    return lowerCase;
}

//start trivia and display first question
//hides instructions and btn, adds question area div and individual answer divs
//starts questionCountdown function
var startTrivia = function () {
    randomQuestion();
    $('.instructions').addClass('hidden');
    $('.btn').addClass('hidden');
    $('.question-area').append("<div class = 'text-center time-left'> <h2>Seconds to answer: <br>" + timeLeft +"</h2></div>");
    $('.question-area').append("<div class = 'text-center question'> <h2>" + newQuestion + "</h2></div>");
    for (var i in answers) {
    $('.answer').append("<div class = 'text-center allAnswers answer" + i + "' id = '" + classify(answers[i]) + "'> <h3>" + answers[i] + "</h3></div>");
    }
    questionCountdown();
}

//continue trivia and display subsequent questions after first question
//hides feedback area, reveals question area div and individual answer divs
//starts questionCountdown function
var nextQuestion = function () {
    $('.answer').removeClass('hidden');
    $('.question').removeClass('hidden');
    $('.feedback-area').addClass('hidden');
    timeLeft = 30;
    randomQuestion();
    $('.time-left').html("<h2>Seconds to answer: <br>" + timeLeft +"</h2></div>");
    $('.question').html("<h2>" + newQuestion + "</h2></div>");
    for (var i in answers) {
    $('.answer').append("<div class = 'text-center allAnswers answer" + i + "' id = '" + classify(answers[i]) + "'> <h3>" + answers[i] + "</h3></div>");
    }
    questionCountdown();
}


//compare answer and solution
//if correct answer, run correct answer variables and functions
//if incorrect answer, run incorrect answer variables and functions
//also run finish screen when all questions are finished
var chooseAnswer = function () {
    if (classify($(this).text()) === classify(theAnswer)) {
        correct();
        correctCount++;
        questionArray.splice(questionIndex, 1);
        clearInterval(decrementTime);
        if (questionArray.length > 0) {
            setTimeout(nextQuestion, 3000);
            } else {
            setTimeout(finishScreen, 3000);
            }
        } else {
        incorrect();
        incorrectCount++;
        questionArray.splice(questionIndex, 1);
        clearInterval(decrementTime);
        if (questionArray.length > 0) {
            setTimeout(nextQuestion, 3000);
            } else {
            setTimeout(finishScreen, 3000);
            }
        }
    }

//function to keep track of time left to answer question
var decrementTime
var questionCountdown = function () {
    decrementTime = setInterval(function () {
        timeLeft--
        $('.time-left').html("<div class = 'text-center time-left'> <h2>Seconds to answer: <br>" + timeLeft + "</h2></div>")
        if (timeLeft == 0) {
            questionArray.splice(questionIndex, 1);
            clearInterval(decrementTime);
            incorrectCount++;
            timeUp();
            if (questionArray.length > 0) {
            setTimeout(nextQuestion, 3000);
            } else {
            setTimeout(finishScreen, 3000);
            }
        };
    }, 1000);
}

//function to reset variables and hide/unhide necessary divs
var restartGame = function () {
    questionArray = [
        question1 = new MakeQuestions ("Where does Santa\'s sleigh crash?", [answer1 = "Central Park", answer2 = "Prospect Park", answer3 = "The Artic Circle", answer4 = "Midtown Manhattan"], "Central Park", "assets/images/ninny.gif"),
        question2 = new MakeQuestions ("How many cookies does Buddy shove into the VCR?", [answer1 = "19", answer2 = "11", answer3 = "15", answer4 = "17"], "11", "assets/images/cookies.gif"),
        question3 = new MakeQuestions ("Which of these is not an elf food group?", [answer1 = "Chocolate", answer2 = "Candy", answer3 = "Candy Canes", answer4 = "Syrup"], "Chocolate", "assets/images/food.gif"),
        question4 = new MakeQuestions ("What\'s the name of the department store where Jovie works?", [answer1 = "Kimble\'s", answer2 = "Gimble\'s", answer3 = "Toyland", answer4 = "Macy\'s"], "Gimble\'s", "assets/images/smile.gif"),
        question5 = new MakeQuestions ("Where does Buddy get his name?", [answer1 = "His father", answer2 = "He\'s friendly", answer3 = "His diaper brand", answer4 = "He names himself"], "His diaper brand", "assets/images/color.gif"),
        question6 = new MakeQuestions ("Ming Ming, a lead elf toybuilder, also starred in what other Christmas classic?", [answer1 = "A Christmas Carol", answer2 = "Home Alone 2", answer3 = "White Christmas", answer4 = "A Christmas Story"], "A Christmas Story", "assets/images/revolve.gif"),
        question7 = new MakeQuestions ("Where do Buddy and Jovie kiss for the first time?", [answer1 = "Central Park", answer2 = "Columbus Circle", answer3 = "Gimbel's", answer4 = "Rockefeller Center"], "Rockefeller Center", "assets/images/hop.gif"),
        question8 = new MakeQuestions ("Where does Buddy's dad work?", [answer1 = "Empire State Building", answer2 = "Chrysler Building", answer3 = "World Trade Center", answer4 = "Flatiron Building"], "Empire State Building", "assets/images/empire.gif"),
        question9 = new MakeQuestions ("Which Ray's pizza is the real Ray's pizza?", [answer1 = "Across from Sbarro", answer2 = "Down by Brooklyn Bridge", answer3 = "Midtown", answer4 = "on 11th Street"], "on 11th Street", "assets/images/nutcracker.gif"),
        question0 = new MakeQuestions ("What animal does Buddy try to hug on his way to New York City?", [answer1 = "Raccoon", answer2 = "Dog", answer3 = "Squirrel", answer4 = "Badger"], "Raccoon", "assets/images/raccoon.gif"),
        question11 = new MakeQuestions ("What kind of business does Walter Hobbs work in?", [answer1 = "Publishing", answer2 = "Advertising", answer3 = "Accounting", answer4 = "Music"], "Publishing", "assets/images/escalate.gif"),
        question12 = new MakeQuestions ("What is Buddy's stepbrother\'s name?", [answer1 = "Kevin", answer2 = "Nick", answer3 = "Sam", answer4 = "Michael"], "Michael", "assets/images/jackbox.gif"),
        question13 = new MakeQuestions ("What does fake Santa smell like?", [answer1 = "Beer and regret", answer2 = "Beef and cheese", answer3 = "Smoke and lies", answer4 = "Whiskey"], "Beef and cheese", "assets/images/beef.gif"),
        question14 = new MakeQuestions ("What does Buddy build with wood from the entertainment center?", [answer1 = "A hat rack", answer2 = "A frame", answer3 = "A wreath", answer4 = "A rocking horse"], "A Rocking Horse", "assets/images/lies.gif"),
        question15 = new MakeQuestions ("What age did Papa Elf become a master tinkerer?", [answer1 = "380", answer2 = "450", answer3 = "100", answer4 = "490"], "490", "assets/images/papa.gif"),
        question16 = new MakeQuestions ("What temperature does Miles Finch request for the inside of his limo?", [answer1 = "72 degrees", answer2 = "71 degrees", answer3 = "68 degrees", answer4 = "98 degrees"], "71 degrees", "assets/images/kicked.gif"),
        question17 = new MakeQuestions ("Which police force pursues Santa and Buddy in their sleigh?", [answer1 = "The NYPD", answer2 = "The Cops", answer3 = "The Central Park Rangers", answer4 = "The Brooklyn PD"], "The Central Park Rangers", "assets/images/sing.gif"),
        question18 = new MakeQuestions ("Which of these landmarks isn\'t included in Buddy\'s journey to NYC?", [answer1 = "The Candy Cane Forest", answer2 = "The Chocolate Fudge Mire", answer3 = "The Lincoln Tunnel", answer4 = "Sea of Swirly Twirly Gum Drops"], "The Chocolate Fudge Mire", "assets/images/gumdrops.gif"),
    ]
    timeLeft = 30;
    correctCount = 0;
    incorrectCount = 0;
    $('.question-area').removeClass('hidden');
    $('.answer-area').removeClass('hidden');
    $('.instructions').addClass('hidden');
    $('.btn').addClass('hidden');
    nextQuestion();
}

splice
//function to display the finish screen and final scores as well as restart button
var finishScreen = function () {
    $('.instructions').removeClass('hidden');
    $('.feedback-area').addClass('hidden');
    $('.question-area').addClass('hidden');
    $('.answer-area').addClass('hidden');
    $('.instructions').html("<h2>You've finished the quiz! Here's how you did:</h2> <br>" +
                            "<h3>Correct: "+ correctCount +"</h3> <br>" +
                            "<h3>Incorrect: "+ incorrectCount +"</h3> <br>" +
                            "<div class = 'btn btn-primary btn-block restart-btn'>Try Again?</div>");
}

//function to run after a question once time runs out
var timeUp = function () {
    $('.question').addClass('hidden');
    $('.answer').addClass('hidden');
    $('.allAnswers').remove();
    $('.feedback-area').removeClass('hidden');
    $('.response').html("<h2>Time's up! The correct answer is " + theAnswer + "</h2>");
    $('.response-gif').html("<img src='" + gifResponse + "' alt='home-alone'>");
}

//function to run when a user guesses a correct answer
var correct = function () {
    $('.question').addClass('hidden');
    $('.answer').addClass('hidden');
    $('.allAnswers').remove();
    $('.feedback-area').removeClass('hidden');
    $('.response').html("<h2>You got it!</h2>");
    $('.response-gif').html("<img src='" + gifResponse + "' alt='home-alone'>");
}

//function to run when a user guesses an incorrect answer
var incorrect = function () {
    $('.question').addClass('hidden');
    $('.answer').addClass('hidden');
    $('.allAnswers').remove();
    $('.feedback-area').removeClass('hidden');
    $('.response').html("<h2>Nope! The correct answer is " + theAnswer + "</h2>");
    $('.response-gif').html("<img src='" + gifResponse + "' alt='home-alone'>");
}

//listeners
$('.start-btn').click(startTrivia);
$(document).on('click touchstart', '.allAnswers', chooseAnswer);
$(document).on('click', '.restart-btn', restartGame);
