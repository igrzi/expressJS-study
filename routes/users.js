const express = require('express');
const router = express.Router();
const { getUsers, getUserById, createUser } = require('../controllers/userController');

// POST /user
router.post('/create', createUser);

// GET /users
router.get('/', (req, res) => {
  if (req.query.id) {
    return getUserById(req, res);
  }
  return getUsers(req, res);
});

module.exports = router;
