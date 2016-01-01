/**
 * Created by wouter on 11/26/2015.
 */

module.exports = function(io){
    var allClients = [];
    var allClientsclient = [];
    var SocketRepo = require('./data/DataRepositorys/SocketRepo');
   /* io.sockets.on('disconnect', function(socket) {
        console.log('Got disconnect!');
        allClients.splice(allClients.indexOf(socket.nick), 1);
        socket.emit('nick',allClients);
        socket.broadcast.emit('nick',allClients);
    });*/
    io.sockets.on('connection', function (socket) {

        console.log("connected");

        socket.on('disconnect', function() {
            console.log('Got disconnect!');
            allClients.splice(allClients.indexOf(socket.nick), 1);
            allClientsclient.splice(allClientsclient.indexOf(socket.nick), 1);
            socket.emit('deleted',socket.nick);
            socket.broadcast.emit('deleted',socket.nick);
        });
        // Set the name property for a given client
        socket.on('nick', function(data) {
            var nick = data.eerst;
            var room = data.tweedes;
            socket.room = room;
            console.log('room ' + socket.room + ' saved');
            socket.join(room);
            //  socket.set('name', nick);
            socket.nick=nick;
            SocketRepo.gettheuser(nick,function(next){
                allClients.push(socket.nick);
                var found = false;
                for(var i = 0; i < allClientsclient.length; i++) {
                    if (allClientsclient[i].id == nick) {
                        found = true;
                        break;
                    }
                }
                if(found){}else {
                    allClientsclient.push(next);
                    io.sockets.in(room).emit('caty', next);
                    //socket.broadcast.to(room).emit('caty', next);
                }
                });
        });

        // This should initiate rock group chat
        socket.on('rockgroup', function(data) {
            console.log(data);
            var room = data.a;
            var data = data.b;
            // socket.get('name', function(err, nick) {
            var nickname =socket.nick ; //normally this won't be possible
            SocketRepo.gettheuser(nickname,function(next){
                var payload = {
                    message: data,
                    nick: next
                };
                io.sockets.in(room).emit('rockgroup', payload);
                //socket.broadcast.to(room).emit('rockgroup', payload);

            });

            // });
        });
    });
};