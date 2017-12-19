//Dependencies
//=====================================
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var router = express.Router();
var path = require("path");
var cookieParser = require("cookies-Parser");

var expressValidator = require("express-Validator");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");
var localStrategy = require("passport-local").Starategy;

SALT_WORK_FACTOR = 12;


//Setup Express App
//=====================================
var app = express();
var PORT = process.env.PORT || 8080;


//Setup bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Setup Handlebars view engine
app.set('views', path.join(__dirname, 'views'));
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//Static directory
//app.use(express.static(path.join(__dirname, '/public')));
// app.use(express.static(process.cwd() + "/public"));
app.use(express.static(path.join(__dirname, 'public')));
// Express Session
app.use(session({
  secret:'secret',
  saveUninitialized:true,
  resave:true,
}));

//passport init
app.use(passport.initialize());
app.use(passport.session());

//Express validator
app.use(expressValidator({
  errorFormatter: function(param,msg,value){
    var namespace = param.split('.'),
    root = namespace.shift(),
    formParam = root;
    while(namespace.length){
      formParam += '[' + namespace.shift() + ']';
    }
    return{
      param : formParam,
      msg : msg,
      value : value
    };
  }

}));

//connect flash
app.use(flash());

// Global Vars
app.use(function (req,res,next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null,
  next();
});
//Setup socket.io
var server = require('http').Server(app);
var io = require('socket.io')(server);

//Routes
//====================================
var routes = require("./routes/html-routes.js");
var user = require("./routes/user-routes.js")
var apiRoutes = require("./routes/api-routes.js");
var appRoutes = require("./routes/app-routes.js")
app.use("/", routes);
app.use("/", user);
app.use("/", appRoutes)
app.use("/api", apiRoutes);


//Setup sequelize
//====================================
var db = require("./models");

//Sync models and start server
db.sequelize.sync().then(function() {
  server.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

//Socket events
//====================================
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

});
