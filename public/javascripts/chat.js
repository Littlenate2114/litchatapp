// This example uses MediaRecorder to record from a live audio stream,
// and uses the resulting blob as a source for an audio element.
//
// The relevant functions in use are:
//
// navigator.mediaDevices.getUserMedia -> to get audio stream from microphone
// MediaRecorder (constructor) -> create MediaRecorder instance for a stream
// MediaRecorder.ondataavailable -> event to listen to when the recording is ready
// MediaRecorder.start -> start recording
// MediaRecorder.stop -> stop recording (this will generate a blob of data)
// URL.createObjectURL -> to create a URL from a blob, which we can use as audio src
var recordButton, stopButton, recorder;
recordButton = document.getElementById('record');
  stopButton = document.getElementById('stop');
$('#record').hide();


function startRecording() {
  recordButton.disabled = true;
  stopButton.disabled = false;

  recorder.start();
}

function stopRecording() {
  recordButton.disabled = false;
  stopButton.disabled = true;

  // Stopping the recorder will eventually trigger the `dataavailable` event and we can complete the recording process
  recorder.stop();
}

function onRecordingReady(e) {
  var audio = document.getElementById('audio');
  // e.data contains a blob representing the recording
  audio.src = URL.createObjectURL(e.data);
  audio.play();
}
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
		$("#chat-container").append('<audio style="display:none;" id="audio" autoplay><source src="http://stream.dubstep.fm/64mp3" type="audio/mpeg"></audio>');
	  }
	else if(message == "/rec") {
		$('#record').show();


window.onload = function () {

  // get audio stream from user's mic
  navigator.mediaDevices.getUserMedia({
    audio: true
  })
  .then(function (stream) {
    recordButton.disabled = false;
    recordButton.addEventListener('click', startRecording);
    stopButton.addEventListener('click', stopRecording);
    recorder = new MediaRecorder(stream);

    // listen to dataavailable, which gets triggered whenever we have
    // an audio blob available
    recorder.addEventListener('dataavailable', onRecordingReady);
  });
};
	}else{
    $("#chat-container").append("<span style='color:green'>[admin@192.168.1.1 ~]$ </span>" + message + "<br />")
	  }
});
socket.on("stream", function(message) {
    $("#title").append(message)
});
