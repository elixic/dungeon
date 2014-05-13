require([map, player], function(map, items, player) {


});

var dungeon,
    header,
    footer,
    maxItems;

var ground_item_types = [
    {
        key: 'k',
        sprite: 'k',
        type: 'key',
        description: 'a key'
    },{
        key: 'g',
        sprite: 'g',
        type: 'small-gold',
        description: 'a small gold coin'
    },{
        key: 'G',
        sprite: 'G',
        type: 'big-gold',
        description: 'a large gold coin'
    },{
        key: 'i',
        sprite: 'i',
        type: 'random-normal-item',
        description: 'this normal looking item needs to be identified.'
    },{
        key: 'I',
        sprite: 'I',
        type: 'random-rare-item',
        description: 'a rare item that must be identified'
    }
]

var player = {
    playerChar: 'P',
    x: 0,
    y: 0,
    gold: 0,
    level: 0,
    name: 'player1',
    inventory: [],
    leftHand: false,
    rightHand: false
};

function drawHeader(player, header) {
    header.innerHTML = "<span>name: " + player.name + " gold: " + player.gold + "</span>"
}

function drawFooter(player, footer) {
    var items = "["
    footer.innerHTML = "<span> items: "

    for(var i = 0; i < maxItems; i++) {
        if (player.inventory.length > i) {
            items += player.inventory[i].key + ",";
        } else {
            items += "  ";
        }
    }

    items += "]";
    footer.innerHTML += items + "</span>"
}

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

function canTileBeMovedOver(map, player, posx, posy) {
    if (boundsCheck(map, posx, posy)) {
        var tile = map.data[posy].charAt(posx);
        console.log(tile);
        if (tile !== map.wall && tile !== map.closedDoor) {
            return true;
        }

        if (tile === map.closedDoor) {
            var keyIndex = -1;
            for(var i = 0; i < player.inventory.length; i++) {
                if (player.inventory[i].key === 'k') {
                    keyIndex = i;
                    break;
                }
            }

            if (keyIndex > -1) {
                player.inventory.splice(keyIndex, 1);
                return true;
            }
        }
    }

    return false;
}

function getItemFromTile(tile, items) {
    if (tile === 'i') {
        // randomly get an item from normal items
        var index = (Math.random() * 1000) + 1;
        index = Math.ceil(index);
        index = index % normal_item_types.length;
        return normal_item_types[index];
    } else if (tile === 'I') {
        // randomly get an item from rare items
    } else {
        var item = undefined;
        for(var i = 0; i < items.length; i++) {
            if (items[i].key === tile) {
                item = items[i];
            }
        }

        return item;
    }
}

function lookForItem(map, player, posx, posy) {
    var row = map.data[posy];
    var tile = row.charAt(posx);
    if (tile !== '.') {
        if (tile === 'g') {
            player.gold += 10;
        } else if (tile === 'G') {
            player.gold += 100;
        } else {
            var item = getItemFromTile(tile, ground_item_types);
            if (item) {
                player.inventory.push(item);
            }
        }

        row = stringReplace(row, tile, ".", posx - 1, posx + 1);
        map.data[posy] = row;
    }
}

function movePlayer(map, player, posx, posy) {
    lookForItem(map, player, posx, posy);

    player.x = posx;
    player.y = posy;

    drawHeader(player, header);
    drawDungeon(map.data, player, dungeon);
    drawFooter(player, footer);
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

    if (canTileBeMovedOver(map, player, newx, newy)) {
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

function stringReplace(original, pattern, replacement, start, end) {
    var front = "",
        middle = "",
        tail = "";

    if (start > 0) {
        front = original.slice(0,start);
    }

    if (end < original.length - 1) {
        tail = original.slice(end, original.length);
    }

    if (start > 0 || end < original.length) {
        middle = original.slice(start, end);
    } else {
        middle = original;
    }

    middle = middle.replace(pattern, replacement);

    console.log(front);
    console.log(middle);
    console.log(tail);

    return front + middle + tail;
}



function initialize() {
  console.log('initialize...');
  dungeon = document.getElementById('dungeon');
  header = document.getElementById('header');
  footer = document.getElementById('footer');
  maxItems = 5;
  
  player.x = 1;
  player.y = 1;
  
  header.innerHTML = "<span>Header Player Name and Stuff</span>";
  dungeon.innerHTML = "<span>Draw Dungeon Here</span>";
  footer.innerHTML = "<span>Footer Inventory and Stuff</span>";

  document.onkeydown = keypress

  drawHeader(player, header);
  drawFooter(player, footer);
  drawDungeon(map.data, player, dungeon);
};

initialize();
