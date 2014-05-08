var log = require("./logging"); 
var express = require("express");

var http = express(); 

// bring in the routes
require("./routes")(http);

function startServer() {
  http.listen(8888, function() {
    log.info("http","Server is listening...");
  });
}

exports.startServer = startServer;
