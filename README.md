# BoozeClues
### [Live Website: https://protected-sierra-25147.herokuapp.com/]

created by [Nick H](https://github.com/smugclimber)

#### key libraries and tech <br>
Node <br>
Express <br>
Handlebars <br>
Passport User Auth <br>
socket.io <br>
MySQL <br>
Heroku <br>
NPM <br>
Git / Github <br>
jQuery <br>
Materialize <br>
Javascript <br>

#### about this project
A fully functional Bar Trivia management system. Booze Clues is an application that supports users and bars hosting trivia nights. The core functionality is obtaining trivia questions from an API source, and connecting pubs hosting with visiting bar patrons. Users can log in, join new games and get personal scores as well as scores from competitors. Enjoy!

### code
To connect with bars and other players, we required the socket.io NPM Package [socket.io](#socket.io) which enabled us to have a timer broadcasting to all game participants.
#### orm
code below is quoted from: server.js
```
io.on('connection', function (socket) {

  socket.on("join room", function(data){
    socket.join(data.room);
  });

//Onclick countdown broadcast
  var count = 21;
  var counter;
  function timer(room) {
  	count = count - 1;
  	if(count < 0){
  		clearInterval(counter);
  		count = 21;
      io.to(room).emit('times up', {done: true});
  		return;
  	}
  	io.to(room).emit('countdown', {left: count});
  }

//Array shuffle
function shuffle(array, cb) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  cb(array);
}

//When receive start timer event
  socket.on('start timer', function(data){
  	if(data.room){
  		counter = setInterval(function(){
        timer(data.room);
      }, 1000);
  	}
  });


//When receive push question event
  socket.on('push question', function(data){
    data.q.incorrect_answers.push(data.q.correct_answer);
    shuffle(data.q.incorrect_answers, function(array){
      data.q.incorrect_answers = array;
      io.to(data.room).emit('do the thing', data);
    });
  });
```
