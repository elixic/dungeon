var log = require("./logging");


exports.mapIncomingClient = function(client) {


  // playerMove - player issuing a move command
  // emite back to the player a playerMoved upon successful completion
  client.on('move-player', function(data) {
    log.verbose('socketHandlers','room move received');

    client.emit('player-moved', data);
  });



};