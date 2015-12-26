/**
 * Created by CedricLecat on 8/11/15.
 */


var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    id                :{type:String,unique:true},
    name              :{type:String, required:true},
    description       :{type:String},
    date              :{type:String, required:true},
    time              :{type:String},
    maxMember         : {type:Number},
    members         : {type:Array},
    location          : {type:String},
    price             : {type:Number},
    pictureUrl        : {type:String},
    tags              : {type:String},
    promoted          : {type:Number},
    TIMESTAMP         : {type:Date},
    pictureSlider     : {type:String},
    createdby         : {type:String, required:true}

});

module.exports =  mongoose.model('events',eventSchema,"events");