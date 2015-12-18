/**
 * Created by Brecht on 18/12/2015.
 */
var mongoose = require("mongoose");

var countrySchema = require("../models/countries");


countrySchema.getCountries = function(req,res){

    countrySchema.find({}).sort([['name', 1], ['cities', 1]]).exec(function(err,country){
        if (err)
            res.send(err);
        res.json(country);
    })
};

module.exports = countrySchema;