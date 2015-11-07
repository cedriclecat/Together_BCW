/**
 * Created by Brecht on 7/11/2015.
 */

var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');

// Pas naam van schema aan indien passende naam
// Hierin wordt alles beschreven dat in de database wordt gestockeerd.

var userSchema = new mongoose.Schema({
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
    groups           : {
        id           : String,
        img          : String,
        title        : String,
        description  : String
    },
    events           : {
        id           : String,
        img          : String,
        title        : String,
        date         : { type : Date, default: Date.now },
        time         : { type : Date, default: Date.now },
        status       : Boolean,
        cost         : { type : Number, default: 0 },
        slots        : { type : Number, default: 0 }
    }

});

//// methods ======================
//// generating a hash
//userSchema.methods.generateHash = function (password) {
//    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
//};
//
//// checking if password is valid
//userSchema.methods.validPassword = function (password) {
//    return bcrypt.compareSync(password, this.local.password);
//};

module.exports = userSchema;