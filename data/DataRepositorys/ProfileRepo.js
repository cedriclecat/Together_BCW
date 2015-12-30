/**
 * Created by wouter on 12/26/2015.
 */

profilerepo = (function () {
    getevents = function(data,next){
        var mongoose = require('mongoose');
        User = mongoose.model('User');
        Events = mongoose.model('events');
        Groups = mongoose.model('groups');

        var grps = data.query.id;
        var user = data.user._id;
        var zoek = "";

        if(grps == undefined || grps==user){
            //U eigen profiel
            data.OWN = 1;
            zoek = user;
        }else{
            data.OWN=0;
 zoek = grps;
        }
        if(data.user.local.ADMIN == 1){
            data.OWN = 1;
        }
        var naam ="";
        User.findOne({_id:zoek},function(err,even) {
            if (err) { return next(err);}else{
                data.UserData = even;
                if(even.firstName ==""){
                    naam = even.email;
                }else{
                    naam = even.firstName + " " + even.lastName;
                }
                data.naam=naam;

                Events.find({createdby:zoek},function(err,even) {
                    if (err) { return next(err);}
                    else {
                        even.forEach(function(e){
                            var datum  = e.date;
                            var stukjes = datum.split("/");
                            var vandaag = new Date();
console.log(stukjes);
                            var eventdatum = new Date();
                            eventdatum.setMonth(stukjes[1] -1);
                            eventdatum.setDate(stukjes[0]);
                            eventdatum.setYear(stukjes[2]);
                            console.log(vandaag);
                            console.log(eventdatum);
                            if(eventdatum <= vandaag){
                                e.done=0;
                            }else{
                                e.done=1;
                            }

                        });
                        data.mijnevents = even;
                        Groups.find({createdby:zoek},function(err,even) {

                            if (err) {
                                return next(err);
                            }
                        data.groups = even;
                            next();
                        });


                    }
                });
            }
        });
    };
    createevent = function(data,next){
        var mongoose = require('mongoose');
        Events = mongoose.model('events');
        var user = data.user._id;

        data = data.body;
        Events.find({},function(err,even) {
            var mijngetal = 1;
            even.forEach(function(e){
                mijngetal = mijngetal +1;

            });
            data.TIMESTAMP = new Date();
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
            mijnevent.pictureUrl = "https://s-media-cache-ak0.pinimg.com/236x/a3/80/7e/a3807e09afab6d37ff5352a270a467b4.jpg";
            mijnevent.tags = '';
            mijnevent.promoted= 0;
            mijnevent.TIMESTAMP = new Date();
            mijnevent.pictureSlider = "https://s-media-cache-ak0.pinimg.com/236x/a3/80/7e/a3807e09afab6d37ff5352a270a467b4.jpg";
            mijnevent.createdby = user;
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