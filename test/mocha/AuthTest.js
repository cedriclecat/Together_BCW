/**
 * Created by Brecht on 29/11/2015.
 */
var expect = require('chai').expect;
var mongoose = require('mongoose');
var request = require('superagent');
var server = request.agent();


var config = require('../../config/config.js');
var User = require('../../data/models/user');
var db;

// =================== Testing login & Signup ========================

describe('Creating & logging in with a User',function(){
    before(function (done) {
        db = mongoose.connect(config.OTHER);
        done();
    });
    beforeEach(function (done) {
        var user = new User({
            local :{
                firstname: 'bruce',
                name: 'wayne',
                email: 'bruce@wayne.inc',
                password: 'batman'
            }
        });
        user.save(function (err) {
            if (err) console.log('error' + err.message);
            else console.log('no error');

        });
        done();
    });

    it('find a user by email', function (done) {
        User.findOne({ 'local.email': 'bruce@wayne.inc' }, function (err, user) {
            expect(user.local.email).toEqual('bruce@wayne.inc');
            console.log("email: ", user.local.email);
        });
        done();
    });

    it('login with a user', function (done) {
        server
            .post('http://localhost:3000/login')
            .send({ user: 'bruce@wayne.inc', password: 'batman' })
            .end(function (err, res) {
                expect(res.statusCode).toEqual(302);
                expect(res.body.success).toEqual(true);
            });
        done();

    });

    it('signup with a user', function (done) {
        server
            .post('http://localhost:3000/signup')
            .send({ user: 'hunter@hunterloftis.com', password: 'password' })
            .end(function (err, res) {
                expect(res.statusCode).toEqual(302);
            });
        done();
    });

    afterEach(function (done) {
        User.remove({ 'local.email': 'bruce@wayne.inc' }).exec();
        User.remove({ 'local.email': 'hunter@hunterloftis.com' });
        done();
    });

    after(function (done) {
        mongoose.connection.close();
        done();
    });


});


