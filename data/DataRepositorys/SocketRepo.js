/**
 * Created by wouter on 12/31/2015.
 */
SocketRepo = (function () {
    gettheuser = function (data, next) {
        var mongoose = require('mongoose');
        User = mongoose.model('User');
        User.findOne({_id: data}, function (err, even) {
            if (err) {
                return next(err);
            }
            else {
                var naam = "";
                if (even.firstName == "") {
                    naam = even.email;
                } else {
                    naam = even.firstName + " " + even.lastName;
                }
                var VERSTUURMIJ = {};
                VERSTUURMIJ.id = even._id;
                VERSTUURMIJ.Foto = even.picture;
                VERSTUURMIJ.naam = naam;
                next(VERSTUURMIJ);
            }
        });
    };
    loadchat = function (room, nextnextnextnext) {
        Groups.findOne({id: room}, function (err, datanext) {
            nextnextnextnext(datanext.chat);
        });

    };
    checkdb = function (data, nextnextnextnext) {
        var mongoose = require('mongoose');
        Groups = mongoose.model('groups');
       // console.log('**************');
        var room = data.a;
        var message = data.b;
        var nickname = data.c;
        var options = {multi: true};
        var NEWCHAT = [];

        Groups.findOne({id: room}, function (err, datanext) {
         //   console.log(datanext);
            var CHAT = datanext.chat; //ARRAY;
         //   console.log(CHAT);
            if (CHAT === undefined || CHAT.length == 0) {
                //empty new room
                gettheuser(nickname, function (next) {
                    var payload = {
                        message: message,
                        nick: next
                    };
                    NEWCHAT.push(payload);
                    Groups.update({id: room}, {chat: NEWCHAT}, options, function (err) {
                        if (err) {
                            nextnextnextnext(err);
                        }
                        nextnextnextnext(NEWCHAT);
                    });
                });
            }
            else if (CHAT.length > 25) {
                //Delete oudste
                for (i = 0; i < CHAT.length; i++) {
                    if (i == 0) {
                    } else {
                        NEWCHAT.push(CHAT[i]);
                    }
                }
                gettheuser(nickname, function (next) {
                    var payload = {
                        message: message,
                        nick: next
                    };
                    NEWCHAT.push(payload);
                    Groups.update({id: room}, {chat: NEWCHAT}, options, function (err) {
                        if (err) {
                            nextnextnextnext(err);
                        }
                        nextnextnextnext(NEWCHAT);
                    });
                });


            } else {

                for (i = 0; i < CHAT.length; i++) {
                        NEWCHAT.push(CHAT[i]);
                }
                gettheuser(nickname, function (next) {
                    var payload = {
                        message: message,
                        nick: next
                    };
                    NEWCHAT.push(payload);
                    Groups.update({id: room}, {chat: NEWCHAT}, options, function (err) {
                        if (err) {
                            nextnextnextnext(err);
                        }
                        nextnextnextnext(NEWCHAT);
                    });
                });


            }
        });
    };
    return {
        gettheuser: gettheuser,
        checkdb: checkdb,
        loadchat:loadchat
    }

})();

module.exports = SocketRepo;