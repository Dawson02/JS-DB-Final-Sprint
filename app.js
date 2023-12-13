// app.js

const express = require('express');
const methodOverride = require('method-override');
const usersRouter = require('./routes/signup'); // Add signup route
const loginsRouter = require('./routes/logins'); // Add logins route

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Routes
app.use('/about', aboutRouter);
app.use('/signup', usersRouter); 
app.use('/logins', loginsRouter); 

// Add other routes as needed

module.exports = app;

