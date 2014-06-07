var directionsService = new google.maps.DirectionsService();

var renderOptions = { draggable: false };
var directionDisplay = new google.maps.DirectionsRenderer(renderOptions);
var singapore = new google.maps.LatLng(1.3437459, 103.8240449);
//set the directions display service to the map
var mapOptions = {zoom:12, center: singapore,
                 panControl: false,
  zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  overviewMapControl: false};

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var renderOptions = { draggable: true };
var directionDisplay = new google.maps.DirectionsRenderer(renderOptions);
var singapore = new google.maps.LatLng(1.3437459, 103.8240449);
//set the directions display service to the map
var mapOptions = {zoom:12, center: singapore};


function map_inititalize()
{
  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  directionDisplay.setMap(map);
  //set the directions display panel
  //panel is usually just and empty div.  
  //This is where the turn by turn directions appear.
  var directionsPanel = document.getElementById("direction-canvas");
  directionDisplay.setPanel(directionsPanel); 
  calcRoute();
}

function calcRoute()
{
  var selectedMode = document.getElementById('mode').value;
  //build the waypoints
  //free api allows a max of 9 total stops including the start and end address
  //premier allows a total of 25 stops. 
  var items = [getParameterByName('pick')];

  var items = ["Block 73 Telok Blangah heights Singapore 100073"];
  var waypoints = [];
  for (var i = 0; i < items.length; i++) {
    var address = items[i];
    if (address !== "") {
      waypoints.push({
        location: address,
        stopover: true
      });
    }
  }

  //set the starting address and destination address
  var originAddress = getParameterByName('start');
  var destinationAddress = getParameterByName('deliver');
  var originAddress = "9 Ayer Rajah Avenue Singapore 138647";
  var destinationAddress = "2450 Ang Mo Kio Avenue 8 Singapore 569811";

  //build directions request
  var request = {
    origin: originAddress,
    destination: destinationAddress,
    waypoints: waypoints, //an array of waypoints
    optimizeWaypoints: true, //set to true if you want google to determine the shortest route or false to use the order specified.
    travelMode: google.maps.TravelMode[selectedMode]
  };

  //get the route from the directions service
  directionsService.route(request, function (response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionDisplay.setDirections(response);
      console.log(status);
    }
    else {
      alert("No routing available. Please inform us to verify the address.");
    }
  });
}

google.maps.event.addDomListener(window, 'load', map_inititalize);

