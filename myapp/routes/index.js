// Variables
const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const secretKey = 'yourSecretKey'; 
const validUsername = 'admin'; 
const validPassword = 'password'; 
const bcrypt = require('bcrypt'); 
const saltRounds = 10;
const password = 'password';
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

// Functions
function generateToken(username) { 
  const payload = { username }; 
  const options = { expiresIn: '1h' }; // Token expiration time 
  return jwt.sign(payload, secretKey, options); 
}
function verifyToken(token) { 
  try { 
    const decoded = jwt.verify(token, secretKey); 
    return decoded.id; 
  } catch (err) { 
    return null; // Token is invalid or expired 
  } 
} 


// Importing SQL modules 
const mysql = require('mysql2');

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



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




// Quizzes

// Generating capitals quiz 1
router.get('/quizcapital1', (req, res) => {
  // Query the database to get questions for quiz 1 (rows 1 to 8)
  const query = 'SELECT * FROM capitals LIMIT 0, 8';
  db.query(query, (err, result) => {
    console.log(result);
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving quiz questions');
    } else {
      res.render('quizcapital1', { quizNumber: 1, questions: result });
    }
  });
});

// Submit capitals quiz 1
router.post('/submitCapitalQuiz1', (req, res) => {
  // Process and check answers for quiz 1
  const userAnswers = req.body;
  // Query the database to get correct answers for quiz 1
  const query = 'SELECT id, question, answer FROM capitals LIMIT 0, 8';
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving correct answers');
    } else {
      // Calculate the grade and provide feedback for each question
      let correctCount = 0;
      const feedback = [];
      // Compare user's answers with correct answers
      for (const question of result) {
        const userAnswer = userAnswers[`answer_${question.id}`];
        const correctAnswer = question.answer;
        const isCorrect = userAnswer === correctAnswer;
        if (isCorrect) {
          correctCount++;
        }
        feedback.push({
          questionId: question.id,
          userAnswer,
          correctAnswer,
          isCorrect,
        });
      }
      // Calculate the final grade in percentage
      const totalQuestions = result.length;
      const percentageGrade = (correctCount / totalQuestions) * 100;
      // Retrieve user ID from the session
      const jwt = req.session.jwt; 
      const userId = verifyToken(jwt); 
      // Update the user's quizcapital1 result in the database
      const updateQuery = 'UPDATE users SET quizcapital1 = ? WHERE id = ?';
      db.query(updateQuery, [percentageGrade, userId], (updateErr, updateResult) => {
        if (updateErr) {
          console.error(updateErr);
          res.status(500).send('Error updating user quiz result');
        } else {
          // Render a page with feedback and final grade
          res.render('quizcapital1result', { quizNumber: 1, feedback, percentageGrade, questions: result});
        }
      });
    }
  });
});

// Generating capitals quiz 2
router.get('/quizcapital2', (req, res) => {
  // Query the database to get questions for quiz 2 (rows 9 to 16)
  const query = 'SELECT * FROM capitals LIMIT 8, 8';
  db.query(query, (err, result) => {
    console.log(result);
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving quiz questions');
    } else {
      res.render('quizcapital2', { quizNumber: 2, questions: result });
    }
  });
});

// Submit capitals quiz 2
router.post('/submitCapitalQuiz2', (req, res) => {
  // Process and check answers for quiz 2
  const userAnswers = req.body;
  // Query the database to get correct answers for quiz 2
  const query = 'SELECT id, question, answer FROM capitals LIMIT 8, 8';
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving correct answers');
    } else {
      // Calculate the grade and provide feedback for each question
      let correctCount = 0;
      const feedback = [];
      // Compare user's answers with correct answers
      for (const question of result) {
        const userAnswer = userAnswers[`answer_${question.id}`];
        const correctAnswer = question.answer;
        const isCorrect = userAnswer === correctAnswer;
        if (isCorrect) {
          correctCount++;
        }
        feedback.push({
          questionId: question.id,
          userAnswer,
          correctAnswer,
          isCorrect,
        });
      }
      // Calculate the final grade in percentage
      const totalQuestions = result.length;
      const percentageGrade = (correctCount / totalQuestions) * 100;
      // Retrieve user ID from the session
      const jwt = req.session.jwt; 
      const userId = verifyToken(jwt); 
      // Update the user's quizcapital1 result in the database
      const updateQuery = 'UPDATE users SET quizcapital2 = ? WHERE id = ?';
      db.query(updateQuery, [percentageGrade, userId], (updateErr, updateResult) => {
        if (updateErr) {
          console.error(updateErr);
          res.status(500).send('Error updating user quiz result');
        } else {
          // Render a page with feedback and final grade
          res.render('quizcapital2result', { quizNumber: 2, feedback, percentageGrade, questions: result});
        }
      });
    }
  });
});

