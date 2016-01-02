var mongoose = require("mongoose");

var GroupSchema = require("../models/groups");


GroupSchema.getGroups = function(req,res){


    GroupSchema.find({}).exec(function(err,groups){
      if (err)
            res.send(err);
      res.json(groups)
    })

};

module.exports = GroupSchema;