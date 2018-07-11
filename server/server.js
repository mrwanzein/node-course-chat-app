const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
let server = http.createServer(app);
let io = socketIO(server);



app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined'));

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));

        /* socket.broadcast.emit('newMessage', { // broadcasting: everyone receive but you
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        }); */
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});