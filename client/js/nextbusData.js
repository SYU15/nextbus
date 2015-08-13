var routeDirectionsUrl = 'http://webservices.nextbus.com/service/publicXMLFeed?command=vehicleLocations&a=sf-muni&t=0';
var routes = [];

var getBuses = function(callback){
  $.ajax({
    url: routeDirectionsUrl,
    success: function(data, status){
      //if successful, parse xml file sent back
      parsedXML(data, callback);
    },
    error: function(jqXHR, status, err){
      console.log(status);
    }
  });
};

var parsedXML = function(xml, callback) {
  //clear out old routes
  routes = [];
  var vehicles = xml.getElementsByTagName('vehicle');
  for(var i = 0; i < vehicles.length; i++) {
    //make object used for data in d3
    var vehicleData = {
      id: vehicles[i].id,
      routeTag: vehicles[i].getAttribute('routeTag'),
      heading: vehicles[i].getAttribute('heading'),
      lat: vehicles[i].getAttribute('lat'),
      lon: vehicles[i].getAttribute('lon')
    };
    routes.push(vehicleData);
  }
  callback();
};

//slight delay to make sure map displays first, tried using queue.js from d3, wouldn't work
setTimeout(function(){
  getBuses(makePoints);
}, 500);

//update bus routes every 15 seconds
setInterval(function(){
    getBuses(updatePoints);
  }, 15000);
