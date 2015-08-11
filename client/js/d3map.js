var width = 1280;
var height = 1000;
var fill = d3.scale.ordinal()
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

d3.json('../data/neighborhoods.json', function(json){
  mapBackground.selectAll('path')
               .data(json.features)
               .enter()
               .append('path')
               .attr('d', path)
               .style('fill', function(d, i){
                  return fill(i*3);
               })
               .style('stroke', '#2F4F4F');
});
