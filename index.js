require('dotenv').config(); // Load .env variables
const express = require('express');
const initDb = require('./db/initDB');
const app = express();

app.use(express.json());

// Routes
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// OpenSearch Routes
const openSearchRouter = require('./routes/openSearch');
app.use('/opensearch', openSearchRouter);

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
