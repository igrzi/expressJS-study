require('dotenv').config(); // Load .env variables
const express = require('express');
const initDb = require('./db/initDB');
const app = express();

app.use(express.json());

// Rourte
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);


// Try to initialize the database
try {
  initDb();
  console.log('✅ Database initialized');
} catch (error) {
  console.error('❌ Failed to init DB:', error);
  process.exit(1);
}

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
