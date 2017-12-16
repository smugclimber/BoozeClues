var db = require("../models");
var passport = require("../config/passport");

var express = require('express');
var router = express.Router();
    // Register
    router.get("/register", function(req, res) {
      res.render("register");
      });
      // // Login
      // router.get("/login", function(req, res) {
      //   res.render("login");
      //   });
        // Register user
        router.post("/register", function(req, res) {

          console.log(req.body)
          db.User.create({
              name: req.body.name,
              username: req.body.username,
              email: req.body.email,
              password: req.body.password
              // password2 : req.body.password2
            }).then(function() {
              // res.redirect("/login");
            }).catch(function(err) {
              console.log(err);
              res.json(err);
            });
          var name =req.body.name;
          var email =req.body.email;
          var username =req.body.password;
          // var password2 = req.body.password2;
          // console.log(req)
          // console.log(req.body)

        // Validation

        req.checkBody('name','Name is required').notEmpty();
        req.checkBody('email','Email is required').notEmpty();
        req.checkBody('email','Email is not valid').isEmail();
        req.checkBody('username','Username is required').notEmpty();
        req.checkBody('password','password is required').notEmpty();
        // req.checkBody('password2','paswords do not match').equals(req.body.password);

        var errors = req.validationErrors();
        if(errors){
          res.render('register',{
            errors:errors
          })
        }else {
          console.log('PASSED');
        }
          });

module.exports = router;
