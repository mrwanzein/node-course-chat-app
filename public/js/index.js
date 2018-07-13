let socket = io();

socket.on('connect', function() {
    console.log('Connection made to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');  
    let template = jQuery('#message-template').html(); // grab the html via jQuery
    let html = Mustache.render(template, { 
     // render it through mustache, second argument for dynamic injection   
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    }); 

    jQuery('#messages').append(html); // render in view

    /*  
        Switching to mustache.js for more convienient html templating
   
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let li = jQuery('<li></li><br>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    jQuery('#messages').append(li); */
});

socket.on('newLocationMessage', function(message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = jQuery('#location-message-template').html();
    let html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    
    jQuery('#messages').append(html);
    /* let li = jQuery('<li></li><br>');
    let a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url); // first arg: attr, second arg: value
    li.append(a) */
});

jQuery('#message-form').on('submit', function(e) { // 'sumbit' for forms
    e.preventDefault();

    let messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val('');
    });
});

let locationButton = jQuery('#send-location');
locationButton.on('click', function() { // 'click' for other buttons
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send location'); // 1 arg
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
    }, function(err) {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to find position');
    });
}); 