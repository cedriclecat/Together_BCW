/**
 * Created by wouter on 11/26/2015.
 */

module.exports = function(io){

    io.sockets.on('connection', function (socket) {

        // Set the name property for a given client
        socket.on('nick', function(nick) {
            //  socket.set('name', nick);
            socket.nick="anon";
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