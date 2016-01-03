

var mongoose = require("mongoose");

EventsRepo = (function(){

    var Event = require("../models/events.js");

    var getAllEvents = function(next){
        Event.find({}).exec(function(err,docs){
           if(err)console.log(err);
            next(docs);
        });
    };

    return{
        model:Event,
        getAllEvents:getAllEvents
    };
})();

module.exports = EventsRepo;