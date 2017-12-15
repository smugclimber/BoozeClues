

var db = require("../models");
var request = require("request");
var express = require('express');
var router = express.Router();

function getQs(req, cb){
	console.log("function running");
	var url = "https://opentdb.com/api.php?amount="+ req.body.qstnsPerRound;
	var game = [];
	var roundCat;
	var i = 0;
	for(; i < req.body.rounds; i++){
		roundCat = req.body['r'+ i + 'cat'];
		if(roundCat){
			url += "&category="+roundCat
			request(url, function(err, resp, body){
				if(err) console.log(err);
				body = JSON.parse(body);
				game = game.concat(body.results);
			});

		}
		else{
			request(url, function(err, resp, body){
				body = JSON.parse(body);
				game = game.concat(body.results);
			});
		}
	}
	setTimeout(function(){
		cb(game)
	}, 3000)
}



  router.post("/users", function(req, res) {
    db.Users.create(req.body).then(function(dbUser) {
      console.log("Created a user: "+dbUser)
      res.json(dbUser);
    });
  });

  app.post("/register", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      access:   req.body.group1
    }).then(function() {
      res.redirect(307, "/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
    });
  });

};
// var db = require("../models");
// var passport = require("../config/passport");
// 
// module.exports = function(app) {
//   app.post("/api/login", passport.authenticate("local"), function(req, res) {
//     res.json("/members");
//   });
//
//   app.post("/api/signup", function(req, res) {
//     console.log(req.body);
//     db.Users.create({
//       email: req.body.email,
//       password: req.body.password
//     }).then(function() {
//       res.redirect(307, "/api/login");
//     }).catch(function(err) {
//       console.log(err);
//       res.json(err);
//     });
//   });
//
//   app.get("/logout", function(req, res) {
//     req.logout();
//     res.redirect("/");
//   });
//
//   app.get("/api/user_data", function(req, res) {
//     if (!req.user) {
//       res.json({});
//     }
//     else {
//       res.json({
//         email: req.user.email,
//         id: req.user.id
//       });
//     }
//   });
//
// };

	//API call to get questions
	router.post("/qstn", function(req, res){
		getQs(req, function(data){
			res.json({questions: data});
		});
	});


module.exports = router;
