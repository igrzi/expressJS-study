const pool = require('./db');

const initDb = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) UNIQUE NOT NULL
    );
  `);

  console.log('✅ Users table ensured');
}

module.exports = initDb;
