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
          var id =req.body.gameId;
          // var password2 = req.body.password2;
          // console.log(req)
          // console.log(req.body)

        // Validation

        req.checkBody('id','gameId is required').notEmpty();
        var errors = req.validationErrors();
        if(errors.length > 0){
          console.log('===============there was an error======>')
          res.render('user-game',{
            errors:errors
          })
          // req.flash('success_msg', 'You are registered and can now login')
          
          }
});

  
        // router.post('/user',
        //   // passport.authenticate('local', {successRedirect:'/bargame', failureRedirect:'/user', failureFlash: true}),
        //   function(req, res){
        //     req.flash('success_msg', "Login Successful")
        //     res.redirect('/');
        //   });
      
       
      

module.exports = router;