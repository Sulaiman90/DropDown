//heymathLessons.bgSound=[""];
heymathLessons.fbSound =["good"];
var bgInstance;
var stageBg, bgCanvas;

var ratioScale = heymathLessons.ratioScale;

heymathLessons.init = function() {
	heymathLessons.library = lib.vl438_dd7;
	lib.properties.manifest= addSoundTrack();
}


heymathLessons.eventHandlers = function()
{
  	initialSetUp(stageMain);
	document.addEventListener("audiocomplete",onAudioLoadComplete);
}

function onAudioLoadComplete()
{
	console.log("onAudioLoadComplete ");
	playSound("intro");
}


function addSoundTrack()
{
	var soundArray = [	
		{src:"sounds/_01dd2_vl438s.mp3?1487754448618", id:"intro"},
		{src:"sounds/_02dd2_vl438s.mp3?1487754448618", id:"good"}
	]
	var newArray = lib.properties.manifest.concat(soundArray);
	return newArray;
}

