const path = require('path');
const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString, isUniqueName} = require('./utils/validation');
const {Users} = require('./utils/users');
const {Rooms} = require('./utils/rooms');
const engines = require('consolidate');
const bodyParser = require('body-parser');


let users = new Users();
let rooms = new Rooms();

app.set('views', './views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', {
        locals: {
            title: 'Join chat',
            roomLable: 'Room name',
            nameLable: 'Display name',
            sendLable: 'Join'
        },
        data: {
            options: rooms.getRoomList()
        }
    });
});

app.get('/chat/', (req, res) => {
    res.sendFile(path.join('chat.html'), {root: './views'});
});

io.on('connection', (socket) => {
    socket.on('join', async (params, callback) => {
        if (!isRealString(params.name) || (!isRealString(params.room) && !params.selected_room)) {
            callback('Name and room are required');
        } else {

            let roomName = params.room.toLowerCase();

            //TODO Fixed check for unique user name
            // if (!isUniqueName(users.users, params.name, roomName)) {
            //     await callback('Name in room must be unique');
            // }

            if (params.selected_room) {
                roomName = params.selected_room;
            }

            socket.join(roomName);

            users.removeUser(socket.id);
            users.addUser(socket.id, params.name, roomName);
            rooms.addRoom(roomName);

            io.to(roomName).emit('updateUserList', users.getUserList(roomName));

            socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
            socket.broadcast.to(roomName).emit('newMessage', generateMessage('Admin', `${params.name} user joined`));
            callback();
        }
    });

    socket.on('createMessage', (message, callback) => {
        let user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }

        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        let user = users.getUser(socket.id);

        if (user && coords) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(`${user.name}`, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', function () {
        let removedUser = users.removeUser(socket.id);

        if (removedUser) {
            io.to(removedUser.room).emit('updateUserList', users.getUserList(removedUser.room));
            io.to(removedUser.room).emit('newMessage', generateMessage('Admin', `${removedUser.name} has left`));

            let isUsersExist = users.users.filter((user) => {
                return user.room === removedUser.room;
            });

            if (isUsersExist.length === 0) {
                rooms.removeRoom(removedUser.room);
            }
        }
        console.log('Got disconnect!');
    });
});

server.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});