var passport = require("../config/passport");

$(document).ready(function() {

  var currentUser = passport.username;

  router.get("/register", function(req, res) {
    res.render("register");
    });
  // Getting references to the name inout and author container, as well as the table body
  var nameInput = $("#author-name");
  var authorList = $("tbody");
  var authorContainer = $(".author-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Author
  //$(document).on("submit", "#author-form", handleAuthorFormSubmit);
  $(document).on("click", ".delete-author", handleDeleteButtonPress);

  // Getting the intiial list of Authors
  getUserStats();

  //User joins game "room"


  // Function for retrieving user stats and getting them ready to be rendered to the page
  function getUserStats(user) {
    userId = user || "";
    if (userId) {
      userId = "/?user_id=" + userId;
    }
    $.get("/api/curruser" + userId, function(data) {
      console.log("Users", data);
      users = data;
      if (!users || !user.length) {
        displayEmpty(user);
      }
      else {
        initializeRows();
      }
    });
  }

  // InitializeRows handles appending all of our constructed post HTML inside blogContainer
  function initializeRows() {
    blogContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    blogContainer.append(postsToAdd);
  }

}); //end of on doc ready
