var log = require("./logging");

// TODO: currently status handling is spread throughout the different
// request handlers. This should be consolidated in some manner. 

function route(routes, pathname, response)
{
  log.info("router","About to route a request for " + pathname);

  if(typeof routes[pathname] === 'function') {
    routes[pathname](response);
  } else {
      log.info("router","No route for: " + pathname);
      
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("Idiot. This page doesn't exist.");
      response.end(); 
  }
}

exports.route = route; 
