define(['./map', './items', './player', 'amplify'], function(map, items, player, amplify) {

    var dungeon,
        header,
        footer,
        dungetonObject = {
            init: initialize
        };

    function drawHeader(player, header) {
        header.innerHTML = "<span>name: ";
        header.innerHTML += player.getName();
        header.innerHTML += " gold: ";
        header.innerHTML += player.getGold();
        header.innerHTML += " keys: ";
        header.innerHTML += player.keyCount();
        header.innerHTML += "</span>";
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

    function movePlayer(map, item, x, y) {
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

        map.movePlayer(player.useKey, player.getIcon(), newx, newy);
    }

    function keypress(event) {
        var keyCode = event.keyCode;

        if (isMovementKey(keyCode)) {
            characterMovement(map, player, keyCode);
        }
    }

    function doLogin(io, username, password) {
        var auth = {
            username: username,
            password: password
        };

        console.log('emitting login message');
        console.log(auth);

        io.emit('client-login', auth, function(data){
            console.log(data);
        });
    }

    function setupLogin(io) {
        var loginButton = document.getElementById('loginButton'),
            username = document.getElementById('username'),
            password = document.getElementById('password'),
            login = document.getElementById('login');

        loginButton.onclick = function() {
            doLogin(io, username.value, password.value);
        };
    }

    function initialize(io) {
        dungeon = document.getElementById('dungeon');
        header = document.getElementById('header');
        footer = document.getElementById('footer');

        setupLogin(io);
        player.setPosition(1,1);
        map.init(io);
        amplify.subscribe('map-dirty', function(message) {
            movePlayer(message.map, message.item, message.x, message.y);
        });
        //map.moveCallback(movePlayer);

        header.innerHTML = "<span>Header Player Name and Stuff</span>";
        dungeon.innerHTML = "<span>Draw Dungeon Here</span>";
        footer.innerHTML = "<span>Footer Inventory and Stuff</span>";

        document.onkeydown = keypress;

        map.loadMap(0).done(function() {
            map.movePlayer(false, player.getIcon(), 1, 1);
            drawHeader(player, header);
            drawFooter(player, footer);
            drawDungeon(map.getCurrentMap(), dungeon);
        });
    }

    return dungetonObject;

});