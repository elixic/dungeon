define(['jquery', 'util/util', 'amplify'], function($, util, amplify) {
    var map = {
            wall: '#',
            floor: '.',
            closedDoor: '*',
            openDoor: '+',
            data: [],
            players: []
        },
        ground_item_types = [
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
            }],
        mapObject = {
            getCurrentMap: getCurrentMap,
            movePlayer: movePlayer,
            getTileAt: getTileAt,
            boundsCheck: boundsCheck,
            init: init
        };

    function getCurrentMap() {
        var currentMap = [];
        for(var i = 0; i < map.data.length; i++) {
            currentMap.push(map.data[i]);
        }

        for(var i = 0; i < map.players.length; i++) {
            var p = map.players[i],
                tile = currentMap[p.y].charAt(p.x);
            currentMap[p.y] = currentMap[p.y].substring(0, p.x) + p.icon + currentMap[p.y].substring(p.x+1);
        }

        return currentMap;
    };

    function lookForItem(posx, posy) {
        var row = map.data[posy],
            tile = row.charAt(posx),
            item = {
                gold: 0,
                item: '',
                key: 0
            };

        if (tile !== '.') {
            if (tile === 'g') {
                item.gold = 10;
            } else if (tile === 'G') {
                item.gold = 100;
            } else if(tile === 'k') {
                item.key = 1;
            } else {
                item.item = tile;
            }

            row = util.stringReplace(row, tile, ".", posx - 1, posx + 1);
            map.data[posy] = row;
        }

        return item;
    };

    function init(io) {
        var publishMapDirtyMessage = function(icon, x, y) {
            var item = lookForItem(x,y);
            updatePlayerLocation(icon, x, y);
            amplify.publish('map-dirty', {
                map: mapObject,
                item: item,
                x: x,
                y: y
            });
        };

        map.io = io;
        io.on('player-moved', function(data) {
            publishMapDirtyMessage(data.icon, data.x, data.y);
        });

        io.on('update-map', function(data) {
            var jData = JSON.parse(data);
            console.log(jData);
            map.data = jData;
            amplify.publish('map-dirty', {
                map: mapObject
            });
        });
    };

    function movePlayer(useKey, playerIcon, x, y) {
        var canMove = canTileBeMovedOver(useKey, x, y);

        if (canMove.success) {
            map.io.emit('move-player', {
                icon: playerIcon,
                x: x,
                y: y
            });
        } else {
            console.log(canMove);
        }
    };

    function updatePlayerLocation(playerIcon, x, y) {
        var index = -1;
        for(var i = 0; i < map.players.length; i++) {
            if (map.players[i].icon === playerIcon) {
                index = i;
                break;
            }
        }

        if (index >= 0) {
            map.players[index].x = x;
            map.players[index].y = y;
        } else {
            map.players.push({
                icon: playerIcon,
                x: x,
                y: y
            });
        }
    };

    function canTileBeMovedOver(useKey, x, y) {
        if (boundsCheck(x, y)) {
            var tile = getTileAt(x, y);
            if (tile === map.wall) {
                return { message: "wall", success: false };
            } else if (tile === map.closedDoor && !useKey()) {
                return { message: "door", success: false };
            } else {
                return { message: "success", success: true };
            }
        }

        return { message: "bounds", success: false };
    };

    function boundsCheck(x, y) {
        if (y < map.data.length) {
            return map.data[y].length > x;
        }

        return false;
    };

    function getTileAt(x, y) {
        if (boundsCheck(x, y)) {
            return map.data[y].charAt(x);
        }

        return undefined;
    };

    return mapObject;
})