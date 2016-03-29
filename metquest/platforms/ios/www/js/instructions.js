/*

	Setting up the pages

	1 - Page title
	2 - Instructions
	3 - (bool) is this a page with text entry?
	4 - (bool) is this a page where the user has to tap to make a choice?

*/

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
		"Many gods have recognized your noble accomplishments, but on your final quest you must select one god to be your guide.<br/><br/>Your guide will give you certain skill advantages and be very helpful for some tasks. Choose wisely!",
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
		"Many gods have recognized your noble accomplishments, but on your final quest you must select one god to be your guide.<br/><br/>Your guide will give you certain skill advantages and be very helpful for some tasks. Choose wisely!",
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
		"Gameplay", 
		"",
		"Got it",
		false,
		false,
	],
	[
		"Are You Ready?", 
		"",
		"Let's go!",
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
	6 - Wisdom skill bonus points
	7 - Strength skill bonus points
	8 - Speed skill bonus points

*/
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
var weaknessChoices =[
	[
		"Lust",
		"Hit on the right god and you might get lucky. On the other hand…",
		"+1 Speed, -2 Wisdom",
		"../img/hermesheader2x.png",
	],
	[
		"Anger",
		"You might say the wrong thing to the wrong god with that quick temper",
		"+1 Strength, -2 Wisdom",
		"../img/athenaheader2x.png",

	],
	[
		"Pride",
		"Hopefully your head is a good cushion to land on when you fall",
		"+1 Wisdom, -2 Speed",
		"../img/dionysusheader2x.png",

	]
];

var pageCount = 0;		//tracks which page of setup user is on

//Player data
var name;				//player name
var	guide;				//selected guide
var guideElement;		//DOM element name correlating to selected guide
var weakness; 			//selected weakness
var weaknessElement;	//DOM element name correlating to selected guide
var wisdom = 1;			//player's Wisdom skill
var strength = 1;		//player's Strength skill
var speed = 1;			//player's Speed skill

/*

	Load function

*/
window.addEventListener("load", function load()
{
	console.log("window loaded.");
	
	var pageContainer = document.getElementById('page-container');

	if(pageContainer)
	{
		setData();
		document.getElementById("next-button").addEventListener('touchstart',nextPage,false);
		document.getElementById("back-button").addEventListener('touchstart',prevPage,false);
		var arrChoice = document.getElementsByClassName("choice")

		for(var i = 0; i < arrChoice.length; i++)
		{

			document.getElementById(arrChoice[i].id).addEventListener('touchstart',function(){
				choiceMade(this.id,pageText[pageCount][0]);
			},false);

		}
		
	}
	
});

/*

    touchDetected() - runs when the user taps anywhere on the screen

*/
function touchDetected()
{
	alert("touch detected");

	var pageContainer = document.getElementById('page-container');

    pageContainer.style.opacity = 0;

    var transitionEvent = whichTransitionEvent(pageContainer);

	transitionEvent && pageContainer.addEventListener(transitionEvent, function()
		{
			window.location.href="instructions.html";
		});
}

/*

	whichTransitionEvent - setup for callback check - credit to http://davidwalsh.name/css-animation-callback

*/
function whichTransitionEvent(element)
{
    var transitions = 
    {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

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
	displayChoices(pageText[pageCount][4])
	
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

	displayTextEntry - check to see if text entry is neededon this page

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

*/
function choiceMade(element,page)
{
	//set guide
	if(page == "Pick Your Guide")
	{

		if(guideElement!= null && guideElement != element)
		{
			//fix skill bonuses

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