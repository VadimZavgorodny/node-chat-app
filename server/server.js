const path = require('path');
const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const {generateMessage, generateLocationMessage} = require('./utils/message');

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from server');
    });

    socket.on('createLocationMessage', (coords) => {
        console.log(coords);
        io.emit('newLocationMessage', generateLocationMessage("Admin", coords.latitude, coords.longitude));
    });

    socket.on('disconnect', function () {
        console.log('Got disconnect!');
    });
});

server.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});