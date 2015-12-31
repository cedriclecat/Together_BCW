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

        socket.emit('nick', allClientsclient);
        console.log("connected");

        socket.on('disconnect', function() {
            console.log('Got disconnect!');
            allClients.splice(allClients.indexOf(socket.nick), 1);
            allClientsclient.splice(allClientsclient.indexOf(socket.nick), 1);
            socket.emit('deleted',socket.nick);
            socket.broadcast.emit('deleted',socket.nick);
        });
        // Set the name property for a given client
        socket.on('nick', function(nick) {
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
                    socket.emit('caty', next);
                    socket.broadcast.emit('caty', next);
                }
                });
        });

        // This should initiate rock group chat
        socket.on('rockgroup', function(data) {
            // socket.get('name', function(err, nick) {
            var nickname =socket.nick ; //normally this won't be possible

            var payload = {
                message: data.message,
                nick: nickname
            };
            socket.emit('rockgroup',payload); // show it on your own browser
            socket.broadcast.emit('rockgroup', payload); // broadcast to others
            // });
        });
    });
};