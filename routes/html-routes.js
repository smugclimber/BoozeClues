
var express = require('express');
var router = express.Router();
    // Use Handlebars to render the main index.html page with the movies in it.
    router.get("/", function(req, res) {
        console.log("accessed");
        res.render("index");
      });


module.exports = router;

