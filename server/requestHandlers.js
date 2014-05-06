var log = require("./logging")

function roomMap(response) {
  log.info("handlers","roomMap called");
}

function playerLogin() {
  log.info("handlers","playerLogin called"); 
}

exports.roomMap = roomMap; 
exports.playerLogin = playerLogin;
