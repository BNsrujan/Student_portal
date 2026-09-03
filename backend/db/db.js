require("dotenv").config();

const { Pool } = require("pg");

if (!process.env.PG_URI) {
  throw new Error(
    "PG_URI is not set. Copy .env.sample to .env and fill in the connection string."
  );
}

// The controllers call pool.query(text, params), which is the node-postgres
// API, so this must be a pg Pool. (It previously built a @neondatabase/serverless
// tagged-template client and exported nothing at all.)
const pool = new Pool({ connectionString: process.env.PG_URI });

pool.on("error", (err) => {
  console.error("Unexpected error on idle postgres client:", err);
});

module.exports = pool;
