require.config({
    default: 'scripts/lib',
    paths: {
        jquery: 'lib/jquery-2.1.1.min'
    }
});

require(['dungeon/dungeon'], function(dungeon) {
    dungeon.init();
});