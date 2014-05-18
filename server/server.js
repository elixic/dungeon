var log = require("./logging"); 
var httpServer = require("./http"); 
var theWorld = require("./world");

// start the HTTP server
theServer = httpServer(theWorld);
theServer.startServer(); 
log.info('server', 'http server kicked off');


// start the world ticking 
theWorld.run(); 
