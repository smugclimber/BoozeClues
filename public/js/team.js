$(document).ready(function() {
  var teamForm = $("form.taem");
  var nameInput = $("input#name-input");
  var GameIdInput = $("input#GameId-input");

  teamForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      name: nameInput.val().trim(),
      GameId: GameIdInput.val().trim()
    };

    if (!userData.name || !userData.GameId) {
      return;
    }
    joinTeam(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  function signUpUser(email, password) {
    $.post("/api/register", {
      email: email,
      password: password
    }).then(function(data) {
      window.location.replace(data);
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
