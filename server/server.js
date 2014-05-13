var log = require("./logging"); 
var httpServer = require("./http"); 
var world = require("./world");

// initailize the world
world.init();


// start the HTTP server
httpServer.startServer(); 
log.info('server', 'http server kicked off');


// start the world ticking 
world.run(); 
