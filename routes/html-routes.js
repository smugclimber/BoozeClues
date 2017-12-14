

module.exports = function(app){

	//Routes go here

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});


};