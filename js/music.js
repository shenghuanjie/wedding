// index.js
let audioPlaying = true,
    backgroundAudio, browser;
browser = navigator.userAgent.toLowerCase();
$('<audio class="audio1" src="musics/background.mp3" loop></audio>').prependTo('body');
if (!browser.indexOf('firefox') > -1) {
    $('<embed id="background-audio" src="musics/background.mp3" autostart="1"></embed>').prependTo('body');
    console.log("background-audio added");
    $("#background-audio").remove();
    $('<embed id="background-audio" src="musics/background.mp3"></embed>').prependTo('body');
    // backgroundAudio = setInterval(function() {
    //     $("#background-audio").remove();
    //     $('<embed id="background-audio" src="musics/background.mp3"></embed>').prependTo('body');
    // }, 1); // 120000 is the duration of your audio which in this case 2 mins.
}
