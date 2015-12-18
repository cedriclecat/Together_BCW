/**
 * Created by Brecht on 18/12/2015.
 */
var mongoose = require("mongoose");

var mStatusSchema = require("../models/maritals");


mStatusSchema.getStatus = function(req,res){

    mStatusSchema.find({}).sort([['name','ascending']]).exec(function(err,status){
        if (err)
            res.send(err);
        res.json(status);
    })
};

module.exports = mStatusSchema;