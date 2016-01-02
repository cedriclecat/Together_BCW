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
        /*SocketRepo.gettheuser(nick,function(next) {
            allClients.push(socket.nick);
        });*/
        socket.onclose = function(reason){
            //var index = allClients.indexOf(socket);
            var leaving_socket =  socket.adapter.sids[socket.id];
            var newarray = [];
            for(i = 0 ; i<allClientsclient.length;i++){
                if(allClientsclient[i].id==leaving_socket.id){}else{
                    newarray.push(allClientsclient[i]);
                }
            }
            allClientsclient = newarray;
            var rooms = Object.keys(leaving_socket);
            socket.leave(rooms[0]);
            io.sockets.in(rooms[0]).emit('deleted', socket.nick);


          Object.getPrototypeOf(this).onclose(this,reason);
        };
        socket.on('disconnect', function() {
            console.log('Got disconnect!');

            //socket.emit('deleted',socket.nick);
            //socket.broadcast.emit('deleted',socket.nick);
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
                var currentUser = {};
                currentUser.nick = next;
                currentUser.id=socket.id;
                allClientsclient.push(currentUser);
                console.log(currentUser);
                var clients = socket.adapter.sids;
                var keys = Object.keys(clients); //alle users
                console.log(keys.length);
                /*
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
                 });*/

                var doorsturen = [];
                for(i=0; i<keys.length;i++){
                    var socketvanarray = clients[keys[i]];
                    var arr = Object.keys(socketvanarray);

                    console.log(arr);
                    if(arr.length ==2){
                        //zoja will zeggen dat hij in een room zit aka eerste > '4':true
                        var eerstenodekey = arr[0];
                        eerstenodekey = eerstenodekey.replace("'","");
                        console.log("HIERHIERHIER");
                        console.log(eerstenodekey); // zou normaal room moeten zijn
                        if(eerstenodekey==room) {
                            //arr[1] => socket.id
                            for (b = 0; b < allClientsclient.length; b++) {
                                if (allClientsclient[b].id == arr[1]) {
                                    //ZELFDE ID
                                    console.log(allClientsclient[b].nick); //id van user
                                    doorsturen.push(allClientsclient[b]);
                                    //alle users aka emiten :D
                                }
                            }
                        }


                    }

                }
                io.sockets.in(room).emit('caty', doorsturen);
            });


            //code om alle sids van de room "room" te krijgen
            //in lus emiten naar client


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