/**
 * Created by Brecht on 4/12/2015.
 */

var expect = require('chai').expect;

var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();

var mockgoose = require('mockgoose');
var User = mongoose.model('User',{
    id               : {type:String},
    local            : {
        email        : {type:String, required:true},
        password     : {type:String}
    },
    facebook         : {
        id           : {type:String},
        token        : {type:String},
        email        : {type:String, required:true},
        name         : {type:String}
    },
    twitter          : {
        id           : {type:String},
        token        : {type:String},
        displayName  : {type:String},
        username     : {type:String}
    },
    google           : {
        id           : {type:String},
        token        : {type:String},
        email        : {type:String, required:true},
        name         : {type:String}
    },
    displayName      :{type:String},
    firstName        :{type:String},
    lastName         :{type:String},
    city             :{type:String},
    birthday         :{type:Date},
    gender           :{type:String,required:true},
    country          :{type:String,required:true},
    interests        :{type:String},
    picture          :{type:String},
    phone            :{type:Number},
    contacts         :{type:String}

});
var Event = mongoose.model('Event',{
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
    tags              : String });

mockgoose(mongoose);

describe('Models', function() {
    before(function(done) {
        mongoose.connect('mongodb://localhost:27017/togetherDB', function(err) {
            done(err);
        });
    });

    it("should create an event", function(done) {
        Event.create({id:1,name:"Dio",description:"Aye Aye Aye",date:"27/11/17",time:"11:00",maxMember:"17",membersId:"",location:"Rotterdam",price:17.89,pictureUrl:"",tags:"gangsta"},function(err){
            done(err);
        });
    });
    it("should create an user",function(done){
        User.create({
            id:'17',
            local:{
                email        :'local@local.com',
                password     :'password'
            },
            facebook:{
                id           : '123',
                token        : 'azertyuiop',
                email        : 'facebook@facebook.com',
                name         : 'FacebookName'
            },
            twitter          : {
                id           : '456',
                token        : 'qsdfghjklm',
                displayName  : 'TwitterDisplayName',
                username     : 'TwitterUserName'
            },
            google           : {
                id           : '789',
                token        : 'wxcvbn',
                email        : 'google@google.com',
                name         : 'GoogleName'
            },
            displayName      :'MyDisplayName',
            firstName        :'John',
            lastName         :'Doe',
            city             :'Novagrod',
            birthday         :17/11/94,
            gender           :'male',
            country          :'Russia',
            interests        :'Putin Approves',
            picture          :'',
            phone            :04857951187,
            contacts         :'nobody'
        },function(err){
            done(err);
        });
    });

    it("should find event", function(done) {
        Event.findOne({name: "Dio"},function(err,event){
            expect(event.description).to.equal('Aye Aye Aye');
            expect(event.date).to.equal('27/11/17');
            expect(event.time).to.equal('11:00');
            expect(event.maxMember).to.equal(17);
            expect(event.location).to.equal('Rotterdam');
            expect(event.tags).to.equal('gangsta');
            done(err);
        });
    });
    it("should find users", function(done) {
        User.findOne({city:'Novagrod'},function(err,user){
            expect(user).to.exist;
            expect(user.id).to.equal('17');

            expect(user.local).to.exist;
            expect(user.local).to.not.be.empty;
            expect(user.local.email).to.equal('local@local.com');
            expect(user.local.password).to.equal('password');

            expect(user.facebook).to.exist;
            expect(user.facebook).to.not.be.empty;
            expect(user.facebook.id).to.equal('123');
            expect(user.facebook.token).to.equal('azertyuiop');
            expect(user.facebook.email).to.equal('facebook@facebook.com');
            expect(user.facebook.name).to.equal('FacebookName');

            expect(user.twitter).to.exist;
            expect(user.twitter).to.not.be.empty;
            expect(user.twitter.id).to.equal('456');
            expect(user.twitter.token).to.equal('qsdfghjklm');
            expect(user.twitter.displayName).to.equal('TwitterDisplayName');
            expect(user.twitter.username).to.equal('TwitterUserName');

            expect(user.google).to.exist;
            expect(user.google).to.not.be.empty;
            expect(user.google.id).to.equal('789');
            expect(user.google.token).to.equal('wxcvbn');
            expect(user.google.email).to.equal('google@google.com');
            expect(user.google.name).to.equal('GoogleName');

            expect(user.displayName).to.equal('MyDisplayName');
            expect(user.firstName).to.equal('John');
            expect(user.lastName).to.equal('Doe');
            expect(user.interests).to.equal('Putin Approves');
            expect(user.gender).to.equal('male');
            expect(user.country).to.equal('Russia');
            expect(user.contacts).to.equal('nobody');
            expect(user.birthday).to.be.a('date');
            expect(user.phone).to.be.a('number');
            expect(user.picture).to.be.empty;
            done(err);
        });
    });

    it("should remove event", function(done) {
        Event.remove({name: "Dio"}, function(err) {
            done(err);
        });
    });
    it("should remove user", function(done) {
        User.remove({firstName:'John'},function(err,user){
            done(err)
        });
    });

    after(function (done) {
        mongoose.connection.close();
        done();
    });
});

