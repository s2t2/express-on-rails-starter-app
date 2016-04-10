var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session'); // ADDITION!
var flash = require('connect-flash'); // ADDITION!
var moment = require('moment-timezone'); // ADDITION!

var home_routes = require('./app/controllers/home_controller'); // EDIT! was: var routes = require('./routes/index');
var robot_routes = require('./app/controllers/robots_controller'); // EDIT! was: var users = require('./routes/users');

var sessionStore = new session.MemoryStore; // ADDITION!

var app = express();

app.locals.moment = moment;  // ADDITION! this makes moment available as a variable in every EJS page
app.locals.title = "Robots App!" // ADDITION! set a common title for all EJS views

// view engine setup
app.set('views', path.join(__dirname, 'app/views')); // EDIT! was: app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets'))); // EDIT! was: app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
   cookie: { maxAge: 60000 },
   store: sessionStore,
   secret: process.env.SESSION_SECRET || 'robots-session-secret',
   name: 'robots-session-name',
   resave: true,
   saveUninitialized: true
 })); // ADDITION!

app.use(flash()); // ADDITION!

// include flash messages (must be placed below session and cookie parser, and above ... app.use('/', routes);)
app.use(function (req, res, next) {
 res.locals.messages = require('express-messages')(req, res);
 next();
}); // ADDITION!

app.use('/', home_routes); // EDIT! was: app.use('/', routes);
app.use('/', robot_routes); // EDIT! was: app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('_error', { // EDIT! was: res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('_error', { // EDIT! was: res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
