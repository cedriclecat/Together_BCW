var mongoose = require("mongoose");

var UserSchema = require("../models/groups");


UserSchema.getUsers = function(){
    UserSchema.find({}).exec(function(err,docs){
        //console.log(docs);
    })
};

module.exports = UserSchema;