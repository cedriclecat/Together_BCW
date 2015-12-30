/**
 * Created by wouter on 12/29/2015.
 */
GroupsRepo = (function () {
    creategroup = function(data,next){

        var mongoose = require('mongoose');
        Groups = mongoose.model('groups');
        var user = data.user._id;
        data = data.body;
        Groups.find({},function(err,even) {
            var mijngetal = 1;
            even.forEach(function(e){
                mijngetal = mijngetal +1;

            });
            data.TIMESTAMP = new Date();
            var mijngroup ={};
            mijngroup.id= ''+mijngetal;
            mijngroup.TIMESTAMP =  new Date();
            mijngroup.name=data.gtitle;
            mijngroup.description = data.gdescription;
            var members = {};
            members.id=user;
            mijngroup.memberids = members;
            mijngroup.interests = "";
            mijngroup.createdby=user;
            mijngroup.eventids="";
            mijngroup.picture="https://s-media-cache-ak0.pinimg.com/236x/a3/80/7e/a3807e09afab6d37ff5352a270a467b4.jpg";
            mijngroup.chat="";
            Groups.create(mijngroup, function (err) {
                console.log(err);
                if (err) { return next(err); }
                next(mijngroup);
            });
        });
    };

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
        initGroup:initGroup,
        creategroup:creategroup
    }
})();
module.exports = GroupsRepo;