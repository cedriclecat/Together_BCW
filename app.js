var express = require('express'),
    path = require('path'),
    http = require('http'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    passport = require('passport'),
    session  = require('express-session'),
    logger = require('morgan'),
    flash = require('connect-flash'),
    routes = require('./routes/index'),
    users = require('./routes/users'),
    app = express();

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(cookieParser());

// configuration ===============================================================
require('./config/connectDB.js');

// Passport ===============================================================
require('./config/passport.js')(passport); // pass passport for configuration

app.use(session({
  secret: 'together',
  resave: false,
  saveUninitialized: false
}));
app.set('port', 3000);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // connect flash to display messages
app.use(express.static(__dirname + '/public'));

// =================== Routes ===================
app.use('/', routes);
//require('./routes/index.js')(app,passport);

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

//app.get('port') gets the port number that is defined earlier in the configuration of the express server
var server = http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

// Set up socket.io
var io = require('socket.io').listen(server);

// Handle socket traffic
io.sockets.on('connection', function (socket) {

    // Set the name property for a given client
    socket.on('nick', function(nick) {
      //  socket.set('name', nick);
    });

    // This should initiate rock group chat
    socket.on('rockgroup', function(data) {
       // socket.get('name', function(err, nick) {
            var nickname ='Anonymous' ; //normally this won't be possible

            var payload = {
                message: data.message,
                nick: 'test'
            };

            socket.emit('rockgroup',payload); // show it on your own browser
            socket.broadcast.emit('rockgroup', payload); // broadcast to others
       // });
    });
});

module.exports = app;
