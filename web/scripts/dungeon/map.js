define(['util/util'], function(util) {
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

    return {
        getCurrentMap: function() {
            return data;
        },

        loadMap: function(level) {

        },

        updatePlayerLocation: function(x, y) {
            return false;
        },

        getTileAt: function(x, y) {
            if (boundsCheck(x, y)) {
                return map[y].charAt(x);
            }

            return undefined;
        },

        boundsCheck: function(x, y) {
            return false;
        }
    }
})