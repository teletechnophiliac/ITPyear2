/*

	Setting up the pages

	1 - Page title
	2 - Instructions
	3 - (bool) is this a page with text entry?
	4 - (bool) is this a page where the user has to tap to make a choice?

*/
//TODO: refactor to make a data type 
var pageText = [
	[
		"Prove Yourself", 
		"The pantheon of gods have decided to allow one more hero/heroine to join them in Mt. Olympus as an immortal, and you are one of the final candidates.<br/><br/>You will compete in a trial that lasts 15 minutes to prove to the gods you belong.<br/><br/>Are you ready?",
		"Let's go!",
		false,
		false,
	],
	[
		"Your Name", 
		"Ever hear of the phrase 'set in stone'? Misspellings unfortunately set into marble permanently.<br/><br/>Spell your name so the scribe doesn't mess up carving it into the marble.",
		"What's next?",
		true,
		false,
	],
	[
		"Skills", 
		"Every hero will be tested on three skills:<br/><br/><div class=\"skill-list\">Wisdom</div><br/><div class=\"skill-list\">Strength</div><br/><div class=\"skill-list\">Speed</div><br>Each of your skills is currently set to 1. As you complete more quests, your skills scores will increase. This will help with winning battles - competitors with lower scores will have a tough time defeating you.",
		"Got it",
		false,
		false,
	],
	[
		"Your Guide", 
		"On your final quest you must select one god to help you if you need it.Your guide will give you certain skill advantages and be very helpful for some tasks.<br/><br/>Choose wisely!",
		"Let me pick!",
		false,
		false,
	],
	[
		"Pick Your Guide", 
		"",
		"Choice made",
		false,
		true,
	],
	[
		"Weakness", 
		"Every hero has an Achilles’ heel.For Achilles, it was his heel.<br/><br/>Your weakness could be the difference between getting a quest or being cursed by a god to wait a few minutes before trying again. ",
		"Let me pick!",
		false,
		false,
	],
	[
		"Pick Your Weakness", 
		"",
		"Choice made",
		false,
		true,
	],
	[	
		"Review Your Choices", 
		"Here are your current stats based on your weakness and guide choices. If you want to change something, tap on it to be taken to that page.<br/><br/><h4 style=\"font-family: \'Goudy Trajan\',serif;\">Current Stats</h4><br/><p><strong>Wisdom: </strong><span id=\"wisdom-stat\"></span><br/><strong>Strength:</strong><span id=\"strength-stat\"></span><br/><strong>Speed:</strong><span id=\"speed-stat\"></span><br/><br/><h4 style=\"font-family: \'Goudy Trajan\',serif;\">Guide</h4><br/><img id=\"chosen-guide\" src=\"\/\/:0\"></img><div id=\"chosen-guide-bonus\"></div><br/><h4 style=\"font-family: \'Goudy Trajan\',serif;\">Weakness</h4><br/><img id=\"chosen-weakness\" src=\"\/\/:0\"></img><div id=\"chosen-weakness-bonus\"></div>",
		"Choice made",
		false,
		false,
	],
	[
		"Gameplay", 
		"The object of the game is to win the favor of as many gods as possible within a 15 minute trial. To do this, you must talk to the statue representing the god.<br/><br/>If you convince the god to think about backing you they will give you a <strong>quest</strong>, a series of tasks to complete to win them over. This could be a puzzle, or a challenge to beat your competitors in <strong>battle</strong>.<br/><br/>Your conversation is not guaranteed to go well. Your weakness might get in the way, and you might accidentally insult the god and they may curse you to try again later.<br/><br/>The player who completes the most quests wins the game. Good luck!",
		"Start game",
		false,
		false,
	],
	
];

/*

	Guide choices (Pick Your Guide)

	1 - Name
	2 - Title
	3 - Description
	4 - Skills Bonus
	5 - Image path

*/
//TODO: refactor to make a data type 
var guideChoices =[
	[
		"Hermes",
		"Messenger to the Gods",
		"Hermes’ speed could be the difference between victory and defeat in battle",
		"+3 Speed",
		"../img/hermesheader2x.png",


	],
	[
		"Athena",
		"Goddess of war and wisdom",
		"Athena’s advice will come in handy in battle and puzzle solving",
		"+2 Wisdom, +1 Strength",
		"../img/athenaheader2x.png",

	],
	[
		"Dionysus",
		"God of Wine and Ecstasy",
		"Wreak havoc on competitors with Dionysus’ talent for chaos",
		"+2 Strength, +1 Speed",
		"../img/dionysusheader2x.png",

	]
];

