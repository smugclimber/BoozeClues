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
  	console.log("click working");
  	socket.emit('start timer', {start: true});
  });