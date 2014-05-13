var log = require("./logging"); 
var httpServer = require("./http"); 
var world = require("./world");

// initailize the world
theWorld = world(); 
theWorld.init();

// start the HTTP server
httpServer.startServer(); 
log.info('server', 'http server kicked off');


// start the world ticking 
theWorld.run(); 
