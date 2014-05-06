var log = require("./logging"); 
var httpServer = require("./http"); 
var router = require("./router");
var routes = require("./routes");

// initailize the world

// start the HTTP server
httpServer.startServer(router.route, routes); 
log.info('server', 'http server kicked off');

// start the world ticking 
