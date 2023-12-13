const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Final Sprint - JavaScript/Databases",
  password: "Skiff_21",
  port: 5432,
});

module.exports = pool;
