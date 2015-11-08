/**
 * Created by CedricLecat on 8/11/15.
 */


var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    id                :{ type:String,unique:true, required:true },
    name              :{ type:Number, required:true },
    description       :{ type:String },
    date              :{ type:Date, required:true },
    time              :{ type:String },
    maxmember         :{ type:Number },
    membersid         :{ type:String, required:true },
    location          :{ type:string },
    price             :{ type:Number },
    picture           :{ type:String },
    tags              :{ type:String }

});

module.exports = eventSchema;