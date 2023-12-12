// app.js

const express = require('express');
const methodOverride = require('method-override');
const eventsRouter = require('./routes/events');
const usersRouter = require('./routes/users'); // Add users route
const loginsRouter = require('./routes/logins'); // Add logins route

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Routes
app.use('/events', eventsRouter);
app.use('/users', usersRouter); // Mount the users route at /users
app.use('/logins', loginsRouter); // Mount the logins route at /logins

// Add other routes as needed

module.exports = app;
