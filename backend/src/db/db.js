const { Pool } = require("pg");

const env = require("../config/env");

const pool = new Pool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
});

pool.connect()
  .then(() => {
    console.log("PostgreSQL connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
  });

module.exports = pool;