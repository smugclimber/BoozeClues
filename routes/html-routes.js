var express = require('express');
var router = express.Router();
    // Use Handlebars to render the main index.html page with the movies in it.
    router.get("/", function(req, res) {
        console.log("accessed");
        res.render("index");
      });

     // Login
        router.get("/login", function(req, res) {
            res.render("login");
        });
    // Login
       router.get("/register", function(req, res) {
           res.render("register");
       });


module.exports = router;
