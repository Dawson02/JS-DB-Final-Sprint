const express = require('express');
const router = express.Router();
const db = require('../../services/db');

// GET all events
router.get('/events', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM events');
        res.json({ events: result.rows });
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET a specific event by ID
router.get('/events/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('SELECT * FROM events WHERE event_id = $1', [id]);

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Event not found' });
        } else {
            res.json({ event: result.rows[0] });
        }
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE a specific event by ID
router.delete('/events/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('DELETE FROM events WHERE event_id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Event not found' });
        } else {
            res.json({ message: 'Event deleted successfully', deletedEvent: result.rows[0] });
        }
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error. Event ' + id + ' is still referenced in another table.' });
    }
});

module.exports = router;
