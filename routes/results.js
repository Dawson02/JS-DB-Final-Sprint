const express = require("express");
const router = express.Router();
const db = require("../services/db");
const { MongoClient } = require("mongodb");

router.get("/", (req, res) => {
  res.render("results", { postgresResults: [], mongodbResults: [] }); // Empty arrays as placeholders
});

router.post("/", async (req, res) => {
  try {
    const { query } = req.body;

    const postgresQuery =
      "SELECT make, model, color, '$' || TO_CHAR(price, 'FM999,999,999,999.99') AS formatted_price, fuel_type " +
      "FROM exotic_cars " +
      "WHERE " +
      "    make ILIKE $1 OR " +
      "    model ILIKE $1 OR " +
      "    color ILIKE $1 OR " +
      "    TO_CHAR(price, 'FM999,999,999,999.99') ILIKE $1 OR " +
      "    fuel_type ILIKE $1";

    db.query(
      postgresQuery,
      [`%${query}%`],
      async (postgresErr, postgresResult) => {
        if (postgresErr) {
          console.error(
            "Error executing PostgreSQL search query:",
            postgresErr
          );
          res.render("503"); // Render an error page if something goes wrong
        } else {
          const postgresResults = postgresResult.rows;

          // Connect to MongoDB
          const client = new MongoClient("mongodb://localhost:27017");
          client.connect(async (mongoErr) => {
            if (mongoErr) {
              console.error("Error connecting to MongoDB:", mongoErr);
              res.render("503"); // Render an error page if something goes wrong
            } else {
              // Access the desired MongoDB collection
              const db = client.db("CarSearchEngine");
              const collection = db.collection("FinalSprint");

              // Execute the MongoDB query
              const mongodbResults = await collection
                .find({
                  $or: [
                    { make: { $regex: query, $options: "i" } },
                    { model: { $regex: query, $options: "i" } },
                    { color: { $regex: query, $options: "i" } },
                    { fuel_type: { $regex: query, $options: "i" } },
                  ],
                })
                .toArray();

              // Close the MongoDB connection
              client.close();

              // Render the search results page with the obtained search results
              res.render("results", {
                postgresResults: mapPostgresResults(postgresResults),
                mongodbResults: mapMongoResults(mongodbResults),
              });
            }
          });
        }
      }
    );
  } catch (error) {
    console.error("Error in POST /search:", error);
    res.render("503"); // Render an error page if something goes wrong
  }
});

// Helper function to map PostgreSQL results to a consistent format
function mapPostgresResults(results) {
  return results.map((result) => ({
    make: result.make,
    model: result.model,
    color: result.color,
    formatted_price: result.formatted_price,
    fuel_type: result.fuel_type,
  }));
}

// Helper function to map MongoDB results to a consistent format
function mapMongoResults(results) {
  return results.map((result) => ({
    id: result._id, // Assuming MongoDB uses '_id' for the identifier
    name: result.name,
    description: result.description,
    price: result.price,
    discontinued: result.discontinued,
    categories: result.categories || [], // Assuming 'categories' is an array
  }));
}

module.exports = router;
