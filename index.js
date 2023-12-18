const express = require("express");
const path = require("path");
const session = require("express-session");
const methodOverride = require("method-override");
const app = express();
const PORT = process.env.PORT || 3030;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware to set basePath
app.use((req, res, next) => {
  res.locals.basePath = __dirname;
  next();
});

// Logout POST
app.post("/logout", (req, res) => {
  req.session.user = null;
  res.redirect("/");
});

// Include route files
const loginsRouter = require("./routes/logins");
const signupRouter = require("./routes/signup");
const searchRouter = require("./routes/search");

// Use the route files
app.use("/logins", loginsRouter);
app.use("/signup", signupRouter);
app.use("/search", searchRouter);

// Home route
app.get("/", (req, res) => {
  const user = req.session.user;
  res.render("index", { user });
});

// About route
app.get("/about", (req, res) => {
  const user = req.session.user;
  res.render("about", { user });
});

// Search route
app.get("/search", (req, res) => {
  const user = req.session.user;
  res.render("search", { user });
});

// 404 error handling
app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
