var log = require("./logging"); 
var events = require("events");


// private/configuration variables for the World class
// CONFIGURATION
var worldTickDelay = 1000; // number of milliseconds between world ticks

// PRIVATE VARIABLES
var eventEmitter = new events.EventEmitter(); // main event handler

function World() {
  // TODO: set up base event handlers

  this.userList = [];
}


World.prototype.init = function() {
  log.info('world',"Starting up the world...");
  
  
};

World.prototype.run = function() {
  log.info('world',"Entering main world event loop...");
  
  var interval = setInterval( function() {
//      log.verbose('world','World tick happening at ' + Date.now());
      
      eventEmitter.emit('worldTick');
      
  }, worldTickDelay);    
};

World.prototype.addPerson = function(username,socket) {
  var user = {};

  user.username = username;
  user.socket = socket;
  user.currentRoom = '1';

  // generate a random letter for the player
  var n = Math.floor(Math.random()*26);
  user.icon = String.fromCharCode(n + 65);

  this.userList.push(user);
  return user;
};

World.prototype.removePerson = function(username) {

  // we aren't tracking this user anymore, remove him
  for(var i = 0; i <= this.userList.length - 1; i++) {
    if(this.userList[i].username === username) {
      this.userList.splice(i, 1);
    }
  }
};


function createWorld() {
  var world = new World();

  world.init();
  
  return world;
}

module.exports = createWorld();
