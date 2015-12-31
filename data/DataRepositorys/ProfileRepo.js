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
                var dtm = new Date(even.MemberSince);
                data.UserData = even;
                var maand = dtm.getMonth()+1;
                data.MemberSince = dtm.getDay() + "/" + maand+"/"+dtm.getFullYear();
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
                                e.done=1;
                            }else{
                                e.done=0;
                            }

                        });
                        data.mijnevents = even;
                        Groups.find({createdby:zoek},function(err,even) {

                            if (err) {
                                return next(err);
                            }
                        data.groups = even;
                            Groups.find({},function(err,even) {
                                if (err) {
                                    return next(err);
                                }
                                data.allgroups = even;
                                next();
                            });
                        });
                    }
                });
            }
        });
    };
    changepicture = function(data,user,next){
        var mongoose = require('mongoose');
        var Usermod = mongoose.model('User');
        var files = data.file;
        console.log(files);
        var spliter = files.path.split("\\");
        var filenaam1 = "../img/uploads/" + spliter[4];
        console.log(user);
        console.log(filenaam1);
        var options = { multi: true };
        Usermod.update({_id:user},{picture:filenaam1},options,function(err){
            if(err){
                next(err);
            }
            next();
        });

    };

    createevent = function(data,user,next){
        var mongoose = require('mongoose');
        Events = mongoose.model('events');
        Groups = mongoose.model('groups');
        var files = data.files;
        console.log(files);
        var spliter = files[0].path.split("\\");
        console.log(spliter);
        var filenaam1 = "../img/uploads/" + spliter[4];
        var spliter2 = files[1].path.split("\\");
        var filenaam2 = "../img/uploads/" + spliter2[4];
        data = data.body;
        Events.find({},function(err,even) {
            var mijngetal = 1;
            even.forEach(function(e){
                mijngetal = mijngetal +1;

            });
            mijngetal = mijngetal + Date.now();
            data.TIMESTAMP = new Date();
            var mijnevent ={};
            mijnevent.id= ''+mijngetal;
            mijnevent.name = data.etitle;
            mijnevent.description = data.edescription;
            mijnevent.date = data.date;
            mijnevent.time = data.time;
            mijnevent.maxMember = data.slots;
            var members = {};
            members.id=user;
            mijnevent.members = members;
            mijnevent.location = data.Location;
            mijnevent.price = data.cost;
            mijnevent.pictureUrl = filenaam1;
            mijnevent.tags = '';
            mijnevent.promoted= 0;
            mijnevent.TIMESTAMP = new Date();
            mijnevent.pictureSlider = filenaam2;
            mijnevent.createdby = user;
            console.log(mijnevent);
            Events.create(mijnevent, function (err) {
                console.log(err);
                if (err) { return next(err); }
                Groups.findOne({id:data.Group},function(err,even){
                    if(even.eventids==""){

                        even.eventids = mijngetal;
                    }else{
                        even.eventids = even.eventids + "," + mijngetal;
                    }
                    var options = { multi: true };
                    console.log(even);
                    Groups.update({id:data.Group},{eventids:even.eventids},options,function(err){
                        next(mijnevent);
                    });
                });
            });


        });


    };
    return {
        createaevent: createevent,
        getevents : getevents,
        changepicture:changepicture
    };
})();

module.exports = profilerepo;