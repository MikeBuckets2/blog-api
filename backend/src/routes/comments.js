const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { deleteComment } = require('../controllers/commentController');

router.delete('/:id', authenticateToken, deleteComment);

module.exports = router;