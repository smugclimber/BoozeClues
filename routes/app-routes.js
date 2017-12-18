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
          var gameId =req.body.gameId;
          // var password2 = req.body.password2;
          // console.log(req)
          // console.log(req.body)

        // Validation

        req.checkBody('name','Name is required').notEmpty();
         req.checkBody('gameId','gameId is required').notEmpty();
        var errors = req.validationErrors();
        if(errors.length > 0){
          console.log('===============there was an error======>')
          res.render('user-game',{
            errors:errors
          })
          // req.flash('success_msg', 'You are registered and can now login')
          }else {
           db.Team.create(req.body).then(function(err,team) {
            if(err) throw err;
             console.log("teamname and id:"+ team);
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