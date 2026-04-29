const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
  publishedPosts,
  publishedPost,
  allPosts,
  adminPost,
  createPost,
  updatePost,
  deletePost,
  togglePublish,
} = require('../controllers/postController');
const { createComment } = require('../controllers/commentController');

router.get('/', publishedPosts);
router.get('/admin', authenticateToken, allPosts);
router.get('/:id', publishedPost);
router.get('/:id/admin', authenticateToken, adminPost);
router.post('/', authenticateToken, createPost);
router.put('/:id', authenticateToken, updatePost);
router.delete('/:id', authenticateToken, deletePost);
router.patch('/:id/publish', authenticateToken, togglePublish);
router.post('/:id/comments', createComment);

module.exports = router;