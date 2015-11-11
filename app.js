var express = require('express'),
    app = express(),
    path = require('path'),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    session  = require('express-session');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// configuration ===============================================================
// var connectDB = require("./config/ConnectDB.js");
// mongoose.connect(connectDB); // connect to our database

// Passport ===============================================================
require('./config/Passport.js')(passport); // pass passport for configuration

app.use(session({
  secret: 'together',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// =================== Routes ===================

require('./routes/index.js')(app, passport);

// launch ====================================================================
var port = process.env.PORT || 3000;
server.listen(port);
console.log("hello");

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers =========================================================================

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 404);
    res.render('404', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('500', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
