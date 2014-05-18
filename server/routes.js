var log = require("./logging");
var handlers = require("./requestHandlers");
var express = require('express');

module.exports = function(httpserv){

  httpserv.use(express.static(__dirname + '/public'));

  httpserv.get('/roomMap', handlers.roomMap);
  httpserv.get('/login', handlers.login);
  
};
