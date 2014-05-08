var log = require("./logging")

exports.roomMap = function roomMap(req, res) {
  log.info("handlers","roomMap called");
  
  res.writeHead(200, {"Content-Type": "application/json"});
  
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
  res.write(JSON.stringify(map));
  res.end(); 
};

exports.login = function login(req, res) {
  log.info("handlers","login called"); 
  
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.write("This game sucks, but you did call playerLogin");
  res.end(); 
};
