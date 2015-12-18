/**
 * Created by Brecht on 17/12/2015.
 */
var mongoose = require('mongoose');

var countrySchema = new mongoose.Schema({
    name              :{type:String},
    cities            :[{type:String}]


});

module.exports =  mongoose.model('countries',countrySchema);