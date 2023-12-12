const express = require('express');
const router = express.Router();

// Home Page
router.get('/', (req, res) => {
  res.render('home');
});

// Query Page
router.get('/query', (req, res) => {
  // Ensure user is logged in before accessing the query page
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/login');
  }

  res.render('query');
});

// Results Page
router.post('/results', (req, res) => {
  // Implement search logic based on user input
  const searchQuery = req.body.search;
  const selectedDatabase = req.body.database;

  // Log search query (you can implement logging logic here)

  // Render the results page with search results
  res.render('results', { searchQuery, selectedDatabase });
});

module.exports = router;
