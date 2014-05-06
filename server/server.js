var log = require("./logging"); 
var httpServer = require("./http"); 

httpServer.startServer(); 
log.info('server', 'http server kicked off');