/*

	Weakness choices (Pick Your Weakness)

	1 - Name
	2 - Description
	3 - Skills bonus description
	4 - Image path
	5 - Wisdom skill bonus points
	6 - Strength skill bonus points
	7 - Speed skill bonus points

*/
//TODO: refactor to make a data type 
var weaknessChoices =[
	[
		"Lust",
		"Hit on the right god and you might get lucky. On the other hand…",
		"+1 Speed, -2 Wisdom",
		"../img/lustheader2x.png",
	],
	[
		"Anger",
		"You might say the wrong thing to the wrong god with that quick temper",
		"+1 Strength, -2 Wisdom",
		"../img/angerheader2x.png",

	],
	[
		"Pride",
		"Hopefully your head is a good cushion to land on when you fall",
		"+1 Wisdom, -2 Speed",
		"../img/prideheader2x.png",

	]
];

var pageCount = 0;		//tracks which page of setup user is on

//Player data
//TODO: refactor to make a data type

var name;				//player name
var	guide;				//selected guide
var guideElement;		//DOM element name correlating to selected guide
var weakness; 			//selected weakness
var weaknessElement;	//DOM element name correlating to selected guide
var wisdom = 1;			//player's Wisdom skill (default is 1)
var strength = 1;		//player's Strength skill (default is 1)
var speed = 1;			//player's Speed skill (default is 1)


/*	Functions	*/

/*

	Load function - window load and setup

*/
window.addEventListener("load", function load()
{
	// console.log("window loaded.");
	
	var pageContainer = document.getElementById('page-container');

	if(pageContainer)
	{
		setData();
		document.getElementById("next-button").addEventListener('touchstart',nextPage,false);
		document.getElementById("back-button").addEventListener('touchstart',prevPage,false);
		var arrChoice = document.getElementsByClassName("choice");

		for(var i = 0; i < arrChoice.length; i++)
		{

			document.getElementById(arrChoice[i].id).addEventListener('touchstart',function(){
				choiceMade(this.id,pageText[pageCount][0]);
			},false);

		}
		
	}
	
});

/*

	whichTransitionEvent - setup for callback check - credit to http://davidwalsh.name/css-animation-callback
	Used for transition to main page after tutorial ends

*/
function whichTransitionEvent(element)
{
    var transitions = 
    {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    };

    for(var t in transitions){
        if( element.style[t] !== undefined )
        {
            return transitions[t];
        }
    }
}

/*

	setData - sets page title, text, and next button content

*/
function setData()
{
	console.log('setting data');
	document.getElementById("section-title").innerHTML = pageText[pageCount][0];
	document.getElementById("instructions-text").innerHTML = pageText[pageCount][1];
	document.getElementById("next-button").innerHTML = pageText[pageCount][2];

	//check if text entry
	displayTextEntry(pageText[pageCount][3]);

	//check if choice screen
	displayChoices(pageText[pageCount][4]);
	
	//display stats
	displayStatsSummary();
	
}

/*

	nextPage - move to next page

*/
function nextPage()
{
	//no name entered
	if(pageText[pageCount][3] && document.getElementById('name').value == "")
	{
		alert("Immortality is hard to achieve if no one knows your name, please enter it before moving on");
	}
	//no choice made
	else if (pageText[pageCount][4]) 
	{
		
		if(pageText[pageCount][0] == "Pick Your Guide" && guide == null)
		{
			alert("It'll be difficult to win without help, please pick a guide");
		}
		else if(pageText[pageCount][0] == "Pick Your Weakness" && weakness == null)
		{
			alert("Weakness is a sign of humanity, embrace yours before you can continue");
		}
		else
		{
			//store input if text input available for screen
			if(pageText[pageCount][3])
			{
				name = document.getElementById("name").value;
			}

			pageCount++;
			setData();	
		}

	}
	//last page
	else if((pageCount + 1) >= pageText.length)
	{
		var pageContainer = document.getElementById('page-container');
		pageContainer.style.opacity = 0;

	    var transitionEvent = whichTransitionEvent(pageContainer);

		transitionEvent && pageContainer.addEventListener(transitionEvent, function()
		{
			window.location.href="mainpage.html";
		});

	}
	else
	{
		//store input if text input available for screen
		if(pageText[pageCount][3])
		{
			name = document.getElementById("name").value;
		}

		pageCount++;
		setData();
	}
	
}

