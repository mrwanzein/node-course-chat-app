let socket = io();

socket.on('connect', function() {
    console.log('Connection made to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('newMessage', message);
});