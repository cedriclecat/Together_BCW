var express = require('express');
var router = express.Router();
var passport = require('passport');

var Events = require('../data/schema/events.js');


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
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    router.get('/profile', function (req , res) {
        res.render('profile',{ title: 'Profile', user: req.user});
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    router.get('/login', function(req, res) {
        res.render('login');
    });

    // process the login form
    router.post('/login', passport.authenticate('local-login', {
        successRedirect : 'profile', // redirect to the secure profile section
        failureRedirect : 'login' // redirect back to the signup page if there is an error
    }));

    //router.post('/login', function(req, res, next) {
    //    passport.authenticate('local', function(err, user, info) {
    //        if (err) { return next(err); }
    //        // if user is not found due to wrong username or password
    //        if (!user) {
    //            return res.render('login', {
    //                //you can send a message to your view
    //                message: 'Invalid username or password'
    //            });
    //        }
    //        //passport.js has a logIn user method
    //        req.logIn(user, function(err) {
    //            if (err) { return next(err); }
    //
    //            return res.redirect('/');
    //        });
    //    })(req, res, next);
    //});

    // =====================================
    // FORGOTPW ============================
    // =====================================
    // show the login form
    router.get('/forgotpw', function(req, res) {
        res.render('forgotpw');
    });

    // process the signup form
    router.post('/forgotpw', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/forgotpw' // redirect back to the signup page if there is an error
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    router.get('/register', function (req, res) {
        res.render('register');
    });


    // process the signup form
    router.post('/register', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/register' // redirect back to the signup page if there is an error
    }));

    // =====================================
    // LOGOUT ==============================
    // =====================================

    router.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    // =====================================
    // 404 =================================
    // =====================================

    router.get('/400',function(req,res){
        res.render('404');
    });

    // =====================================
    // 500 =================================
    // =====================================

    router.get('/500',function(req,res){
        res.render('500');
    });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

  // =====================================
  // FACEBOOK ROUTES =====================
  // =====================================
  // route for facebook authentication and login
    router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

  // handle the callback after facebook has authenticated the user
    router.get('/auth/facebook/callback',
      passport.authenticate('facebook', {
        successRedirect : '/profile',
        failureRedirect : '/login',
          failureFlash: true
      }));

  // =====================================
  // TWITTER ROUTES ======================
  // =====================================
  // route for twitter authentication and login
    router.get('/auth/twitter', passport.authenticate('twitter'));

  // handle the callback after twitter has authenticated the user
    router.get('/auth/twitter/callback', passport.authenticate('twitter', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash: true
      }));


  // =====================================
  // GOOGLE ROUTES =======================
  // =====================================
  // send to google to do the authentication
  // profile gets us their basic information including their name
  // email gets their emails
    router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

  // the callback after google has authenticated the user
    router.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect : '/profile',
        failureRedirect : '/login',
          failureFlash: true
      }));

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


// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}

module.exports = router;