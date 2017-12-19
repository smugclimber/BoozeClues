
var db = require("../models");
var request = require("request");
var express = require('express');
var router = express.Router();

function getQs(req, cb){
	console.log("function running");
	var url = "https://opentdb.com/api.php?amount="+ req.body.qsPerRound;
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
	}, 3000);
}

//API call to get questions
	router.post("/qstn", function(req, res){
		getQs(req, function(data){
			res.json({questions: data});
		});
	});

//API call to get question categories
	router.get("/cats", function(req,res){
		request("https://opentdb.com/api_category.php", function(err, resp, body){
			if(err) console.log(err);
			body = JSON.parse(body);
			res.json(body);
		});
	});

//Update team score after every question.
	router.put("/user_game", function(req, res){
		console.log(req.body);
		db.Score.update({
			num_corr: req.body.num_corr,
			total_ques: req.body.total_ques,
			score_val: req.body.score_val
		}, {where: {
			team_ID: req.body.teamID
		}
		}).then(function(result){
			//do something with result
			res.send(result);
		});
	});

  router.post("/register", function(req, res) {
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

module.exports = router;

