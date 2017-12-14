<<<<<<< HEAD
=======


module.exports = function(app){
>>>>>>> Added onClick triggered countdown broadcast by socket.io

var express = require('express');
var router = express.Router();
    // Use Handlebars to render the main index.html page with the movies in it.
    router.get("/", function(req, res) {
        console.log("accessed");
        res.render("index");
      });


module.exports = router;

