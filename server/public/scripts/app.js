require.config({
    default: 'scripts/lib',
    paths: {
        jquery: 'lib/jquery-2.1.1.min',
        socketio: '../socket.io/socket.io',
        amplify: 'lib/amplify.min'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'socketio': {
            exports: 'io'
        },
        'amplify': {
            deps: ['jquery'],
            exports: 'amplify'
        }
    }
});

require(['socketio', 'dungeon/dungeon'], function(io, dungeon) {
    var io = io.connect('http://localhost:8888');
    dungeon.init(io);
});