/**
 * Created by CedricLecat on 8/11/15.
 */
var mongoose = require('mongoose');

var groupSchema = new mongoose.Schema({
    id                :{ type:Number,unique:true, required:true },
    name              :{ type:String, required:true },
    memberids         :{ type:String, required:true },
    interests         :{ type:String, required:true },
    eventids          :{ type:String },
    picture           :{ type:String }
});

module.exports = mongoose.model('groups',groupSchema,"groups");
