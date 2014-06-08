function getDuration(from, to, mode){

    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [from],
        destinations: [to],
        travelMode: mode,
        unitSystem: google.maps.UnitSystem.METRIC
      }, mycallback);

    function mycallback(response, status) {
      if (status == google.maps.DistanceMatrixStatus.OK) {
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;

        for (var i = 0; i < origins.length; i++) {
          var results = response.rows[i].elements;
          for (var j = 0; j < results.length; j++) {
            var element = results[j];
            var distance = element.distance.text;
            var duration = element.duration.text;
            var from = origins[i];
            var to = destinations[j];
            
            var m = document.getElementById("exptTime");
            m.innerHTML = duration;
          }
        }
      }
    }
}

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
  var originAddress = originAddress;
  var destinationAddress = destinationAddress;

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
  
  getDuration(originAddress, destinationAddress, google.maps.TravelMode[selectedMode]);
}

google.maps.event.addDomListener(window, 'load', map_inititalize);

