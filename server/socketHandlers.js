var log = require("./logging");
var theWorld = require("./world");
var io = require('socket.io');

// TODO: we need a reference to the socket.io object created in the
// HTTPServer class since that's the live socket.io instance that everything
// is routed through, for now we'll have the HTTPServer pass this instance off
// so we can use it internally, but ultimately we should have the ownership
// and management of that instance a little bit clearer
var globalIO = null;

exports.init = function(socketIO) {
  globalIO = socketIO;
}

function removePlayer(username) {

  theWorld.removePerson(username);
}

function updateMap(socket) {
  // TODO: This is hardcoded...it obviously shouldn't be
  var map = ["###################################",
    "#.#k#........*..........#.......g.#",
    "#...#..i.....#.......i..#..k......#",
    "#...#........#.k........#.........#",
    "#.#.#........#..........#.........*",
    "#...#.G...k..#..........#.........#",
    "#...################*#######*######",
    "#.#.*.............................#",
    "#...#......k.............g........#",
    "###################################"];

  socket.emit('update-map',JSON.stringify(map));
}

function movePlayer(socket,moveData) {

  // update everybody in this room that a player has moved
  socket.get('username', function(err, user) {
    globalIO.sockets.in(user.currentRoom).emit('player-moved', moveData);
  });


}

exports.mapIncomingClient = function(client) {

  // login - logs in the user, fn is used as a way to acknoledge the
  // message and specify whether or not the user is authenticated to
  // the client
  client.on('client-login', function(data, fn) {

    log.verbose('socketHandlers','login called');

    // TODO: actually validate password
    if(data.password === 'letmein') {
      var user = theWorld.addPerson(data.username,client);
      client.set('username',user);

      fn('success');

      // user is logged in, now send them the updated map and player
      // location
      var initialLocation = {};

      // TODO: this should be a serialed value, for now, force to start in a
      // hard coded location
      initialLocation.x = 1;
      initialLocation.y = 1;
      initialLocation.icon = user.icon;

      // join the client to the current room for notifications
      client.join(user.currentRoom);

      // UPDATE INITIAL STATE ON CLIENT
      updateMap(client);
      movePlayer(client,initialLocation);
    }else {
      fn('failure');
    }
  });

  // playerMove - player issuing a move command
  // emite back to the player a playerMoved upon successful completion
  client.on('move-player', function(data) {
    log.verbose('socketHandlers','room move received');

    client.get('username', function(err, user) {

      data.icon = user.icon;

      movePlayer(client,data);
    });
  });

  // now that we're actually tracking this person as being "logged in" we need
  // to make sure we also handle them leaving
  client.on('disconnect', function(data) {

    log.verbose('socketHandlers', 'client disconnected');

    client.get('username', function(err, user) {


      if(user.username === null)
      {
        return;
      }

      theWorld.removePerson(user.username);
    });
  });
};