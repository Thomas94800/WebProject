// Importing SQL modules 
const mysql = require('mysql2');

// Variables
const jwt = require('jsonwebtoken');
const secretKey = 'yourSecretKey'; 
const validUsername = 'admin'; 
const validPassword = 'password'; 
const express = require('express');
const bcrypt = require('bcrypt'); 
const saltRounds = 10;
const password = 'password';
const session = require('express-session');



var createError = require('http-errors');
//var express = require('express');
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
app.get('/mixedquiz', (req, res) => {
  res.render('mixedquiz');
});




// Middleware to verify JWT token
const verifyJWT = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Route for userpage
app.get('/userpage', verifyJWT, (req, res) => {
  res.render('userpage');
});


// Configuring SQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'project'
 });
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database');
  }
 });


 
// To validate a user
function validateUser(password, hash) {
bcrypt
.compare(password, hash)
.then(res => {
  return true;
})
return false;
}

// To register a user in the database
app.post('/register', (req, res) => {
  let { username, password } = req.body;
  // Generate a salt and hash the password
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      // Handle the error appropriately
      console.error(err);
      res.status(500).send('Error occurred while hashing the password');
    } else {
      // Store the username and hashed password in the database
      const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
      db.query(query, [username, hash], (err, result) => {
        if (err) {
          // Handle the error appropriately
          console.error(err);
          res.status(500).send('Error occurred while registering the user');
        } else {
          // Handle the successful registration
          console.log('User registered successfully');
          // Generate and send the JWT token
          const token = generateToken(username); // Call the function to generate the token
          res.cookie('token', token, { httpOnly: true }); // Set the token in a cookie (you can use other methods too)
          res.redirect('/'); // Redirect to the main page
        }
      });
    }
  });
});

app.post('/login', (req, res) => {
  let { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error occurred during login.');
    } else if (result.length === 0) {
      res.render("login", {error: "Username not found."});
    } else {
      bcrypt.compare(password, result[0].password, (err, isMatch) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error occurred during password verification.');
        } else if (isMatch) {
          console.log('User logged in successfully');
          // Generate and send the JWT token
          const token = generateToken(username);
          res.cookie('token', token, { httpOnly: true });
          res.redirect("/quizzes"); // Redirect to the quizzes page
        } else {
          res.render("/login", {error: "Incorrect password."});
        }
      });
    }
  });
});

// Initialize the session
app.use(
  session({
    secret: 'yourSecretKey',
    resave: true,
    saveUninitialized: true
  })
);

// Generate a JWT
function generateToken(username) { 
  const payload = { username }; 
  const options = { expiresIn: '1h' }; // Token expiration time 
  return jwt.sign(payload, secretKey, options); 
} 

// Verifying a JWT
function verifyToken(token) { 
  try { 
    const decoded = jwt.verify(token, secretKey); 
    return decoded.username; 
  } catch (err) { 
    return null; // Token is invalid or expired 
  } 
} 









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
