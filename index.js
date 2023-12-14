// index.js

const express = require("express");
const session = require("express-session");
const methodOverride = require("method-override");
const app = express();
const PORT = 3030;

global.DEBUG = true;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

// Logout POST
app.post("/logout", (req, res) => {
  req.session.user = null;
  res.redirect("/");
});

app.get("/", (req, res) => {
  const user = req.session.user;
  res.render("index.ejs", { user: user });
});

app.get("/about", (request, response) => {
  response.render("about.ejs");
});

app.get("/search", (request, response) => {
  response.render("search.ejs");
});

// const searchRouter = require("./routes/search");
// app.use("/search", searchRouter);

const loginsRouter = require("./routes/logins");
app.use("/logins", loginsRouter);

const signupRouter = require("./routes/signup");
app.use("/signup", signupRouter);

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
