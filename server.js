//Dependencies
//=====================================
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var router = express.Router();
var path = require("path");
<<<<<<< HEAD
var cookieParser = require("cookie-Parser");
=======
var cookieParser = require("cookies-Parser");
>>>>>>> a31e93456393667ba126f90228ab7fd3eff43fa7
var expressValidator = require("express-Validator");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");
var localStrategy = require("passport-local").Starategy;
<<<<<<< HEAD
SALT_WORK_FACTOR = 12;
=======

>>>>>>> a31e93456393667ba126f90228ab7fd3eff43fa7

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
  res.locals.success_msg = req.flash('succes_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
//Setup socket.io
var server = require('http').Server(app);
var io = require('socket.io')(server);

//Routes
//====================================
var routes = require("./routes/html-routes.js");
<<<<<<< HEAD
var user = require("./routes/user-routes.js")
=======
var user = require("./routes/user")
>>>>>>> a31e93456393667ba126f90228ab7fd3eff43fa7
// require("./routes/html-routes.js")(app);

// Root get route
// app.get("/", function(req, res) {
// console.log("hello");
//   });

app.use("/", routes);
app.use("/", user);

//Setup sequelize
//====================================
var db = require("./models");

//Sync models and start server
db.sequelize.sync({ force: true }).then(function() {
  server.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
