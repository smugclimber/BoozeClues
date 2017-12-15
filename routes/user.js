var express = require('express');
var router = express.Router();
    // Register
    router.get("/register", function(req, res) {
      res.render("register");
      });
      // Login
      router.get("/login", function(req, res) {
        res.render("login");
        });
        // Register user
        router.post("/register", function(req, res) {
          console.log('IN HERE IN HERE IN HERE IN HERE')
          var name =req.body.name;
          var email =req.body.email;
          var username =req.body.password;
          var password2 = req.body.password2;
          console.log(req)
          console.log(req.body)
        // Validation
        req.checkBody('name','Name is required').notEmpty();
        var errors = req.validationErrors();
        if(errors){
          console.log('YES');
        }else {
          console.log('NO');
        }
          });

module.exports = router;
