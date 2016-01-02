/**
 * Created by CedricLecat on 8/11/15.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
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
    firstName        :{type:String},
    lastName         :{type:String},
    email            :{type:String},
    description      :{type:String},
    work             :{type:String},
    marital          :{type:String},
    city             :{type:String},
    birthday         :{type:Date},
    gender           :{type:String},
    country          :{type:String},
    interests        :{type:String},
    picture          :{type:String},
    contacts         :{type:String},
    pendingcontacts  :{type:String},
    MemberSince      :{type:Date},
    blacklisted      :{type:String}

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

