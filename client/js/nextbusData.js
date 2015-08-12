var routePathsUrl = 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=sf-muni';
var routeListUrl = 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=sf-muni';
var routeDirectionsUrl = 'http://webservices.nextbus.com/service/publicXMLFeed?command=vehicleLocations&a=sf-muni&r=N&t=0';

var route = {};

$.ajax({
  url: url,
  success: function(data, status){
    parsedXML(data);
    // console.log(data);
  },
  error: function(jqXHR, status, err){
    console.log(status);
  }
});

var parsedXML = function(xml) {
  var points = xml.getElementsByTagName('point');
  console.log(points);
};
