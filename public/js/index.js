  var socket = io.connect('http://localhost:8080');

  socket.on('countdown', function(time){
  	$("#sqr").text(time.left);
  });

  $("#sqr").on("click", function(){
  	console.log("click working");
  	socket.emit('start timer', {start: true});
  });