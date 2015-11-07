/**
 * Created by Brecht on 7/11/2015.
 */

// Connect Database
var mongoose = require('mongoose');
var mongodbURL = 'mongodb://localhost/togetherDB';

module.exports = (function(){
    var db = mongoose.connect(mongodbURL); // connecteer de database

    db.on("open",function(){
        console.log("connection met mongo server" + mongodbURL);
    });

    db.on("error", function(error){
        throw new Error(error);
    });
    db.on("close",function(){});

})();