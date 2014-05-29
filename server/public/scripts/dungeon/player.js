define(['util/util'], function(util){
    var player = {
        icon: 'P',
        x: 0,
        y: 0,
        gold: 0,
        keys: 0,
        level: 0,
        name: 'player1',
        inventory: [],
        leftHand: false,
        rightHand: false,
        inventoryMaxSize: 5,
        io: null
    }

    function getPlayerIcon() {
        return player.icon;
    };

    function getInventoryMaxSize() {
        return player.inventoryMaxSize;
    };

    function setInventoryMaxSize(size) {
        player.inventoryMaxSize = size;
    };

    function setPosition(x, y) {
        player.x = x;
        player.y = y;
    };

    function getPosition() {
        return {
            x: player.x,
            y: player.y
        }
    };

    function addItem(item) {
        if (player.inventory.length < player.inventoryMaxSize) {
            player.inventory.push(item);
        } else {
            throw Error('You cannot cary anymore.');
        }
    };

    function getItems() {
        return player.inventory;
    }

    function removeItem(key) {
        var removeIndex = 0;
        inventory.forEach(function(index, item) {
            if (player.inventory[index].key == key) {
                removeIndex = index;
                return true;
            }
        });

        this.inventory.splice(removeIndex, 1);
    };

    function hasItem(key) {
        var value = false;
        this.inventory.forEach(function(index, item) {
            if (player.inventory[index].key == key) {
                value = true;
                return true;
            }
        });

        return value;
    };

    function hasKey() {
        return player.keys > 0;
    };

    function addKey() {
        player.keys++;
    };

    function useKey() {
        console.log('trying to use key');
        if (player.keys <= 0) {
            return false;
        }

        player.keys--;
        return true;
    };

    function keyCount() {
        return player.keys;
    }

    function setName(name) {
        player.name = name;
    };

    function getName() {
        return player.name;
    };

    function incrementGold(gold) {
        player.gold += gold;
    };

    function decrementGold(gold) {
        player.gold -= gold;
    };

    function getGold() {
        return player.gold;
    };

    function init(io) {
        player.io = io;

        io.on('player-moved', function(data){
            if(data.icon === player.icon) {
                console.log('player moved message received by player');
                setPosition(data.x, data.y);
            }
        });

        io.on('player-item', function(data) {
            if (data.icon === player.icon) {
                if (data.gold) {
                    incrementGold(data.gold);
                }

                if (data.item) {
                    addItem(data.item);
                }

                if (data.key) {
                    addKey();
                }
            }
        });

        io.on('player-name', function(data){
            if (data.icon === player.icon) {
                setName(data.name);
            }
        });
    };

    return {
        setName: setName,
        getName: getName,
        getIcon: getPlayerIcon,
        getMaxItems: getInventoryMaxSize,
        setMaxItems: setInventoryMaxSize,
        setPosition: setPosition,
        getPosition: getPosition,
        addItem: addItem,
        getItems: getItems,
        hasItem: hasItem,
        removeItem: removeItem,
        addGold: incrementGold,
        useGold: decrementGold,
        getGold: getGold,
        addKey: addKey,
        hasKey: hasKey,
        useKey: useKey,
        keyCount: keyCount,
        init: init
    };
});