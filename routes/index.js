var express = require('express');
var router = express.Router();
var passport = require('passport');

var Events = require('../data/models/events');
var Groups = require('../data/models/groups');
//var Users = require('../data/models/user');

//module.exports = function (app,passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    router.get('/', function(req, res) {
        res.render('landing');
    });

    // =====================================
    // EVENTS PAGE =========================
    // =====================================
    router.get('/events', function(req, res) {
        res.render('events');
    });

    // =====================================
    // GROUPS PAGE =========================
    // =====================================
    router.get('/groups', function(req, res) {
        var grps = req.query.groupss;
        var evt = req.query.event;
        var mijnevents = "";
        var grtitel ="";
        var username = req.user.local.email;
        var mijndata = "";
        if(grps!=undefined){
            //console.log(grps);
            Groups.find(function (err, events) {
                if (err) {
                    res.send(err);
                }
                mijndata = events;



            Groups.findOne({'id':grps},function (err, eventss) {
                if (err) {
                    res.send(err);
                }
                grtitel = eventss.name;
                var id = eventss.eventids;
                //console.log(eventss);
               // console.log(id);
                var arr = id.toString().split(",");
//console.log(arr);
                var mx = [];
                arr.forEach(function(x){
mx.push(parseInt(x));

                });
                Events.find({'id': {$in: mx}},function(err,even){
                    mijnevents=even;
                    console.log(even);
                    res.render('groups', {data:username, mijndat:mijndata, path:req.path, mev:mijnevents, titel:grtitel});

                });
            });
            });

            //Code hier dat de events laad en toont
        }else if(evt!=undefined){
            console.log(evt);
            //Code hier dat de chat maakt
        }else {
            Groups.find(function (err, events) {
                if (err) {
                    res.send(err);
                }
                mijndata = events;
                res.render('groups', {data: username, mijndat: mijndata, path: req.path, mev: mijnevents});

            });
        }



    });

    // =====================================
    // Tweet + Geo ========================
    // =====================================

    router.get('/profile',isLoggedIn, function (req , res) {

        res.render('profile',{data:req.user.local.email, test:"h"});
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    router.get('/login', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.jade');/*, { message: req.flash('loginMessage') }*/
    });

    // process the login form
    router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login' // redirect back to the signup page if there is an error
        //failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    router.get('/signup', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.jade' );/*, { message: req.flash('signupMessage')}*/
    });


    // process the signup form
    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup' // redirect back to the signup page if there is an error
        //failureFlash : true // allow flash messages
    }));



    // =====================================
    // LOGOUT ==============================
    // =====================================
    router.get('/logout', function (req, res) {
        var name = req.user.username;

        console.log("LOGGIN OUT " + req.user);
        req.logout();
        res.redirect('/');
        req.session.notice = "You have successfully been logged out " + name + "!";
    });

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),function(req,res){
        res.redirect('profile');
    });

    // =====================================
    // TWITTER ROUTES ======================
    // =====================================
    // route for twitter authentication and login
    router.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    router.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    //the callback after google has authenticated the user
    router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),function(req,res){
        res.redirect('/profile');
    });


    // =====================================
    // API EVENTS ROUTES ===================
    // =====================================

    router.get('/api/events', function (req, res) {
        Events.find(function (err, events) {
            if (err)
                res.send(err);
            res.json(events);
        });
    });


    // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
    };

module.exports = router;