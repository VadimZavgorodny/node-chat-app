const socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnect from server');
});

socket.on('newLocationMessage', function (message) {
    console.log('New Location Message', message);
    let li = $('<li></li>');
    let a = $('<a target="_blank">My current location </a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);

    console.log(li);

    $('#messages').append(li);
});

socket.on('newMessage', function (message) {
    console.log('New Message', message);
    let li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
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

let locationButton = $('#send-location');

locationButton.on('click', function (e) {
    e.preventDefault();

    if ("geolocation" in navigator) {
        /* geolocation is available */
        navigator.geolocation.getCurrentPosition(function (position) {
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, function () {
            alert('Unable to fetch location');
        });
    } else {
        /* geolocation IS NOT available */
        return alert('Geolocation not supported by your browser.');
    }

});