/**
 * Created by CedricLecat on 8/11/15.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    //id               : {type:String},
    local              : {
            email        : String,
            password     : String,
            ADMIN        : Number
    },
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
    displayName      :{type:String},
    firstName        :{type:String},
    lastName         :{type:String},
    city             :{type:Number},
    birthday         :{type:Date},
    gender           :{type:String,required:true},
    country          :{type:String,required:true},
    interests        :{type:String},
    picture          :{type:String},
    phone            :{type:Number},
    contacts         :{type:String},
    events           :{type:Array},
    groups           :{type:Array}

});

// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);

