var mongoose = require("mongoose");

var groupSchema = require("../models/groups");


groupSchema.getGroups = function(req,res){
    groupSchema.find({}).exec(function(err,groups){
      if (err)
            res.send(err);
      res.json(groups)
    })

};

groupSchema.deleteGroup = function(req,res,id){
    groupSchema.findByIdAndRemove({_id: id},function(err){
        if (!err) {
            res.send("Group deleted")
        }
        else {
            console.log('error' + err)
        }
    });
};

module.exports = groupSchema;