// Generating capitals quiz 3
router.get('/quizcapital3', (req, res) => {
  // Query the database to get questions for quiz 3 (rows 17 to 24)
  const query = 'SELECT * FROM capitals LIMIT 16, 8';
  db.query(query, (err, result) => {
    console.log(result);
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving quiz questions');
    } else {
      res.render('quizcapital3', { quizNumber: 3, questions: result });
    }
  });
});

// Submit capitals quiz 3
router.post('/submitCapitalQuiz3', (req, res) => {
  // Process and check answers for quiz 3
  const userAnswers = req.body;
  // Query the database to get correct answers for quiz 3
  const query = 'SELECT id, question, answer FROM capitals LIMIT 16, 8';
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving correct answers');
    } else {
      // Calculate the grade and provide feedback for each question
      let correctCount = 0;
      const feedback = [];
      // Compare user's answers with correct answers
      for (const question of result) {
        const userAnswer = userAnswers[`answer_${question.id}`];
        const correctAnswer = question.answer;
        const isCorrect = userAnswer === correctAnswer;
        if (isCorrect) {
          correctCount++;
        }
        feedback.push({
          questionId: question.id,
          userAnswer,
          correctAnswer,
          isCorrect,
        });
      }
      // Calculate the final grade in percentage
      const totalQuestions = result.length;
      const percentageGrade = (correctCount / totalQuestions) * 100;
      // Retrieve user ID from the session
      const jwt = req.session.jwt; 
      const userId = verifyToken(jwt); 
      // Update the user's quizcapital1 result in the database
      const updateQuery = 'UPDATE users SET quizcapital3 = ? WHERE id = ?';
      db.query(updateQuery, [percentageGrade, userId], (updateErr, updateResult) => {
        if (updateErr) {
          console.error(updateErr);
          res.status(500).send('Error updating user quiz result');
        } else {
          // Render a page with feedback and final grade
          res.render('quizcapital3result', { quizNumber: 3, feedback, percentageGrade, questions: result});
        }
      });
    }
  });
});

// Generating divers quiz 1
router.get('/quizdivers1', (req, res) => {
  // Query the database to get questions for quiz 1 (rows 1 to 8)
  const query = 'SELECT * FROM divers LIMIT 0, 8';
  db.query(query, (err, result) => {
    console.log(result);
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving quiz questions');
    } else {
      res.render('quizdivers1', { quizNumber: 1, questions: result });
    }
  });
});

// Submit divers quiz 1
router.post('/submitDiversQuiz1', (req, res) => {
  // Process and check answers for quiz 1
  const userAnswers = req.body;
  // Query the database to get correct answers for quiz 1
  const query = 'SELECT id, question, answer FROM divers LIMIT 0, 8';
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving correct answers');
    } else {
      // Calculate the grade and provide feedback for each question
      let correctCount = 0;
      const feedback = [];
      // Compare user's answers with correct answers
      for (const question of result) {
        const userAnswer = userAnswers[`answer_${question.id}`];
        const correctAnswer = question.answer;
        const isCorrect = userAnswer === correctAnswer;
        if (isCorrect) {
          correctCount++;
        }
        feedback.push({
          questionId: question.id,
          userAnswer,
          correctAnswer,
          isCorrect,
        });
      }
      // Calculate the final grade in percentage
      const totalQuestions = result.length;
      const percentageGrade = (correctCount / totalQuestions) * 100;
      // Retrieve user ID from the session
      const jwt = req.session.jwt; 
      const userId = verifyToken(jwt); 
      // Update the user's quizcapital1 result in the database
      const updateQuery = 'UPDATE users SET quizdivers1 = ? WHERE id = ?';
      db.query(updateQuery, [percentageGrade, userId], (updateErr, updateResult) => {
        if (updateErr) {
          console.error(updateErr);
          res.status(500).send('Error updating user quiz result');
        } else {
          // Render a page with feedback and final grade
          res.render('quizdivers1result', { quizNumber: 1, feedback, percentageGrade, questions: result});
        }
      });
    }
  });
});

// Generating divers quiz 2
router.get('/quizdivers2', (req, res) => {
  // Query the database to get questions for quiz 2 (rows 9 to 16)
  const query = 'SELECT * FROM divers LIMIT 8, 8';
  db.query(query, (err, result) => {
    console.log(result);
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving quiz questions');
    } else {
      res.render('quizdivers2', { quizNumber: 2, questions: result });
    }
  });
});

