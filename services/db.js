const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Final Sprint - JavaScript/Databases", // Update with underscores
  password: "Skiff_21",
  port: 5432,
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
