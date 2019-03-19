//console.log("hello world");
$(document).ready(function(){
var questionIndex = 0;
var timeLeft = 15;
var shortTime = 4;
var myTimer;
var shortTimer;
var opt;

// create question objects
var jaws = { 
    question: "What was the name of the shark in jaws?",
    options: ["Bruce" , "Jimmy" , "Owen" , "Jessica"],
    answer: "Bruce"
};

var jason = { 
    question: "In which movie did Jason first wear the hockey mask?",
    options: ["Friday the 13th" , "Friday the 13th Part 2" , "Friday the 13th part III" , "Friday the 13th the Final Chapter"],
    answer: "Friday the 13th part III"
    };

var freddy = { 
    question: "In which Nightmare On Elm Street movie did actor Johnny Depp appear?",
    options: ["A Nightmare on Elm Street" , "Freddy's Revenge" , "The Dream Warriors" , "Wes Craven's New Nightmare"],
    answer: "A Nightmare on Elm Street"
    };
var mike = { 
    question: "In the script for Halloween what was Micheal Meyers originally refered to as?",
    options: ["The shadow" , "The Shape" , "Michael Meyers" , "Kendrick"],
    answer: "The Shape"
    };
var leatherface = { 
    question: "Who was the director of the original Texas Chainsaw Massacre?",
    options: ["John Carpenter" , "Steven Spielberg" , "Wes Craven" , "Tobe Hooper"],
    answer: "Tobe Hooper"
    };
var howling = { 
    question: "What charactor in The Howling meets their end at the hands of Eddie Quists werewolf in the final act of the film?",
    options: ["Karen" , "Chris" , "Terri" , "Marsha"],
    answer: "Terri"
    };

//add question objects to questions array

var questions = [jaws, jason, freddy, mike, leatherface, howling];
var questionsLeft = questions.length;
var correct = 0;
var notAnswered = 0;

//console.log(questions[0].options[2]);
//score();

//create timers
function thirty() {
   showTime();
    myTimer = setInterval(myTimeout1, 1000) 
}

function five() {
    shortTimer = setTimeout(myTimeout2, 1000 * 4) 
}

//thirty();
//console.log(timeLeft);
 
function myTimeout1(){
    
    timeLeft--;
    showTime(); 
     
     if(timeLeft == 0){
         
         stop();
         five();
         showTime();
         $("#question").text("TIMES UP!!")
         showAnswer();
         notAnswered ++;
         
     }
 }
//shows correct answer for 5 seconds calls reset
 function myTimeout2(){
    //alert("times up");
    stop();
    resetBoard();
        
    
}

 function stop() {
    clearInterval(myTimer);
    clearInterval(shortTimer)
    
    //five();
    //showAnswer();
    //myTimer = 5;
    //questionIndex ++;
    
 }


//start on click
$("#start").on("click", function(){

    thirty();
    showQuestion();
    showOptions();
    //showTime();
    $("#start").hide();
})




//renderd question
function showQuestion(){

    $("#question").text(questions[questionIndex].question);
}

//render answer
function showAnswer(){
    //$("#question").text("TIMES UP!!!")
    $("#answers").text("The correct answer was " + questions[questionIndex].answer);

}




// render options to answer with
function showOptions(){
   
    for(var i = 0 ; i < questions[questionIndex].options.length; i++){
     //creates new div
     var div = $("<div></div>");
     //adds class data and text to div
     div.addClass("opt");
     div.attr("data-opt",questions[questionIndex].options[i]);
     div.text(questions[questionIndex].options[i]);
     //adds div to id answers
     $("#answers").append(div);

    };
}


//checks if right answer is slected
$("#answers").on("click",".opt", function(){
    opt= $(this).attr("data-opt");
    console.log(opt);
    
    
    if(opt == questions[questionIndex].answer){
        $("#question").text("CORRECT!")
        $("#answers").text("The answer was " + questions[questionIndex].answer);
        correct ++;
        stop();
        five();
    }
    else{
        $("#question").text("WRONG!!")
        showAnswer();
        stop();
        five();
    }
})

// render timer
function showTime() {

    $("#remaining").text("Time Remaing " + timeLeft);
}

function resetBoard() {
    timeLeft = 15;
    $("#question").text("")
    $("#answers").text("")
    questionIndex ++;
    questionsLeft --;
    //console.log(questionsLeft);
    if(questionsLeft == 0){
        stop();
        score();
    }
    else{
    thirty();
    showQuestion();
    showOptions();
    showTime();
    //five();
    }
    
    
}

function score(){
    $("#question").text("All done here's how you did!")
    $("#answers").text("")
    
    var div1 = $("<div></div>");
    var div2 = $("<div></div>");
    var div3 = $("<div></div>");
    var div4 = $("<button>");
    
    div1.text("Correct = " + correct);
    $("#answers").append(div1);
    
    div2.text("Incorrect = " +   (questions.length - correct));
    $("#answers").append(div2);
    
    div3.text("Unanswered = " + notAnswered);
    $("#answers").append(div3);
    
    div4.text("restart")
    div4.addClass("restart")
    div4.attr("id","restart")
    $("#answers").append(div4);

}

$("#answers").on("click",".restart", function(){

    //$("#start").show();
    timeLeft = 15;
    $("#question").text("")
    $("#answers").text("")
    $("#remaining").text("")
    questionIndex =0;
    questionsLeft = questions.length;
    correct = 0;
    notAnswered = 0;
    // restarts game
    thirty();
    showQuestion();
    showOptions();
})
})