/**
 * Created by wouter on 12/29/2015.
 */
GroupsRepo = (function () {
    initGroup = function (req, next) {
        var mongoose = require('mongoose');
        Events = mongoose.model('events');
        Groups = mongoose.model('groups');
        ////////////////////////////////////////
        var grps = req.query.groupss;
        var evt = req.query.event;
        var mijnevents = "";
        var grtitel ="Groups";
        var username = req.user.local.email;
        var mijndata = "";
        var ZENDMIJ = {};
        if(grps!=undefined){
            Groups.find(function (err, events) {
                if (err) {
                    res.send(err);
                }
                mijndata = events;
                Groups.findOne({'id':grps},function (err, eventss) {
                    if (err) {
                        res.send(err);
                    }
                    grtitel = eventss.name;
                    var id = eventss.eventids;
                    var arr = id.toString().split(",");
                    var mx = [];
                    arr.forEach(function(x){
                        mx.push(parseInt(x));

                    });
                    Events.find({'id': {$in: mx}},function(err,even){
                        mijnevents=even;
                        ZENDMIJ.data=username;
                        ZENDMIJ.mijndat=mijndata;
                        ZENDMIJ.path=req.path;
                        ZENDMIJ.mev=mijnevents;
                        ZENDMIJ.titel=grtitel;
                        next(ZENDMIJ);
                    });
                });
            });
            //Code hier dat de events laad en toont
        }else if(evt!=undefined){
            console.log(evt);
            //Code hier dat de chat maakt
        }else {
            Groups.find(function (err, events) {
                if (err) {
                    res.send(err);
                }
                mijndata = events;
                ZENDMIJ.data=username;
                ZENDMIJ.mijndat=mijndata;
                ZENDMIJ.path=req.path;
                ZENDMIJ.mev=mijnevents;
                ZENDMIJ.titel=grtitel;
                next(ZENDMIJ);
            });
        }
        /////////////////////////////////////////
    };

    return{
        initGroup:initGroup
    }
})();
module.exports = GroupsRepo;