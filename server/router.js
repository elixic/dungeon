var log = require("./logging")

function route(routes, pathname)
{
  log.info("router","About to route a request for " + pathname);

  if(typeof routes[pathname] == 'function') {
    routes[pathname]();
  } else {
    // TODO: handle 404 error message here
  }
}

exports.route = route; 
