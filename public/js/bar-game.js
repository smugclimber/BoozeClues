  $(document).ready(function(){

  var socket = io();

  
  console.log(gameID);
  socket.emit("join room", {room: gameID});

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

  var gameData = JSON.parse(localStorage["gameData"]);

  //Send get questions
  var gameQs = [];
  //On button click
  $("#getQs").on("click", function(){
    //Hide Get Questions button
    $("#getQs").addClass("hide");
    //Show spinner
    $("#spinner").addClass("active");
  	console.log(gameData);
    //Post request to api-call
  	$.post("/api/qstn", gameData, function(response, status){
  		 console.log(response.questions);
       //Array of questions is api-call response
  			gameQs = response.questions;
        //Hide spinner
        $("#spinner").removeClass("active");
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
    $("#qstn_info").text("Question " + (trivia.number +1) + " of " + trivia.total);
    //Display difficulty
    $("#diff").text("Difficulty: "+ trivia.q.difficulty.charAt(0).toUpperCase()+trivia.q.difficulty.slice(1));
    //Send question text
    $("#qstn").html("<h4>"+trivia.q.question+"</h4>");
    //If question is multiple choice
    if(trivia.q.type === "multiple"){
      //Display answer A
      $("#ansA").html("<p>"+trivia.q.incorrect_answers[0]+"</p>");
      //Reset background color to ______
      $("#opt-a").css("background-color", "blue");
      //Display answer B
      $("#ansB").html("<p>"+trivia.q.incorrect_answers[1]+"</p>");
      //Reset background color to ______
      $("#opt-b").css("background-color", "blue");
      //Display answer C
      $("#ansC").html("<p>"+trivia.q.incorrect_answers[2]+"</p>");
      //Reset background color to ______
      $("#opt-c").css("background-color", "blue");
      //Display answer D
      $("#ansD").html("<p>"+trivia.q.incorrect_answers[3]+"</p>");
      //Reset background color to ______
      $("#opt-d").css("background-color", "blue");
    }
    //if True/False
    if(trivia.q.type === "boolean"){
      //Display true
      $("#ansA").html("<p>True</p>");
      //Reset background color to ______
      $("#opt-a").css("background-color", "blue");
      //Display false
      $("#ansB").html("<p>False</p>");
      //Reset background color to ______
      $("#opt-b").css("background-color", "blue");
      //Clear div
      $("#ansC").html("");
      //Grey out background
      $("#opt-c").css("background-color", "grey");
      //Clear div
      $("#ansD").html("");
      //Grey out background
      $("#opt-d").css("background-color", "grey");
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
    $("#points").text("Points: "+ points);
  });

  //When time's up
  socket.on('times up', function(){
    //Re-enable next question button
    $("#nxtQ").removeClass("disabled");
    //Change background of right answer to green
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
});