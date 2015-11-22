/**
 * Created by CedricLecat on 8/11/15.
 */


var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    id                : String,
    name              : String,
    description       : String,
    date              : String,
    time              : String,
    maxMember         : Number,
    membersId         : Number,
    location          : String,
    price             : Number,
    pictureUrl        : String,
    tags              : String

});

module.exports = mongoose.model('Event', eventSchema);