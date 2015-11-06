/**
 * Created by Brecht on 7/11/2015.
 */

// Connect Database
var mongoose = require('mongoose');
var mongodbURL = 'mongodb://localhost/togetherDB';

module.exports = (function(){
    var db = mongoose.connect(mongodbURL); // connecteerd de database

    mongoose.connection.on("open",function(){
        console.log("connection met mongo server" + mongodbURL);
        // get collection (=table) names als test
        mongoose.connection.db.collectionNames(function(err,names){
            console.log("collection list: ");
            console.log(names);
        });
    });

    mongoose.connection.on("error", function(){});
    mongoose.connection.on("close",function(){});

})();