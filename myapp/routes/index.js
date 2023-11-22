var express = require('express');
var router = express.Router();

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
      // Render a page with feedback and final grade
      res.render('quizcapital1result', { quizNumber: 1, feedback, percentageGrade, questions: result});
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
      // Render a page with feedback and final grade
      res.render('quizcapital2result', { quizNumber: 2, feedback, percentageGrade, questions: result });
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
      // Render a page with feedback and final grade
      res.render('quizcapital3result', { quizNumber: 3, feedback, percentageGrade, questions: result });
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
      // Render a page with feedback and final grade
      res.render('quizdivers1result', { quizNumber: 1, feedback, percentageGrade, questions: result});
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
      // Render a page with feedback and final grade
      res.render('quizdivers2result', { quizNumber: 2, feedback, percentageGrade, questions: result });
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
      // Render a page with feedback and final grade
      res.render('quizdivers3result', { quizNumber: 3, feedback, percentageGrade, questions: result });
    }
  });
});





// End of the file

module.exports = router;
