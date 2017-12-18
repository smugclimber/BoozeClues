  var socket = io.connect('http://localhost:8080');

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

  //Send get questions
  var gameQs = [];
  $("#getQs").on("click", function(){
    $("#getQs").addClass("hide");
    $("#spinner").addClass("active");
    console.log("triggering");
  	var gameData = {
  		rounds: 3,
  		qstnsPerRound: 5,
  		r0cat: "9",
  		r1cat: "20",
  		r2cat: "27"
  	};
  	$.post("/api/qstn", gameData, function(response, status){
  		 console.log(response.questions);
  			gameQs = response.questions;
        $("#spinner").removeClass("active");
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

//When question/timer event returns
  socket.on('do the thing', function(trivia){
    $("#qstn_info").text("Question " + (trivia.number +1) + " of " + trivia.total);
    $("#diff").text("Difficulty: "+ trivia.q.difficulty.charAt(0).toUpperCase()+trivia.q.difficulty.slice(1));
    $("#qstn").html("<h4>"+trivia.q.question+"</h4>");
    if(trivia.q.type === "multiple"){
      $("#ansA").html("<p>"+trivia.q.incorrect_answers[0]+"</p>");
      $("#opt-a").css("background-color", "blue");
      $("#ansB").html("<p>"+trivia.q.incorrect_answers[1]+"</p>");
      $("#opt-b").css("background-color", "blue");
      $("#ansC").html("<p>"+trivia.q.incorrect_answers[2]+"</p>");
      $("#opt-c").css("background-color", "blue");
      $("#ansD").html("<p>"+trivia.q.incorrect_answers[3]+"</p>");
      $("#opt-d").css("background-color", "blue");
    }
    if(trivia.q.type === "boolean"){
      $("#ansA").html("<p>True</p>");
      $("#opt-a").css("background-color", "blue");
      $("#ansB").html("<p>False</p>");
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

  //When time's up
  socket.on('times up', function(){
    $("#nxtQ").removeClass("disabled");
    switch(gameQs[question-1].correct_answer) {
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
