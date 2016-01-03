var mongoose = require("mongoose");

var userSchema = require("../models/user");


//UserSchema.getUsers = function(){
//    UserSchema.find({}).exec(function(err,docs){
//        //console.log(docs);
//    })
//};

userSchema.getUsers = function(req,res){
    userSchema.find(function(err, user){
        if (err)
            res.send(err);
        res.json(user);
    })
};
userSchema.getUserById = function(req,res,id){
    userSchema.findOne({'_id':id},function(err, user){
        if(err) res.send(err);
        res.json(user);
    })
};

userSchema.updateUser = function(req,res,id,firstName,lastName,email,marital,work,country,city,interests,description){
    userSchema.update({_id:id},{$set:{
        firstName: firstName,
        lastName: lastName,
        email: email,
        marital: marital,
        work: work,
        country: country,
        city: city,
        interests: interests,
        description: description
    }},function(err){console.log(err);});
    res.send("Profile Updated");
};

userSchema.deleteUser = function(req,res,id){
    userSchema.findByIdAndRemove({_id: id},function(err){
        if (!err) {
            res.send("User deleted")
        }
        else {
            console.log('error' + err)
        }
    });
};

module.exports = userSchema;