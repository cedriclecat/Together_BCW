/**
 * Created by Brecht on 18/12/2015.
 */
var mongoose = require("mongoose");

var jobSchema = require("../models/jobs");


jobSchema.getJobs = function(req,res){

    jobSchema.find({}).sort([['name','ascending']]).exec(function(err,job){
        if (err)
            res.send(err);
        res.json(job);
    })
};

module.exports = jobSchema;