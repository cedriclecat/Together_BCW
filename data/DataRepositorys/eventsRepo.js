var mongoose = require("mongoose");
var Eventschema = require("../models/events");

Eventschema.getEvents = function(){
    //console.log("lel");
    EventSchema.find({}).exec(function(err,events){
        if (err)
            res.send(err);
        res.json(events)
    })
};

module.exports = Eventschema;