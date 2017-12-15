var request = require("request");

module.exports = function(app){

	//Routes go here

	//API call to get questions
	app.post("/api/qstn", function(req, res){
		aaa.getQs(req, function(data){
			res.json({questions: data});
		});
	});

	function Trivia() {
		this.game = [];

		function getQs(req, cb){
			//Set up base API url to get number of questions per round
			var url = "https://opentdb.com/api.php?amount="+ req.body.qstnsPerRound;
			var catCode;
			var i = 0;
			//For each round, make an API call
			for(; i < req.body.rounds; i++){
				catCode = req.body['r'+ i + 'cat'];
				//If a category code is present, append category to API url
				if(catCode){
					url += "&category="+ catCode;
					request(url, function(err, resp, body){
						if(err) console.log(err);
						body = JSON.parse(body);
						this.game.push(body.results);
					});
				}
				//If not, call without category (will select from all categories)
				else{
					request(url, function(err, resp, body){
						if(err) console.log(err);
						body = JSON.parse(body);
						this.game.push(body.results);
					});
				}
			}
			//After delay, execute callback
			setTimeout(function(){
				cb(this.game)
			},i * 1000);
		}
	}

	var aaa = new Trivia();

//End of export
};