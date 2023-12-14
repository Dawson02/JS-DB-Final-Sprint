const express = require("express");
const router = express.Router();
const db = require("../services/db"); // Adjust this import based on your setup

// GET /search
router.get("/", (req, res) => {
  try {
    if (!req.session.user) {
      res.redirect("/logins");
    } else {
      const user = req.session.user;
      res.render("search", { user });
    }
  } catch (err) {
    console.error("Error in GET /search:", err);
    res.render("503");
  }
});

// POST /search
router.post("/", async (req, res) => {
  try {
    const { query } = req.body;

    if (DEBUG) console.log("searching...");

    const sql =
      "SELECT make, model, color, price, fuel_type " +
      "FROM exotic_cars " +
      "WHERE " +
      "    make ILIKE $1 OR " +
      "    model ILIKE $1 OR " +
      "    color ILIKE $1 OR " +
      "    price ILIKE $1 OR " +
      "    fuel_type ILIKE $1";

    db.query(sql, [`%${query}%`], (err, result) => {
      if (err) {
        console.error("Error in ExoticCars database:", err);
        res.render("503"); // Render an error page if something goes wrong
      } else {
        const postgresResults = result.rows;

        // Handle other database searches here if needed

        // Render the search results page with the obtained search results
        res.render("results", {
          postgresResults,
          //   databaseType,
        });
      }
    });
  } catch (error) {
    console.error("Error in POST /search:", error);
    res.render("503"); // Render an error page if something goes wrong
  }
});

module.exports = router;
