  $(document).ready(function(){

  var socket = io();


  console.log(gameID);
  socket.emit("join room", {room: gameID});

  //When receive timer event
  socket.on('countdown', function(time){
  	$("#time").text(time.left);
  	if(time.left <=20){
        $("#thead").removeClass("hide");
  		$("#timer").css("background-color", "#36B45E");
  	}
  	if(time.left <=10 ){
  		$("#timer").css("background-color", "gold");
  	}
  	if(time.left <=5 ){
  		$("#timer").css("background-color", "red");
  	}
  	if(time.left === 0){
        $("#thead").addClass("hide");
  		$("#time").text("Time's Up!");
  	}
  });

  var gameData = {};
  switch(gameID){
    case 1:
      gameData = {qsPerRound: 5, rounds: 3, r0cat: 0, r1cat: 0, r2cat: 0};
      break;
    case 2:
      gameData = {qsPerRound: 2, rounds: 3, r0cat: 18, r1cat: 20, r2cat: 12};
      break;
    case 3:
      gameData = {qsPerRound: 5, rounds: 3, r0cat: 14, r1cat: 26, r2cat: 13};
      break;
    case 4:
      gameData = {qsPerRound: 5, rounds: 3, r0cat: 24, r1cat: 22, r2cat: 30};
      break;
    case 5:
      gameData = {qsPerRound: 5, rounds: 3, r0cat: 31, r1cat: 29, r2cat: 18};
      break;
  }

  //Send get questions
  var gameQs = [];
  //On button click
  $("#getQs").on("click", function(){
    //Hide Get Questions button
    $("#getQs").addClass("hide");
    //Show spinner
    $("#spinner").removeClass("hide");
    $("#spinner").addClass("active");
  	console.log(gameData);
    //Post request to api-call
  	$.post("/api/qstn", gameData, function(response, status){
  		 console.log(response.questions);
       //Array of questions is api-call response
  			gameQs = response.questions;
        //Hide spinner
        $("#spinner").removeClass("active");
        $("#spinner").addClass("hide");

        //Unhide Next Question button
        $("#nxtQ").removeClass("hide");
  	});
  });


  //Send question and timer event
  var question = 0;
  //On Next Question button click
  $("#nxtQ").on("click", function(){
    //Disable button
    $("#nxtQ").addClass("disabled");
    console.log(gameQs[question]);
    //Send question socket event
    socket.emit('push question', {q: gameQs[question], number: question, total: gameQs.length, room: gameID});
    //Start timer socket event
    socket.emit('start timer', {room: gameID});
    //Iterate up the array by one
    question++;
  });

//When question/timer event returns
  socket.on('do the thing', function(trivia){
    //Display "Question # of #"
    $("#qstn_info").text((trivia.number +1) + " / " + trivia.total);
    //Display difficulty
    $("#diff").text(trivia.q.difficulty.charAt(0).toUpperCase()+trivia.q.difficulty.slice(1));
    //Send question text
    $("#qstn").html("<h4>"+trivia.q.question+"</h4>");
    $("#qstn").addClass("question");
    //If question is multiple choice
    if(trivia.q.type === "multiple"){
      //Display answer A
      $("#ansA").html("<p>"+trivia.q.incorrect_answers[0]+"</p>");
      //Reset background color to ______
      $("#ansA").css({"background-color": "#4F93BF"});
      //Display answer B
      $("#ansB").html("<p>"+trivia.q.incorrect_answers[1]+"</p>");
      //Reset background color to ______
      $("#ansB").css("background-color", "#4F93BF");
      //Display answer C
      $("#ansC").html("<p>"+trivia.q.incorrect_answers[2]+"</p>");
      //Reset background color to ______
      $("#ansC").css("background-color", "blue");
      $("#ansC").removeClass("hide");
      //Display answer D
      $("#ansD").html("<p>"+trivia.q.incorrect_answers[3]+"</p>");
      //Reset background color to ______
      $("#ansD").css("background-color", "blue");
      $("#ansD").removeClass("hide");
    }
    //if True/False
    if(trivia.q.type === "boolean"){
      //Display true
      $("#ansA").html("<p>True</p>");
      //Reset background color to ______
      $("#ansA").css("background-color", "#4F93BF");
      //Display false
      $("#ansB").html("<p>False</p>");
      //Reset background color to ______
      $("#ansB").css("background-color", "#4F93BF");
      //Clear div
      $("#ansC").html("");
      //Grey out background
      $("#ansC").addClass("hide");
      //Clear div
      $("#ansD").html("");
      //Grey out background
      $("#ansD").addClass("hide");
    }
    //Change value of points on difficulty
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

  //When time's up
  socket.on('times up', function(){
    //Re-enable next question button
    $("#nxtQ").removeClass("disabled");
    //Change background of right answer to green
    switch(gameQs[question-1].correct_answer) {
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
