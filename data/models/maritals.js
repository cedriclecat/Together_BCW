/**
 * Created by Brecht on 17/12/2015.
 */
var mongoose = require('mongoose');

var maritalSchema = new mongoose.Schema({
    name              :{type:String}
});

module.exports =  mongoose.model('maritals',maritalSchema);