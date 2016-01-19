

var mongoose = require("mongoose");

EventsRepo = (function(){

    var Event = require("../models/events.js");

    var getAllEvents = function(next){
        Event.find({}).exec(function(err,docs){
           if(err)//console.log(err);
            next(docs);
        });
    };

    var deleteEvent = function(req,res,id){
        Event.findByIdAndRemove({_id: id},function(err){
            if (!err) {
                res.redirect('/admin');
            }
            else {
               // console.log('error' + err)
            }
        });
    };

    return{
        model:Event,
        getAllEvents:getAllEvents,
        deleteEvent: deleteEvent
    };
})();

module.exports = EventsRepo;