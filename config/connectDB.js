/**
 * Created by Brecht on 7/11/2015.
 */

// Connect Database
var mongoose = require('mongoose');
var mongodbURL = 'mongodb://localhost/togetherDB';

module.exports = (function(){
    mongoose.connect(mongodbURL);

    //mongoose.connection.on("connected",function(){
    //    console.log("connection met mongo server: " + mongodbURL);
    //});

    mongoose.connection.on("error", function(err){
        console.log('Mongoose default connection error: ' + err);
    });

    mongoose.disconnect();

    mongoose.connection.on("disconnected",function(){
        console.log('Mongoose default connection disconnected');
    });

})();