/*

	prevPage - move to next page

*/
function prevPage()
{
	//move back to splashpage if on first page of tutorial
	if((pageCount - 1) < 0)
	{
		var pageContainer = document.getElementById('page-container');
		pageContainer.style.opacity = 0;

	    var transitionEvent = whichTransitionEvent(pageContainer);

		transitionEvent && pageContainer.addEventListener(transitionEvent, function()
		{
			window.location.href="splashpage.html";
		});
	}
	else
	{
		//store input if text input available for screen
		if(pageText[pageCount][3])
		{
			name = document.getElementById("name").value;
		}

		pageCount--;
		setData();
	}
}

/*

	displayTextEntry - check to see if text entry is needed on this page

*/
function displayTextEntry(show)
{

	if(show)
	{
		document.getElementById("name").style.display = "block";
		document.getElementById("name").value = name;
	}
	else
	{
		document.getElementById("name").style.display = "none";
	}

}

/*

	displayChoices - check to see if user is given choices in this section of the setup

*/
function displayChoices(show)
{
	
	if(show)
	{
		document.getElementById("instructions-text").style.display = "none";
		document.getElementById("choices-container").style.display = "block";

		setChoices();

		if(pageText[pageCount][0] == "Pick Your Guide" && guideElement!=null)
		{
			document.getElementById(guideElement).classList.add('choice-selected');
		}

		if(pageText[pageCount][0] == "Pick Your Weakness" && weaknessElement!=null)
		{
			document.getElementById(weaknessElement).classList.add('choice-selected');
		}
	}
	else
	{
		document.getElementById("instructions-text").style.display = "block";
		document.getElementById("choices-container").style.display = "none";

		//reset choice selection - handles case where user is going through choices for first time
		var choiceToReset = document.getElementsByClassName('choice-selected');

		if(choiceToReset.length > 0)
		{
			console.log(choiceToReset[0].id);
			document.getElementById(choiceToReset[0].id).classList.remove('choice-selected');
		}

	}	

}

/*

	setChoices - populate choice-container with choices
	
*/
function setChoices()
{
	//check if user is choosing guide or weakness
	if(pageCount == 4)
	{

		setImages(guideChoices[0][4],guideChoices[1][4],guideChoices[2][4]);
		setDescriptions(guideChoices[0][2],guideChoices[1][2],guideChoices[2][2]);
		setSkillBonuses(guideChoices[0][3],guideChoices[1][3],guideChoices[2][3]);

	}
	else
	{
		setImages(weaknessChoices[0][3],weaknessChoices[1][3],weaknessChoices[2][3]);
		setDescriptions(weaknessChoices[0][1],weaknessChoices[1][1],weaknessChoices[2][1]);
		setSkillBonuses(weaknessChoices[0][2],weaknessChoices[1][2],weaknessChoices[2][2]);
	}
}

/*

	setImages - sets header images for each choice
	Parameters: image paths from array (guideChoices for guide selection, weaknessChoices for weakness selection)

*/
function setImages(first,second,third)
{
	document.getElementById("c1-image").src = first;
	document.getElementById("c2-image").src = second;
	document.getElementById("c3-image").src = third;
}

/*

	setDescriptions - sets desriptions for each choice
	Parameters: image paths from array (guideChoices for guide selection, weaknessChoices for weakness selection)

*/
function setDescriptions(first,second,third)
{
	document.getElementById("c1-description").innerHTML = first;
	document.getElementById("c2-description").innerHTML = second;
	document.getElementById("c3-description").innerHTML = third;
}

/*

	setSkillBonuses - sets header images for each choice
	Parameters: image paths from array (guideChoices for guide selection, weaknessChoices for weakness selection)

*/
function setSkillBonuses(first,second,third)
{
	document.getElementById("c1-bonus").innerHTML = "<strong>Skills: </strong>" + first;
	document.getElementById("c2-bonus").innerHTML = "<strong>Skills: </strong>" + second;
	document.getElementById("c3-bonus").innerHTML = "<strong>Skills: </strong>" + third;
}

