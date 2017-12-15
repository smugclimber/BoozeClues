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

  //When receive question
  var answer;
  socket.on('do the thing', function(trivia){
    answer = trivia.q.correct_answer;
    $("#user_info").text("Question " + (trivia.number +1) + " of " + trivia.total)
    $("#qstn").html("<h3>"+trivia.q.question+"</h3>");
    if(trivia.q.type === "multiple"){
      $("#ansA").html("<input type='radio' name='answer' id='answrA' value='"+trivia.q.correct_answer+"'><label for='answrA'>"+trivia.q.correct_answer+"</label>");
      $("#ansA").css("background-color", "blue");
      $("#ansB").html("<input type='radio' name='answer' id='answrB' value='"+trivia.q.incorrect_answers[0]+"'><label for='answrB'>"+trivia.q.incorrect_answers[0]+"</label>");
      $("#ansB").css("background-color", "blue");
      $("#ansC").html("<input type='radio' name='answer' id='answrC' value='"+trivia.q.incorrect_answers[1]+"'><label for='answrC'>"+trivia.q.incorrect_answers[1]+"</label>");
      $("#ansC").css("background-color", "blue");
      $("#ansD").html("<input type='radio' name='answer' id='answrD' value='"+trivia.q.incorrect_answers[2]+"'><label for='answrD'>"+trivia.q.incorrect_answers[2]+"</label>");
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
      $(".blah").text("Points: 5");
    }
    else if(trivia.q.difficulty === "medium"){
      $(".blah").text("Points: 3");
    }
    else {
      $(".blah").text("Points: 1");
    }
  });

  //When time expires
  socket.on('times up', function(){
    console.log(answer);
    switch(answer) {
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
