const express = require('express');
const passport = require('passport');
const router = express.Router();

// Login Page
router.get('/login', (req, res) => {
  res.render('login');
});

// Login Logic
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/query',
    failureRedirect: '/auth/login',
    failureFlash: true,
  })
);

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
