const express = require('express');
const methodOverride = require('method-override');
const passport = require('passport'); // Import passport for authentication
const session = require('express-session'); // Import express-session for session management
const app = express();
const PORT = 3000;

global.DEBUG = true;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Initialize Passport and configure session management
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// Home page
app.get('/', (req, res) => {
  const user = req.session.user;
  res.render('home', { message: "", user: user });
});

// Query Page
app.get('/query', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/login');
  }
  res.render('query.ejs');
});

// Results Page
app.post('/results', (req, res) => {
  // Implement search logic based on user input
  const searchQuery = req.body.search;
  const selectedDatabase = req.body.database;

  // Log search query (you can implement logging logic here)

  // Render the results page with search results
  res.render('results.ejs', { searchQuery, selectedDatabase });
});

// Authentication Routes
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

// Error Handling
app.use((req, res) => {
  res.status(404).render('404.ejs');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
