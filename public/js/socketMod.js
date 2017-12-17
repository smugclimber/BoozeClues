  var socket = io.connect('http://localhost:8080');

  //When receive timer event
  socket.on('countdown', function(time){
  	$("#timer").text(time.left);
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
  		$("#timer").text("Time's Up!");
  	}
  });

  //Send get questions
  var gameQs = [];
  $("#getQs").on("click", function(){
    console.log("triggering");
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
        $("#getQs").addClass("hide");
        $("#nxtQ").removeClass("hide");
  	});
  });

  //Send question and timer event
  var question = 0;
  $("#nxtQ").on("click", function(){
    $("#nxtQ").addClass("disabled");
    console.log(gameQs[question]);
    socket.emit('push question', {q: gameQs[question], number: question, total: gameQs.length});
    socket.emit('start timer', {start: true});
    question++;
  });

  socket.on('do the thing', function(trivia){
    $("#user_info").text("Question " + question + " of " + gameQs.length)
    $("#qstn").html("<h3>"+trivia.q.question+"</h3>");
    if(trivia.q.type === "multiple"){
      $("#ansA").html("<input type='radio' name='answer' id='answrA' value='"+trivia.q.incorrect_answers[0]+"'><label for='answrA'>"+trivia.q.incorrect_answers[0]+"</label>");
      $("#ansA").css("background-color", "blue");
      $("#ansB").html("<input type='radio' name='answer' id='answrB' value='"+trivia.q.incorrect_answers[1]+"'><label for='answrB'>"+trivia.q.incorrect_answers[1]+"</label>");
      $("#ansB").css("background-color", "blue");
      $("#ansC").html("<input type='radio' name='answer' id='answrC' value='"+trivia.q.incorrect_answers[2]+"'><label for='answrC'>"+trivia.q.incorrect_answers[2]+"</label>");
      $("#ansC").css("background-color", "blue");
      $("#ansD").html("<input type='radio' name='answer' id='answrD' value='"+trivia.q.incorrect_answers[3]+"'><label for='answrD'>"+trivia.q.incorrect_answers[3]+"</label>");
      $("#ansD").css("background-color", "blue");
    }
    if(trivia.q.type === "boolean"){
      $("#ansA").html("<input type='radio' name='answer' id='answrA' value='True'><label for='answrA'>True</label>");
      $("#ansA").css("background-color", "blue");
      $("#ansB").html("<input type='radio' name='answer' id='answrB' value='False'><label for='answrB'>False</label>");
      $("#ansB").css("background-color", "blue");
      $("#ansC").html("");
      $("#ansC").css("background-color", "grey");
      $("#ansD").html("");
      $("#ansD").css("background-color", "grey");
    }
    if(trivia.q.difficulty === "hard"){
      $(".blah").text("Points: 50");
    }
    else if(trivia.q.difficulty === "medium"){
      $(".blah").text("Points: 30");
    }
    else {
      $(".blah").text("Points: 10");
    }
  });

  //When time's up
  socket.on('times up', function(){
    $("#nxtQ").removeClass("disabled");
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
