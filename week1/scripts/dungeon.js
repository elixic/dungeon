var dungeon,
    header,
    footer;

var rare_item_types = []

var normal_item_types = []

var ground_item_types = [
    {
        sprite: 'k',
        type: 'key',
        description: 'a key'
    },{
        sprite: 'g',
        type: 'small-gold',
        description: 'a small gold coin'
    },{
        sprite: 'G',
        type: 'big-gold',
        description: 'a large gold coin'
    },{
        sprite: 'i',
        type: 'random-normal-item',
        description: 'this normal looking item needs to be identified.'
    },{
        sprite: 'I',
        type: 'random-rare-item',
        description: 'a rare item that must be identified'
    }
]

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
        "#...#.G...k..#..........#.........#",
        "#...################*#######*######",
        "#.#.*.............................#",
        "#...#......k.............g........#",
        "###################################"
        ]
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
        for(var y = 0; y < inMap.length; y+=1) {
            dungeonMap += "<span>";
            if (inPlayer.y === y) {
                dungeonMap += drawPlayerRow(inMap[y], inPlayer);
            } else {
                dungeonMap += inMap[y];
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
        var prePlayer = inRow.substr(0,inPlayer.x);
        var postPlayer = inRow.substr(inPlayer.x+1,inRow.length - inPlayer.x - 1);
        playerRow = prePlayer + inPlayer.playerChar + postPlayer;
    }
    
    return playerRow;
}

function isMovementKey(code) {
    return code === 87 || code === 83 || code === 68 || code === 65;
}

function boundsCheck(map, posx, posy) {
    if (posy >= 0 && posy < map.data.length) {
        if (posx >= 0 && posx < map.data[posy].length) {
            return true; // in bounds of map
        }
    }

    // out of bounds
    return false;
}

function canTileBeMovedOver(map, posx, posy) {
    if (boundsCheck(map, posx, posy)) {
        return map.data[posy].charAt(posx) !== map.wall;
    }

    return false;
}

function lookForItem(map, player, posx, posy) {
    var tile = map.data[posy].charAt(posx);
    if (tile !== '.') {
        if (tile === 'g') {
            // GOLD!!

        } else if (tile === 'G') {

        } else if (tile === 'k') {

        } else if (tile === 'i') {

        } else if (tile === 'I') {

        }
    }
}

function movePlayer(map, player, posx, posy) {
    lookForItem(map, player, posx, posy);

    player.x = posx;
    player.y = posy;

    drawDungeon(map.data, player, dungeon);
}

function characterMovement(map, player, code) {

    var newx = player.x,
        newy = player.y;

    if (code === 87) {  // up (w)
        newy = newy - 1;
    } else if (code === 65) { // left (a)
        newx = newx - 1;
    } else if (code === 83) { // down (s)
        newy = newy + 1;
    } else if (code === 68) { // right (d)
        newx = newx + 1;
    }

    if (canTileBeMovedOver(map, newx, newy)) {
        movePlayer(map, player, newx, newy);
    }
}

function keypress(event) {
    var keyCode = event.keyCode;
    console.log(event.keyCode);

    if (isMovementKey(keyCode)) {
        characterMovement(map, player, keyCode);
    }
}

function initialize() {
  console.log('initialize...');
  dungeon = document.getElementById('dungeon');
  header = document.getElementById('header');
  footer = document.getElementById('footer');
  
  player.x = 1;
  player.y = 1;
  
  header.innerHTML = "<span>Header Player Name and Stuff</span>";
  dungeon.innerHTML = "<span>Draw Dungeon Here</span>";
  footer.innerHTML = "<span>Footer Inventory and Stuff</span>";

  document.onkeydown = keypress

  drawDungeon(map.data, player, dungeon);
};

initialize();
