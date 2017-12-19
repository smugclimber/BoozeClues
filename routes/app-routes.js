
var db = require("../models");
var express = require('express');
var router = express.Router();
    // Register
    router.get("/user", function(req, res) {
      res.render("user");
      });

    router.post("/user", function(req, res) {
      var GameId =req.body.GameId;

    req.checkBody('GameId','GameId is required').notEmpty();

    var errors = req.validationErrors();
    if(errors.length > 0){
      console.log('===============there was an error======>')
      res.render('user-game',{
        errors:errors
      })

      }else {

        router.put("/usergame", function(req, res) {
          db.User.update(
            req.body,
            {
              where: {
                GameId: req.body.GameId
              }
            }).then(function(dbPost) {
              res.redirect("/usergame"+GameId);
            });
        });
      }
});

    //    db.Game.add(req.body).then(function(team) {
    //     if(!team) throw "error";
    //        db.User.findById(req.body.userId).then(function(user){
    //         user.setTeams([team]).then(function(){
    //             res.redirect("/usergame/"+GameId);
    //         });
    //       })
    //
    //     });
    //   }
    // });

    // router.post("/game", function(req, res) {
    //      var name = req.body.name;
    //      // Validation
    //      req.checkBody('name','Name is required').notEmpty();
    //      var errors = req.validationErrors();
    //      if(errors.length > 0){
    //        console.log('there was an error');
    //        res.render('bar-dashboard',{
    //          errors:errors
    //        });
    //      }
    //      else {
    //         db.Game.create(req.body).then(function(game, err) {
    //         		if(err) throw err;
    //           console.log("game id: "+ game.id);
    //           res.json(game);
    //          });
    //      }

module.exports = router;
