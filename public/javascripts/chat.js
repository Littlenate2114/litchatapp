var socket = io();

//-----------------------------------------------------------------------------
// Emit chat message when enter key is pressed.
//-----------------------------------------------------------------------------
$("#chat-input").keydown(function(event) {
      if (event.keyCode == 13) {
          event.preventDefault();
          if ($("#chat-input").val() == "") {
		  location.reload();
	  }
          if ($("#chat-input").val() == "/streamdub") {
		  $("#hidden").html('<audio autoplay><source src="http://stream.dubstep.fm/64mp3" type="audio/mpeg"></audio>');
		  $("#title").text("Streaming Music From Dubstep FM");

	  }
          if ($("#chat-input").val() == "/streamdnb") {
		  $("#hidden").html('<audio autoplay><source src="http://st8.webradioworld.net:8000/;" type="audio/mpeg"></audio>');
		  $("#title").text("Streaming Music From Liquid-DNB FM");
	  }
          if ($("#chat-input").val() == "/streamphy") {
		  $("#hidden").html('<audio autoplay><source src="http://psyprog.rupsy.ru:8000/psyprog" type="audio/mpeg"></audio>');
		  $("#title").text("Streaming Music From Psychedelic FM");
	  }
          if ($("#chat-input").val() != "") {
              socket.emit("chat-message", $("#chat-input").val());
              $("#chat-input").val("");
          }
      }
});

//-----------------------------------------------------------------------------
// Receive chat message from server.
//-----------------------------------------------------------------------------
socket.on("chat-message", function(message) {
    $("#chat-container").append(message + "<br />")
});
