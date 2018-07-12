const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
let server = http.createServer(app);
let io = socketIO(server);



app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('Connected to server');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

    // broadcasting: everyone receive but you
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined')); 

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text)); // to emit in a listener

        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat, coords.lng));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});