  var socket = io.connect('http://localhost:8080');

  socket.on('countdown', function(time){
  	$("#sqr").text(time.left);
  	if(time.left <=20){
  		$("#sqr").css("background-color", "green");
  	}
  	if(time.left <= 10 ){
  		$("#sqr").css("background-color", "gold");
  	}
  	if(time.left <=5 ){
  		$("#sqr").css("background-color", "red");	
  	}
  	if(time.left === 0){
  		$("#sqr").text("Time's Up!");
  	}
  });

  $("#sqr").on("click", function(){
  	socket.emit('start timer', {start: true});
  });

  var gameQs = [];

  $("#qstn").on("click", function(){
  	var gameData = {
  		rounds: 3,
  		qstnsPerRound: 5,
  		r0cat: "9",
  		r1cat: "20",
  		r2cat: "27"
  	}
  	$.post("/api/qstn", gameData).done(function(response){
  		 console.log(response.questions);
  			gameQs = response.questions;
  	});
  });

  var question = 0;
  $(".blah").on("click", function(){
    console.log(gameQs[question]);
    socket.emit('push question', gameQs[question]);
    socket.emit('start timer', {start: true});
    question++;
  });

  socket.on('do the thing', function(trivia){
    $("#user_info").text("Question " + (question) + " of " + gameQs.length)
    $("#qstn").html("<h3>"+trivia.question+"</h3>");
    if(trivia.type === "multiple"){
      $("#ansA").html("<p><input type='radio' name='answer' id='answrA' value='"+trivia.correct_answer+"'><label for='answrA'>"+trivia.correct_answer+"</label></p>");
      $("#ansA").css("background-color", "blue");
      $("#ansB").html("<input type='radio' name='answer' id='answrB' value='"+trivia.incorrect_answers[0]+"'><label for='answrB'>"+trivia.incorrect_answers[0]+"</label>");
      $("#ansB").css("background-color", "blue");
      $("#ansC").html("<input type='radio' name='answer' id='answrC' value='"+trivia.incorrect_answers[1]+"'><label for='answrC'>"+trivia.incorrect_answers[1]+"</label>");
      $("#ansC").css("background-color", "blue");
      $("#ansD").html("<input type='radio' name='answer' id='answrD' value='"+trivia.incorrect_answers[2]+"'><label for='answrD'>"+trivia.incorrect_answers[2]+"</label>");
      $("#ansD").css("background-color", "blue");
    }
    if(trivia.type === "boolean"){
      $("#ansA").html("<input type='radio' name='answer' id='answrA' value='True'><label for='answrA'>True</label>");
      $("#ansA").css("background-color", "blue");
      $("#ansB").html("<input type='radio' name='answer' id='answrB' value='False'><label for='answrB'>False</label>");
      $("#ansB").css("background-color", "blue");
      $("#ansC").html("");
      $("#ansC").css("background-color", "grey");
      $("#ansD").html("");
      $("#ansD").css("background-color", "grey");
    }
    if(trivia.difficulty === "hard"){
      $(".blah").text("Points: 5");
    }
    else if(trivia.difficulty === "medium"){
      $(".blah").text("Points: 3");
    }
    else {
      $(".blah").text("Points: 1");
    }
  });

  socket.on('times up', function(){
    console.log(gameQs[question-1].correct_answer);
    switch(gameQs[question-1].correct_answer) {
      case $("#ansA").text():
        $("#ansA").css("background-color", "green");
        break;
      case $("#ansB").text():
        $("#ansB").css("background-color", "green");
        break;
      case $("#ansC").text():
        $("#ansC").css("background-color", "green");
        break;
      case $("#ansD").text():
        $("#ansD").css("background-color", "green");
        break;
    }
  });
