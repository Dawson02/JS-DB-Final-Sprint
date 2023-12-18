const express = require("express");
const router = express.Router();
const db = require("../services/db");

const { MongoClient } = require("mongodb");

// GET route for rendering the search page
router.get("/", (req, res) => {
  // Assuming you have the user information in the session
  const user = req.session.user;
  res.render("search", { user });
});

// POST route for handling the search form submission
router.post("/", async (req, res) => {
  try {
    const { query, database } = req.body;

    if (!query || !database) {
      return res.status(400).json({ error: "Invalid search parameters" });
    }

    let postgresResults = [];
    let mongodbResults = [];

    if (database === "postgres" || database === "both") {
      const sql =
        "SELECT make, model, color, price, fuel_type " +
        "FROM exotic_cars " +
        "WHERE " +
        "    make ILIKE $1 OR " +
        "    model ILIKE $1 OR " +
        "    color ILIKE $1 OR " +
        "    fuel_type ILIKE $1";

      const postgresResult = await db.query(sql, [`%${query}%`]);
      postgresResults = postgresResult.rows;
    }

    if (database === "mongodb" || database === "both") {
      // Connect to MongoDB
      let client;

      try {
        client = new MongoClient(
          "mongodb+srv://bradenskiffington:Skiff_21@cluster0.kujhuul.mongodb.net/"
        );
        await client.connect();

        // Access the desired MongoDB collection
        const db = client.db("CarSearchEngine");
        const collection = db.collection("FinalSprint");

        // Construct the MongoDB query filter
        const filter = {
          $or: [
            { car_make: { $regex: query, $options: "i" } },
            { car_model: { $regex: query, $options: "i" } },
            { wheel_type: { $regex: query, $options: "i" } },
            { exhaust_type: { $regex: query, $options: "i" } },
            { tire_brand: { $regex: query, $options: "i" } },
            { tire_size: { $regex: query, $options: "i" } },
            { suspension_type: { $regex: query, $options: "i" } },
            { brake_system: { $regex: query, $options: "i" } },
            { engine_tuning: { $regex: query, $options: "i" } },
          ],
        };

        // Execute the MongoDB query
        mongodbResults = await collection.find(filter).toArray();
      } finally {
        // Close the MongoDB connection in the finally block
        if (client) {
          await client.close();
        }
      }
    }

    // Assuming you have the user information in the session
    const user = req.session.user;

    // Render the search results page with the obtained search results and user information
    res.render("results", { postgresResults, mongodbResults, user });
  } catch (error) {
    console.error("Error in POST /search:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

module.exports = router;
