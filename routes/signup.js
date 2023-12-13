const express = require("express");
const router = express.Router();
const db = require("../services/db");

// Display the form for creating a new user
router.get("/", (req, res) => {
    res.render("signup");
});

// Create a new user
router.post("/", async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    try {
        if (password !== confirmPassword) {
            res.status(400).send("Passwords do not match");
            return;
        } else {
        const result = await db.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
            [username, email, password]
        );
        res.redirect("/");
        }
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("Internal Server Error");
    }
});



module.exports = router;