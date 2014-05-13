define(['./map', './items', './player'], function(map, items, player) {

    var dungeon,
        header,
        footer;

    function drawHeader(player, header) {
        header.innerHTML = "<span>name: " + player.getName() + " gold: " + player.getGold() + "</span>"
    }

    function drawFooter(player, footer) {
        var items = "[",
            playerItems = player.getItems(),
            maxItems = player.getMaxItems();
        footer.innerHTML = "<span> items: "

        for(var i = 0; i < maxItems; i++) {
            if (playerItems.length > i) {
                items += playerItems[i].key + ",";
            } else {
                items += "  ";
            }
        }

        items += "]";
        footer.innerHTML += items + "</span>"
    }

    function drawDungeon(inMap, inDungeon) {
        var dungeonMap = "";
        if (inMap && inDungeon) {
            for(var y = 0; y < inMap.length; y+=1) {
                dungeonMap += "<span>" + inMap[y] + "</span><br>";
            }

            inDungeon.innerHTML = dungeonMap;
        } else {
            inDungeon.innerHTML = "<span>Something is wrong</span>";
        }
    };

    function isMovementKey(code) {
        return code === 87 || code === 83 || code === 68 || code === 65;
    }

    function movePlayer(map, player, item, x, y) {
        player.setPosition(x, y);

        if (item) {
            player.addGold(item.gold);

            if (item.key && item.key > 0) {
                player.addKey();
            }

            if (item.item) {
                if (item.item === 'i') {
                    player.addItem(items.getRandomItem());
                } else if (item.item === 'I') {
                    player.addItem(items.getRandomRareItem());
                }
            }
        }

        drawHeader(player, header);
        drawDungeon(map.getCurrentMap(), dungeon);
        drawFooter(player, footer);
    }

    function characterMovement(map, player, code) {

        var playerPostion = player.getPosition(),
            newx = playerPostion.x,
            newy = playerPostion.y,
            movement = { success: false };

        if (code === 87) {  // up (w)
            newy = newy - 1;
        } else if (code === 65) { // left (a)
            newx = newx - 1;
        } else if (code === 83) { // down (s)
            newy = newy + 1;
        } else if (code === 68) { // right (d)
            newx = newx + 1;
        }

        movement = map.movePlayer(false, player.getIcon(), newx, newy);

        if (movement.success) {
            console.log(movement);
            movePlayer(map, player, movement.item, newx, newy);
        } else {
            console.log(movement);
            // todo: add something to give the user a message about why movement didn't work?
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
        player.setPosition(1,1);
        map.movePlayer(false, player.getIcon(), 1, 1);

        header.innerHTML = "<span>Header Player Name and Stuff</span>";
        dungeon.innerHTML = "<span>Draw Dungeon Here</span>";
        footer.innerHTML = "<span>Footer Inventory and Stuff</span>";

        document.onkeydown = keypress

        drawHeader(player, header);
        drawFooter(player, footer);
        drawDungeon(map.getCurrentMap(), dungeon);
    };

    return {
        init: initialize
    };

});