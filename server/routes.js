var requestHandlers = require("./requestHandlers"); 

var routes = {}
routes["/roomMap"] = requestHandlers.roomMap; 
routes["/playerLogin"] = requestHandlers.playerLogin;

module.exports = routes;
