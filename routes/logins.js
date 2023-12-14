// logins.js

const express = require("express");
const router = express.Router();
const db = require("../services/db");
const DEBUG = true; // Assuming DEBUG is defined somewhere

// Get all users
router.get("/", async (req, res) => {
  try {
    const user = req.session.user;
    const result = await db.query("SELECT * FROM users");
    if (DEBUG) {
      console.log(result.rows);
    }
    res.render("logins", { theLogins: result.rows, user: user });
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).send("Internal Server Error");
  }
});

// Display the form for creating a new user
router.get("/new", (req, res) => {
  res.render("newLogin");
});

router.post("/", async (req, res) => {
  try {
    const { username, email, password_hash } = req.body;

    if (DEBUG) console.log("logins.pg.db.getUserByCredentials()");

    // Check if a user with the provided credentials exists
    const sql =
      "SELECT userId, username, email, password FROM users WHERE username = $1 AND email = $2 AND password = $3";
    db.query(sql, [username, email, password_hash], (err, result) => {
      if (err) {
        console.error("Error in getUserByCredentials:", err);
        res.render("503");
      } else {
        const user = result.rows[0];
        if (user) {
          // User exists, proceed with the login
          // For example, you might set a session variable and redirect to the home page
          req.session.user = user;
          res.redirect("/");
        } else {
          // User not found
          const user = req.session.user;
          res.render("logins", { user: user });
        }
      }
    });
  } catch (error) {
    // Handle other errors, log them, and render a 503 page
    console.error(error);
    res.send("Error you are gay");
  }
});

// Display the form for updating a user
router.get("/:id/loginEdit", async (req, res) => {
  const { id } = req.params;
  try {
    if (DEBUG) {
      console.log("Editing user with id: ", id);
    }
    const result = await db.query("SELECT * FROM users WHERE userId = $1", [
      id,
    ]);
    if (DEBUG) {
      console.log(result.rows[0]);
    }
    res.render("loginEdit", { user: result.rows[0] });
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).send("Internal Server Error");
  }
});

// Update a user
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  try {
    if (DEBUG) {
      console.log("Updating user with id: ", id);
    }
    const result = await db.query(
      "UPDATE users SET username = $1, email = $2, password = $3 WHERE userId = $4 RETURNING *",
      [username, email, password, id]
    );
    res.redirect("/logins");
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).send("Internal Server Error");
  }
});

// Display the form for deleting a user
router.get("/:id/delete", async (req, res) => {
  const { id } = req.params;
  try {
    if (DEBUG) {
      console.log("Deleting user with id: ", id);
    }
    const result = await db.query("SELECT * FROM users WHERE userId = $1", [
      id,
    ]);
    res.render("loginDelete", { user: result.rows[0] });
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).send("Internal Server Error");
  }
});

// Delete a user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      "DELETE FROM users WHERE userId = $1 RETURNING *",
      [id]
    );
    res.redirect("/logins");
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
