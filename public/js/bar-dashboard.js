$(document).ready(function() {

	var socket = io();

	$.get("api/cats").done(function(response){
		var newOpt;
		newOpt = $("<option></option>");
		newOpt.attr("value", "0");
		newOpt.text("Random");
		newOpt.appendTo($(".round"));
		$.each(response.trivia_categories, function (i, item) {
    		$('.round').append($('<option>', { 
        		value: item.id,
        		text : item.name 
   			 }));
		});
		$('select').material_select();
	});

	$("#newGame").on("click", function(){
		//preventDefault();
		var gameData = {
			name: $("#game_name").val(),
			rounds: 3,
			qsPerRound: $("#qsPerRound").val(),
			r0cat: $("#round1").val(),
			r1cat: $("#round2").val(),
			r2cat: $("#round3").val()
		};
		localStorage["gameData"] = JSON.stringify(gameData);
		console.log(gameData);
		$.post("/game", gameData, function(response){
			document.location.href = '/bargame/'+response.id;
		});
	});

});
