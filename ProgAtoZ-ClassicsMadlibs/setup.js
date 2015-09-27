var passages = [
	["Pride and Prejudice", "It is a truth universally acknowledged, \nthat a single man in possession of a good fortune must be in want of a wife. \nHowever little known the feelings or views of such a man may be on his first entering a neighbourhood, \nthis truth is so well fixed in the minds of the surrounding families, \nthat he is considered as the rightful property of some one or other of their daughters."],
	["Moby Dick", "Call me Ishmael.\n\nSome years ago - never mind how long precisely - having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. \nIt is a way I have of driving off the spleen, and regulating the circulation. Whenever I find myself growing grim about the mouth; \nwhenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; \nand especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people\’s hats off - then, I account it high time to get to sea as soon as I can. \nThis is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the ship. There is nothing surprising in this. \nIf they but knew it, almost all men in their degree, some time or other, \ncherish very nearly the same feelings towards the ocean with me."],
	["A Tale of Two Cities", "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, \nit was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, \nit was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, \nwe were all going direct to Heaven, we were all going direct the other way - in short, the period was so far like the present period, \nthat some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only." ],
	["The Raven", "Once upon a midnight dreary, as I pondered weak and weary,\nOver many a quaint and curious volume of forgotten lore\nWhile I nodded, nearly napping, suddenly there came a tapping,\nAs of someone gently rapping, rapping at my chamber door."]
];

var selectedPassageTitle,
	selectedPassageText;	// store selected passage, title, and text
var numAdlibs;				// num words to replace
var tokenizedPassage;		// passage converted to words
var arrWordsReplaced;		// stores index of words replaced

window.onload = function(){

	//select the passage to make the mad lib
	initializeMadlib(); 

	

};

//setup for madlib
function initializeMadlib()
{
	selectPassage();

	generateNumMadlibs();

	generateTokenizedPassage();

	createMadlib();
}

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

	document.getElementById("madlibs-entry").innerHTML = numAdlibs;
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

	//add textboxes with parts of speech for user to enter

}

//get words to replace
function getWordsToReplace()
{
	var wordToReplace,
		rWord,
		rLex,
		wordPOS,
		indexToReplace;

	rLex = new RiLexicon();
	rWord= new RiString('winter');

	console.log(rLex.isNoun(rWord));

	for(var i = 0; i <= numAdlibs; i++)
	{

		//run while word is not a noun, adjective, or verb (a word that can be replaced)
		while(!(rLex.isAdjective(rWord)) && !(rLex.isVerb(rWord)) && !(rLex.isNoun(rWord)))
		{

			//get the index of a word to potentially replace
			indexToReplace = Math.floor(Math.random() * tokenizedPassage.length);
			rWord = new RiString(tokenizedPassage[indexToReplace]);

			//get part of speech word is
			wordPOS = rWord.get('pos');

			console.log(i + " " + rWord + " " + wordPOS + " " + (rLex.isAdjective(rWord)) + " " + rLex.isVerb(rWord) + " " + rLex.isNoun(rWord));
		}

		//add index to word to replace
		arrWordsReplaced.push(indexToReplace);

	}
}

