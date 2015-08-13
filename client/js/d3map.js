var width = window.innerWidth * 0.65;
var height = window.innerHeight;

//uses colorbrewer for background map colors
var mapFill = d3.scale.ordinal()
                .domain([0, 10])
                .range(colorbrewer.PRGn[10]);

var projection = d3.geo.albersUsa()
                   .translate([90300, 8870])
                   .scale([258000]);

var path = d3.geo.path()
             .projection(projection);

var mapBackground = d3.select('#backgroundMap')
                      .append('svg')
                      .attr('width', width)
                      .attr('height', height);                                   

//creates tooltip behavior for hovering over buses
var tip = d3.tip()
            .attr('class', 'd3-tip')
            .html(function(d){
              return '<b>Route: </b>'+ d.routeTag + '<br>' + '<b>Vehicle ID: </b>' + d.id;
            });

mapBackground.call(tip);

d3.json('../data/neighborhoods.json', function(json){
  mapBackground.selectAll('path')
               .data(json.features)
               .enter()
               .insert('path')
               .attr('d', path)
               .style('fill', function(d, i){
                  return mapFill(i*3);
               })
               .style('stroke', '#2F4F4F');
});

var makePoints = function(){
  mapBackground.selectAll('rect')
               .data(routes)
               .enter()
               .append('rect')
               .attr('width', 8)
               .attr('height', 5)
               .attr('class', function(d){
                 return d.routeTag;
               })
               .style('fill', 'white')
               .style('stroke', '#2F4F4F')
               //rotates bus using degree angle provided by NextBus
               .attr('transform', function(d){
                 return 'translate(' + projection([d.lon, d.lat]) + '),' + 'rotate(' + d.heading +')';
               })
               //shows/hides tooltip on mouseover
               .on('mouseover', tip.show)
               .on('mouseout', tip.hide);
};

var updatePoints = function() {
  var buses = d3.selectAll('rect').data(routes);
  //update position and rotation of buses
  buses.attr('transform', function(d){
        return 'translate(' + projection([d.lon, d.lat]) + '),' + 'rotate(' + d.heading +')';
     });       
};
