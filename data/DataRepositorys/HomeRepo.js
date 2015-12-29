/**
 * Created by wouter on 12/29/2015.
 */
HomeRepo = (function () {
    inithome = function (req, next) {
        var mongoose = require('mongoose');
        Events = mongoose.model('events');
        ////////////////////////////////////////
        var user;
        var isadmin;
        var newest;
        var trending;
        var promoted;
        try{
            user=req.user.local.email;
            isadmin = req.user.local.ADMIN;
        }catch(err){
            user="N";
            isadmin=0;
        }
        Events.find({},function(err,even){
            mijnevents=even;
            mijnevents.forEach(function(e){
                if(e.promoted==1){
                    promoted=e;
                }
                if(trending===undefined){
                    trending = e;
                }else{
                    var mijndatum = e.date + " " + e.time;
                    var mijndatum2 = trending.date + " " + trending.time;
                    var dat1 = new Date(mijndatum);
                    var dat2 = new Date(mijndatum2);
                    var now = new Date();
                    console.log(dat1);
                    console.log(dat2);
                    console.log(now);
                    if(dat1<now){
                        if(dat1>dat2){
                            trending=e;
                        }
                    }
                }
                if(newest===undefined){
                    newest= e;
                }else {
                    var datum1 = new Date(newest.TIMESTAMP);
                    var datum2 = new Date(e.TIMESTAMP);
                    if (datum1 < datum2) {
                        newest = e;
                    }
                }
            });
            var VERZENDMIJ = {};
            VERZENDMIJ.data = mijnevents;
            VERZENDMIJ.path =req.path;
            VERZENDMIJ.name=user;
            VERZENDMIJ.admin=isadmin;
            VERZENDMIJ.newe=newest;
            VERZENDMIJ.trend=trending;
            VERZENDMIJ.prom=promoted;
            next(VERZENDMIJ);
        });
        /////////////////////////////////////////
    };

    return{
        inithome:inithome
    }
})();
module.exports = HomeRepo;