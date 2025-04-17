const { Pool } = require('pg');
require('dotenv').config();

// Pool is used so we don't have to create a new connection for each query
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
