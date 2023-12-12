// const dbHost = process.env.PGDB_HOST;
// const dbUser = process.env.PGDB_USER;
// const dbPassword = process.env.PGDB_PASSWORD;
// const dbDatabase = process.env.PGDB_DATABASE;
// const Pool = require("pg").Pool;

const pool = new Pool({
  user: postgres,
  host: localhost,
  database: "Final Sprint - JavaScript/Databases",
  password: "Skiff_21",
  port: 5432,
});

module.exports = pool;
