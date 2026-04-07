const { Pool } = require('pg');

// Initialize the Postgres connection pool
// This automatically uses the PG* environment variables if they exist,
// or falls back to using the DATABASE_URL connection string directly.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Simple wrapper to execute queries
module.exports = {
  query: (text, params) => pool.query(text, params),
};
