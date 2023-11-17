var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


// Route for home page
app.get('/', (req, res) => {
  res.render('index');
});
// Route for courses page
app.get('/courses', (req, res) => {
  res.render('courses');
});
// Route for quizzes page
app.get('/quizzes', (req, res) => {
  res.render('quizzes');
});
// Route for information page
app.get('/information', (req, res) => {
  res.render('information');
});
// Route for contact page
app.get('/contact', (req, res) => {
  res.render('contact');
});
// Route for login page
app.get('/login', (req, res) => {
  res.render('login');
});
// Route for signup page
app.get('/signup', (req, res) => {
  res.render('signup');
});
// Route for flags course
app.get('/flagscourse', (req, res) => {
  res.render('flagscourse');
});
// Route for capitals course
app.get('/capitalscourse', (req, res) => {
  res.render('capitalscourse');
});
// Route for flags quiz
app.get('/flagsquiz', (req, res) => { 
  res.render('flagsquiz');
});
// Route for capitals quiz
app.get('/capitalsquiz', (req, res) => {
  res.render('capitalsquiz');
});
// Route for mix quiz
app.get('/mixquiz', (req, res) => {
  res.render('mixquiz');
});







// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
