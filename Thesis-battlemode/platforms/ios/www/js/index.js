var x,
	y,
	z;

var watchID = null;


window.addEventListener("load", function load() {
    // console.log("Loaded");
    document.addEventListener("deviceready", onDeviceReady, false);
    // window.addEventListener('devicemotion', onDeviceMotion, false);


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
    alert("device ready.");
    console.log("device ready");
    startWatch();
}

// Start watching the acceleration
//
function startWatch() {
    alert("startWatch");

    // Update acceleration every 3 seconds
    var options = { frequency: 1000 };

    watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
    console.log(watchID);
}

// Stop watching the acceleration
//
function stopWatch() {
    if (watchID) {

        navigator.accelerometer.clearWatch(watchID);
        watchID = null;
    }
}

// onSuccess: Get a snapshot of the current acceleration
//
function onSuccess(acceleration) {
  console.log(acceleration);
    var element = document.getElementById('accelerometer');
    element.innerHTML = 'Acceleration X: ' + acceleration.x + '<br />' +
                        'Acceleration Y: ' + acceleration.y + '<br />' +
                        'Acceleration Z: ' + acceleration.z + '<br />' +
                        'Timestamp: '      + acceleration.timestamp + '<br />';
}

// onError: Failed to get the acceleration
//
function onError(e) {
  console.log(e);
    alert(e);
    alert('onError!');
}
