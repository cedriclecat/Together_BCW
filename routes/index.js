var express = require('express');
var router = express.Router();
var passport = require('passport');

var Events = require('../data/models/events');
var Groups = require('../data/models/groups');
var Users = require('../data/models/user');

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
        res.render('groups');
    });

    // =====================================
    // Tweet + Geo ========================
    // =====================================

    router.get('/profile',isLoggedIn, function (req , res) {
        res.render('profile', { title: 'Tweets' });
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
        req.logout();
        res.redirect('/');
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