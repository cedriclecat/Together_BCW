/**
 * Created by wouter on 12/31/2015.
 */
SocketRepo = (function () {
    gettheuser = function(data,next) {
        var mongoose = require('mongoose');
        User = mongoose.model('User');
        User.findOne({_id:data},function(err,even) {
         if (err) { return next(err);}
            else {
             var naam ="";
             if(even.firstName ==""){
                 naam = even.email;
             }else{
                 naam = even.firstName + " " + even.lastName;
             }
            var VERSTUURMIJ = {};
                VERSTUURMIJ.id=even._id;
                VERSTUURMIJ.Foto=even.picture;
                VERSTUURMIJ.naam=naam;
                next(VERSTUURMIJ);
                 }
          });
    };
    return{
        gettheuser : gettheuser
    }

    })();

module.exports = SocketRepo;