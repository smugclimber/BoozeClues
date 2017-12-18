
  var socket = io.connect('http://localhost:8080');
var passport = require("../config/passport");
var username = passport.username;

$(document).ready(function() {
<<<<<<< HEAD
  
}
=======
  // Getting references to the name inout and author container, as well as the table body
  var nameInput = $("#author-name");
  var authorList = $("tbody");
  var authorContainer = $(".author-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Author
  $(document).on("submit", "#author-form", handleAuthorFormSubmit);
  $(document).on("click", ".delete-author", handleDeleteButtonPress);

  // Getting the intiial list of Authors
  getUserStats();


  // Function for retrieving authors and getting them ready to be rendered to the page
  function getUserStats() {
    $.get("/api/users", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createAuthorRow(data[i]));
      }
      renderAuthorList(rowsToAdd);
      nameInput.val("");
    });
    
    //When receive timer event
  socket.on('countdown', function(time){
  	$("#time").text(time.left);
  	if(time.left <=20){
  		$("#timer").css("background-color", "green");
  	}
  	if(time.left <= 10 ){
  		$("#timer").css("background-color", "gold");
  	}
  	if(time.left <=5 ){
  		$("#timer").css("background-color", "red");	
  	}
  	if(time.left === 0){
  		$("#time").text("Time's Up!");
  	}
  });

  //When receive question
  var answer;
  var points
  socket.on('do the thing', function(trivia){
    answer = trivia.q.correct_answer;
    $("#qstn_info").text("Question " + (trivia.number +1) + " of " + trivia.total);
    $("#diff").text("Difficulty: "+ trivia.q.difficulty.charAt(0).toUpperCase()+trivia.q.difficulty.slice(1));
    $("#qstn").html("<h4>"+trivia.q.question+"</h4>");
    if(trivia.q.type === "multiple"){
      $("#ansA").html("<input type='radio' name='answer' id='answrA' value='"+trivia.q.incorrect_answers[0]+"'><label for='answrA'>"+trivia.q.incorrect_answers[0]+"</label>");
      $("#opt-a").css("background-color", "blue");
      $("#ansB").html("<input type='radio' name='answer' id='answrB' value='"+trivia.q.incorrect_answers[1]+"'><label for='answrB'>"+trivia.q.incorrect_answers[1]+"</label>");
      $("#opt-b").css("background-color", "blue");
      $("#ansC").html("<input type='radio' name='answer' id='answrC' value='"+trivia.q.incorrect_answers[2]+"'><label for='answrC'>"+trivia.q.incorrect_answers[2]+"</label>");
      $("#opt-c").css("background-color", "blue");
      $("#ansD").html("<input type='radio' name='answer' id='answrD' value='"+trivia.q.incorrect_answers[3]+"'><label for='answrD'>"+trivia.q.incorrect_answers[3]+"</label>");
      $("#opt-d").css("background-color", "blue");
    }
    if(trivia.q.type === "boolean"){
      $("#ansA").html("<input type='radio' name='answer' id='answrA' value='True'><label for='answrA'>True</label>");
      $("#opt-a").css("background-color", "blue");
      $("#ansB").html("<input type='radio' name='answer' id='answrB' value='False'><label for='answrB'>False</label>");
      $("#opt-b").css("background-color", "blue");
      $("#ansC").html("");
      $("#opt-c").css("background-color", "grey");
      $("#ansD").html("");
      $("#opt-d").css("background-color", "grey");
    }
    if(trivia.q.difficulty === "hard"){
      points = 50;
    }
    else if(trivia.q.difficulty === "medium"){
      points = 30;
    }
    else {
      points = 10;
    }
    $("#points").text("Points: "+ points);
  });

  var dbInput
  //When time expires
  socket.on('times up', function(){
    var userChoice = $('input[name=answer]:checked', '#userAnswer').val();
    if(userChoice === answer){
      dbInput = {
        num_corr: 'num_corr + 1',
        total_ques: 'total_ques + 1',
        score_val: 'score_val + '+ points,
      };
    }
    else {
      dbInput = {
        total_ques: 'total_ques + 1'
      };
    }
    console.log(dbInput);
    $.ajax({
      type: 'PUT',
      url: "/api/user_game",
      data: dbInput
    }).done(function(resp){
      console.log(resp);
    });
    switch(answer) {
      case $("#ansA").text():
        $("#opt-a").css("background-color", "green");
        break;
      case $("#ansB").text():
        $("#opt-b").css("background-color", "green");
        break;
      case $("#ansC").text():
        $("#opt-c").css("background-color", "green");
        break;
      case $("#ansD").text():
        $("#opt-d").css("background-color", "green");
        break;
    }
  });

  }

  



>>>>>>> 737efdea83f34b45a8ed8dc242ca840e77ec9b59
