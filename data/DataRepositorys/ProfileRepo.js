/**
 * Created by wouter on 12/26/2015.
 */
var Events = require('../models/events');

profilerepo = (function () {
    getevents = function(data,next){
        var user = data.user._id;
        Events.find({createdby:user},function(err,even) {

            if (err) { return next(err);}
            else {
            even.forEach(function(e){
                e.done=1;


                });

             data.mijnevents = even;
                console.log(data);
                next();
            }
        });



    };
    createevent = function(data,next){

        var user = data.user._id;

        data = data.body;
        Events.find({},function(err,even) {
            var mijngetal = 1;
            even.forEach(function(e){
                mijngetal = mijngetal +1;

            });
            data.TIMESTAMP = new Date();
            console.log(data);
            var mijnevent ={};
            mijnevent.id= ''+mijngetal;
            mijnevent.name = data.etitle;
            mijnevent.description = data.ediscription;
            mijnevent.date = data.date;
            mijnevent.time = data.time;
            mijnevent.maxMember = data.slots;
            var members = {};
            mijnevent.members = members;
            mijnevent.location = data.Location;
            mijnevent.price = data.cost;
            mijnevent.pictureUrl = data.pictureUrl;
            mijnevent.tags = '';
            mijnevent.promoted= 0;
            mijnevent.TIMESTAMP = new Date();
            mijnevent.pictureSlider = data.pictureSlider;
            mijnevent.createdby = user;
            console.log(mijnevent);        console.log(data);
            Events.create(mijnevent, function (err) {
                if (err) { return next(err); }
                 next(mijnevent);
            });
        });


    };
    return {
        createaevent: createevent,
        getevents : getevents
    };
})();

module.exports = profilerepo;