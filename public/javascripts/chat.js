var socket = io();

//-----------------------------------------------------------------------------
// Emit chat message when enter key is pressed.
//-----------------------------------------------------------------------------
$("#chat-input").keydown(function(event) {
      if (event.keyCode == 13) {
          event.preventDefault();
          if ($("#chat-input").val() == "clear") {
		  location.reload();
	  }
          if ($("#chat-input").val() == "/streamdnb") {
		  $("#hidden").html('<audio autoplay><source src="http://st8.webradioworld.net:8000/;" type="audio/mpeg"></audio>');
		  $("#title").text("Streaming Music From Liquid-DNB FM");
	  }
          if ($("#chat-input").val() == "/streamhit") {
		  $("#hidden").html('<audio autoplay><source src="http://ic4ti.scahw.com.au/4rgd_128" type="audio/mpeg"></audio>');
		  $("#title").text("Streaming Music From HitFM");
	  }
          if ($("#chat-input").val() == "/stopstream") {
		  $("#hidden").html('<audio autoplay><source src="" type="audio/mpeg"></audio>');
		  $("#title").text("Not Streaming");
	  }
          if ($("#chat-input").val() == "/streamdef") {
		  $("#hidden").html('<audio autoplay><source src="http://ice1.somafm.com/defcon-64-aac" type="audio/mpeg"></audio>');
		  $("#title").text("Streaming Music From Def-Con Radio");
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
	if (message == "/streamdub") {
		$("#chat-container").append('<style>*{background-image:url("https://media.giphy.com/media/xydT1EcrGr5v2/giphy.gif");}</style>');
		$("#chat-container").append('<audio style="display:none;" id="audio" autoplay><source src="http://stream.dubstep.fm/64mp3" type="audio/mpeg"></audio>');
	  }else if(message == "/litrad"){
		 $("#chat-container").append('<audio style="display:none;" id="audio" autoplay><source src="https://github.com/Littlenate2114/litchatapp/blob/master/litrad.m4a?raw=true" type="audio/mpeg"></audio>');
	  }else if(message == "/meme"){
		$("#chat-container").append('<style>*{background-image:url("https://media.giphy.com/media/gx54W1mSpeYMg/giphy.gif");}</style>');
		 $("#chat-container").append('<audio style="display:none;" id="audio" autoplay><source src="https://github.com/Littlenate2114/litchatapp/blob/master/kazui%20-%20_nyan%20cat_%20Kazui%20%20%20san%20mix%2003%20_Dragon%20Ash_.m4a?raw=true" type="audio/mpeg"></audio>');
	  }else if (message == "/rickroll"){
		$("#chat-container").append("<span style='color:red'>[admin]$ </span>" + message + "<br />")
		 $("#hidden").html('<audio style="display:none;" id="audio" autoplay><source src="https://github.com/Littlenate2114/litchatapp/blob/master/rick.mp3?raw=true" type="audio/mpeg"></audio>');
		 $("#title").text("CRITICAL SECURITY ERROR");
		}else if (message == "/ping"){
		$("#chat-container").append("<span style='color:white'>[Notification]$ </span>" + message + "<br />")
		 $("#hidden").html('<audio style="display:none;" id="audio" autoplay><source src="https://github.com/Littlenate2114/litchatapp/blob/master/litnotification.mp3?raw=true" type="audio/mpeg"></audio>');
		}
	
	else{
    $("#chat-container").append("<span style='color:green'>[user@192.168.1.1 ~]$ </span>" + message + "<br />")
	  }
});
socket.on("stream", function(message) {
    $("#title").append(message)
});
