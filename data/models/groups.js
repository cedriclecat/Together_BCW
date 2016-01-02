/**
 * Created by CedricLecat on 8/11/15.
 */
var mongoose = require('mongoose');

var groupSchema = new mongoose.Schema({
    id                :{ type:Number,unique:true, required:true },
    name              :{ type:String, required:true },
    description        :{type:String, required:true},
    createdby           :{type:String, required:true},
    memberids         :{ type:Array, required:true },
    interests         :{ type:String},
    eventids          :{ type:String },
    picture           :{ type:String },
    TIMESTAMP         : {type:Date},
    chat              :{ type:Array }
});

module.exports = mongoose.model('groups',groupSchema,"groups");
