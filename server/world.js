var log = require("./logging"); 
var events = require("events");


// private/configuration variables for the World class
// CONFIGURATION
var worldTickDelay = 1000; // number of milliseconds between world ticks

// PRIVATE VARIABLES
var eventEmitter = new events.EventEmitter(); // main event handler

function World() {
  // TODO: set up base event handlers
}


World.prototype.init = function() {
  log.info('world',"Starting up the world...");
  
  
};

World.prototype.run = function() {
  log.info('world',"Entering main world event loop...");
  
  var interval = setInterval( function() {
      log.verbose('world','World tick happening at ' + Date.now());
      
      eventEmitter.emit('worldTick');
      
  }, worldTickDelay);    
};


function createWorld() {
  var world = new World();

  world.init();
  
  return world;
}

module.exports = createWorld();
