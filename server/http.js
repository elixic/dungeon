var log = require("./logging"); 
var http = require("http"); 

function startServer() {
  function onRequest(request, response) {
    log.info("http","Request received."); 
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("This game sucks");
    response.end(); 
  }

  http.createServer(onRequest).listen(8888);
  log.info("http","Server is listening...");
}

exports.startServer = startServer;
