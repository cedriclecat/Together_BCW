/**
 * Created by CedricLecat on 8/11/15.
 */
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    displayname      :{type:String},
    firstname        :{type:String},
    lastname         :{type:String},
    city             :{type:Number},
    birthday         :{type:Date},
    gender           :{type:String,required:true},
    country          :{type:String,required:true},
    intrests         :{type:String},
    picture          :{type:String},
    phone            :{type:Number},
    contacts         :{type:String}

});
});

module.exports = userSchema;