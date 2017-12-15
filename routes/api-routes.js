var db = require("../models");

  app.post("/api/users", function(req, res) {
    db.Users.create(req.body).then(function(dbUser) {
      console.log("Created a user: "+dbUser)
      res.json(dbUser);
    });
  });

};
