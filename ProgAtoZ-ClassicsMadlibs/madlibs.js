// text of first passages from famous classic literature
var passages = [
	["Pride and Prejudice", "It is a truth universally acknowledged, \nthat a single man in possession of a good fortune must be in want of a wife. \nHowever little known the feelings or views of such a man may be on his first entering a neighbourhood, \nthis truth is so well fixed in the minds of the surrounding families, \nthat he is considered as the rightful property of some one or other of their daughters."],
	["Moby Dick", "Call me Ishmael.\n\nSome years ago - never mind how long precisely - having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. \nIt is a way I have of driving off the spleen, and regulating the circulation. Whenever I find myself growing grim about the mouth; \nwhenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; \nand especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people\'s hats off - then, I account it high time to get to sea as soon as I can. \nThis is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the ship. There is nothing surprising in this. \nIf they but knew it, almost all men in their degree, some time or other, \ncherish very nearly the same feelings towards the ocean with me."],
	["A Tale of Two Cities", "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, \nit was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, \nit was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, \nwe were all going direct to Heaven, we were all going direct the other way - in short, the period was so far like the present period, \nthat some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only." ],
	["The Raven", "Once upon a midnight dreary, as I pondered weak and weary,\nOver many a quaint and curious volume of forgotten lore- \nWhile I nodded, nearly napping, suddenly there came a tapping,\nAs of someone gently rapping, rapping at my chamber door.\"\'Tis some visitor,\" I muttered, \"tapping at my chamber door-\nOnly this and nothing more.\""]
];

// stores the Penn Tag POS for words that can be replaced
var ptMadlibs = [
	['jj', 'Adjective'],
	['jjr', 'Adjective, comparative'],
	['jjs', 'Adjective, superlative'],
	['nn', 'Noun, single'],
	['nns', 'Noun, plural'],
	['nnp', 'Proper noun, single'],
	['nnps', 'Proper noun, plural'],
	['rb', 'Adverb'],
	['rbr', 'Adverb, comparative'],
	['rbs', 'Adverb, superlative'],
	['vb', 'Verb'],
	['vbd', 'Verb, past tense']
];

var selectedPassageTitle,
	selectedPassageText;		// store selected passage title, and text
var numAdlibs;					// num words to replace
var tokenizedPassage;			// passage converted to words
var arrWordsReplaced = [];		// stores index of words replaced
var arrPOSReplaced = [];		// stores parts of speech of words replaced
var arrWordsEntered = [];		// stores user entered words;
var modifiedPassage = "";			// store modified passage with ad libs;

window.onload = function(){

	//select the passage to make the mad lib
	selectPassage();

	generateNumMadlibs();

	generateTokenizedPassage();

	createMadlib();

};

//select the passage to create madlibs with
function selectPassage()
{
	var randIndex = Math.floor(Math.random() * 4);

	selectedPassageTitle = passages[randIndex][0];
	selectedPassageText = passages[randIndex][1];

	console.log(selectedPassageTitle + "\n\n" + selectedPassageText);

}

//set number of words to replace - minimum of four words to be replaced and max of 10
function generateNumMadlibs()
{
	numAdlibs = Math.floor(Math.random() * 10 + 4);

	if(numAdlibs > 10)
		numAdlibs = 10;

	console.log(numAdlibs);
}

//create and store the passage tokenized into words
function generateTokenizedPassage()
{
	tokenizedPassage = RiTa.tokenize(selectedPassageText);

	console.log(tokenizedPassage[2]);
}

//create the mad lib
function createMadlib()
{
	//get words to replace
	getWordsToReplace();

	createMadlibElements()
}

function createMadlibElements()
{
	//add textboxes with parts of speech for user to enter to page
	createMadlibTextboxes();

	createEnterButton();

}

//get words to replace
function getWordsToReplace()
{
	var wordToReplace,			// store candidate word to replace
		rLex,					// RiLexicon object
		rWord,					// RiString object, same word as wordToReplace
		wordPOS,				// store part of speech
		indexToReplace,			// store index of word to be replaced
		isMatchToAcceptedPOS;	// check if word is POS in ptMadlibs

	rLex = new RiLexicon();
	wordToReplace = "";
	isMatchToAcceptedPOS = false;

	//iterate through for each ad lib created 
	//TODO: find a way to optimize/modularize
	for(var i = 0; i <= numAdlibs; i++)
	{

		//run while word is not a noun, adjective, or verb (a word that can be replaced)
		while(!isMatchToAcceptedPOS)
		{

			//get the index of a word to potentially replace
			indexToReplace = Math.floor(Math.random() * tokenizedPassage.length);
			wordToReplace = (tokenizedPassage[indexToReplace]);
			rWord = new RiString(wordToReplace);


			//get part of speech word is
			wordPOS = rWord.get('pos');

			console.log(i + " " + wordToReplace + " " + wordPOS + " " + wordPOS.length + " " + (rLex.isAdjective(wordToReplace)) + " " 
				+ rLex.isVerb(wordToReplace) + " " + rLex.isNoun(wordToReplace));

			var isDuplicate = false;

			//compare to stored Penn Tags of accepted mad lib replacements (check against index one of pair!)
			//BUG! Handle case where word has multiple POS
			for(var j = 0; j < ptMadlibs.length; j++)
			{
				if(wordPOS === ptMadlibs[j][0])
				{
					console.log('check for duplicate')
					for(var l = 0; l < arrWordsReplaced.length; l++)
					{
						if(wordToReplace === tokenizedPassage[arrWordsReplaced[l]])
						{
							console.log('duplicate');
							isDuplicate = true;
						}

						if(isDuplicate)
							break;
					}

					if(!isDuplicate)
					{
						console.log('match found');
						isMatchToAcceptedPOS = true;

						//add index to word to replace and POS to storage arrays
						arrWordsReplaced.push(indexToReplace);
						arrPOSReplaced.push(ptMadlibs[j][1]);
					}

				}

			}

		}

		//reset for next iteration
		wordToReplace = "";
		isMatchToAcceptedPOS = false;
	}

	for(var k = 0; k < arrWordsReplaced.length; k++)
	{
		console.log("Number: " + k + " Index: " + arrWordsReplaced[k] + " Word: " + tokenizedPassage[arrWordsReplaced[k]] + " POS: " + arrPOSReplaced[k]);
	}
}

