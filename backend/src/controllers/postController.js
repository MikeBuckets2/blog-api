const prisma = require('../../prisma/client');

async function publishedPosts(req, res) {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: { select: { username: true } },
      _count: { select: { comments: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
  res.json(posts);
}

async function publishedPost(req, res) {
  const post = await prisma.post.findFirst({
    where: { id: Number(req.params.id), published: true },
    include: {
      author: { select: { username: true } },
      comments: { orderBy: { createdAt: 'desc' } },
    },
  });
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
}

async function allPosts(req, res) {
  const posts = await prisma.post.findMany({
    include: {
      author: { select: { username: true } },
      _count: { select: { comments: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
  res.json(posts);
}

async function adminPost(req, res) {
  const post = await prisma.post.findUnique({
    where: { id: Number(req.params.id) },
    include: {
      author: { select: { username: true } },
      comments: { orderBy: { createdAt: 'desc' } },
    },
  });
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
}

async function createPost(req, res) {
  const { title, content, published } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  const post = await prisma.post.create({
    data: {
      title,
      content,
      published: published || false,
      authorId: req.user.id,
    },
  });
  res.status(201).json(post);
}

async function updatePost(req, res) {
  const { title, content, published } = req.body;
  const post = await prisma.post.update({
    where: { id: Number(req.params.id) },
    data: { title, content, published },
  });
  res.json(post);
}

async function deletePost(req, res) {
  await prisma.post.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: 'Post deleted' });
}

async function togglePublish(req, res) {
  const post = await prisma.post.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!post) return res.status(404).json({ error: 'Post not found' });

  const updated = await prisma.post.update({
    where: { id: Number(req.params.id) },
    data: { published: !post.published },
  });
  res.json(updated);
}

module.exports = {
  publishedPosts,
  publishedPost,
  allPosts,
  adminPost,
  createPost,
  updatePost,
  deletePost,
  togglePublish,
};