var path = require("path");

module.exports = function(app){

	//Routes go here

app.get('/socketTest', function (req, res) {
  res.sendfile(path.join(__dirname + './../public/socketTest.html'));
});


};