require.config({
    default: 'scripts/lib',
    paths: {
        jquery: 'lib/jquery-2.1.1.min',
        socketio: '../socket.io/socket.io',
        bullhorn: 'lib/bullhorn-min'
    },
    shim: {
        'socketio': {
            exports: 'io'
        },
        'bullhorn': {
            exports: 'ChannelFactory'
        }
    }
});

require(['socketio', 'dungeon/dungeon', 'bullhorn'], function(io, dungeon, Factory) {
    console.log(Factory);
    console.log(io);
    var io = io.connect('http://localhost:8888');
    dungeon.init(io);
});