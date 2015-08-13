var routeDirectionsUrl = 'http://webservices.nextbus.com/service/publicXMLFeed?command=vehicleLocations&a=sf-muni&t=0';
var routes = [];

var getBuses = function(callback){
  $.ajax({
    url: routeDirectionsUrl,
    success: function(data, status){
      parsedXML(data, callback);
    },
    error: function(jqXHR, status, err){
      console.log(status);
    }
  });
};

var parsedXML = function(xml, callback) {
  routes = [];
  var vehicles = xml.getElementsByTagName('vehicle');
  for(var i = 0; i < vehicles.length; i++) {
    var vehicleData = {
      id: vehicles[i].id,
      routeTag: vehicles[i].getAttribute('routeTag'),
      heading: vehicles[i].getAttribute('heading'),
      dirTag: vehicles[i].getAttribute('dirTag'),
      lat: vehicles[i].getAttribute('lat'),
      lon: vehicles[i].getAttribute('lon')
    };
    routes.push(vehicleData);
  }
  callback();
};

getBuses(makePoints);

setInterval(function(){getBuses(updatePoints);}, 15000);
