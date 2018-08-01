document.addEventListener('DOMContentLoaded', function () {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.'); 
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

function notifyMe() {
	console.log('notice me');
  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification('New Notification From Admin', {
      icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
      body: "msg",
    });

    notification.onclick = function () {
      window.open("index.html");      
    };

  }

}
var socket = io();

//-----------------------------------------------------------------------------
// Emit chat message when enter key is pressed.
//-----------------------------------------------------------------------------
$("#chat-input").keydown(function(event) {
      if (event.keyCode == 13) {
          event.preventDefault();
          if ($("#chat-input").val() == "reboot") {
		  location.reload();
	  }
          if ($("#chat-input").val() == "/streamdub") {
		  $("#hidden").html('<audio autoplay><source src="http://stream.dubstep.fm/64mp3" type="audio/mpeg"></audio>');

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
		notifyMe();
    $("#chat-container").append("<span style='color:green'>[admin@192.168.1.1 ~]$ </span>" + message + "<br />")
});
socket.on("stream", function(message) {
    $("#title").append(message)
});
