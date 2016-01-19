/**
 * Created by wouter on 12/29/2015.
 */
GroupsRepo = (function () {
    creategroup = function(data,user,next){
        var files = data.file;
        //console.log(files);
        var spliter = files.path.split("\\");
        //console.log(spliter);
        var filenaam1 = "../img/uploads/" + spliter[4];
        data = data.body;
        var mongoose = require('mongoose');
        Groups = mongoose.model('groups');
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
            mijngroup.picture= filenaam1;
            mijngroup.chat=[];
            Groups.create(mijngroup, function (err) {
               // console.log(err);
                if (err) { return next(err); }
                next(mijngroup);
            });
        });
    };

    initGroup = function (req, next) {
        var mongoose = require('mongoose');
        Events = mongoose.model('events');
        Groups = mongoose.model('groups');
        var getnaam = require('./Profielmenu');
        var ZENDMIJ = {};
        getnaam.getname(req,function(dfdf){
           // console.log(dfdf);
            if(dfdf=="N"){
                ZENDMIJ.TOON = false;
            }else{
                ZENDMIJ.TOON = true;
               // console.log("GOOO");
                ZENDMIJ.FOTO = dfdf.foto;
                ZENDMIJ.NAAM = dfdf.naam;
                ZENDMIJ.ADMIN=dfdf.Admin;
            }

            ////////////////////////////////////////
        var grps = req.query.groupss;
        var evt = req.query.event;
        var mijnevents = "";
        var grtitel ="Groups";
        var username = req.user.local.email;
        var mijndata = "";

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
        });
    };

    return{
        initGroup:initGroup,
        creategroup:creategroup
    }
})();
module.exports = GroupsRepo;