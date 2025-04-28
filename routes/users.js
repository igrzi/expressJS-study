const express = require('express');
const router = express.Router();
const { getUsers, getUserById, createUser, deleteUserById, patchUserById } = require('../controllers/userController');

// POST /user
router.post('/create', createUser);

// GET /users
router.get('/', getUsers);
router.get('/:id', getUserById);

// DELETE /user/:id
router.delete('/:id', deleteUserById);

// PATCH /user/:id
// We use PATCH instead of PUT because we are not updating the entire user object, just the name
router.patch('/:id', patchUserById);

module.exports = router;
