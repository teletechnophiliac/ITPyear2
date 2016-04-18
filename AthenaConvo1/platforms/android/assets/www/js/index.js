var dialog = [
	//0
	[
		"Ah, someone to speak to. Another candidate in pursuit of glory?",
		["Who are you?", 1],
		["I need your help", 2]

	],
	//1
	[
		"I am Athena, daughter of Zeus. It's a pleasure to meet you",
		["Great, now tell me what your quest is", 3],
		["Do you have any advice for me?", 4]
	],
	//2
	[
		"So you know who I am then?",
		["Uh... you're Athena...?",6],
		["You help heroes",7]
	],
	//3
	[
		"Temper, temper. You remind me of Hercules, he was always easy to rile up. I can hear him yelling across the gallery right now",
		["Stop stalling, I don't have time for this!",8],
		["But you helped him, right?",7]
	],
	//4
	[
		"Hermes has been guiding you well. My advice to you is to finish as much of a quest you can, then check the gallery for clues. It's up to you to show me you're worthy.",
		["Seriously? That's all you've got for me?",5],
		["So what is your quest?",9]
	],
	//5
	[
		"Perseus and Hercules had even less to work with, and I'd say my quest for you is way easier than theirs.",
		["Stop stalling, I don't have time for this!",8],
		["But you helped them, right?",7]
	],
	//6
	[
		"Well… at least you can read, Hercules wasn't particularly bright. He had other redeeming qualities though.",
		["Great, now tell me what your quest is",3],
		["Do you have any advice for me?",4]
	],
	//7
	[
		"Yes I’ve helped quite a few heroes like Perseus and Hercules. I hope you won't repeat their mistakes.",
		["Great, now tell me what your quest is",3],
		["Do you have any advice for me?",4]
	],
	//8
	[
		"I'm uninterested in helping another hero with temper problems, Hercules was enough for me. Speak to me again when you’ve gotten control of yourself.<br/><br/><i>You've been cursed! Wait <strong>2 minutes</strong>before talking to Athena again.</i>"
	],
	//9
	[
		"I'm not convinced yet, but I also can't hear myself think over Hercules yelling. If you can calm him down, come back and see me.<br/><br/><strong>New Quest!</strong> Go see Hercules."
	]
];

var currDialog = 0;

var app = {
	// Application Constructor
	initialize: function() {
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function() {
		document.getElementById('startCameraButton').addEventListener('mousedown', this.onStartCamera, false);
		document.getElementById('startCameraButton').addEventListener('touchstart', this.onStartCamera, false);
		document.getElementById('talk-button').addEventListener('touchstart',this.startDialog,false);
		document.getElementById('option-1').addEventListener('touchstart',this.option1selected,false);
		document.getElementById('option-2').addEventListener('touchstart',this.option2selected,false);
		window.addEventListener('orientationchange', this.onStopCamera, false);
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	onStartCamera: function() {
		var tapEnabled = false;
		var dragEnabled = false;
        var toBack = true;
		cordova.plugins.camerapreview.startCamera({x: 0, y: 0, width: document.documentElement.clientWidth, height:document.documentElement.clientHeight}, "back", tapEnabled, dragEnabled, toBack);
		// alert("camera on");
		document.getElementById('start-button').style.display="none";
		document.getElementById('name-header').style.display="block";
		document.getElementById('talk-button').style.display="block";
	},
	startDialog: function(){
		// alert('starting dialog');
		document.getElementById('talk-button').style.display="none";
		document.getElementById('athena-dialog').style.display="block";
		document.getElementById('option-1').style.display="block";
		document.getElementById('option-2').style.display="block";

		document.getElementById('athena-dialog').innerHTML = dialog[currDialog][0];
		document.getElementById('option-1').innerHTML = dialog[currDialog][1][0];
		document.getElementById('option-2').innerHTML = dialog[currDialog][2][0];
	},
	option1selected: function(){

		currDialog = dialog[currDialog][1][1];

		if(currDialog < 8)
		{
			document.getElementById('athena-dialog').innerHTML = dialog[currDialog][0];
			document.getElementById('option-1').innerHTML = dialog[currDialog][1][0];
			document.getElementById('option-2').innerHTML = dialog[currDialog][2][0];
		}
		else
		{	
			document.getElementById('athena-dialog').innerHTML = dialog[currDialog][0];
			document.getElementById('option-1').style.display="none";
			document.getElementById('option-2').style.display="none";
		}
		
	},
	option2selected: function(){
		// alert('starting dialog');
		currDialog = dialog[currDialog][2][1];

		if(currDialog < 8)
		{
			document.getElementById('athena-dialog').innerHTML = dialog[currDialog][0];
			document.getElementById('option-1').innerHTML = dialog[currDialog][1][0];
			document.getElementById('option-2').innerHTML = dialog[currDialog][2][0];
		}
		else
		{
			document.getElementById('athena-dialog').innerHTML = dialog[currDialog][0];
			document.getElementById('option-1').style.display="none";
			document.getElementById('option-2').style.display="none";	
		}

	},
	// deviceready Event Handler   
	onDeviceReady: function() {	

	}
};

app.initialize();