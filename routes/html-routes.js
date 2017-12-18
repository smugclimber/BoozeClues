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
    // User Game Page
       router.get("/usergame", function(req, res) {
           res.render("user-game");
       });
    // Bar Game Page
      router.get("/bargame", function(req, res) {
          res.render("bar-game");
      });
    // User Dashboard
       router.get("/user-dashboard", function(req, res) {
           res.render("user-dashboard");
       });
    // Bar Game Page
       router.get("/bar-dashboard", function(req, res) {
         res.render("bar-dashboard");
       });

module.exports = router;
