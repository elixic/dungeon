require.config({
    default: 'scripts/lib',
    shim: {
        'socketio': {
            exports: 'io'
        }
    },
    paths: {
        jquery: 'lib/jquery-2.1.1.min',
        socketio: '../socket.io/socket.io'
    }
});

require(['socketio', 'dungeon/dungeon'], function(io, dungeon) {
    var io = io.connect('http://localhost:8888');
    dungeon.init(io);
});