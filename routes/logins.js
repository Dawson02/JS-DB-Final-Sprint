const express = require("express");
const router = express.Router();
const db = require("../services/db"); 
const DEBUG = true; // Assuming DEBUG is defined somewhere

// Get all logins
router.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM login");
        if (DEBUG) {
            // console.log(result.rows);
        }
        res.render("logins", { theLogins: result.rows });
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("Internal Server Error");
    }
});

// Display the form for creating a new login
router.get("/new", (req, res) => {
    res.render("newLogin");
});

// Create a new login
router.post("/", async (req, res) => {
    const { username, password_hash, user_id } = req.body;
    try {
        if (DEBUG) {
            console.log("Creating login with username: ", username);
        }
        const result = await db.query(
            "INSERT INTO login (username, password_hash, user_id) VALUES ($1, $2, $3) RETURNING *",
            [username, password_hash, user_id]
        );
        res.redirect("/logins");
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("Internal Server Error");
    }
});

// Display the form for updating a login
router.get("/:id/edit", async (req, res) => {
    const { id } = req.params;
    try {
        if (DEBUG) {
            console.log("Editing login with id: ", id);
        }
        const result = await db.query("SELECT * FROM login WHERE login_id = $1", [
            id,
        ]);
        if (DEBUG) {
            console.log(result.rows[0]);
        }
        res.render("loginEdit", { login: result.rows[0] });
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("Internal Server Error");
    }
});

// Update a login
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { username, password_hash, user_id } = req.body;
    try {
        if (DEBUG) {
            console.log("Updating login with id: ", id);
        }
        const result = await db.query(
            "UPDATE login SET username = $1, password_hash = $2, user_id = $3 WHERE login_id = $4 RETURNING *",
            [username, password_hash, user_id, id]
        );
        res.redirect("/logins");
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("Internal Server Error");
    }
});

// Display the form for deleting a login
router.get("/:id/delete", async (req, res) => {
    const { id } = req.params;
    try {
        if (DEBUG) {
            console.log("Deleting login with id: ", id);
        }
        const result = await db.query("SELECT * FROM login WHERE login_id = $1", [
            id,
        ]);
        res.render("loginDelete", { login: result.rows[0] });
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("Internal Server Error");
    }
});

// Delete a login
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query(
            "DELETE FROM login WHERE login_id = $1 RETURNING *",
            [id]
        );
        res.redirect("/logins");
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;