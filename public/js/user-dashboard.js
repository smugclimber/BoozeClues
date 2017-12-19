var passport = require("../config/passport");

$(document).ready(function() {

  router.get("/all", function(req, res) {
    res.json("userid");
    });

  router.get("/register", function(req, res) {
    res.render("register");
    });

  getUserStats();

  // Function for retrieving user stats and getting them ready to be rendered to the page
  function getUserStats(user) {
    userId = user || "";
    if (userId) {
      userId = "/?user_id=" + userId;
    }
    $.get("/all" + userId, function(data) {
      console.log("Users", data);
      users = data;
      if (!users || !users.length) {
        //do something
      }else {
        //do something
      }
    });
  }



}); //end of on doc ready
