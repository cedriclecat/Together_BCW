var express = require('express');
var router = express.Router();
var passport = require('passport');

var Events = require('../data/models/events');
var Groups = require('../data/models/groups');
var Countries = require('../data/DataRepositorys/countryRepo');
var Marital = require('../data/DataRepositorys/mStatusRepo');
var Jobs = require('../data/DataRepositorys/jobsRepo');
var ProfileRepo = require("../data/models/ProfileRepo");


    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    router.get('/', function(req, res) {
console.log("h");
        var user;
        var isadmin;
        var newest;
        var trending;
        var promoted;
        try{

             user=req.user.local.email;
            isadmin = req.user.local.ADMIN;
        }catch(err){
            user="N";
            isadmin=0;
        }

        console.log("h");
        Events.find({},function(err,even){
            mijnevents=even;

            mijnevents.forEach(function(e){

if(e.promoted==1){
    promoted=e;
}
                if(trending===undefined){
                    trending = e;
                }else{
                    var mijndatum = e.date + " " + e.time;
                    var mijndatum2 = trending.date + " " + trending.time;
                    var dat1 = new Date(mijndatum);
                    var dat2 = new Date(mijndatum2);
                    var now = new Date();
                    console.log(dat1);
                    console.log(dat2);
                    console.log(now);
                    if(dat1<now){
                        if(dat1>dat2){
                            trending=e;
                        }
                    }


                }



                if(newest===undefined){
                    newest= e;
                }else {

                    var datum1 = new Date(newest.TIMESTAMP);
                    var datum2 = new Date(e.TIMESTAMP);
                    if (datum1 < datum2) {
                        newest = e;
                    }
                }



            });

console.log(newest);
console.log(trending);
            //console.log(even);
           // console.log(req.user.local.email);
            res.render('landing', {data:mijnevents, path:req.path, name:user, admin:isadmin, newe:newest, trend:trending,prom:promoted});

        });


    });

    // =====================================
    // EVENTS PAGE =========================
    // =====================================
    router.get('/events', function(req, res) {
        //img/slider/slider1.jpg
        res.render('events');
    });



    // =====================================
    // GROUPS PAGE =========================
    // =====================================
    router.get('/groups',isLoggedIn, function(req, res) {
      //  console.log(req.user._id);
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
    // Profile =============================
    // =====================================

    router.get('/profile',isLoggedIn, function (req , res) {
        res.render('profile', {data:req.user.local.email, title: 'Profile' });
    });

    router.post('/profile',function(req,res){
        console.log(req.user._id);
    });
//insert event
router.post('/profileevent',function(req,res, next){
    console.log("hh");
    //console.log(req.user._id);
    ProfileRepo.createaevent(req.body,function(next){
        console.log("Klaar");
        res.render('profile');

    });
});
    // =====================================
    // ADMIN ===============================
    // =====================================

    router.get('/admin',isLoggedIn, function (req , res) {
        res.render('admin', { title: 'Admin' });
    });

    // =====================================
    // HELP ================================
    // =====================================

    router.get('/help', function (req , res) {
        res.render('help', { title: 'Help' });
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
        Events.find(function (err, events) {
            if (err)
                res.send(err);
            res.json(events);
        });
    });

    router.post('/api/events',function(req,res)
    {
        console.log(req.body);
        console.log(req.user._id)
      //  console.log(req.params);

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

    router.get('/api/profile',function(req,res){
        User.find(function(err, user){
            if (err)
                res.send(err);
            res.json(user);
        })
    });

    router.get('/api/profile/:id',function(req,res){
        //console.log(req.params.id);
        var eid = req.params.id;
        console.log(eid);
        //"id":1
        Events.findOne({'id':parseInt(eid)},function(err, event){
            if(err) res.send(err);
            res.json(event);
        })
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