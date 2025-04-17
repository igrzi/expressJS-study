const pool = require('../db/db');

// Post a new user to db
const createUser = async (req, res) => {
  const { name } = req.body;

  try {
    // Even if the user already exists, it returns an error, but still increments the id
    const result = await pool.query(
      'INSERT INTO users (name) VALUES ($1) RETURNING *',
      [name]
    );

    if (result.rowCount === 0) {
      return res.status(409).json({ error: 'User already exists' });
    }

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Get all users from db
const getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Get the user by id
const getUserById = async (req, res) => {
  const id = req.query.id;

  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports = { getUserById, getUsers, createUser };