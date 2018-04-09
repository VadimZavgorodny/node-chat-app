const path = require('path');
const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat',
        createAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createAt: new Date().getTime()
    });

    socket.on('createMessage', (message) => {
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createAt: new Date().getTime()
        // })
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createAt: new Date().getTime()
        });
    });

    socket.on('disconnect', function () {
        console.log('Got disconnect!');
    });
});

server.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});