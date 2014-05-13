define(['util/util'], function(util) {

    // todo: make a call to the server to get this stuff.
    var rare_item_types = [],
        normal_item_types = [
        {
            key: 'ch',
            sprite: 'ch',
            type: 'cloth-hat',
            description: 'keeps your brain warm',
            attributes: {
                armor: 0,
                damage: 0,
                weight: 0,
                warm: 1
            }
        },{
            key: 'cs',
            sprite: 'cs',
            type: 'cloth-shirt',
            description: 'keeps you warm and in style',
            attributes: {
                armor: 0,
                damage: 0,
                weight: 0,
                warm: 1
            }
        },{
            key: 'cp',
            sprite: 'cp',
            type: 'cloth-pants',
            description: 'keeps your legs warm',
            attributes: {
                armor: 0,
                damage: 0,
                weight: 0,
                warm: 1
            }
        },{
            key: 'lh',
            sprite: 'lh',
            type: 'leather-hat',
            description: 'keeps your brain safe',
            attributes: {
                armor: 1,
                damage: 0,
                weight: 0,
                warm: 1
            }
        },{
            key: 'ls',
            sprite: 'ls',
            type: 'leather-shirt',
            description: 'keeps you warm and safe',
            attributes: {
                armor: 1,
                damage: 0,
                weight: 1,
                warm: 1
            }
        },{
            key: 'lp',
            sprite: 'lp',
            type: 'leather-pants',
            description: 'keeps your legs warm',
            attributes: {
                armor: 1,
                damage: 0,
                weight: 1,
                warm: 1
            }
        },{
            key: 'mh',
            sprite: 'mh',
            type: 'metal-hat',
            description: 'a sturdy metal helmet',
            attributes: {
                armor: 3,
                damage: 0,
                weight: 2,
                warm: 1
            }
        },{
            key: 'ms',
            sprite: 'ms',
            type: 'mail-shirt',
            description: 'chain mail shirt',
            attributes: {
                armor: 3,
                damage: 0,
                weight: 2,
                warm: 1
            }
        },{
            key: 'mp',
            sprite: 'mp',
            type: 'mail-pants',
            description: 'chain mail pants',
            attributes: {
                armor: 3,
                damage: 0,
                weight: 2,
                warm: 1
            }
        },{
            key: 'ws',
            sprint: 'ws',
            type: 'wooden-sword',
            description: 'a wooden sword, who are we kidding, call it a stick.',
            attributes: {
                armor: 0,
                damage: 1,
                weight: 1,
                warm: 0
            }
        },{
            key: 'is',
            sprite: 'is',
            type: 'iron-sword',
            description: 'a real sword, made out of metal and everything.',
            attributes: {
                armor: 0,
                damage: 3,
                weight: 2,
                warm: 0
            }
        },{
            key: 'sd',
            sprite: 'sd',
            type: 'steel-dagger',
            description: 'a small, sharp and hard dagger',
            attributes: {
                armor: 0,
                damage: 2,
                weight: 0,
                warm: 0
            }
        },{
            key: 'wc',
            sprite: 'wc',
            type: 'wooden-club',
            description: 'a bigger stick',
            attributes: {
                armor: 0,
                damage: 2,
                weight: 2,
                warm: 0
            }
        }];

    function getRandomItem() {
        if (normal_item_types && normal_item_types.length > 0) {
            var item_index = util.getRandomNumberBetween(0, normal_item_types.length);
            return normal_item_types[item_index];
        }

        return undefined;
    };

    function getRandomRareItem() {
        if (rare_item_types && rare_item_types.length > 0)
        {
            var item_index = util.getRandomNumberBetween(0, rare_item_types.length);
            return rare_item_types[item_index];
        }

        return undefined;
    };

    return {
        getRandomItem: getRandomItem,
        getRandomRareItem: getRandomRareItem
    };
});
