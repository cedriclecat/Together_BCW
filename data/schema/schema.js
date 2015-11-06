/**
 * Created by Brecht on 7/11/2015.
 */

var mongoose = require('mongoose');


// Pas naam van schema aan indien passende naam
// Hierin wordt alles beschreven dat in de database wordt gestockeerd.

var NewTogetherSchema = new mongoose.Schema({
    // VOORBEELD !!! => pas hier aan, aan ons database
    title: { type: String},
    description: { type: String},
    pubDate: { type: Date, 'default': Date.now},
    details: { type: String}

});

module.exports = NewTogetherSchema;