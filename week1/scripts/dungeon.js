var dungeon,
    header,
    footer;

var map = {
    wall: '#',
    floor: '.',
    closedDoor: '*',
    openDoor: '+',
    data: [
        "###################################",
        "#.#k#........*..........#.......g.#",
        "#...#..i.....#.......i..#..k......#",
        "#...#........#.k........#.........#",
        "#.#.#........#..........#.........*",
        "#...#.....k..#..........#.........#",
        "#...################*#######*######",
        "#.#.*.............................#",
        "#...#......k.............g........#",
        "###################################"
        ],
    visible: []
};

var player = {
    playerChar: 'P',
    x: 0,
    y: 0,
    gold: 0,
    inventory: [],
    leftHand: false,
    rightHand: false
};

function drawDungeon(inMap, inPlayer, inDungeon) {
    var dungeonMap = "";
    if (inMap && inPlayer && inDungeon) {
        for(var x = 0; x < inMap.length; x+=1) {
            dungeonMap += "<span>";
            if (inPlayer.x === x) {
                dungeonMap += drawPlayerRow(inMap[x], inPlayer);
            } else {
                dungeonMap += inMap[x];
            }
            dungeonMap += "</span><br>";
        }
        
        inDungeon.innerHTML = dungeonMap;
    } else {
        inDungeon.innerHTML = "<span>Something is wrong</span>";
    }
};

function drawPlayerRow(inRow, inPlayer) {
    var playerRow = "Nothing To See Here";
    if (inRow && inPlayer) {
        var prePlayer = inRow.substr(0,inPlayer.y);
        var postPlayer = inRow.substr(inPlayer.y+1,inRow.length - inPlayer.y - 1);
        playerRow = prePlayer + inPlayer.playerChar + postPlayer;
    }
    
    return playerRow;
}

function checkLineOfSight(inPlayer, inMap, inViz) {
    var curX = inPlayer.x,
        curY = inPlayer.y,
        top = -1, bottom = -1;
        
        for(x = curX; x > 0; x++) {
            // look left
            if (inMap[x].charAt(curY - 1)) {
                
            }
        }
}

function initialize() {
  dungeon = document.getElementById('dungeon');
  header = document.getElementById('header');
  footer = document.getElementById('footer');
  
  player.x = 1;
  player.y = 1;
  
  header.innerHTML = "<span>Header Player Name and Stuff</span>";
  dungeon.innerHTML = "<span>Draw Dungeon Here</span>";
  footer.innerHTML = "<span>Footer Inventory and Stuff</span>";
  
  drawDungeon(map.visible, player, dungeon);
};

initialize();
