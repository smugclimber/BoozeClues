
$(document).ready(function(){


$("#joinTeam").click(function(){
    $("#joinTeamSection").addClass("hide");
});



  var socket = io();

  socket.emit("join room", {room: gameID});

    //When receive timer event
  socket.on('countdown', function(time){
    //Set text of timer to time left
  	$("#time").text(time.left);
    //Change background color based on amount of time left
  	if(time.left <=20){
        $("#thead").removeClass("hide");
  		$("#timer").css("background-color", "#36B45E");
  	}
  	if(time.left <= 10 ){
  		$("#timer").css("background-color", "gold");
  	}
  	if(time.left <=5 ){
  		$("#timer").css("background-color", "red");
  	}
    //Change text when time runs out
  	if(time.left === 0){
        $("#thead").addClass("hide");
  		$("#time").text("Time's Up!");
  	}
  });

  //When receive question event
  var answer;
  var points
  socket.on('do the thing', function(trivia){
    //Save correct answer to variable
    answer = trivia.q.correct_answer;
    //Post "Question # of #" to screen
    $("#firstscreen").addClass("hide");
    $("#info").removeClass("hide");
    $("#qstn_info").text((trivia.number +1) + " / " + trivia.total);
    //Post Difficulty with capitalized first letter
    $("#diff").text(trivia.q.difficulty.charAt(0).toUpperCase()+trivia.q.difficulty.slice(1));
    //Post question text
    $("#qstn").html("<h4>"+trivia.q.question+"</h4>");
    $("#qstn").addClass("question");
    //If the question is multiple choice
    if(trivia.q.type === "multiple"){
      //Insert radio button and label for A
      $("#ansA").html("<input type='radio' name='answer' id='answrA' value='"+trivia.q.incorrect_answers[0]+"'><label for='answrA'>"+trivia.q.incorrect_answers[0]+"</label>");
      //Reset background color to _______
      $("#ansA").css("background-color", "#4F93BF");
      //Insert radio button and label for B
      $("#ansB").html("<input type='radio' name='answer' id='answrB' value='"+trivia.q.incorrect_answers[1]+"'><label for='answrB'>"+trivia.q.incorrect_answers[1]+"</label>");
      //Reset background color to _______
      $("#ansB").css("background-color", "#4F93BF");
      //Insert radio button and label for C
      $("#ansC").html("<input type='radio' name='answer' id='answrC' value='"+trivia.q.incorrect_answers[2]+"'><label for='answrC'>"+trivia.q.incorrect_answers[2]+"</label>");
      //Reset background color to _______
      $("#ansC").css("background-color", "blue");
      $("#ansC").removeClass("hide");
      //Insert radio button and label for D
      $("#ansD").html("<input type='radio' name='answer' id='answrD' value='"+trivia.q.incorrect_answers[3]+"'><label for='answrD'>"+trivia.q.incorrect_answers[3]+"</label>");
      //Reset background color to _______
      $("#ansD").css("background-color", "blue");
      $("#ansD").removeClass("hide");
    }
    //If the question is true or false
    if(trivia.q.type === "boolean"){
      //Insert radio button for True in A
      $("#ansA").html("<input type='radio' name='answer' id='answrA' value='True'><label for='answrA'>True</label>");
      //Reset background color to _______
      $("#ansA").css("background-color", "#4F93BF");
      //Insert radio button for False in B
      $("#ansB").html("<input type='radio' name='answer' id='answrB' value='False'><label for='answrB'>False</label>");
      //Reset background color to _______
      $("#ansB").css("background-color", "#4F93BF");
      //Empty C
      $("#ansC").html("");
      //Grey out background
      $("#ansC").addClass("hide");
      //Empty D
      $("#ansD").html("");
      //Grey out background
      $("#ansD").addClass("hide");
    }
    //Change point value based on question difficulty
    if(trivia.q.difficulty === "hard"){
      points = 50;
    }
    else if(trivia.q.difficulty === "medium"){
      points = 30;
    }
    else {
      points = 10;
    }
    $("#points").text(points);
  });
var userScore = 0;
var qsCorrect = 0;
var qsTotal = 0;
  //When time expires
  socket.on('times up', function(){
    var userChoice = $('input[name=answer]:checked', '#userAnswer').val();
    //If user guessed correctly
    if(userChoice === answer){
      //Send obj with db update values
      userScore += points;
      qsCorrect ++;
      qsTotal ++;

    }
    //If wrong or no answer given
    else {
      //Update questions asked but nothing else
      qsTotal++;
    }
    //Put request to database
    $("#scores").text("Total Points: "+ userScore + " Number Correct: " + qsCorrect+ "/"+qsTotal);

    switch(answer) {
      case $("#ansA").text():
        $("#ansA").css("background-color", "#36B45E");
        break;
      case $("#ansB").text():
        $("#ansB").css("background-color", "#36B45E");
        break;
      case $("#ansC").text():
        $("#ansC").css("background-color", "#36B45E");
        break;
      case $("#ansD").text():
        $("#ansD").css("background-color", "#36B45E");
        break;
    }
  });


  });
