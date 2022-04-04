var vAudio = document.getElementById("background_music");
var hasInit = false;
function playMusic()
{
if(!hasInit)
{
  hasInit = true;
  vAudio.play();
}
}
