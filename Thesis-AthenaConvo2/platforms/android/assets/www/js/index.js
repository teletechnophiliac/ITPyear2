var dialog = [
	//0
	[
		"You're back. Word has it that you spoke to Hercules",
		["How'd you know that?", 1],
		["He's... louder in person", 3]

	],
	//1
	[
		"I'm a goddess, I have my ways...",
		["Do all you gods always talk around things?", 7],
		["He yelled across the gallery, didn't he?", 2]
	],
	//2
	[
		"He did! You know him well now. Not the brightest of men, but he is quite talented in other ways. You should have seen him wrestle Cerberos, even I had my doubts. Three heads...",
		["Um...",4],
		["Hey, I'm on a deadline here!",4]
	],
	//3
	[
		"Hah! He is, isn’t he? He’s always been impossible to miss even, when he was a kid. You should have seen people’s faces when he had the snake...",
		["Um...",4],
		["Hey, I'm on a deadline here!",4]
	],
	//4
	[
		"Right then, let’s talk about you. You’ve proven you can handle yourself, but you didn’t think I’d agree to back you just because Hercules spoke up for you?",
		["I'd hoped you would...",5],
		["So now what do you want from me?",6]
	],
	//5
	[
		"Don’t give up hope yet, it’s just a few questions. If you don’t get them right the first time around, you can always try again. Hints can be found around the gallery and in my description below. Are you ready?",
		["As I'll ever be, I guess",8],
		["Let's get this over with",8]
	],
	//6
	[
		"Just a few more questions and I’ll be done.  If you don’t get them right the first time around, you can always try again. Hints can be found around the gallery and in my description below. Are you ready?",
		["As I'll ever be",8],
		["Let's just get this over with",8]
	],
	//7
	[
		"Still haven’t learned any manners? I’m not sure I think you’re worthy just yet, come back when you’re wise enough to show me some respect.<br/><br/><i>You've been cursed! Wait <strong>2 minutes</strong> before talking to Athena again.</i>"
	],
	//8
	[
		"Here is your first question.<br/><br/>Hard like stone, but bends to fire<br/>It can be made to hurt man, but it used to protect me too.<br/><br/>What is it?",
		["bronze",null]
	],
	//9
	[
		"Good! One more?<br/><br/>A story on earth, shaped around a liquid center within.<br/><br/>What is it?",
		["vase","a vase"]
	],
	//10
	[
		"Last one.</br><br/>A face so warm, but cold to the touch<br/>Soft fabric made solid<br/>It never takes a breath, but lives forever,<br/><br/>What is it?",
		["statue", "a statue"]
	],
	//11
	[
		"Well done! You’ve shown me your capacity for wisdom. I will support your bid to become immortal, come back and see me if you need my help.<br/><br/><strong>Congratulations! You've completed Athena's quest!</strong><br/>You gain: +2 Wisdom."
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
		document.getElementById('enter').addEventListener('touchstart',this.validateAnswer,false);
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
		
		var timer = setTimeout(function(){
			document.getElementById('name-header').style.display="block";
			document.getElementById('talk-button').style.display="block";
		}, 5000);
		
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
		else if(currDialog == 7)
		{	
			document.getElementById('athena-dialog').innerHTML = dialog[currDialog][0];
			document.getElementById('option-1').style.display="none";
			document.getElementById('option-2').style.display="none";
		}
		else
		{
			document.getElementById('athena-dialog').innerHTML = dialog[currDialog][0];
			document.getElementById('option-1').style.display="none";
			document.getElementById('option-2').style.display="none";
			document.getElementById('riddle-entry').style.display="inline-block";
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
		else if(currDialog == 7)
		{
			document.getElementById('athena-dialog').innerHTML = dialog[currDialog][0];
			document.getElementById('option-1').style.display="none";
			document.getElementById('option-2').style.display="none";	
		}
		else
		{
			document.getElementById('athena-dialog').innerHTML = dialog[currDialog][0];
			document.getElementById('option-1').style.display="none";
			document.getElementById('option-2').style.display="none";
			document.getElementById('riddle-entry').style.display="inline-block";
		}

	},
	validateAnswer: function(){
		var answer = document.getElementById("answer").value.toLowerCase();
		
		if(answer === "" || answer === null)
		{
			alert("Nothing is the answer to many riddles, but not this one. Try again.");
		}
		else if(answer !== dialog[currDialog][1][0] && answer !== dialog[currDialog][1][1])
		{
			alert("Hmmm, that's not right. Remember, you can look around for clues to help you.");
		}
		else if(currDialog + 1 === 11)
		{
			currDialog++;
			document.getElementById('athena-dialog').innerHTML = dialog[currDialog][0];
			document.getElementById('riddle-entry').style.display="none";
		}
		else
		{
			currDialog++;
			document.getElementById('athena-dialog').innerHTML = dialog[currDialog][0];
			document.getElementById("answer").value = null;
		}
		
	},
	// deviceready Event Handler   
	onDeviceReady: function() {	

	}
};

app.initialize();