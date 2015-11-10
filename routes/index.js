var express = require('express');
var router = express.Router();

module.exports = router;

module.exports = function(app,passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('landing');
    });

    // =====================================
    // EVENTS PAGE =========================
    // =====================================
    app.get('/events', function(req, res) {
        res.render('events');
    });

    // =====================================
    // GROUPS PAGE =========================
    // =====================================
    app.get('/groups', function(req, res) {
        res.render('groups');
    });


    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login');
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
    }));

    // =====================================
    // FORGOTPW ============================
    // =====================================
    // show the login form
    app.get('/forgotpw', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('forgotpw.jade');
    });

    // process the signup form
    app.post('/forgotpw', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/forgotpw', // redirect back to the signup page if there is an error
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/register', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('register.jade' );/*, { message: req.flash('signupMessage')}*/
    });


    // process the signup form
    app.post('/register', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/register', // redirect back to the signup page if there is an error
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        //res.render('profile', {
        //    user : req.user // get the user out of session and pass to template
        //});
        res.render('profile');
    });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

  // locally --------------------------------
  app.get('/connect/local', function(req, res) {
    res.render('connect-local.ejs', { message: req.flash('loginMessage') });
  });
  app.post('/connect/local', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // =====================================
  // FACEBOOK ROUTES =====================
  // =====================================
  // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

  // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
      passport.authenticate('facebook', {
        successRedirect : '/profile',
        failureRedirect : '/'
      }));

  // =====================================
  // TWITTER ROUTES ======================
  // =====================================
  // route for twitter authentication and login
    app.get('/auth/twitter', passport.authenticate('twitter'));

  // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
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
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

  // the callback after google has authenticated the user
    app.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect : '/profile',
        failureRedirect : '/'
      }));

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}
