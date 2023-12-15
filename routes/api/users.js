// const express = require('express');
// const router = express.Router();
// const db = require('../../services/db');

// // GET all users
// router.get('/users', async (req, res) => {
//     try {
//         const result = await db.query('SELECT * FROM users');
//         res.json({ users: result.rows });
//     } catch (err) {
//         console.error('Error executing query', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // GET a specific user by ID
// router.get('/users/:id', async (req, res) => {
//     const { id } = req.params;

//     try {
//         const result = await db.query('SELECT * FROM users WHERE userid = $1', [id]);

//         if (result.rows.length === 0) {
//             res.status(404).json({ message: 'User not found' });
//         } else {
//             res.json({ user: result.rows[0] });
//         }
//     } catch (err) {
//         console.error('Error executing query', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // DELETE a specific user by ID
// router.delete('/users/:id', async (req, res) => {
//     const { id } = req.params;

//     try {
//         const result = await db.query('DELETE FROM users WHERE userid = $1 RETURNING *', [id]);

//         if (result.rows.length === 0) {
//             res.status(404).json({ message: 'User not found' });
//         } else {
//             res.json({ message: 'User deleted successfully', deletedUser: result.rows[0] });
//         }
//     } catch (err) {
//         console.error('Error executing query', err);
//         res.status(500).json({ error: 'Internal Server Error. User ' + id + ' is still referenced in another table.' });
//     }
// });

// module.exports = router;
