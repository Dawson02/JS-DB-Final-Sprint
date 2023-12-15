// app.js

const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const bodyParser = require("body-parser");

const searchRouter = require("./routes/search"); // Add search route
const usersRouter = require("./routes/signup"); // Add signup route
const loginsRouter = require("./routes/logins"); // Add logins route

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Session middleware
app.use(
  session({
    secret: "your-secret-key", // Change this to a secure key
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
app.use("/about", aboutRouter); // You need to define 'aboutRouter' somewhere
app.use("/signup", usersRouter);
app.use("/logins", loginsRouter);
app.use("/search", searchRouter); // Add the search route here

// Add other routes as needed

module.exports = app;
