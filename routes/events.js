const express = require("express");
const router = express.Router();
const db = require("../services/db");
const DEBUG = true; // Assuming DEBUG is defined somewhere

// Get all events
router.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM events");
        if (DEBUG) {
            // console.log(result.rows);
        }
        res.render("events", { events: result.rows });
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("Internal Server Error");
    }
});

// Display the form for creating a new event
router.get("/new", (req, res) => {
    res.render("eventNew");
});

// Create a new event
router.post("/", async (req, res) => {
    const { event_name, event_date, description } = req.body;
    try {
        if (DEBUG) {
            console.log("Creating event with name: ", event_name);
        }
        const result = await db.query(
            "INSERT INTO events (event_name, event_date, description) VALUES ($1, $2, $3) RETURNING *",
            [event_name, event_date, description]
        );
        res.redirect("/events");
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("Internal Server Error");
    }
});

// Display the form for updating an event
router.get("/:id/edit", async (req, res) => {
    const { id } = req.params;
    try {
        if (DEBUG) {
            console.log("Editing event with id: ", id);
        }
        const result = await db.query("SELECT * FROM events WHERE event_id = $1", [
            id,
        ]);
        if (DEBUG) {
            console.log(result.rows[0]);
        }
        res.render("eventEdit", { event: result.rows[0] });
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("Internal Server Error");
    }
});

// Update an event
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { event_name, event_date, description } = req.body;
    try {
        if (DEBUG) {
            console.log("Updating event with id: ", id);
        }
        const result = await db.query(
            "UPDATE events SET event_name = $1, event_date = $2, description = $3 WHERE event_id = $4 RETURNING *",
            [event_name, event_date, description, id]
        );
        res.redirect("/events");
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("Internal Server Error");
    }
});

// Display the form for deleting an event
router.get("/:id/delete", async (req, res) => {
    const { id } = req.params;
    try {
        if (DEBUG) {
            console.log("Deleting event with id: ", id);
        }
        const result = await db.query("SELECT * FROM events WHERE event_id = $1", [
            id,
        ]);
        res.render("eventDelete", { event: result.rows[0] });
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("Internal Server Error");
    }
});

// Delete an event
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query(
            "DELETE FROM events WHERE event_id = $1 RETURNING *",
            [id]
        );
        res.redirect("/events");
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
