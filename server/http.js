var log = require("./logging"); 
var express = require("express");
var socketio = require('socket.io');



function HTTPServer(world) {
  this.http = express(); // create express app
  this.world = world; // link to world

  // hook up socket.io...
  // TODO: when we move to Express v4 we need to update how we hook up express
  var server = require('http').createServer(express);
  io = socketio.listen(server);

  // initialize middleware to support sessions
  this.http.use(express.cookieParser());
  this.http.use(express.session({secret: 'asdfasfiASFJIE2341djFIDei319#'}));

  require("./routes")(this.http); // configure routes
}


HTTPServer.prototype.startServer = function() {
  this.http.listen(8888, function() {
    log.info("http","Server is listening...");
  });
};

module.exports = createHTTPServer;

function createHTTPServer(world) {
  var server = new HTTPServer(world);

  return server;
};
