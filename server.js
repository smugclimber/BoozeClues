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
// app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(process.cwd() + "./public"));

//Setup socket.io
var server = require('http').Server(app);
var io = require('socket.io')(server);

//Routes
//====================================
var htmlRoutes = require("./routes/html-routes.js");
// require("./routes/html-routes.js")(app);

// Root get route
// app.get("/", function(req, res) {
// console.log("hello");
//   });

app.use("/", htmlRoutes);

//Setup sequelize
//====================================
var db = require("./models");

//Sync models and start server
db.sequelize.sync({ force: true }).then(function() {
  server.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
