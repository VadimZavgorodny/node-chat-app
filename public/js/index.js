const socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnect from server');
});

socket.on('newMessage', function (message) {
    console.log('New Message', message);
    let li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

socket.emit('createMessage', {from: 'Frank', text: 'Hi'}, function(data) {
    console.log(data);
});

$('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function (data) {
        console.log(data);
    });
});