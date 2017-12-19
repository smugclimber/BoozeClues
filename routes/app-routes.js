// export.isAuthenticated = function(req, res, next){
//   if(req.isAuthenticated()){
//     next();
//   }else{
//     next(new Error(401));
//   }
// }

// exports.destroySession = function(req, res, next) {
//   req.logOut();
//   req.session.destroy()
//   res.redirect("/")
// }
var db = require("../models");
var express = require('express');
var router = express.Router();
    // Register
    router.get("/user", function(req, res) {
      res.render("user");
      });
      // // Login
      // router.get("/login", function(req, res) {
      //   res.render("login");
      //   });
        // Register user
    router.post("/user", function(req, res) {
      var name  =req.body.name;
      var GameId =req.body.GameId;
      // var password2 = req.body.password2;
      // console.log(req)
      // console.log(req.body)

    // Validation

    req.checkBody('name','Name is required').notEmpty();
    req.checkBody('GameId','GameId is required').notEmpty();
    var errors = req.validationErrors();
    if(errors.length > 0){
      console.log('===============there was an error======>')
      res.render('/user-dashboard',{
        errors:errors
      })
      req.flash('error_msg', 'You failed!')
      }else {
       db.Team.create(req.body).then(function(res, err) {
        if(err) throw err;
        console.log("team info: "+ res);
        });
        res.redirect("/usergame");
      }
    });

    router.post("/app/game", function(req, res) {
        var name = req.body.name;
        // Validation
        req.checkBody('name','Name is required').notEmpty();
        req.checkBody('qsPerRound','qsPerRound is required').notEmpty();
        var errors = req.validationErrors();
        if(errors.length > 0){
          console.log('there was an error');
          res.render('bar-dashboard',{
            errors:errors
          });
        }
        else {
           db.Game.create(req.body).then(function(game, err) {
           		if(err) throw err;
             console.log("game id: "+ game.id);
             res.redirect('/bargame/'+game.id);
            });
        }
	});


        // router.post('/user',
        //   // passport.authenticate('local', {successRedirect:'/bargame', failureRedirect:'/user', failureFlash: true}),
        //   function(req, res){
        //     req.flash('success_msg', "Login Successful")
        //     res.redirect('/');
        //   });




module.exports = router;
