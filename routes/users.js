const express = require("express");
const router = express.Router();
const db = require("../services/db");

// Get all users
router.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM users");
        if (DEBUG) {
            // console.log(result.rows);
        }
        res.render("users", { users: result.rows }); // Change variable name to 'users'
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("Internal Server Error");
    }
});

// Display the form for creating a new user
router.get("/new", (req, res) => {
    res.render("newUser");
});

// Create a new user
router.post("/", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (DEBUG) {
            console.log("Creating user with username: ", username);
        }
        const result = await db.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
            [username, email, password]
        );
        res.redirect("/users");
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("Internal Server Error");
    }
});


// Display the form for updating a user
router.get("/:id/edit", async (req, res) => {
const { id } = req.params;
try {
    if (DEBUG) {
        console.log("Editing user with id: ", id);
    }
    const result = await db.query("SELECT * FROM users WHERE user_id = $1", [
    id,
    ]);
    if (DEBUG) {
        console.log(result.rows[0])
    }
    res.render("userPatch", { user: result.rows[0] });
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
      "UPDATE users SET username = $1, email = $2, password = $3 WHERE user_id = $4 RETURNING *",
    [username, email, password, id]
    );
    res.redirect("/users");
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
    const result = await db.query("SELECT * FROM users WHERE user_id = $1", [
    id,
    ]);
    res.render("userDelete", { user: result.rows[0] });
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
      "DELETE FROM users WHERE user_id = $1 RETURNING *",
    [id]
    );
    res.redirect("/users");
} catch (err) {
    console.error("Error executing query", err);
    res.status(500).send("Internal Server Error");
}
});

module.exports = router;
