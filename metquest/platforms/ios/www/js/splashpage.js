window.addEventListener("load", function load()
{	
	var pageContainer = document.getElementById('page-container');

	if(pageContainer)
	{
		pageContainer.addEventListener('touchstart',touchDetected,false);
	}
	
});

/*

    touchDetected() - runs when the user taps anywhere on the screen

*/
function touchDetected()
{
	// debug statement
	// alert("touch detected");

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