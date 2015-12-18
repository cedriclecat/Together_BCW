/**
 * Created by Brecht on 18/12/2015.
 */
var mongoose = require('mongoose');

var jobSchema = new mongoose.Schema({
    name              :{type:String}
});

module.exports =  mongoose.model('jobs',jobSchema);