/**
 * Created by wouter on 12/26/2015.
 */
var Events = require('./events');

profilerepo = (function () {
    createevent = function(data,next){
        data.TIMESTAMP = new Date();
var mijnevent ={};
       mijnevent.name = data.etitle;
       mijnevent.description = data.ediscription;
       mijnevent.date = 'fg';
       mijnevent.time = 'fg';
       mijnevent.maxMember = 5;
       mijnevent.membersId = 'fg';
       mijnevent.location = 'fg';
       mijnevent.price = 5;
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