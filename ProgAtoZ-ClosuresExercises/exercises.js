var interval;
var zip = '60564';

makeElements(100);


function makeElements(input) 
{
	//separate from loop to not have to pass in an argument
  	var count = 0;

  	for (var i = 0; i < 100; i++) 
  	{
  		setTimeout(makeElt, i * 100);
	}

	//show Exercise 2 after Exercise 1 completes; hard coded
  	setTimeout(exerciseTwoSetup, 10000);
  	setTimeout(assignQuery, 11000);
  	

  	//closure
	function makeElt() 
	{
		//create div and append to body with text to show which number it is
		var divElement = document.createElement('div');
		console.log(divElement.innerHTML);
		var divText = document.createTextNode('Number: ' + (count+1));
		divElement.appendChild(divText);
		console.log(divElement.innerHTML);
		document.body.appendChild(divElement);

		count++;
	}
	
}

//Animation exercise
function exerciseTwoSetup()
{
	//create the Exercise 2 header
	document.body.appendChild(document.createElement('p'));

  	var headerTitle = document.createTextNode('Exercise 2');
  	var headerElement = document.createElement('h3');
  	headerElement.appendChild(headerTitle);
  	headerElement.id = "exercisetwo";
  	document.body.appendChild(headerElement);

  	//create the clickable divs to flash colors when clicked on
  	for(var k = 0; k <= 20; k++)
  	{
  		console.log('creating element');
  		var divElement = document.createElement('div');
  		var divText = document.createTextNode('Click on Me!');

  		divElement.appendChild(divText);
  		divElement.className = "clickable";
  		divElement.id = "click" + k;
  		divElement.style.padding = "15px";
  		document.body.appendChild(divElement);
  	}
  	
  	//add event handler
	var elements = document.getElementsByClassName("clickable");

	for(var j = 0; j < elements.length; j++)
	{
		elements[j].addEventListener("click",animate);
	}
	
}

function animate() 
{
	// console.log("called for: " + document.getElementById(this.id));
  	
  	//check to see if element has been clicked on previously to turn color flashing on or off
  	if(document.getElementById(this.id).className === "clicked")
  	{
  		clearInterval(interval); 
		document.getElementById(this.id).style.color = "black";
		document.getElementById(this.id).className = "clickable";	
	}	
	else
	{
		console.log("turning color on.");
		document.getElementById(this.id).className = "clicked";
		interval = setInterval(changeColor, 250);
	}

	function changeColor() 
	{
		//BUG! unable to change color since this keyword returns null
		this.style.color = getRandomColor();
		
	}

	function getRandomColor() //taken from http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
	{
		var letters = '0123456789ABCDEF'.split('');
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) 
	    {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    return color;
	}


}

function assignQuery() 
{
	var headerTitle = document.createTextNode('Exercise 3');
  	var headerElement = document.createElement('h3');
  	headerElement.appendChild(headerTitle);
  	headerElement.id = "exercisethree";
  	document.body.appendChild(headerElement);

	var url = 'http://api.openweathermap.org/data/2.5/weather?zip='+ zip + ',us&appid=2de143494c0b295cca9337e1e96b00e0';
  
  	$.getJSON(url, gotData);

  function gotData(data) 
  {
  	console.log(data);

  	var weatherDiv = document.createElement('div');
  	var weatherText = document.createTextNode(data.weather[0].description + " for zip code " + zip);

  	weatherDiv.appendChild(weatherText);
  	document.body.appendChild(weatherDiv);
  }

}