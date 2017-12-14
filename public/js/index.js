  var socket = io.connect('http://localhost:8080');

  socket.on('countdown', function(time){
  	$("#sqr").text(time.left);
<<<<<<< HEAD
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


  $("#qstn").on("click", function(){
  	var gameData = {
  		rs: 3,
  		qspr: 5,
  		r0cat: "9",
  		r1cat: "20",
  		r2cat: "27"
  	}
  	$.post("/api/qstn", gameData).done(function(response){
  		// console.log(response.questions);
  		response.questions.map(function(questions){
  			console.log(questions)
  		})
  	});
=======
  });

  $("#sqr").on("click", function(){
  	console.log("click working");
  	socket.emit('start timer', {start: true});
>>>>>>> Added onClick triggered countdown broadcast by socket.io
  });