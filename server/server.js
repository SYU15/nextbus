var express = require('express');
var path = require('path');

var app = express();
app.use(express.static(__dirname + '/../client'));
app.all('/*', function(req, res, next) {
      res.sendFile(path.resolve('client/index.html'));
  });

var PORT = process.env.PORT || 8000;
var server = app.listen(PORT);

console.log("NextBus server listening on port ", PORT);
