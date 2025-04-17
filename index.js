require('dotenv').config(); // Load .env variables
const express = require('express');
const app = express();

// Rourte
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

app.use(express.json());

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
