// var routePathsUrl = 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=sf-muni';
// var routeListUrl = 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=sf-muni';
var routeDirectionsUrl = 'http://webservices.nextbus.com/service/publicXMLFeed?command=vehicleLocations&a=sf-muni&t=0';
var routes = [];
var colorArray = [];

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
      lat: vehicles[i].getAttribute('lat'),
      lon: vehicles[i].getAttribute('lon')
    };
    routes.push(vehicleData);
  }
  callback();
};

getBuses(makePoints);

setInterval(function(){getBuses(null);}, 15000);
