var https = require('https'),
    fs = require('fs'),
    app = require('express')(),
    http = require('http'),
    request = require('request');

var apiurl = 'https://api.orchideats.com/api';

var httpServer = http.createServer(app);
// var httpsServer = https.createServer(options, app);
var io = require('socket.io').listen(httpServer);

users = [];
connections = [];

httpServer.listen(3000, function () {
    console.log("Server working....");
});

// httpsServer.listen(process.env.PORT || 3443, function () {
//     console.log("Https Server working....");
// });

io.sockets.on('connection', function (socket) {
    connections.push(socket);

    // Disconnect
    socket.on('disconnect', function (data) {
        users.splice(users.indexOf(socket.username), 1);
        connections.splice(connections.indexOf(socket), 1);
    });

    //create Chat room
    socket.on('create', function (data) {
        socket.join(data);
    });

    // Join Chat Room
    socket.on('join', function (data) {
        socket.join(data); // We are using room of socket io
    });

    socket.on('leave', function (data) {
        socket.leave(data);
    });

    // new message
    socket.on('newMessage', function (data) {
        var options = {
            method: 'post',
            body: data,
            json: true,
            url: apiurl + '/save'
        };
        request(options, function (error, response, body) {
            if (error) {
                socket.emit('err', body);
            } else {
                io.sockets.in(data.room_id).emit('update', body);
            }
        });
    });

    socket.on('getInbox', function (data) {
        request.get(apiurl + '/inbox/' + data, function (error, res, body) {
            if (error) {
                socket.emit('err', body);
            } else {
                socket.emit('showInbox', body);
            }
        })
    });

    //get all messages
    socket.on('messages', function (data) {
        request.get(apiurl + '/messages/' + data, function (error, res, body) {
            if (error) {
                socket.emit('error');
            } else {
                socket.emit('show', body);
            }
        })
    });

});