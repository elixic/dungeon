var log = require("./logging"); 
var http = require("http"); 
var url = require("url"); 

function startServer(route, routes) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    log.info("http","Request received for: " + pathname); 

    route(routes, pathname, response); 
  }

  http.createServer(onRequest).listen(8888);
  log.info("http","Server is listening...");
}

exports.startServer = startServer;
