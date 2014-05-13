var npmlog = require("npmlog");

// have a standard place for logging in case we want to change defaults, this 
// gives us a single place to do it across the server

npmlog.level = Infinity; // for now, while developing, show everything

module.exports = npmlog;
