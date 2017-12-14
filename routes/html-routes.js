
var express = require('express');
var router = express.Router();


    router.get("/", function(req, res) {
        // console.log("accessed");
        res.render("index");
      });
     // Login
        router.get("/login", function(req, res) {
            res.render("login");
        });
    // User Dashboard
       router.get("/register", function(req, res) {
           res.render("register");
       });
    // User Dashboard
       router.get("/user", function(req, res) {
           res.render("user");
       });

       router.get('/socketTest', function (req, res) {
        res.render('socketTest');
      });

module.exports = router;

