var log = require("./logging"); 
var express = require("express");



function HTTPServer(world) {
  this.http = express(); // create express app
  this.world = world; // link to world
  require("./routes")(this.http); // configure routes
}


HTTPServer.prototype.startServer = function() {
  this.http.listen(8888, function() {
    log.info("http","Server is listening...");
  });
}

module.exports = createHTTPServer;

function createHTTPServer(world) {
  var server = new HTTPServer(world);

  return server;
}
