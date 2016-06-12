var x = [],
	y = [],
	z = [];
var score = 0;

var watchID = null;


window.addEventListener("load", function load() {
    // console.log("Loaded");
    document.addEventListener("deviceready", onDeviceReady, false);
    // window.addEventListener('devicemotion', onDeviceMotion, false);
    document.getElementById("start-button").addEventListener("touchstart", startBattle,false);
    document.getElementById("restart-button").addEventListener("touchstart", startBattle,false);
});


// TODO: update every few seconds
function onDeviceMotion(e)
{
    //run this function every 5 seconds
    
    setTimeout(setgetAccelReadings(e),3);
    updateReading();
    
}

function getAccelReadings(e)
{
    x = e.acceleration.x;
    y = e.acceleration.y;
    z = e.acceleration.z;

}

function updateReading()
{

   document.getElementById('x').innerText = (x*100);
   document.getElementById('y').innerText = (y*100);
   document.getElementById('z').innerText = (z*100);
}

function onDeviceReady() {
    // alert("device ready.");
    console.log("device ready");
}

// Start watching the acceleration
//
function startWatch() {
    // alert("startWatch");

    // Update acceleration every 3 seconds
    var options = { frequency: 500 };

    watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);

}

// Stop watching the acceleration
//
function stopWatch() {
  // alert("stopping");
    if (watchID) {

        navigator.accelerometer.clearWatch(watchID);
        watchID = null;
    }
}

// onSuccess: Get a snapshot of the current acceleration
//
function onSuccess(acceleration) {
  console.log(acceleration);
  x[x.length] = acceleration.x;
  y[y.length] = acceleration.y;
  z[z.length] = acceleration.z;

    // var element = document.getElementById('accelerometer');
    // element.innerHTML = 'Acceleration X: ' + acceleration.x + '<br />' +
                        // 'Acceleration Y: ' + acceleration.y + '<br />' +
                        // 'Acceleration Z: ' + acceleration.z + '<br />' +
                        // 'Timestamp: '      + acceleration.timestamp + '<br />';
}

// onError: Failed to get the acceleration
//
function onError(e) {
  console.log(e);
    alert(e);
    alert('onError!');
}

function startBattle()
{

    document.getElementById('start-button').style.display = "none";


  setTimeout(startWatch, 500);
  setTimeout(function(){
    stopWatch();
    calculateScore();
    showScore();
  },1550);

  
}

function calculateScore()
{
  //strength - F = ma
  //speed - velocity - pull max acceleration
  //wisdom multiplier

  var tempScore = 0;
  

  for(var i = 0; i < x.length; i++)
  {
    // alert("X: " + Math.round(x[i]) + " Y: " + Math.round(y[i]) + " Z: " + Math.round(z[i]));
    tempScore = Math.round(x[i]) + Math.round(y[i]) + Math.round(z[i]);
  }

  // alert(tempScore);
  score = Math.abs(Math.round(((tempScore/6) * 4) - 1));
}

function showScore()
{
  document.getElementById('player-score').innerHTML = score;
  document.getElementById('score').style.display="block";
}