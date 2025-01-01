$(document).ready(function() {
	$('#deck-treasures').click(function(e) {
		console.log(e);
	});
	$('#fz-room-form').on("submit", function(e) {
		e.preventDefault();
		console.log("helo");
	});
	$('#fz-room-submit').on("click", () => $('#fz-room-form').trigger("submit"));

	const socket = io();
});