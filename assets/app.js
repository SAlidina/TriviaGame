var arrayOfQuestions = [];
var questionsRight = 0;
var questionsWrong = 0;
var questionUnanswered = 0;
var maxInterval = 120;
var currentInterval = 0;
var interval = 1000;
var giph =  '<iframe src="https://giphy.com/embed/3oEduV4SOS9mmmIOkw" width="480" height="288" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>'

class QuizQuestion {
    question;
    answers;
    correctAnswer;

    constructor(question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }

    IsAnswerCorrect(answer) {
        return this.correctAnswer = answer;
    }

}

//game starts and runs initiliaze function which also resets everything
function initialize() {
    arrayOfQuestions[0] = new QuizQuestion("1. What Pokémon does Pikachu evolve into?", ["Jolted", "Meowtastic", "Electovire", "Raichu"], 3);
    arrayOfQuestions[1] = new QuizQuestion("2. What's the most effective Poké Ball in the game?", ["Great Ball", "Master Ball", "Ultra Ball", "Timer Ball"], 1);
    arrayOfQuestions[2] = new QuizQuestion("3. How many Gym Badges must a trainer collect before challenging the Elite Four?", ["6", "7", "8", "9"], 2);
    arrayOfQuestions[3] = new QuizQuestion("4. What's the device trainers use to keep a record of their Pokémon encounters?", ["Pokécounter", "Pokédex", "Pokéfinder", "Pokêphone"], 1);
    arrayOfQuestions[4] = new QuizQuestion("5. If you need to buy supplies in the Pokémon world, where do you go?", ["Pokémon Center", "Gym", "Poké Mart", "Poké Dep"], 2);
    arrayOfQuestions[5] = new QuizQuestion("6. If you need to revive your fainted Pokémon to full health, where do you go?", ["Mount Fuji", "Pokémon Center", "Pokémon Mansion", "Gym"], 1);
    arrayOfQuestions[6] = new QuizQuestion("7. What are three types of starter Pokémon?", ["Psychic, Fighting and Ghost", "Electric,  Ground and Poison", "Grass,  Fire and Water", "Dragon, Flying and Normal"], 2);
    arrayOfQuestions[7] = new QuizQuestion("8. What type of attacks are Ghost type Pokemon immune to?", ["Fighting", "Normal", "Dark", "Fire"], 1);
    arrayOfQuestions[8] = new QuizQuestion("9. Which of these Legendary Pokemon is known to appear randomly throughout the Johto region?", ["Registeel", "Celebi", "Keldeo", "Suicune"], 3);
    arrayOfQuestions[9] = new QuizQuestion("10. In generation 1, which Pokémon is known for its lethal punches?", ["Lickitung", "Nidoking", "Hitmonchan", "Slowbro"], 2);

    //the html we will set for all the questions
    var questionsHTML = "";
    for (let index = 0; index < arrayOfQuestions.length; index++) {
        // construct the radio buttons for the quesion based on the obj in array
        var questionHTML = `
    <label>`+ arrayOfQuestions[index].question + `</label>
        <br>
        <input type="radio" id=`+ "question" + index + "0" + ` name="` + "question" + index + `" value="` + 0 + `">` + arrayOfQuestions[index].answers[0] + `
        <input type="radio" id=`+ "question" + index + "1" + ` name="` + "question" + index + `" value="` + 1 + `">` + arrayOfQuestions[index].answers[1] + `
        <input type="radio" id=`+ "question" + index + "2" + ` name="` + "question" + index + `" value="` + 2 + `">` + arrayOfQuestions[index].answers[2] + `
        <input type="radio" id=`+ "question" + index + "3" + ` name="` + "question" + index + `" value="` + 3 + `">` + arrayOfQuestions[index].answers[3] + `
        <br>
        <br>
        `;


        // apppend the current question to the list of all questions going to set to document
        questionsHTML += questionHTML;
    }
    $("#questions").html(questionsHTML);
    $("#congrats").html("");


    $("#submitButton").css("visibility", "visible");
    $("#startButton").css("visibility", "hidden");
    $("#backButton").css("visibility", "hidden");

    //set all the values back to zero
    questionsRight = 0;
    questionsWrong = 0;
    questionUnanswered = 0;
    //populates the questions and answers

    //starts the game using setTimeout on decrementTime();
    currentInterval = maxInterval;
    $("#timer").html("Time Left: " + msToTimeInMinutes(currentInterval * interval));
    setTimeout(decrementTime, interval);
}
//gets the timer to countdown
function decrementTime() {
    $("#timer").html("Time Left: " + msToTimeInMinutes(currentInterval * interval));
    if (currentInterval <= 0) {
        results();
        $("#timer").html("<h1>Time's Up! Your Results Are...</h1>");
    }
    else {
        currentInterval--;
        setTimeout(decrementTime, interval);
    }

}

// conversion for changing milliseconds into readable minutes and seconds
function msToTimeInMinutes(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;

    if (secs == 0) {
        secs = "00";

    }
    //displays it as a timer
    return mins + ':' + secs;
}

function submit() {
    //interput timer and go to results
    currentInterval = 0;
    $("#timer").html("<h1>Time's Up! Your Results Are...</h1>");
}

function results() {
    //count the amount of question answered/unanswered/wrong/right
    for (let index = 0; index < arrayOfQuestions.length; index++) {

        var questionIsAnswered = false;

        for (let answerIndex = 0; answerIndex < arrayOfQuestions[index].answers.length; answerIndex++) {
            if ($("#question" + index + answerIndex).prop("checked")) {
                questionIsAnswered = true;
                if (answerIndex == arrayOfQuestions[index].correctAnswer) {
                    questionsRight++;
                }
                else {
                    questionsWrong++;
                }
            }
        }
        if (questionIsAnswered == false) {
            questionUnanswered++;
        }
    }
    //display results
    var resultsHTML = `<p>Correct Answers: ` + questionsRight + "</p>";
    resultsHTML += `<p>Wrong Answers: ` + questionsWrong + "</p>";
    resultsHTML += `<p>Unsanswered: ` + questionUnanswered + "</p>";
    
    $("#questions").html(resultsHTML);
    $("#congrats").html(giph);
   


    $("#submitButton").css("visibility", "hidden");
    $("#startButton").css("visibility", "hidden");
    $("#backButton").css("visibility", "visible");
}


