const prisma = require('../../prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  if (!user.isAuthor) {
    return res.status(403).json({ error: 'Account does not have author access' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, isAuthor: user.isAuthor },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({ token, username: user.username });
}

module.exports = { login };