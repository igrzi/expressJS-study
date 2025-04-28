const express = require('express');
const router = express.Router();
const { OSgetUsers, OSgetUserByID, OScreateUser, OSdeleteUserByID, OSpatchUserByID } = require('../controllers/userOSController');
// ===== OPENSEARCH ===== //

// POST /opensearch/
router.post('/', OScreateUser)

// GET /opensearch/:id
router.get('/', OSgetUsers)
router.get('/:id', OSgetUserByID)

// DELETE /opensearch/:id
router.delete('/:id', OSdeleteUserByID)

// PATCH /opensearch/:id
router.patch('/:id', OSpatchUserByID)

module.exports = router;
