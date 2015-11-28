/**
 * Created by wouter on 11/26/2015.
 */

module.exports = function(io){
    var allClients = [];
   /* io.sockets.on('disconnect', function(socket) {
        console.log('Got disconnect!');
        allClients.splice(allClients.indexOf(socket.nick), 1);
        socket.emit('nick',allClients);
        socket.broadcast.emit('nick',allClients);
    });*/
    io.sockets.on('connection', function (socket) {
        socket.on('disconnect', function() {
            console.log('Got disconnect!');
            allClients.splice(allClients.indexOf(socket.nick), 1);
            socket.emit('nick',allClients);
            socket.broadcast.emit('nick',allClients);
        });
        // Set the name property for a given client
        socket.on('nick', function(nick) {
            //  socket.set('name', nick);
            socket.nick=nick;
            allClients.push(socket.nick);
            socket.emit('nick',allClients);
            socket.broadcast.emit('nick',allClients);
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