var log = require("./logging"); 
var httpServer = require("./http"); 

// initailize the world

// start the HTTP server
httpServer.startServer(); 
log.info('server', 'http server kicked off');

// start the world ticking 
