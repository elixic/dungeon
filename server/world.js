var log = require("./logging"); 
var events = require("events");


var worldTickDelay = 1000; // number of milliseconds between world ticks

var eventEmitter = new events.EventEmitter(); // main event handler

module.exports.init = function init() {
  log.info('world',"Starting up the world...");
  
  
};

module.exports.run = function run() {
  log.info('world',"Entering main world event loop...");
  
  var interval = setInterval( function() {
      log.verbose('world','World tick happening at ' + Date.now());
      
      eventEmitter.emit('worldTick');
      
  }, worldTickDelay);    
};