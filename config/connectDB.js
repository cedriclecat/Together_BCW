/**
 * Created by Brecht on 7/11/2015.
 */

// Connect Database
var mongoose = require('mongoose');
//var mongodbURL = 'mongodb://localhost:27017/togetherDB';
var mongodbURL = 'mongodb://sokol:sokol@ds057234.mongolab.com:57234/togetherdb';

module.exports = (function(){
    var db = mongoose.connection;
    mongoose.connect(mongodbURL, function (error) {
        if (error) {
            console.log(error);
        }
    });
    //CONNECTION EVENTS
    //When successfully connected
    db.on('open', function () {
        console.log('Mongoose default connection open to ' + "+++ MongoLab Togetherdb server +++");
    });

    // If the connection throws an error
    db.on('error',function (err) {
        console.log('Mongoose default connection error: ' + err);
    });

    // When the connection is disconnected
    db.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function() {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });

})();