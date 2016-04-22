var dialog = [
	//0
	[
		"<strong>Another one? How many times do I have to say no to you whiny little punk \“heroes\" for you to leave me alone?!</strong>",
		["Whoa, calm down", 1],
		["Athena sent me, why are you yelling?", 2]

	],
	//1
	[
		"<strong>Calm down?! I’m calm, I’ll show you calm!</strong>",
		["You are way out of line, back off!", 3],
		["You're so loud that Athena can hear you across the gallery, that's not calm.", 2]
	],
	//2
	[
		"<strong>Athena-</strong> sorry, Athena sent you? You should have said so sooner! How is she? I haven’t seen her since she got me out of the Underworld.",
		["She sent me to you to prove I'm worthy of immortality",4],
		["She was wondering why you were yelling. Everything okay?",6]
	],
	//3
	[
		"<strong>You think that’s angry? HAH! Kid, I wrestled Cerberos, your bark is like a puppy whimper. Hero material? You’re a chew toy!</strong>",
		["You... wrestled a dog?",11],
		["Try me on for size then, old man!",7]
	],
	//4
	[
		"Hmph, she’s got too much faith sometimes. She’s smart though, so she has to have a reason for sending you.",
		["Maybe she thought I could help?",5],
		["She wanted your opinion of me.",9]
	],
	//5
	[
		"Help me? The only thing I need help with is these whining heroes! My half brother is less annoying, and he tried to kill me!",
		["What if I got rid of them for you?",7],
		["No wonder your brother wanted to kill you...",9]
	],
	//6
	[
		"I’m… mostly in control. I haven’t hurt anyone, just tired of being bugged by all these ambitious heroes. Athena's smart though, so why would she send you to me?",
		["Maybe she thought I could help?",3],
		["She wanted your opinion of me.",4]
	],
	//7
	[
		"<strong>Bahahahaha! I like you kid, you’re smart! Get your annoying competitors to leave me alone and I’ll tell Athena I’m sold. Deal? Now scram!</strong><br/><br/><strong>New Quest!</strong> Win 5 battles against other players.",
	],
	//8
	[
		"Well you’ve just been wasting my time so far, <strong>so beat it! Come back only when you can solve my wannabe hero problem, not add to it!</strong><br/><br/><i>You've been cursed! Wait <strong>3 minutes</strong> before talking to Hercules again.</i>"
	],
	//9
	[
		"<strong>Don’t like it? Tough, kid! I don’t need you, you need me and right now, I want you out of my face! Not so smart huh?! SCRAM!</strong><br/><br/><i>You've been cursed! Wait <strong>3 minutes</strong> before talking to Hercules again.</i>"
	],
	//10
	[
		"<strong>Bahahahaha! I like you kid, you’re madder than me! Tell you what, go solve both our problems! Work out your anger issues on these annoying heroes and get them to leave me alone. If you do, I’ll tell Athena I’m sold. Deal? Now scram!</strong><br/><br/><strong>New Quest!</strong> Win 5 battles against other players."
	],
	//11
	[
		"Yes, and I’d do it again if it meant you all left me alone. Beat it kid! Come back only when you can solve my wannabe hero problem, not add to it!<strong></strong><br/><br/><i>You've been cursed! Wait <strong>3 minutes</strong> before talking to Hercules again.</i>"
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

		if(currDialog < 7)
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

		if(currDialog < 7)
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