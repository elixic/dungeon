var log = require("./logging");
var theWorld = require("./world");

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

  socket.emit('player-moved', moveData);
}

exports.mapIncomingClient = function(client) {

  // login - logs in the user, fn is used as a way to acknoledge the
  // message and specify whether or not the user is authenticated to
  // the client
  client.on('client-login', function(data, fn) {

    log.verbose('socketHandlers','login called');

    // TODO: actually validate password
    if(data.password === 'letmein') {
      theWorld.addPerson(data.username,client);
      client.set('username',data.username);

      fn('success');

      // user is logged in, now send them the updated map and player
      // location
      var initialLocation = {};

      initialLocation.x = 1;
      initialLocation.y = 1;
      initialLocation.icon = 'P';

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

    movePlayer(client,data);
  });

  // now that we're actually tracking this person as being "logged in" we need
  // to make sure we also handle them leaving
  client.on('disconnect', function(data) {

    log.verbose('socketHandlers', 'client disconnected');

    client.get('username', function(err, username) {


      if(username === null)
      {
        return;
      }

      //theWorld.removePerson(username);
    });
  });
};