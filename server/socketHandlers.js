var log = require("./logging");
var theWorld = require("./world");

function removePlayer(username) {

  theWorld.removePerson(username);
}

exports.mapIncomingClient = function(client) {

  // login
  client.on('client-login', function(data, fn) {

    log.verbose('socketHandlers','login called');

    // TODO: actually validate password
    if(data.password === 'letmein') {
      theWorld.addPerson(data.username,client);
      client.set('username',data.username);

      fn('success');
    }else {
      fn('failure');
    }
  });

  // playerMove - player issuing a move command
  // emite back to the player a playerMoved upon successful completion
  client.on('move-player', function(data) {
    log.verbose('socketHandlers','room move received');

    client.emit('player-moved', data);
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