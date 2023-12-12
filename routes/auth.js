// routes/auth.js

const express = require('express');
const passport = require('passport');
const router = express.Router();

// Login Page
router.get('/login', (req, res) => {
  res.render('login');
});

// Login Logic
router.post('/', async (req, res) => {
  try {
      const { username, email, password } = req.body;

      // Check if a user with the provided credentials exists
      const user = await loginsDal.getUserByCredentials(username, email, password);

      if (user) {
          // User exists, proceed with the login
          // For example, you might set a session variable and redirect to the home page
          req.session.user = user;
          res.redirect('/');
      } else {
          // User not found, display an error message
          res.render('login', { message: "Invalid username, email, or password." });
      }
  } catch (error) {
      // Handle other errors, log them, and render a 503 page
      console.error(error);
      res.render('503');
  }
});

// Sign Up Page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Sign Up Logic
router.post('/signup', (req, res) => {
  // Implement user registration logic here

  // Redirect to the login page after successful registration
  res.redirect('/auth/login');
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
