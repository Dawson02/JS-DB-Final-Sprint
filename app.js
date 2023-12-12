// app.js

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const app = express();

// Use EJS for rendering views
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Express session middleware
app.use(
  session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Include route files
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');

// Use routes
app.use('/', indexRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