/*

	choiceMade - event handler for when user makes a choice
	Parameters - HTML element that was tapped on, page user is currently making choice on

*/
function choiceMade(element,page)
{
	//set guide
	if(page == "Pick Your Guide")
	{

		if(guideElement!= null && guideElement != element)
		{
			//fix skill bonuses
			//TODO: dynamically populate skills rather than hardcoding

			switch (guide)
			{
				case "Athena":
					wisdom -= 2;
					strength -= 1;
					break;
				case "Hermes":
					speed -= 3;
					break;
				case "Dionysus":
					strength -=2;
					speed -=1;
			}

			document.getElementById(guideElement).classList.remove('choice-selected');
		}

		guideElement = element;
		document.getElementById(element).classList.add('choice-selected');

		//TODO: dynamically populate skills rather than hardcoding
		switch(element)
		{
			case "choice1":
				guide = "Hermes";
				speed += 3;
				break;
			case "choice2":
				guide = "Athena";
				strength++;
				wisdom += 2;
				break;
			case "choice3":
				guide = "Dionysus";
				strength += 2;
				speed++;
		}

		console.log(guideElement + " " + guide)
	}

	if(page == "Pick Your Weakness")
	{
		if(weaknessElement!= null && weaknessElement != element)
		{
			//fix skill bonuses
			//TODO: dynamically populate skills rather than hardcoding
			switch(weakness)
			{
				case "Lust":
					wisdom += 2;
					speed--;
					break;
				case "Anger":
					strength--;
					wisdom += 2;
					break;
				case "Pride":
					wisdom--;
					speed +=2;
			}

			document.getElementById(weaknessElement).classList.remove('choice-selected');
		}

		weaknessElement = element;
		document.getElementById(element).classList.add('choice-selected');

		//TODO: dynamically populate skills rather than hardcoding
		switch(element)
		{
			case "choice1":
				weakness = "Lust";
				wisdom -=2;
				speed++;
				break;
			case "choice2":
				weakness = "Anger";
				strength++;
				wisdom -= 2;
				break;
			case "choice3":
				weakness = "Pride";
				wisdom++;
				speed-=2;
		}
	}
}

/*

	displayStatsSummary - show stats values for review

*/
function displayStatsSummary()
{
	if(pageText[pageCount][0] == "Review Your Choices")
	{

		if(strength < 0)
		{
			document.getElementById("strength-stat").classList.add("negative");
		}
		if(wisdom < 0)
		{
			document.getElementById("wisdom-stat").classList.add("negative");
		}
		if(speed < 0)
		{
			document.getElementById("speed-stat").classList.add("negative");
		}

		document.getElementById("strength-stat").innerHTML = strength;
		document.getElementById("speed-stat").innerHTML = speed;
		document.getElementById("wisdom-stat").innerHTML = wisdom;

		showChosenGuide();
		showChosenWeakness();

		document.getElementById('chosen-guide').addEventListener('touchstart',function(){changeChoice("guide")},false);
		document.getElementById('chosen-weakness').addEventListener('touchstart',function(){changeChoice("weakness")},false);
	}
}

/*

	showChosenGuide - show guide for review

*/
function showChosenGuide()
{

	switch (guide)
	{
		case "Athena":
			document.getElementById('chosen-guide').src="../img/athenaheader2x.png";
			document.getElementById('chosen-guide-bonus').innerHTML = "<strong>Skills: </strong>" + guideChoices[1][3];
			break;
		case "Hermes":
			document.getElementById('chosen-guide').src="../img/hermesheader2x.png";
			document.getElementById('chosen-guide-bonus').innerHTML = "<strong>Skills: </strong>" + guideChoices[0][3];
			break;
		case "Dionysus":
			document.getElementById('chosen-guide').src="../img/dionysusheader2x.png";
			document.getElementById('chosen-guide-bonus').innerHTML = "<strong>Skills: </strong>" + guideChoices[2][3];
			break;
	}

}

/*

	showChosenWeakness - show weakness for review

*/
function showChosenWeakness()
{

	switch (weakness)
	{
		case "Lust":
			document.getElementById('chosen-weakness').src="../img/lustheader2x.png";
			document.getElementById('chosen-weakness-bonus').innerHTML = "<strong>Skills: </strong>" + weaknessChoices[0][2];
			break;
		case "Anger":
			document.getElementById('chosen-weakness').src="../img/angerheader2x.png";
			document.getElementById('chosen-weakness-bonus').innerHTML = "<strong>Skills: </strong>" + weaknessChoices[1][2];
			break;
		case "Pride":
			document.getElementById('chosen-weakness').src="../img/prideheader2x.png";
			document.getElementById('chosen-weakness-bonus').innerHTML = "<strong>Skills: </strong>" + weaknessChoices[2][2];
			break;
	}

}

/*

	changeChoice - change page so user can change choice
	Parameter: choice that user is changing

*/
//TODO: don't default to changing weakness
function changeChoice(choiceToChange)
{
	if(choiceToChange == "guide")
	{
		pageCount = 4;
		setData();
	}
	else
	{
		pageCount = 6;
		setData();
	}
}