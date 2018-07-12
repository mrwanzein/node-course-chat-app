let socket = io();

socket.on('connect', function() {
    console.log('Connection made to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('newMessage', message);
    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    console.log('newMessage', message);
    let li = jQuery('<li></li>');
    let a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url); // first arg: attr, second arg: value
    li.append(a)

    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) { // 'sumbit' for forms
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {

    });
});

let locationButton = jQuery('#send-location');
locationButton.on('click', function() { // 'click' for other buttons
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
    }, function(err) {
        alert('Unable to find position');
    });
}); 