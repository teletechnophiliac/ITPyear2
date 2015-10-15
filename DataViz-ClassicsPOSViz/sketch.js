// File drop and input based on Daniel Shiffman's Fall 2015 Programming A to Z example - https://github.com/shiffman/A2Z-F15

// Many DOM elements
var dropZone, input, submitButton, classicsTitle;

// word analysis variables
var textToAnalyze,        // text entered
    tokenizedText,        // tokenized text (array of Strings)
    arrPOS,               // array of parts of speech
    arrPOSSimple,         // array of parts of speech (simplified)
    keysTotal = [],       // (keys for dictPOS)
    keysSimple = [],      // (keys for dictPOS)
    dictPOS = {},         // stores number of times each POS occurs (key-value storage)
    dictPOSSimple = {},   // stores number of times POS simple occurs (key-val storage)
    POSConnections = {},  // stores connections between parts of speech
    arrPOSCount = [],
    arrPOSCountSimple = [];

// key for converting RiTa abbreviations to parts of speech
var ritaKey = [
  ["cc","Coordinating Conjunction"],
  ["cd", "Cardinal Number"],
  ["dt", "Determiner"],
  ["ex","Existential there"],
  ["fw", "Foreign Word"],
  ["in", "Preposition or Subordinating Conjunction"],
  ["jj", "Adjective"],
  ["jjr", "Comparative Adjective"],
  ["jjs","Superlative Adjective"],
  ["ls", "List Item Marker"],
  ["md", "Modal"],
  ["nn", "Singular/Mass Noun"],
  ["nns", "Plural Noun"],
  ["nnp", "Proper Noun (Singular)"],
  ["nnps", "Proper Noun (Plural)"],
  ["pdt", "Predeterminer"],
  ["pos", "Possessive Ending"],
  ["prp", "Personal Pronoun"],
  ["prp$", "Possessive Pronoun"],
  ["rb", "Adverb"],
  ["rbr", "Comparative Adverb"],
  ["rbs", "Superlative Adverb"],
  ["rp", "Particle"],
  ["sym", "Symbol"],
  ["to", "To"],
  ["uh", "Interjection"],
  ["vb", "Verb (Base Form)"],
  ["vbd", "Verb (Past Tense)"],
  ["vbg", "Gerund/Present Participle Verb"],
  ["vbn", "Past Participle Verb"],
  ["vbp", "Verb (Non-Third Person Singular Present)"],
  ["vbz", "Verb (Third Person Singular Present)"],
  ["wdt", "Wh-Determiner"],
  ["wp", "Wh-Pronoun"],
  ["wp$", "Possessive Wh-Pronoun"],
  ["wrb", "Wh-Adverb"]
];


// key for converting simple POS to parts of speech spelled out
var ritaSimpleKey = [

  ["a", "Adjective"],
  ["r", "Adverb"],
  ["n", "Noun"],
  ["v", "Verb"]

];

  var diameter, bubble, svg;

function setup() {

  noCanvas();

  // Set variables to elements in DOM
  input = select('#textinput');
  submitButton = select('#submit');

  // What to do when button pressed
  submitButton.mousePressed(handleInput);

  // Selected the div which will be the "drop zone"
  // for dragging and dropping files
  dropZone = select('#drop_zone');
  // Here are the events to handle
  dropZone.dragOver(highlight);
  dropZone.drop(gotFile, unHighlight);

}

// Handle dropzone events
function highlight() {
  dropZone.style('background', '#464646');
}

function unHighlight() {
  dropZone.style('background','');
}

function gotFile(file) {
  if (file.type === 'text') 
  {
    process(file.data);
  } else {
    // In case it's some weird other kind of file
    alert('this is not a text file.');
  }
}

// When the file is loaded
function fileLoaded(data) 
{
  // Note the use of a function that will "process" the text
  // This is b/c the text might come in a number of different ways
  process(data.join('\n'));
}

// Handle the text input field
function handleInput() 
{
  process(input.value());
}

//setup for processing text and visualizing
function process(txt) 
{
  // console.log(txt);
  classicsTitle = document.getElementById('classics-title');

  if(txt === "" || classicsTitle.value === "")
  {
    alert("Please enter in a novel and the title.");
  }
  else
  {
    textToAnalyze = txt;

    hideInitElements();

    visualizationSetup();

    wordAnalysis();   

    convertAbbreviations(); 

    createViz();
  }

}

//hide elements to show viz
function hideInitElements()
{
  document.getElementById('classics-entry').style.display = "none";
  document.getElementById('viz-description').style.display = "none";

}

//setup for showing vizualization
function visualizationSetup()
{
  //set title
  document.getElementById('viz-header').innerHTML = '<span class="classics">' + classicsTitle.value + '</span> Analyzed'; 

  //create div for visualization
  var vizDiv = document.getElementById('viz-display').style.display = "block";

}

