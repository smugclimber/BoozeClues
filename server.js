//Dependencies
//=====================================
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var router = express.Router();
var path = require("path");

//Setup Express App
//=====================================
var app = express();
var PORT = process.env.PORT || 8080;

//Setup bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Setup Handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//Static directory
app.use(express.static(process.cwd() + "/public"));

//Setup socket.io
var server = require('http').Server(app);
var io = require('socket.io')(server);

//Routes
//====================================
var htmlRoutes = require("./routes/html-routes.js");
var apiRoutes = require("./routes/api-routes.js");
// require("./routes/html-routes.js")(app);
app.use("/", htmlRoutes);
app.use("/api", apiRoutes);

//Setup sequelize
//====================================
var db = require("./models");

//Sync models and start server
db.sequelize.sync({ force: true }).then(function() {
  server.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

//Socket events
//====================================
io.on('connection', function (socket) {

//Onclick countdown broadcast
  var count = 21;
  var counter;
  function timer () {
  	count = count - 1;
  	if(count < 0){
  		clearInterval(counter);
  		count = 21;
      io.sockets.emit('times up', {done: true});
  		return;
  	}
  	io.sockets.emit('countdown', {left: count});
  }

  socket.on('start timer', function(data){
  	if(data.start){
  		counter = setInterval(timer, 1000);
  	}
  });

  socket.on('push question', function(data){
    io.sockets.emit('do the thing', data);
  });


});

