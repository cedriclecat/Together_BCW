/**
 * Created by wouter on 12/26/2015.
 */
var Events = require('./events');

profilerepo = (function () {
    createevent = function(data,next){

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
            console.log(mijnevent);        console.log(data);
            Events.create(mijnevent, function (err) {
                if (err) { return next(err); }
                 next(mijnevent);
            });
        });


    };
    return {
        createaevent: createevent
    };
})();

module.exports = profilerepo;