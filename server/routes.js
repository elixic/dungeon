var log = require("./logging");
var handlers = require("./requestHandlers");
var express = require('express');

module.exports = function(httpserv){

  // uncomment this line if you want to see a w3c log of every 
  // HTTP request
  //httpserv.use(express.logger());

  httpserv.use(express.static(__dirname + '/public'));

  httpserv.get('/roomMap', handlers.roomMap);
  httpserv.get('/login', handlers.login);
  
};
