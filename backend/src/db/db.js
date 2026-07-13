const { Pool } = require("pg");

const env = require("../config/env");

const pool = new Pool({
  connectionString: `postgresql://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}?sslmode=require`,
  ssl: { rejectUnauthorized: false },
});

pool.connect()
  .then(() => {
    console.log("PostgreSQL connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
  });

module.exports = pool;
