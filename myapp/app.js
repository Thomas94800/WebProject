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
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const app = express();
const MySQLStore = require('express-mysql-session')(session);

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
// Configuring session
const sessionStore = new MySQLStore({
  host: 'localhost',
  port: 3000, 
  user: 'root',
  password: '',
  database: 'project',
  createDatabaseTable: true, 
}, db);
app.use(session({
  key: 'YassThom78', 
  secret: 'YassThom78', 
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
}));


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
// Route for capital quiz 1
app.get('/quizcapital1', (req, res) => {
  res.render('quizcapital1');
});
// Route for capital quiz 2
app.get('/quizcapital2', (req, res) => {
  res.render('quizcapital2');
});
// Route for capital quiz 3
app.get('/quizcapital3', (req, res) => {
  res.render('quizcapital3');
});
// Route for divers quiz 1
app.get('/quizdivers1', (req, res) => {
  res.render('quizdivers1');
});
// Route for divers quiz 2
app.get('/quizdivers2', (req, res) => {
  res.render('quizdivers2');
});
// Route for divers quiz 3
app.get('/quizdivers3', (req, res) => {
  res.render('quizdivers3');
});
// Route for capital quiz 1 result
app.get('/quizcapital1result', (req, res) => {
  res.render('quizcapital1result');
});
// Route for capital quiz 2 result
app.get('/quizcapital2result', (req, res) => {
  res.render('quizcapital2result');
});
// Route for capital quiz 3 result
app.get('/quizcapital3result', (req, res) => {
  res.render('quizcapital3result');
});
// Route for divers quiz 1 result
app.get('/quizdivers1result', (req, res) => {
  res.render('quizdivers1result');
});
// Route for divers quiz 2 result
app.get('/quizdivers2result', (req, res) => {
  res.render('quizdivers2result');
});
// Route for divers quiz 3 result
app.get('/quizdivers3result', (req, res) => {
  res.render('quizdivers3result');
});
// Route for usersbook page
app.get('/usersbook', (req, res) => {
  res.render('usersbook');
});
// Route for user page
app.get('/user', (req, res) => {
  res.render('user');
});
// Route for usersearch page
app.get('/usersearch', (req, res) => {
  res.render('usersearch');
});
// Route for useredit page
app.get('/useredit', (req, res) => {
  res.render('useredit');
});
// Route for userdelete page
app.get('/userdelete', (req, res) => {
  res.render('userdelete');
});



// Route for userpage
app.get('/userpage', (req, res) => {
  res.render('userpage');
});



// To validate a user
function validateUser(password, hash) {
  return bcrypt.compare(password, hash);
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
          res.cookie('token', token, { httpOnly: false }); // Set the token in a cookie
          req.session.jwt = token; // Set the token in the session
          res.redirect('/'); // Redirect to the main page
        }
      });
    }
  });
});

// To login a user on the website
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
      const id = result[0].id;
      const userUsername = result[0].username; 
      bcrypt.compare(password, result[0].password, (err, isMatch) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error occurred during password verification.');
        } else if (isMatch) {
          console.log('User logged in successfully');
          // Generate and send the JWT token
          const token = generateToken(id);
          res.cookie('token', token, { httpOnly: false });
          console.log("token", token);
          req.session.jwt = token;
          // Check if the user is an admin
          if (result[0].admin == 1) {
            res.redirect("/usersbook"); // Redirect to the usersbook page if admin
          } else {
            res.redirect("/quizzes"); // Redirect to the quizzes page if not admin
          }      
        } else {
          res.render("login", {error: "Incorrect password."});
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
function generateToken(id) { 
  const payload = { id }; 
  const options = { expiresIn: '1h' }; // Token expiration time 
  return jwt.sign(payload, secretKey, options); 
} 

// Verifying a JWT
function verifyToken(token) { 
  try { 
    const decoded = jwt.verify(token, secretKey); 
    return decoded.id; 
  } catch (err) { 
    return null; // Token is invalid or expired 
  } 
} 






// End of the file

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


// Exporting modules
module.exports = app;
