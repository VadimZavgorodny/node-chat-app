var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
    socket.emit('createMessage', {
        from: "kat@bk.ru",
        text: 'Hey. This is Vadim'
    });
});

socket.on('disconnect', function () {
    console.log('Disconect from server');
});

socket.on('newMessage', function (message) {
    console.log('New Message', message);
});