//analyze text of word
function wordAnalysis()
{
  // store array of tokenized words from passage
  tokenizedText = RiTa.tokenize(RiTa.stripPunctuation(textToAnalyze));

  // console.log(tokenizedText[2]);

  // get parts of speech for each word
  arrPOS = RiTa.getPosTags(tokenizedText);
  arrPOSSimple = RiTa.getPosTags(tokenizedText, true);

  // console.log(arrPOS[2]);
  // console.log(arrPOSSimple[2]);

  // double check if dictPOS is initialized
  if (dictPOS === null)
      dictPOS = {};

  if (dictPOSSimple === null)
      dictPOSSimple = {};

  for(var i  = 0; i < arrPOS.length; i++)
  {
    var wordPOS = arrPOS[i];
    var wordPOSSimple = arrPOSSimple[i];

    // console.log(wordPOS + " : " + dictPOS[wordPOS]);
    // store into dictionaries
    if(dictPOS[wordPOS] === undefined)
    {
      dictPOS[wordPOS] = 1;
      keysTotal.push(wordPOS);
    }
    else
    {
      dictPOS[wordPOS]++;
    }

    if(!dictPOSSimple[wordPOSSimple])
    {
      dictPOSSimple[wordPOSSimple] = 1;
      keysSimple.push(wordPOSSimple);
    }
    else
    {
      dictPOSSimple[wordPOSSimple]++;
    }

    // console.log("num keys: " + keysTotal.length);
    
  }

  for(var j = 0; j < keysTotal.length; j++)
  {
    // console.log(keysTotal[j] + " " + dictPOS[keysTotal[j]]);
    arrPOSCount[j] = dictPOS[keysTotal[j]];
  }

  for (var k = 0; k < keysSimple.length; k++)
  {
    arrPOSCountSimple[k] = dictPOSSimple[keysSimple[k]];
  }

}

function convertAbbreviations()
{
  console.log("converting");
  for(var i = 0; i < keysTotal.length; i++)
  {
    for(var j = 0; j < ritaKey.length; j++)
    {
      if(keysTotal[i] === ritaKey[j][0])
      {
        keysTotal[i] = ritaKey[j][1];
        console.log(keysTotal[i]);
      }
    }
  }

  for(var k = 0; k < arrPOSSimple.length; k++)
  {
    for(var l = 0; l < ritaSimpleKey.length; l++)
    {
      if(arrPOSSimple[k] === ritaSimpleKey[l][0])
      {
        arrPOSSimple[k] = ritaSimpleKey[l][1];
      }
    }

  }
}

function createViz()
{

  // console.log("creating viz");

  diameter = 1000,
    format = d3.format(",d"),
    color = d3.scale.category20c();

 bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(3);

svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

    
  var data=[]; //3D array of nameList, nameCount, ethnicity
  var dobj=[]; //array formated specifically for hierarchical processing 
  

  
  data = [keysTotal, arrPOSCount];
    
  for (var di=0;di<data[0].length;di++) 
    {
    dobj.push({"key":di,"value":data[1][di]});
    // console.log("key: " + di + " value: " + data[1][di]);
  }

  
  display_pack({children: dobj});

  function display_pack(root) {
    var node = svg.selectAll(".node")
      .data(bubble.nodes(root)
      .filter(function(d) { return !d.children; }))
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .style("font-size", "10px")
      .style("fill", function(d) { 
                    //color is based on ethnicity
                    return color(data[0][d.key]); })
      .on("mouseover", function(d) {
        d3.select(this).style("fill", "gold"); 
        showToolTip(" "+data[0][d.key]+"<br>count: "+data[1][d.key]+" ",d.x+d3.mouse(this)[0]+50,d.y+d3.mouse(this)[1],true);
        //console.log(d3.mouse(this));
      })
      //.on("mousemove", function(d,i) {
        //tooltipDivID.css({top:d.y+d3.mouse(this)[1],left:d.x+d3.mouse(this)[0]+50});
      //})  
      .on("mouseout", function() {
        d3.select(this).style("fill", function(d) { return color(data[0][d.key]); });
        showToolTip(" ",0,0,false);
      });


    node.append("circle")
      .attr("r", function(d) { return d.r; });

    node.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .style("fill","black")
      .text(function(d) { return data[0][d.key].substring(0, d.r / 3); });
  }
  
  
  function showToolTip(pMessage,pX,pY,pShow)
  {
    if (typeof(tooltipDivID)==="undefined") {
    tooltipDivID =$('<div id="messageToolTipDiv" style="position:absolute;display:block;z-index:10000;border:2px solid black;background-color:rgba(0,0,0,0.8);margin:auto;padding:3px 5px 3px 5px;color:white;font-size:12px;font-family:arial;border-radius: 5px;vertical-align: middle;text-align: center;min-width:50px;overflow:auto;"></div>');

    $('body').append(tooltipDivID);
    }
    if (!pShow) { tooltipDivID.hide(); return;}
    //MT.tooltipDivID.empty().append(pMessage);
    tooltipDivID.html(pMessage);
    tooltipDivID.css({top:pY,left:pX});
    tooltipDivID.show();
  }
  
}