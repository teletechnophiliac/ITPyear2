
/*
	Variables 
*/

// Twitter API config
var Twit = require('twit');

var config = require('./config');

var T = new Twit(config);

// Friend data from Twitter API
var friendIDsRaw = [];		// raw IDs of people you follow
var friendObjs = [];		// expanded Twitter objects of people you follow

// Text analysis of locations and descriptions from parsed Twitter objects
var dictLoc1 = {};			// word count from locations (one word) 
var dictLoc2 = {};			// word count from locations (two words)
var keysLoc1 = [];			// unique locations found (one word)
var keysLoc2 = [];			// unique locations found (two words)

var dictDesc1 = {};			// word count from description (one word)
var dictDesc2 = {};			// word count from description (two words)
var keysDesc1 = [];			// unique words in descriptions (one word)
var keysDesc2 = [];			// unique words in descriptions (two words)



// Taken from https://docs.nodejitsu.com/articles/command-line/how-to-parse-command-line-arguments
// get Twitter handle from list of arguments from command line
var myArgs = process.argv;
var enteredTwitHandle = myArgs[2];

getIDs(enteredTwitHandle);

/*

	getIDs - pull all the friends of the entered Twitter handle

*/
function getIDs(twitterID)
{
	T.get('friends/ids', { screen_name: twitterID },  function (err, data, response) 
	{
  		// console.log("successful get of friends/ids");

  		friendIDsRaw = data.ids;

  		// console.log("Number of friends: " + friendIDsRaw.length);

  		var strIDs;

  		for(var i = 0; i < friendIDsRaw.length; i+=100)
  		{
  			strIDs = friendIDsRaw[i];
  			
  			// construct id sentence - Twitter API restricts to 100 ids per get call
  			for(var j = i+1; j < i+100; j++)
  			{

  				if(friendIDsRaw[j] !== undefined)
  				{
  					strIDs = strIDs + "," + friendIDsRaw[j];
  					
  					// debug statement - check to see how strIDs is being constructed before API call is made 
  					// console.log(j + ": " + strIDs);
  				}
  			}
  			
  			getInformation(strIDs);

  		}

 	});

}

/*

	getInformation - get ID, location, and description for each friend in the raw ID string passed into Twitter

*/ 
function getInformation(twitIDs)
{
	T.get('users/lookup', { user_id: twitIDs }, function(err,data,response){
		
		// console.log("successful getDescriptions call");
		
		// store description and location for each friend
		for(var k = 0; k < data.length; k++)
		{
			var des, 
				loc,
				handle;

			handle = data[k].screen_name;

			if(!data[k].description || data[k].description === "")
			{
				des = "No text";
			}
			else
			{
				des = data[k].description;
			}

			if(data[k].location === "" || !data[k].location)
			{
				loc = "Not provided";
			}
			else
			{
				loc = data[k].location;
			}

			friendObjs.push({"id": handle, "location" : loc, "description" : des});
		}
		
		// checkLength();
		wordCountDesc();
		wordCountLoc();
	
	});


}

/* 

	checkLength - validate that all friends have been saved

*/
function checkLength()
{

	if(friendObjs.length === friendIDsRaw.length)
	{
		console.log("successfully got all descriptions and nothing is out of scope so far. Now printing all descriptions.");

		for(var l = 0; l < friendObjs.length; l++)
		{
			console.log(friendObjs[l].id + ": " + friendObjs[l].location + "\n" + friendObjs[l].description);
		}

	}
}


