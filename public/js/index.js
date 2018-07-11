let socket = io();

socket.on('connect', function() {
    console.log('Connection made to server');

    socket.emit('createMessage', {
        from:'Andrew',
        text:'Ok, I get it now'
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('newMessage', message);
});