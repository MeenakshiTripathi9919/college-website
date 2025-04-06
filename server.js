// server.js

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const db = require('./db'); // This is your MySQL config

const app = express();
const PORT = 3000;

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Serve HTML pages
app.get('/', (req, res) => res.sendFile(__dirname + '/views/login.html'));
app.get('/register', (req, res) => res.sendFile(__dirname + '/views/register.html'));

// ✅ Place your app.post routes BELOW these

// REGISTER route
app.post('/register', async (req, res) => {
  const { name, username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = 'INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, username, email, hashedPassword], (err, result) => {
    if (err) {
      console.log(err);
      return res.send('Error registering user');
    }
    res.send('Registered successfully! <a href="/">Login</a>');
  });
});

// LOGIN route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.send('User not found');
    }

    const match = await bcrypt.compare(password, results[0].password);
    if (match) {
      req.session.user = results[0];
      res.send(`Welcome ${results[0].name}! You are logged in.`);
    } else {
      res.send('Incorrect password');
    }
  });
});
// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
