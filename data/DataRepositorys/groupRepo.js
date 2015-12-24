var mongoose = require("mongoose");

var GroupSchema = require("../models/groups");


GroupSchema.getGroups = function(){


    GroupSchema.find({}).exec(function(err,docs){
      // console.log(docs);
    })
};

module.exports = GroupSchema;