// Submit divers quiz 2
router.post('/submitDiversQuiz2', (req, res) => {
  // Process and check answers for quiz 2
  const userAnswers = req.body;
  // Query the database to get correct answers for quiz 2
  const query = 'SELECT id, question, answer FROM divers LIMIT 8, 8';
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving correct answers');
    } else {
      // Calculate the grade and provide feedback for each question
      let correctCount = 0;
      const feedback = [];
      // Compare user's answers with correct answers
      for (const question of result) {
        const userAnswer = userAnswers[`answer_${question.id}`];
        const correctAnswer = question.answer;
        const isCorrect = userAnswer === correctAnswer;
        if (isCorrect) {
          correctCount++;
        }
        feedback.push({
          questionId: question.id,
          userAnswer,
          correctAnswer,
          isCorrect,
        });
      }
      // Calculate the final grade in percentage
      const totalQuestions = result.length;
      const percentageGrade = (correctCount / totalQuestions) * 100;
      // Retrieve user ID from the session
      const jwt = req.session.jwt; 
      const userId = verifyToken(jwt); 
      // Update the user's quizcapital1 result in the database
      const updateQuery = 'UPDATE users SET quizdivers2 = ? WHERE id = ?';
      db.query(updateQuery, [percentageGrade, userId], (updateErr, updateResult) => {
        if (updateErr) {
          console.error(updateErr);
          res.status(500).send('Error updating user quiz result');
        } else {
          // Render a page with feedback and final grade
          res.render('quizdivers2result', { quizNumber: 2, feedback, percentageGrade, questions: result});
        }
      });
    }
  });
});

// Generating divers quiz 3
router.get('/quizdivers3', (req, res) => {
  // Query the database to get questions for quiz 3 (rows 17 to 24)
  const query = 'SELECT * FROM divers LIMIT 16, 8';
  db.query(query, (err, result) => {
    console.log(result);
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving quiz questions');
    } else {
      res.render('quizdivers3', { quizNumber: 3, questions: result });
    }
  });
});

// Submit divers quiz 3
router.post('/submitDiversQuiz3', (req, res) => {
  // Process and check answers for quiz 3
  const userAnswers = req.body;
  // Query the database to get correct answers for quiz 3
  const query = 'SELECT id, question, answer FROM divers LIMIT 16, 8';
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving correct answers');
    } else {
      // Calculate the grade and provide feedback for each question
      let correctCount = 0;
      const feedback = [];
      // Compare user's answers with correct answers
      for (const question of result) {
        const userAnswer = userAnswers[`answer_${question.id}`];
        const correctAnswer = question.answer;
        const isCorrect = userAnswer === correctAnswer;
        if (isCorrect) {
          correctCount++;
        }
        feedback.push({
          questionId: question.id,
          userAnswer,
          correctAnswer,
          isCorrect,
        });
      }
      // Calculate the final grade in percentage
      const totalQuestions = result.length;
      const percentageGrade = (correctCount / totalQuestions) * 100;
      // Retrieve user ID from the session
      const jwt = req.session.jwt; 
      const userId = verifyToken(jwt); 
      // Update the user's quizcapital1 result in the database
      const updateQuery = 'UPDATE users SET quizdivers3 = ? WHERE id = ?';
      db.query(updateQuery, [percentageGrade, userId], (updateErr, updateResult) => {
        if (updateErr) {
          console.error(updateErr);
          res.status(500).send('Error updating user quiz result');
        } else {
          // Render a page with feedback and final grade
          res.render('quizdivers3result', { quizNumber: 3, feedback, percentageGrade, questions: result});
        }
      });
    }
  });
});


// Users management by administrators

// Define the contacts array here
let users = [];

// Route handler for users book
router.get('/usersbook', (req, res) => {
  db.query('SELECT * FROM users WHERE admin IS NULL;', (err, results) => {
    if (err) throw err;
    res.render('usersbook', { users: results });
  });
});

// Route handler for adding a user
router.post('/adduser', (req, res) => {
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
          res.redirect('/usersbook'); // Redirect to the usersbook page
        }
      });
    }
  });
});

// Adding route to handle searching by username
router.post('/searchuser', (req, res) => {
  let {username} = req.body;
  username = username + '%';
  const query = "SELECT * FROM users WHERE admin IS NULL and username LIKE ?;";
  db.query(query, [username], (err, results) => {
    if (err) throw err;
    res.render('usersbook', {users: results}); // Redirect to the users book page
  }); 
});

// Route handler for rendering the edit form
router.post('/edituser', (req, res) => {
  const {id, username, password} = req.body;
  const userToEdit = {
    id: id,
    username: username,
    password: password
  };
  res.render('useredit', { user: userToEdit });
});

// Route handler for editing a user
router.post('/confirmediteduser', async (req, res) => {
  try {
    const { id, username, password } = req.body;
    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const query = 'UPDATE users SET username = ?, password = ? WHERE id = ?';
    db.query(query, [username, hashedPassword, id], (err, results) => {
      if (err) throw err;
      res.redirect('/usersbook'); // Redirect to the users book page
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred during user update.');
  }
});

// Adding route handler for deleting a user
router.post('/deleteuser/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.redirect('/usersbook'); // Redirect to the users book page
  });
});




// End of the file

module.exports = router;
