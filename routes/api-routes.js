
var request = require("request");
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

	//API call to get questions
	router.post("/qstn", function(req, res){
		getQs(req, function(data){
			res.json({questions: data});
		});
	});

module.exports = router;
