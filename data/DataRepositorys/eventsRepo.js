var mongoose = require("mongoose");
var eventSchema = require("../models/events");

eventSchema.getEvents = function(){
    //console.log("lel");
    eventSchema.find({}).exec(function(err,events){
        if (err)
            res.send(err);
        res.json(events)
    })
};

eventSchema.deleteEvent = function(req,res,id){
    eventSchema.findByIdAndRemove({_id: id},function(err){
        if (!err) {
            res.send("no error")

        }
        else {
            console.log('error' + err)
        }
    });
}

module.exports = eventSchema;