// create textboxes for each word to be replaced and add them to main page
function createMadlibTextboxes()
{
	var textboxCreated;

	//loop through for each word to replace
	for(var i = 0; i < arrWordsReplaced.length; i++)
	{
		//set textbox attributes
		textboxCreated = document.createElement('input');
		textboxCreated.setAttribute('type','text');
		textboxCreated.setAttribute('class', 'madlib-input')
		textboxCreated.setAttribute('placeholder', arrPOSReplaced[i]);

		//add to madlibs-entry
		document.getElementById('madlibs-entry').appendChild(textboxCreated);
		document.getElementById('madlibs-entry').appendChild(document.createElement('br'));
	}
}

// create submit button for madlibs
function createEnterButton()
{
	var buttonCreated = document.createElement('button');
	var buttonText = document.createTextNode("Show me the mad lib!");

	buttonCreated.setAttribute('type','submit');
	buttonCreated.setAttribute('onclick','enterButtonClicked()');
	buttonCreated.setAttribute('id', 'submit-button');

	buttonCreated.appendChild(buttonText);

	document.getElementById('madlibs-entry').appendChild(buttonCreated);
}

// functionality for submit button
function enterButtonClicked()
{
	var madlibInputs = document.getElementsByClassName("madlib-input");
	var entryLex = new RiLexicon();
	var entryWord, entryWordPOS;

	console.log(madlibInputs.length);

	//check for empty cases; if all are filled, show madlib results
	for(var i = 0; i < madlibInputs.length; i++)
	{

		console.log(madlibInputs[i].value);

		entryWord = new RiString(madlibInputs[i].value);

		for(var p = 0; p < ptMadlibs.length; p++)
		{
			console.log('checking POS equiv');
			if (entryWord.get('pos') === ptMadlibs[p][0])
			{
				entryWordPOS = ptMadlibs[p][1];
			}
		}

		console.log(entryWordPOS);

		//check for blank case
		if (madlibInputs[i].value === "") 
		{

			alert("Please enter a word into each box please!");
			arrWordsEntered = [];
			break;

		}

		//check for wrong POS case
		else if (entryWordPOS !== arrPOSReplaced[i])
		{
			console.log('word POS: ' + entryWord.get('pos') + '  POS of word replaced: ' + arrPOSReplaced[i]);
			alert("The part of speech for Box " + (i+1) + " doesn't quite match. Enter another word please.");
			arrWordsEntered = [];
			break;

		}

		//add entered word to storage array
		else
		{
			arrWordsEntered.push(madlibInputs[i].value);
		}

	} //end for loop

	// verify that arrWordsEntered isn't empty and move to building the new passage

	if(arrWordsEntered.length > 0)
	{
		createModifiedPassage();

		changeTheDOM();
	}

}

// build the new passage with inputs
// TODO: find a way to add words to a sentence as a span, then add changed words as another span with a class tag to style
function createModifiedPassage()
{

	for(var i = 0; i < tokenizedPassage.length; i++)
	{

		for(var j = 0; j < arrWordsReplaced.length; j++)
		{
			if(arrWordsReplaced[j] === i)
			{
				modifiedPassage += arrWordsEntered[j];
				break;
			}
			else if ((j === arrWordsReplaced.length-1) && arrWordsReplaced[j] !== i)
			{
				modifiedPassage += tokenizedPassage[i];
			}
			else
				continue;
		}
		

		//punctuation check
		if (i+1 < tokenizedPassage.length)
		{

			var tempWord = new RiString(tokenizedPassage[i+1]);

			if(tempWord.get('pos') === '.' || tempWord.get('pos') === ';' || tempWord.get('pos') === '?')
			{
				modifiedPassage += tokenizedPassage[i+1] + "\n";
				i++;
			}
			else if (tempWord.get('pos') === '-')
			{
				modifiedPassage += " -\n";
				i++;
			}
			else if(tempWord.get('pos') === '"' || tempWord.get('pos') === "'")
			{
				modifiedPassage += ("\\" + tempWord);
				i++
			}
			else if(tempWord.get('pos') === ',')
			{
				modifiedPassage += ", \n";
				i++;
			}
			else
			{
				modifiedPassage += " ";
			}

		}
	}

	console.log(modifiedPassage);

	document.getElementById('passage').innerHTML = modifiedPassage;

}

// change DOM elements to show new passage;
function changeTheDOM()
{
	console.log('DOM change call');
	document.getElementById('passage').setAttribute('style','display: block');
	document.getElementById('madlibs-entry').setAttribute('style','display: none');

	document.getElementById('classics').innerHTML = selectedPassageTitle;
}