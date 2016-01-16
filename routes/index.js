/*
    Created by Brecht on 27/10/2015.
 */


// Express & Router + Passport
var express = require('express');
var router = express.Router();
var passport = require('passport');

// Repos & Models
var Events = require('../data/models/events');
var User = require('../data/models/user');

var HomeRepo = require("../data/DataRepositorys/HomeRepo");
var GroupsRepo = require("../data/DataRepositorys/GroupsRepo");

// Profile Repos
var Countries = require('../data/DataRepositorys/countryRepo');
var Marital = require('../data/DataRepositorys/mStatusRepo');
var Jobs = require('../data/DataRepositorys/jobsRepo');
var ProfileRepo = require("../data/DataRepositorys/ProfileRepo");

// Admin Repos
var groupRepo = require("../data/DataRepositorys/groupRepo");
var eventRepo = require("../data/DataRepositorys/eventsRepo");
var userRepo = require("../data/DataRepositorys/userRepo");

var multer = require('multer');
var user ="";
var options = multer.diskStorage({
    destination : '../public/img/uploads/' ,
    filename: function(req,file,cb){
     cb(null,"" +req.user._id + Date.now()  + file.originalname);
    }
});

var upload = multer({storage:options});

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    router.get('/', function(req, res) {
        HomeRepo.inithome(req,function(next){
            res.render('landing', {data:next.data, path:next.path, name:next.name, admin:next.admin, newe:next.newe, trend:next.trend,prom:next.prom,title:'Home Page'});
        });
    });

    // =====================================
    // EVENTS PAGE =========================
    // =====================================
    router.get('/events', function(req, res) {
        //img/slider/slider1.jpg
        res.render('events',{title:'Events Page'});
    });
    // =====================================
    // GROUPS PAGE =========================
    // =====================================
    router.get('/groups',isLoggedIn, function(req, res) {

        GroupsRepo.initGroup(req,function(next){
            res.render('groups', {data:next.data, user:req.user._id, mijndat:next.mijndat, path:next.path, mev:next.mev, titel:next.titel,title:'Group Page'});
        });
    });
    // =====================================
    // Profile =============================
    // =====================================

    router.get('/profile',isLoggedIn, function (req , res) {
        user = req.user._id;
        ProfileRepo.getevents(req,function(next){
            res.render('profile', {data:req.user.local.email, title: 'Profile Page', evs:req.mijnevents, eigen:req.OWN, MS:req.MemberSince ,UD:req.UserData, naam:req.naam ,groups:req.groups, allgroups:req.allgroups});
        });
    });
    router.post('/profile',function(req,res){
        console.log(req.user._id);
        res.redirect('/profile');
    });
    //insert event
    router.post('/profileevent',upload.array('pictureUrl',2),function(req,res, next){

        ProfileRepo.createaevent(req, req.user._id, function (next) {
              res.redirect('/profile');
        });
    });
    router.post('/profilegroups',upload.single('Foto'),function(req,res, next){
        GroupsRepo.creategroup(req, req.user._id, function (next) {
            res.redirect('/profile');
        });
    });

    router.post('/profilepicture',upload.single('PICTURE'),function(req,res, next){
        ProfileRepo.changepicture(req, req.user._id, function (next) {
            res.redirect('/profile');
        });
    });
    // =====================================
    // ADMIN ===============================
    // =====================================

    router.get('/admin',isLoggedIn, function (req , res) {
        res.render('admin', { title: 'Admin Page' });
    });

    // =====================================
    // HELP ================================
    // =====================================

    router.get('/help', function (req , res) {
        res.render('help', { title: 'Help Page' });
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    router.get('/login', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.jade',{ title: 'Login Page'});/*, { message: req.flash('loginMessage') }*/
    });

    // process the login form
    router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    router.get('/signup', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.jade',{ title: 'Sign Up Page'} );/*, { message: req.flash('signupMessage')}*/
    });


    // process the signup form
    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
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
    router.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect : '/profile',
        failureRedirect : '/login'
    }));

    // =====================================
    // TWITTER ROUTES ======================
    // =====================================
    // route for twitter authentication and login
    router.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    router.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect : '/profile',
            failureRedirect : '/login'
        }));

    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // route for google authentication and login
    router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    //the callback after google has authenticated the user
    router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),function(req,res){
        res.redirect('/profile');
    });


    // =====================================
    // API ROUTES ==========================
    // =====================================

    router.get('/api/events', function (req, res) {

        eventRepo.getAllEvents(function(events)
        {

            res.json(events);
        })
    });

    router.get('/api/getuserid', function (req, res) {
        if(req.user._id !=null)
        {
            res.send(req.user._id);
        }
        else
        {
            res.json("");
        }
    });

    router.post('/api/events',function(req,res)
    {
       var bodyz = req.body;

        console.log(bodyz.id);
        console.log(req.user._id);

         Events.update({id:bodyz.id},{$addToSet:{members:req.user._id}},function(err){console.log(err);});

        res.send("goed verstuurd");
    });

    router.post("/api/events/ikganiet",function(req,res)
    {
        var bodyz = req.body;

        console.log(bodyz.id);
        console.log(req.user._id);

        Events.update({id:bodyz.id},{$pull:{members:req.user._id}},function(err){console.log(err);});

        res.send("goed verstuurd");
    });

    router.get('/api/events/:id',function(req,res){
        //console.log(req.params.id);
        var eid = req.params.id;
        console.log(eid);
        //"id":1
       Events.findOne({'id':parseInt(eid)},function(err, event){
            if(err) res.send(err);
           res.json(event);
       })
    });

    router.get('/api/profile/',function(req,res){
        userRepo.getUsers(req,res);
    });

    router.get('/api/profile/:_id',function(req,res){
        var id = req.user._id;
        userRepo.getUserById(req,res,id);

    });

    router.post('/api/profile/:id',function(req,res){

        var id = req.user._id,
            firstName = req.body.firstName,
            lastName = req.body.lastName,
            email = req.body.email,
            marital = req.body.marital,
            work = req.body.work,
            country = req.body.country,
            birthday = req.body.birthday,
            city = req.body.city,
            interests = req.body.interests,
            description = req.body.description;

        userRepo.updateUser(req,res,id,firstName,lastName,email,birthday,marital,work,country,city,interests,description);
    });

    router.delete('/api/user/delete/:_id',function(req,res){
        var id = req.body.id;
        userRepo.deleteUser(req,res,id);
    });

    router.delete('/api/event/delete/:_id',function(req,res){
        var id = req.body.id;
        eventRepo.deleteEvent(req,res,id);
    });

    router.delete('/api/group/delete/:_id',function(req,res){
        var id = req.body.id;
        groupRepo.deleteGroup(req,res,id);
    });

    router.get('/api/groups',function(req,res){
        groupRepo.getGroups(req,res)
    });

    router.get('/api/countries',function(req,res){
        Countries.getCountries(req,res)
    });

    router.get('/api/status',function(req,res){
        Marital.getStatus(req,res)
    });

    router.get('/api/jobs',function(req,res){
        Jobs.getJobs(req,res);
    });

    // route middleware to make sure a user is logged in
    // =================================================

    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/login');
    }

module.exports = router;