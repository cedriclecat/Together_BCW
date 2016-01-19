/**
 * Created by wouter on 12/26/2015.
 */

profilerepo = (function () {

    updateEvent = function (data, next) {


        Events = require('../models/events');


        // prictureUrl:data.picture

        Events.update({id: data.id}, {
            $set: {
                name: data.title,
                description: data.description,
                date: data.date,
                time: data.time,
                maxMember: data.slots,
                location: data.location,
                price: data.cost
            }
        }, function (err) {
            if (err) {
                //  console.log(err);
                next(err);

            }
            else {
                //nog als er een image bij staat
                next();
            }

        });
    };
    deleteEvent = function (id, next) {

        Events = require('../models/events');

        Events.remove({id: id}, function (err) {
            if (err) {
                //   console.log(err);
                return next(err);
            }
            else {
                //    console.log("test");
                next();
            }

        });
    };
    getevents = function (data, next) {
        var mongoose = require('mongoose');
        User = mongoose.model('User');
        Events = mongoose.model('events');
        Groups = mongoose.model('groups');
        var getnaam = require('./Profielmenu');
        getnaam.getname(data, function (dfdf) {
            // console.log(dfdf);
            if (dfdf == "N") {
                data.TOON = false;
            } else {
                data.TOON = true;
                // console.log("GOOO");
                data.FOTO = dfdf.foto;
                data.NAAM = dfdf.naam;
                data.ADMIN = dfdf.Admin;
            }
            var grps = data.query.id;
            var user = data.user._id;
            var zoek = "";

            if (grps == undefined || grps == user) {
                //U eigen profiel
                data.OWN = 1;
                zoek = user;
            } else {
                data.OWN = 0;
                zoek = grps;
            }
            if (data.user.local.ADMIN == 1) {
                data.OWN = 1;
            }
            var naam = "";
            User.findOne({_id: zoek}, function (err, even) {

                if (err) {
                    console.log(err);
                    return next(err);
                } else {
                    var dtm = new Date(even.MemberSince);
                    //   console.log(even);
                    var friends = even.contacts;
                    var pendings = even.pendingcontacts;


                    data.UserData = even;
                    var maand = dtm.getMonth() + 1;

                    data.MemberSince = dtm.getDate() + "/" + maand + "/" + dtm.getFullYear();
                    if (even.firstName == "") {
                        var x = even.email.split("@");
                        naam = x[0];
                    } else {
                        naam = even.firstName + " " + even.lastName;
                    }
                    data.naam = naam;


                    Events.find({members: user}, function (err, even) {
                        if (err) {
                            return next(err);
                        }
                        else {
                            data.mijngoingevents = even;
                        }
                    });
                    Events.find({createdby: zoek}, function (err, even) {
                        if (err) {
                            return next(err);
                        }
                        else {
                            even.forEach(function (e) {
                                var datum = e.date;
                                var stukjes = datum.split("/");
                                var vandaag = new Date();
                                //  console.log(stukjes);
                                var eventdatum = new Date();
                                eventdatum.setMonth(stukjes[1] - 1);
                                eventdatum.setDate(stukjes[0]);
                                eventdatum.setYear(stukjes[2]);
                                //   console.log(vandaag);
                                //     console.log(eventdatum);
                                if (eventdatum <= vandaag) {
                                    e.done = 1;
                                } else {
                                    e.done = 0;
                                }

                            });
                            data.mijnevents = even;
                            Groups.find({createdby: zoek}, function (err, even) {

                                if (err) {
                                    return next(err);
                                }
                                data.groups = even;
                                Groups.find({}, function (err, even) {
                                    if (err) {
                                        return next(err);
                                    }
                                    data.allgroups = even;
                                    User.find({}, function (err, even) {
                                        var pend = [];
                                        var fri = [];
                                        var pendse = [];
                                        var frise = [];
                                        var sepe = 0;
                                        var frie = 0;

                                        if (friends === undefined || friends == "") {

                                        } else {
                                            frise = friends.split(";;");
                                            frie = 1;
                                        }
                                        if (pendings === undefined || pendings == "") {

                                        } else {
                                            sepe = 1;
                                            pendse = pendings.split(";;");
                                        }
                                        even.forEach(function (e) {
                                            var naam = "";
                                            if (e.firstName == "") {
                                                var x = e.email.split("@");
                                                naam = x[0];
                                            } else {
                                                naam = e.firstName + " " + e.lastName;
                                            }
                                            //    console.log(pendings);
                                            //    console.log("****************");
                                            //     console.log(friends);
                                            if (frie == 1) {
                                                frise.forEach(function (friend) {
                                                    if (e._id == friend) {
                                                        var mijnobject = {};
                                                        mijnobject.id = e._id;
                                                        mijnobject.naam = naam;
                                                        mijnobject.foto = e.picture;
                                                        fri.push(mijnobject);
                                                    }
                                                });
                                            }
                                            if (sepe == 1) {
                                                pendse.forEach(function (friend) {
                                                    if (e._id == friend) {
                                                        var mijnobject = {};
                                                        mijnobject.id = e._id;
                                                        mijnobject.naam = naam;
                                                        mijnobject.foto = e.picture;
                                                        pend.push(mijnobject);
                                                    }
                                                });
                                            }

                                        });
                                        data.pending = pend;
                                        data.friends = fri;
                                        var xarr = [];
                                        for (df = 0; df < fri.length; df++) {
                                            if (df < 7) {
                                                xarr.push(fri[df]);
                                            }
                                        }

                                        data.friends2 = xarr;
                                        var friend = 0;
                                        var pending = 0;
                                        var unknown = 0;
                                        if (data.OWN == 0) {
                                            //Ander profiel
                                            //user id van current user

                                            //    console.log(user);
                                            //    console.log(pend);
                                            //    console.log(fri);
                                            //friend?
                                            fri.forEach(function (friend) {
                                                var id = "" + friend.id;
                                                var us = "" + user;
                                                if (id == us) {
                                                    friend = 1;
                                                    pending = 0;
                                                    unknown = 0;
                                                }
                                            });
                                            //pending?
                                            if (friend == 0) {
                                                pend.forEach(function (friend) {
                                                    //  console.log(friend.id);
                                                    //   console.log(user);
                                                    var id = "" + friend.id;
                                                    var us = "" + user;
                                                    if (id == us) {
                                                        friend = 0;
                                                        pending = 1;
                                                        unknown = 0;
                                                    }
                                                });
                                            }
                                            //   console.log(pending);
                                            //niks?
                                            if (friend == 0 && pending == 0) {
                                                friend = 0;
                                                pending = 0;
                                                unknown = 1
                                            }
                                        }
                                        data.izfriend = friend;
                                        data.izpending = pending;
                                        data.izunknown = unknown;

                                        // console.log(pend);
                                        //   console.log(fri);
                                        next();

                                    });


                                });
                            });
                        }
                    });
                }
            });
        });
    };
    changepicture = function (data, user, next) {
        var mongoose = require('mongoose');
        var Usermod = mongoose.model('User');
        //Groups = mongoose.model('groups');
        var files = data.file;
        //    console.log(files);
        var spliter = files.path.split("\\");
        var filenaam1 = "../img/uploads/" + spliter[4];
        //    console.log(user);
        //   console.log(filenaam1);
        var options = {multi: true};
        Usermod.update({_id: user}, {picture: filenaam1}, options, function (err) {
            if (err) {
                next(err);
            }
            /*Groups.find({}, function (err, datanext) {
             if(err){next(err);}
             datanext.each(function(group){
             var changed =0;
             var chat = group.chat;
             var NIEUWECHAT = [];
             chat.each(function(chatnode){
             if(chatnode.nick.id==user){
             changed=1;
             chatnode.nick.Foto=filenaam1;
             }else{
             NIEUWECHAT.push(chatnode);
             }
             if(changed==1){
             var options = {multi: true};
             Groups.update({id: user}, {chat: NIEUWECHAT}, options, function (err) {
             if (err) {
             }
             });
             }
             });

             });

             });*/
            next();
        });

    };

    createevent = function (data, user, next) {
        var mongoose = require('mongoose');
        Events = mongoose.model('events');
        Groups = mongoose.model('groups');
        var files = data.files;
        //console.log(files);
        var spliter = files[0].path.split("\\");
        //console.log(spliter);
        var filenaam1 = "../img/uploads/" + spliter[4];
        var spliter2 = files[1].path.split("\\");
        var filenaam2 = "../img/uploads/" + spliter2[4];
        data = data.body;
        Events.find({}, function (err, even) {
            var mijngetal = 1;
            even.forEach(function (e) {
                mijngetal = mijngetal + 1;

            });
            mijngetal = mijngetal + Date.now();
            data.TIMESTAMP = new Date();
            var mijnevent = {};
            mijnevent.id = '' + mijngetal;
            mijnevent.name = data.etitle;
            mijnevent.description = data.edescription;
            mijnevent.date = data.date;
            mijnevent.time = data.time;
            mijnevent.maxMember = data.slots;
            var members = {};
            members.id = user;
            mijnevent.members = members;
            mijnevent.location = data.Location;
            mijnevent.price = data.cost;
            mijnevent.pictureUrl = filenaam1;
            mijnevent.tags = '';
            mijnevent.promoted = 0;
            mijnevent.TIMESTAMP = new Date();
            mijnevent.pictureSlider = filenaam2;
            mijnevent.createdby = user;
            //   console.log(mijnevent);
            Events.create(mijnevent, function (err) {
                // console.log(err);
                if (err) {
                    return next(err);
                }
                //  console.log(data.Group);
                Groups.findOne({id: data.Group}, function (err, even) {

                    if (even != null) {

                        if (even.eventids == "") {

                            even.eventids = mijngetal;
                        } else {
                            even.eventids = even.eventids + "," + mijngetal;
                        }
                        var options = {multi: true};
                        // console.log(even);

                        Groups.update({id: data.Group}, {eventids: even.eventids}, options, function (err) {
                            next(mijnevent);
                        });
                    }
                    else {
                        next(mijnevent);
                    }
                });
            });


        });


    };
    acceptfriend = function (data, user, next) {
        var mongoose = require('mongoose');
        var Usermod = mongoose.model('User');
        var grps = data.query.id;
        //User ophalen
        Usermod.findOne({_id: grps}, function (err, even) {
            var pendings = even.pendingcontacts;
            var newpendings = "";
            var friends = even.contacts;
            var newfriends = "";
            //Pending verwijderen
            var pendingarr = pendings.split(";;");
            for (i = 0; i < pendingarr.length; i++) {
                if (pendingarr[i] == user) {
                } else {
                    if (newpendings == "") {
                        newpendings = pendingarr[i];
                    } else {
                        newpendings = ";;" + pendingarr[i];
                    }
                }
            }
            //friend toevoegen
            if (friends === undefined || friends == "") {
                friends = user;
            } else {
                friends = ";;" + user;
            }

            //usersaven
            var options = {multi: true};
            Usermod.update({_id: grps}, {pendingcontacts: newpendings, contacts: friends}, options, function (err) {
                Usermod.findOne({_id: user}, function (err, even) {
                    var pendings = even.pendingcontacts;
                    var newpendings = "";
                    var friends = even.contacts;
                    var newfriends = "";
                    //Pending verwijderen
                    var pendingarr = pendings.split(";;");
                    for (i = 0; i < pendingarr.length; i++) {
                        if (pendingarr[i] == grps) {
                        } else {
                            if (newpendings == "") {
                                newpendings = pendingarr[i];
                            } else {
                                newpendings = ";;" + pendingarr[i];
                            }
                        }
                    }
                    //friend toevoegen
                    if (friends === undefined || friends == "") {
                        friends = grps;
                    } else {
                        friends = ";;" + grps;
                    }

                    //usersaven
                    var options = {multi: true};
                    Usermod.update({_id: user}, {
                        pendingcontacts: newpendings,
                        contacts: friends
                    }, options, function (err) {
                        next();
                    });
                });
            });
        });
    };
    deletefriend = function (data, user, next) {
        var mongoose = require('mongoose');
        var Usermod = mongoose.model('User');
        var grps = data.query.id;
        //User ophalen
        Usermod.findOne({_id: grps}, function (err, even) {
            var pendings = even.contacts;
            var newpendings = "";

            //Pending verwijderen
            var pendingarr = pendings.split(";;");
            for (i = 0; i < pendingarr.length; i++) {
                if (pendingarr[i] == user) {
                } else {
                    if (newpendings == "") {
                        newpendings = pendingarr[i];
                    } else {
                        newpendings = ";;" + pendingarr[i];
                    }
                }
            }

            //usersaven
            var options = {multi: true};
            Usermod.update({_id: grps}, {contacts: newpendings}, options, function (err) {
                Usermod.findOne({_id: user}, function (err, even) {
                    var pendings = even.contacts;
                    var newpendings = "";

                    //Pending verwijderen
                    var pendingarr = pendings.split(";;");
                    for (i = 0; i < pendingarr.length; i++) {
                        if (pendingarr[i] == grps) {
                        } else {
                            if (newpendings == "") {
                                newpendings = pendingarr[i];
                            } else {
                                newpendings = ";;" + pendingarr[i];
                            }
                        }
                    }

                    //usersaven
                    var options = {multi: true};
                    Usermod.update({_id: user}, {contacts: newpendings}, options, function (err) {
                        next();
                    });
                });
            });
        });
    };
    deletepending = function (data, user, next) {
        var mongoose = require('mongoose');
        var Usermod = mongoose.model('User');
        var grps = data.query.id;
        //User ophalen
        Usermod.findOne({_id: grps}, function (err, even) {
            var pendings = even.pendingcontacts;
            var newpendings = "";

            //Pending verwijderen
            var pendingarr = pendings.split(";;");
            for (i = 0; i < pendingarr.length; i++) {
                if (pendingarr[i] == user) {
                } else {
                    if (newpendings == "") {
                        newpendings = pendingarr[i];
                    } else {
                        newpendings = ";;" + pendingarr[i];
                    }
                }
            }

            //usersaven
            var options = {multi: true};
            Usermod.update({_id: grps}, {pendingcontacts: newpendings}, options, function (err) {
                Usermod.findOne({_id: user}, function (err, even) {
                    var pendings = even.pendingcontacts;
                    var newpendings = "";

                    //Pending verwijderen
                    var pendingarr = pendings.split(";;");
                    for (i = 0; i < pendingarr.length; i++) {
                        if (pendingarr[i] == grps) {
                        } else {
                            if (newpendings == "") {
                                newpendings = pendingarr[i];
                            } else {
                                newpendings = ";;" + pendingarr[i];
                            }
                        }
                    }

                    //usersaven
                    var options = {multi: true};
                    Usermod.update({_id: user}, {pendingcontacts: newpendings}, options, function (err) {
                        next();
                    });
                });
            });
        });
    };
    addpending = function (data, user, next) {

        var mongoose = require('mongoose');
        var Usermod = mongoose.model('User');
        var grps = data.query.id;
        //console.log(grps);

        //User ophalen
        Usermod.findOne({_id: grps}, function (err, even) {
            //  console.log(err);
            var pendings = even.pendingcontacts;
            //Pending bijvoegen
            if (pendings === undefined || pendings == "") {
                pendings = user;
            } else {
                pendings = ";;" + user;
            }
            //usersaven
            //     console.log(err);
            //      console.log(pendings);
            var options = {multi: true};
            Usermod.update({_id: grps}, {pendingcontacts: pendings}, options, function (err) {
                //   console.log(err);
                //User ophalen
                Usermod.findOne({_id: user}, function (err, even) {
                    //   console.log(err);
                    var pendings = even.pendingcontacts;
                    //Pending bijvoegen
                    if (pendings === undefined || pendings == "") {
                        pendings = grps;
                    } else {
                        pendings = ";;" + grps;
                    }
                    //usersaven
                    //   console.log(err);
                    //     console.log(pendings);
                    var options = {multi: true};
                    Usermod.update({_id: user}, {pendingcontacts: pendings}, options, function (err) {
                        //   console.log(err);
                        next();
                    });
                });
            });
        });
    };
    return {
        createaevent: createevent,
        getevents: getevents,
        changepicture: changepicture,
        acceptfriend: acceptfriend,
        deletefriend: deletefriend,
        addpending: addpending,
        deletepending: deletepending,
        updateEvent: updateEvent,
        deleteEvent: deleteEvent
    };
})();

module.exports = profilerepo;