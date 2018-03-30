var https = require('https'),
    fs = require('fs'),
    app = require('express')(),
    http = require('http'),
    request = require('request'),
    mysql = require('mysql');

var apiurl = 'http://api.orchideats.test/api';

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "scooter",
    database: "orchideats"
});

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

    var save = 'INSERT INTO inboxes SET ?';
    var remove = 'DELETE FROM inboxes WHERE room_id = ?;'

    // new message
    socket.on('newMessage', function (data) {
        con.query(save, data, function (err, result) {
            if (err) throw err;
        });
        io.sockets.in(data.room_id).emit('update', data);
    });

    // //delete convo
    // socket.on('delete', function (data) {
    //     con.query(remove, data, function (err, result) {
    //         if (err) throw err;
    //
    //     });
    //
    // });

    socket.on('getInbox', function (data) {
        request.get(apiurl + '/inbox/' + data, function (error, res, body) {
            if (error) {
                socket.emit('err');
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