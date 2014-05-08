var log = require("./logging");
var handlers = require("./requestHandlers");

module.exports = function(httpserv){

  httpserv.get('/roomMap', handlers.roomMap);
  httpserv.get('/login', handlers.login);
  
}