

var mongoose = require("mongoose");
var Eventschema = require("./data/models/events");
var GroupSchema = require("./data/models/groups");
var UserSchema = require("./data/models/groups");



Eventschema.getEvents = function(){
    Eventschema.find({}).exec(function(err,docs){
        console.log(docs);
    })
};



module.exports = Eventschema;