
var db = require("../models");
var request = require("request");

module.exports = function(app){

  app.post("/api/users", function(req, res) {
    db.Users.create(req.body).then(function(dbUser) {
      console.log("Created a user: "+dbUser)
      res.json(dbUser);
    });
  });

	//API call to get questions
	app.post("/api/qstn", function(req, res){
		// console.log(req.body);
		getQs(req, function(data){
			res.json({questions: data});
		});
	});

	function getQs(req, cb){
		var url = "https://opentdb.com/api.php?amount="+ req.body.qspr;
		var game = [];
		var roundCat;
		var i = 0
		for(; i < req.body.rs; i++){
			// console.log(Date.now(), i)
			roundCat = req.body['r'+ i + 'cat'];
			if(roundCat){
				url += "&category="+roundCat
				request(url, function(err, resp, body){
					if(err) console.log(err);
					body = JSON.parse(body);
					game.push(body.results);
					// console.log(game);
					// console.log("-----")
				});
					// console.log("========")

			}
			else{
				request(url, function(err, resp, body){
					body = JSON.parse(body);
					game.concat(body.results);
				});
			}
		}
		setTimeout(function(){
			cb(game)
		},i * 1000)
	}
};

