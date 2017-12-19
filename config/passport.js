var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

passport.use(new LocalStrategy(
  {
    usernameField: "username",
    passReqToCallback : true
  },
  function(req, username, password, done) {
    console.log(password)
    db.User.findOne({
      where: {
        username: username
      }
    }).then(function(dbUser) {
      if (!dbUser) {
        return done(null, false, req.flash("success_msg", "Username invalid"));
      }
     
      if (dbUser && dbUser.validPassword(password)) {
        console.log("logging in")
        console.log(dbUser.validPassword(password))
        return done(null, dbUser, req.flash("success_msg", "login successful"));
      }
      return done(null, false, req.flash("success_msg", "Password Invalid"));
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;
