var mongoose = require("mongoose");
var Eventschema = require("../models/events");

Eventschema.getEvents = function(){
    console.log("lel");
    Eventschema.find({}).exec(function(err,docs){
        console.log(docs);
    })
};

module.exports = Eventschema;