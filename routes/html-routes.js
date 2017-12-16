var express = require('express');
var router = express.Router();

    router.get("/", function(req, res) {
        // console.log("accessed");
        res.render("index");
      });

<<<<<<< HEAD
    //  // Login
    //     router.get("/login", function(req, res) {
    //         res.render("login");
    //     });
    // // Register
    //    router.get("/register", function(req, res) {
    //        res.render("register");
    //    });
=======
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
>>>>>>> a31e93456393667ba126f90228ab7fd3eff43fa7


module.exports = router;
