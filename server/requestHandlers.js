var log = require("./logging")

function roomMap(response) {
  log.info("handlers","roomMap called");
  
  response.writeHead(200, {"Content-Type": "application/json"});
  
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
    
  //response.setEncoding('utf8');
  response.write(JSON.stringify(map));
  response.end(); 
}

function playerLogin(response) {
  log.info("handlers","playerLogin called"); 
  
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("This game sucks, but you did call playerLogin");
  response.end(); 
}

exports.roomMap = roomMap; 
exports.playerLogin = playerLogin;
