/**
 * Created by wouter on 12/26/2015.
 */
var Events = require('./events');

profilerepo = (function () {
    createevent = function(data,next){
        data.TIMESTAMP = new Date();
        console.log(data);
var mijnevent ={};
        mijnevent.id='30';
       mijnevent.name = data.etitle;
       mijnevent.description = data.ediscription;
       mijnevent.date = 'fg';
       mijnevent.time = 'fg';
       mijnevent.maxMember = data.slots;
       var members = {};
        mijnevent.members = members;
       mijnevent.location = 'fg';
       mijnevent.price = data.cost;
       mijnevent.pictureUrl = 'fg';
       mijnevent.tags = 'fg';
       mijnevent.promoted= 0;
       mijnevent.TIMESTAMP = new Date();
       mijnevent.pictureSlider = 'fg';
        console.log(mijnevent);        console.log(data);
        Events.create(mijnevent, function (err) {
            console.log("jj");
            console.log(err);
            if (err) { return next(err); }
            next(mijnevent);
        });

    };
    return {
        createaevent: createevent
    };
})();

module.exports = profilerepo;