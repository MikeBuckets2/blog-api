const prisma = require('../../prisma/client');

async function createComment(req, res) {
  const { content, username } = req.body;

  if (!content || !username) {
    return res.status(400).json({ error: 'Content and username are required' });
  }

  const post = await prisma.post.findFirst({
    where: { id: Number(req.params.id), published: true },
  });
  if (!post) return res.status(404).json({ error: 'Post not found' });

  const comment = await prisma.comment.create({
    data: {
      content,
      username,
      postId: Number(req.params.id),
    },
  });
  res.status(201).json(comment);
}

async function deleteComment(req, res) {
  await prisma.comment.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: 'Comment deleted' });
}

module.exports = { createComment, deleteComment };