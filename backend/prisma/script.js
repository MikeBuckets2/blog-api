const prisma = require('../prisma/client');
const bcrypt = require('bcryptjs');

async function main() {
  const username = process.env.AUTHOR_USERNAME || 'admin';
  const password = process.env.AUTHOR_PASSWORD;

  if (!password) {
    console.error('AUTHOR_PASSWORD is required in .env');
    process.exit(1);
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { username },
    update: { password: hashed },
    create: {
      username,
      password: hashed,
      isAuthor: true,
    },
  });

  console.log(`Author account ready: ${user.username}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());