/*
	
	wordCountDesc - count the number of unique words and word pairs found in all of the descriptions in friendObjs
	
	NOTE: lots of redundant code between this and wordCountLoc - can be further modularized?

*/
function wordCountDesc()
{
	// go through entire friendObjs array

	for(var m = 0; m < friendObjs.length; m++)
	{
		var descTokens = friendObjs[m].description.split(/\W+/);

		// console.log(descTokens.length);

		// one word concordance
		for(var n = 0; n < descTokens.length; n++)
		{
			// console.log(n + ": " + descTokens[n]);

			if(dictDesc1[descTokens[n].toLowerCase()] === undefined)
			{
				// console.log("adding " + descTokens[n].toLowerCase());
				dictDesc1[descTokens[n].toLowerCase()] = 1;
				keysDesc1.push(descTokens[n].toLowerCase());
			}
			else
			{
				dictDesc1[descTokens[n].toLowerCase()]++;
			}
		}

		// word pair concordance
		for(var p = 0; p < descTokens.length-1; p++)
		{
			var tempToken = descTokens[p] + " " + descTokens[p+1];

			if(dictDesc2[tempToken.toLowerCase()] === undefined)
			{
				dictDesc2[tempToken.toLowerCase()] = 1;
				keysDesc2.push(tempToken.toLowerCase());
			}
			else
			{
				dictDesc2[tempToken.toLowerCase()]++;
			}
		}

	}

	// console.log("Number of unique words: " + keysDesc1.length + "   Number of unique word pairs: " + keysDesc2.length);

	// sort keys so that concordance prints in descending numerical order
	keysDesc1.sort(function(a, b) 
	{
  		return (dictDesc1[b] -  dictDesc1[a]);
	});

	keysDesc2.sort(function(a, b) 
	{
  		return (dictDesc2[b] -  dictDesc2[a]);
	});

	// Print all words/word pairs in descriptions

	// for(var q = 0; q < keysDesc1.length; q++)
	// {
	// 	console.log(keysDesc1[q] + " : " + dictDesc1[keysDesc1[q]]);
	// }

	// for(var r = 0; r < keysDesc2.length; r++)
	// {
	// 	console.log(keysDesc2[r] + " : " + dictDesc2[keysDesc2[r]]);
	// }

	// Print top 5 words/word pairs in descriptions. BUG! Need to take out words like the, and, a, etc.

	// console.log("\nHere are the top 5 most common words people that " + enteredTwitHandle + " follows used to describe themselves:");
	// for(var r = 0; r < 5; r++)
	// {
	// 	console.log((r+1) + ": " + keysDesc1[r] + " - " + dictDesc1[keysDesc1[r]] + " people");
	// }
	// console.log("\nAnd here are the top 5 most common word pairs: ");
	// for(var r = 0; r < 5; r++)
	// {
	// 	console.log((r+1) + ": " + keysDesc2[r] + " - " + dictDesc2[keysDesc2[r]] + " people");
	// }
	// console.log();
}

/*
	
	wordCountLoc - count the number of unique words and word pairs found in all of the descriptions in friendObjs
	
	NOTE: lots of redundant code between this and wordCountDesc - can be further modularized?

*/
function wordCountLoc()
{
	// go through entire friendObjs array

	for(var m = 0; m < friendObjs.length; m++)
	{
		// regular expression to tokenize words
		var locTokens = friendObjs[m].location.split(/\W+/);

		// console.log(descTokens.length);

		// one word concordance
		for(var n = 0; n < locTokens.length; n++)
		{
			// console.log(n + ": " + descTokens[n]);

			if(dictLoc1[locTokens[n].toLowerCase()] === undefined)
			{
				// console.log("adding " + descTokens[n].toLowerCase());
				dictLoc1[locTokens[n].toLowerCase()] = 1;
				keysLoc1.push(locTokens[n].toLowerCase());
			}
			else
			{
				dictLoc1[locTokens[n].toLowerCase()]++;
			}
		}

		// word pair concordance
		for(var p = 0; p < locTokens.length-1; p++)
		{
			var tempToken = locTokens[p] + " " + locTokens[p+1];

			if(dictLoc2[tempToken.toLowerCase()] === undefined)
			{
				dictLoc2[tempToken.toLowerCase()] = 1;
				keysLoc2.push(tempToken.toLowerCase());
			}
			else
			{
				dictLoc2[tempToken.toLowerCase()]++;
			}
		}

	}

	// sort keys in numerical order (taken from Dan Shiffman's Word Counting notes)
	keysLoc1.sort(function(a, b) 
	{
  		return (dictLoc1[b] -  dictLoc1[a]);
	});

	keysLoc2.sort(function(a, b) 
	{
 	 	return (dictLoc2[b] -  dictLoc2[a]);
	});

	// Print number of words/word pairs found
	
	// console.log("1: " + keysLoc1.length + "   2: " + keysLoc2.length);

	// Print all words in location
	
	// for(var q = 0; q < keysLoc1.length; q++)
	// {
	// 	console.log(keysLoc1[q] + " : " + dictLoc1[keysLoc1[q]]);
	// }

	// Print top 5 location results (word pairs)

	console.log("Here are the top 5 most common places people are from that " + enteredTwitHandle + " follows: ");
	
	for(var r = 0; r < 5; r++)
	{
		console.log((r+1) + ": " + keysLoc2[r] + " - " + dictLoc2[keysLoc2[r]] + " people");
	}

	// print all location word pairs 
	
	// for(var r = 0; r < keysLoc2.length; r++)
	// {
	// 	// console.log((r+1) + ": " + keysLoc2[r] + " - " + dictLoc2[keysLoc2[r]] + " people");
	// 	console.log(keysLoc2[r] + " - " + dictLoc2[keysLoc2[r]]);
	// }
}